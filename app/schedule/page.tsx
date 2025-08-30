'use client'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { AuthGuard } from '../../ui/AuthGuard'

const locales = {}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
})

export default function SchedulePage() {
  const events = [
    { title: 'Deep Work 25', start: new Date(), end: new Date(Date.now() + 25 * 60000) },
  ]
  return (
    <AuthGuard>
      <main className="p-4">
        <h1 className="text-xl font-semibold mb-4">Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
      </main>
    </AuthGuard>
  )
}
