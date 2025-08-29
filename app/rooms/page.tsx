'use client'

import * as React from 'react'
import { listRooms, createRoom } from '../../spec/mockApi'
import { Room } from '../../spec/types'
import { RoomCard, ChatPanel } from '../../ui'
import { getFlag } from '../../spec/featureFlags'
import { useRouter } from 'next/navigation'
import { findNextActiveRoom } from '../../lib/rooms'
import { FixedSizeList as List } from 'react-window'
import { capture } from '../../spec/posthog'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { listScheduleSlots, type ScheduleSlot } from '../../spec/schedule'
import { listOnlinePeople, type Person } from '../../spec/people'

type Filter = 'all'|'public'|'private'

export default function RoomsPage() {
  const router = useRouter()
  const [rooms, setRooms] = React.useState<Room[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [filter, setFilter] = React.useState<Filter>('all')
  const [viewDays, setViewDays] = React.useState<3|5|7>(5)
  const [calendarDate, setCalendarDate] = React.useState<Date>(new Date())
  const [slots, setSlots] = React.useState<ScheduleSlot[]>([])
  const [people, setPeople] = React.useState<Person[]>([])
  const [chatMessages, setChatMessages] = React.useState<any[]>([])
  const [selectedRecipients, setSelectedRecipients] = React.useState<string[]>([])
  const recipientsTitle = selectedRecipients.length ? `Chat con ${people.filter(p=>selectedRecipients.includes(p.id)).map(p=>p.name).join(', ')}` : 'Chat generale'

  React.useEffect(() => {
    let on = true
    setLoading(true)
    listRooms().then(r => { if(on){ setRooms(r); setError(null) } }).catch(e=>{ if(on) setError('Impossibile caricare le stanze.') }).finally(()=>{ if(on) setLoading(false) })
    return () => { on = false }
  }, [])

  React.useEffect(() => {
    if (!loading && !error) {
      capture('room_list_viewed', { count: rooms.length })
    }
  }, [loading, error, rooms.length])

  React.useEffect(()=>{
    let on = true
    listScheduleSlots().then(s=>{ if(on) setSlots(s) })
    listOnlinePeople().then(p=>{ if(on) setPeople(p) })
    return ()=>{ on = false }
  }, [])

  const showPrivate = getFlag('privateRooms')
  const filtered = rooms.filter(r => {
    if (!showPrivate && r.visibility === 'private') return false
    if (filter === 'public') return r.visibility === 'public'
    if (filter === 'private') return r.visibility === 'private'
    return true
  })

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          {(['all','public','private'] as Filter[]).map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 text-sm ${filter===f? 'bg-slate-100 dark:bg-slate-800' : ''}`}>{f}</button>
          ))}
        </div>
        <button
          className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
          onClick={async ()=>{
            const id = await findNextActiveRoom()
            if (!id) return alert('Nessuna stanza attiva ora')
            router.push(`/room/${id}`)
          }}
        >
          Entra nella prossima stanza attiva
        </button>
      </div>

      {/* Three-column layout: left menu, center calendar, right chat */}
      <div className="grid grid-cols-1 lg:grid-cols-[18rem_minmax(0,1fr)_20rem] gap-4 items-start">
        {/* Left: Create room */}
        <aside className="rounded-xl border border-slate-200 dark:border-slate-800 p-4" aria-label="Crea stanza">
          <h3 className="text-lg font-semibold">Crea una stanza</h3>
          <CreateRoomForm onCreate={async (input)=>{
            const r = await createRoom({ name: input.reason === 'pausa' ? 'Pausa' : `Sessione ${input.duration}m`, topic: input.reason, visibility: 'public' })
            router.push(`/room/${r.id}`)
          }} />
          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-600">Stanze disponibili</h4>
            <div className="mt-2" style={{ maxHeight: 280, overflow: 'auto' }}>
              <List height={280} width={'100%'} itemCount={filtered.length} itemSize={112}>
                {({ index, style }) => {
                  const r = filtered[index]
                  return (
                    <div style={style} key={r.id}>
                      <RoomCard
                        id={r.id}
                        name={r.name}
                        topic={r.topic}
                        membersOnline={r.membersOnline}
                        visibility={r.visibility}
                        onJoin={(id)=>{
                          capture('room_joined', { room_id: id, visibility: r.visibility })
                          if(r.visibility==='private' && !showPrivate){
                            window.location.href = '/billing'
                            return
                          }
                          window.location.href = `/room/${id}`
                        }}
                      />
                    </div>
                  )
                }}
              </List>
            </div>
          </div>
        </aside>

        {/* Center: Calendar with 3/5/7 day views */}
        <main>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm text-slate-600">Vista:</span>
            {[3,5,7].map(n => (
              <button key={n as number} onClick={()=>setViewDays(n as 3|5|7)} className={`px-2 py-1 text-sm rounded border ${viewDays===n ? 'bg-slate-100 dark:bg-slate-800' : ''}`}>{n} giorni</button>
            ))}
          </div>
          <Calendar
            localizer={localizer}
            date={calendarDate}
            onNavigate={d=>setCalendarDate(d)}
            view="day"
            length={viewDays}
            events={slots}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            eventPropGetter={(event)=>{
              const bg = (event as ScheduleSlot).status === 'scheduled' ? '#22c55e' : '#f59e0b'
              return { style: { backgroundColor: bg, borderColor: bg } }
            }}
          />
        </main>

        {/* Right: People online + chat */}
        <aside className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col h-[700px]">
          <h3 className="text-lg font-semibold">Persone online</h3>
          <ul className="mt-2 space-y-2 overflow-auto" style={{ maxHeight: 200 }}>
            {people.map(p => (
              <li key={p.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.status === 'online' ? 'Online' : p.status === 'available' ? 'Disponibile' : 'In pausa'}</p>
                </div>
                <label className="text-xs inline-flex items-center gap-1">
                  <input type="checkbox" checked={selectedRecipients.includes(p.id)} onChange={e=>{
                    setSelectedRecipients(prev=> e.target.checked ? [...prev, p.id] : prev.filter(id=>id!==p.id))
                  }} />
                  Seleziona
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex gap-2">
            <button className="px-2 py-1 rounded border" onClick={()=>setSelectedRecipients([])}>Chat generale</button>
            <button className="px-2 py-1 rounded border" onClick={()=>{
              if(selectedRecipients.length===0) return alert('Seleziona almeno una persona')
            }}>Nuovo gruppo</button>
          </div>
          <div className="mt-3 flex-1">
            <ChatPanel
              roomId={selectedRecipients.length ? `dm:${selectedRecipients.sort().join(',')}` : 'lobby'}
              title={recipientsTitle}
              messages={chatMessages}
              onSend={async (text)=>{
                const m = { id: Math.random().toString(36).slice(2,8), user:{id:'me', name:'Io'}, text, ts: new Date().toISOString() }
                setChatMessages(prev=>[...prev, m])
              }}
            />
          </div>
        </aside>
      </div>
    </section>
  )
}

// Date-fns localizer for react-big-calendar
const locales = {}
const localizer = dateFnsLocalizer({ format, parse, startOfWeek: () => startOfWeek(new Date()), getDay, locales })

// Stub form for creating rooms with durations and reasons
function CreateRoomForm({ onCreate }: { onCreate: (input: { duration: 15|25|50; reason: 'pausa'|'sessione lavorativa congiunta' })=>void }){
  const [duration, setDuration] = React.useState<15|25|50>(25)
  const [reason, setReason] = React.useState<'pausa'|'sessione lavorativa congiunta'>('sessione lavorativa congiunta')
  return (
    <form className="mt-3 space-y-3" onSubmit={e=>{ e.preventDefault(); onCreate({ duration, reason }) }}>
      <div>
        <label className="block text-sm">Durata</label>
        <select value={duration} onChange={e=>setDuration(Number(e.target.value) as 15|25|50)} className="mt-1 w-full rounded border px-3 py-2">
          <option value={15}>15 minuti</option>
          <option value={25}>25 minuti</option>
          <option value={50}>50 minuti</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Motivo</label>
        <div className="mt-1 space-y-1">
          <label className="inline-flex items-center gap-2 text-sm"><input type="radio" name="reason" value="sessione" checked={reason==='sessione lavorativa congiunta'} onChange={()=>setReason('sessione lavorativa congiunta')} /> Sessione lavorativa congiunta</label>
          <label className="inline-flex items-center gap-2 text-sm"><input type="radio" name="reason" value="pausa" checked={reason==='pausa'} onChange={()=>setReason('pausa')} /> Pausa</label>
        </div>
      </div>
      <button type="submit" className="px-3 py-2 rounded bg-blue-600 text-white">Crea</button>
    </form>
  )
}
