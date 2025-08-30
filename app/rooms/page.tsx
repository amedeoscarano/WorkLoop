'use client'

import * as React from 'react'
import { listRooms } from '../../spec/mockApi'
import { Room } from '../../spec/types'
import { getFlag } from '../../spec/featureFlags'
import { useRouter } from 'next/navigation'
import { findNextActiveRoom } from '../../lib/rooms'
import { capture } from '../../spec/posthog'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { listScheduleSlots, type ScheduleSlot } from '../../spec/schedule'
import { DashboardShell } from '../../ui/DashboardShell'
import { AuthGuard } from '../../ui/AuthGuard'

type Filter = 'all' | 'public' | 'private'

export default function RoomsPage() {
  const router = useRouter()
  const [rooms, setRooms] = React.useState<Room[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [filter, setFilter] = React.useState<Filter>('all')
  const [viewDays, setViewDays] = React.useState<1 | 5 | 7>(7)
  const [calendarDate, setCalendarDate] = React.useState<Date>(new Date())
  const [slots, setSlots] = React.useState<ScheduleSlot[]>([])
  // People list non usata qui; inbox/DM gestiscono la presenza
  // UI now mirrors calendar-centric layout; chat moved out for parity

  React.useEffect(() => {
    let on = true
    setLoading(true)
    listRooms()
      .then((r) => {
        if (on) {
          setRooms(r)
          setError(null)
        }
      })
      .catch((_e) => {
        if (on) setError('Impossibile caricare le stanze.')
      })
      .finally(() => {
        if (on) setLoading(false)
      })
    return () => {
      on = false
    }
  }, [])

  React.useEffect(() => {
    if (!loading && !error) {
      capture('room_list_viewed', { count: rooms.length })
    }
  }, [loading, error, rooms.length])

  React.useEffect(() => {
    let on = true
    listScheduleSlots().then((s) => {
      if (on) setSlots(s)
    })
    return () => {
      on = false
    }
  }, [])

  // Filtri pronti per uso futuro con lista stanze
  const _showPrivate = getFlag('privateRooms')

  const [unread, setUnread] = React.useState(0)
  React.useEffect(() => {
    function update() {
      try {
        setUnread(Number(localStorage.getItem('wl_unread') || '0'))
      } catch {}
    }
    update()
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'wl_unread') update()
    }
    window.addEventListener('storage', onStorage)
    const id = setInterval(update, 2000)
    return () => {
      window.removeEventListener('storage', onStorage)
      clearInterval(id)
    }
  }, [])

  return (
    <AuthGuard>
      <section>
        <div className="mb-4 flex items-center gap-3">
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
            {(['all', 'public', 'private'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-sm ${filter === f ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
            onClick={async () => {
              const id = await findNextActiveRoom()
              if (!id) return alert('Nessuna stanza attiva ora')
              router.push(`/room/${id}`)
            }}
          >
            Entra nella prossima stanza attiva
          </button>
          <a
            className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg border"
            href="/inbox"
          >
            Inbox
            {unread > 0 && (
              <span className="ml-1 inline-block px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs">
                {unread}
              </span>
            )}
          </a>
        </div>

        <DashboardShell>
          {/* Center calendar with custom header */}
          <section>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 shadow-md">
              <div className="text-sm font-medium">
                {format(calendarDate, 'MMM')} -{' '}
                {format(
                  new Date(
                    calendarDate.getFullYear(),
                    calendarDate.getMonth() + Math.ceil(viewDays / 30)
                  ),
                  'MMM yyyy'
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                  {[1, 5, 7].map((n) => (
                    <button
                      key={n}
                      onClick={() => setViewDays(n as 1 | 5 | 7)}
                      className={`px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${viewDays === n ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
                    >
                      {n === 1 ? 'Giorno' : `${n} giorni`}
                    </button>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2">
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() =>
                      setCalendarDate(
                        new Date(calendarDate.getTime() - 24 * 60 * 60 * 1000 * viewDays)
                      )
                    }
                  >
                    {'<'}
                  </button>
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() => setCalendarDate(new Date())}
                  >
                    Today
                  </button>
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() =>
                      setCalendarDate(
                        new Date(calendarDate.getTime() + 24 * 60 * 60 * 1000 * viewDays)
                      )
                    }
                  >
                    {'>'}
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <Calendar
                localizer={localizer}
                date={calendarDate}
                onNavigate={(d) => setCalendarDate(d)}
                view="day"
                length={viewDays}
                events={slots}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 620 }}
                eventPropGetter={(event) => {
                  const bg = (event as ScheduleSlot).status === 'scheduled' ? '#22c55e' : '#f59e0b'
                  return { style: { backgroundColor: bg, borderColor: bg } }
                }}
                toolbar={false as any}
              />
            </div>
          </section>
        </DashboardShell>
      </section>
    </AuthGuard>
  )
}

// Date-fns localizer for react-big-calendar
const locales = {}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
})

// (Form creazione stanza rimosso: non usato nella nuova UI)
