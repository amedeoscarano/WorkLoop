'use client'

import * as React from 'react'
import { listRooms, createRoom } from '../../spec/mockApi'
import { Room } from '../../spec/types'
import { RoomCard } from '../../ui'
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
import { DashboardShell } from '../../ui/DashboardShell'

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
  // UI now mirrors calendar-centric layout; chat moved out for parity

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

      <DashboardShell>
        {/* Center calendar with custom header */}
        <section>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2">
            <div className="text-sm font-medium">
              {format(calendarDate, 'MMM')} - {format(new Date(calendarDate.getFullYear(), calendarDate.getMonth()+Math.ceil(viewDays/30)), 'MMM yyyy')}
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                {[3,5,7].map(n => (
                  <button key={n} onClick={()=>setViewDays(n as 3|5|7)} className={`px-3 py-1.5 text-sm ${viewDays===n? 'bg-slate-100 dark:bg-slate-800' : ''}`}>{n} days</button>
                ))}
              </div>
              <div className="inline-flex items-center gap-2">
                <button className="px-2 py-1 rounded border" onClick={()=>setCalendarDate(new Date(calendarDate.getTime()-24*60*60*1000*viewDays))}>{'<'}</button>
                <button className="px-2 py-1 rounded border" onClick={()=>setCalendarDate(new Date())}>Today</button>
                <button className="px-2 py-1 rounded border" onClick={()=>setCalendarDate(new Date(calendarDate.getTime()+24*60*60*1000*viewDays))}>{'>'}</button>
              </div>
            </div>
          </div>
          <div className="mt-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <Calendar
              localizer={localizer}
              date={calendarDate}
              onNavigate={d=>setCalendarDate(d)}
              view="day"
              length={viewDays}
              events={slots}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 620 }}
              eventPropGetter={(event)=>{
                const bg = (event as ScheduleSlot).status === 'scheduled' ? '#22c55e' : '#f59e0b'
                return { style: { backgroundColor: bg, borderColor: bg } }
              }}
              toolbar={false as any}
            />
          </div>
        </section>
      </DashboardShell>
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
