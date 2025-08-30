'use client'
import * as React from 'react'
import { buildIcsEvent } from '../../lib/ics'
import { capture } from '../../spec/posthog'
import { useSession, signIn } from 'next-auth/react'

export function ScheduleModal({ open, onClose, defaults }: { open: boolean; onClose: ()=>void; defaults?: { title?: string; duration?: number } }){
  const { data: session } = useSession()
  const [title, setTitle] = React.useState(defaults?.title || 'Workloop Session')
  const [date, setDate] = React.useState(()=> new Date().toISOString().slice(0,10))
  const [time, setTime] = React.useState('09:00')
  const [duration, setDuration] = React.useState(defaults?.duration || 25)

  if (!open) return null

  async function create(){
    const start = new Date(`${date}T${time}:00`)
    const end = new Date(start.getTime() + duration*60000)
    if ((session as any)?.access_token) {
      // Create in Google Calendar
      const res = await fetch('/api/google/calendar/create', {
        method: 'POST',
        body: JSON.stringify({ summary: title, start: start.toISOString(), end: end.toISOString() })
      })
      const data = await res.json()
      if (data.htmlLink) {
        capture('calendar_event_created', { provider: 'google', duration })
        window.open(data.htmlLink, '_blank')
        onClose()
        return
      }
      alert('Errore creazione evento: '+JSON.stringify(data))
    } else {
      // ICS fallback
      const ics = buildIcsEvent({ summary: title, start, end })
      const blob = new Blob([ics], { type: 'text/calendar' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'workloop.ics'
      a.click()
      capture('calendar_event_created', { provider: 'ics', duration })
      onClose()
    }
  }

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="rounded-xl bg-white dark:bg-slate-900 p-4 w-[90%] max-w-md" onClick={e=>e.stopPropagation()}>
        <h3 className="text-lg font-semibold">Programma una sessione</h3>
        <div className="mt-3 space-y-3 text-sm">
          <div>
            <label className="block">Titolo</label>
            <input className="mt-1 w-full rounded-lg border px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block">Data</label>
              <input type="date" className="mt-1 w-full rounded-lg border px-3 py-2" value={date} onChange={e=>setDate(e.target.value)} />
            </div>
            <div>
              <label className="block">Ora</label>
              <input type="time" className="mt-1 w-full rounded-lg border px-3 py-2" value={time} onChange={e=>setTime(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block">Durata</label>
            <select className="mt-1 w-full rounded-lg border px-3 py-2" value={duration} onChange={e=>setDuration(Number(e.target.value))}>
              {[15,25,50,75].map(d=> <option key={d} value={d}>{d} minuti</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          {(session as any)?.access_token ? (
            <span className="text-xs text-green-600">Google Calendar connesso</span>
          ) : (
            <button className="text-xs underline" onClick={()=>signIn('google', { callbackUrl: '/rooms' })}>Connetti Google Calendar</button>
          )}
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded border" onClick={onClose}>Annulla</button>
            <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={create}>Crea evento</button>
          </div>
        </div>
      </div>
    </div>
  )
}

