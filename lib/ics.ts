export function buildIcsEvent({
  uid = `wl-${Date.now()}`,
  summary,
  start,
  end,
  description = '',
  location = '',
}: {
  uid?: string
  summary: string
  start: Date
  end: Date
  description?: string
  location?: string
}) {
  function fmt(d: Date) {
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  }
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Workloop//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${escape(summary)}`,
    `DESCRIPTION:${escape(description)}`,
    `LOCATION:${escape(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

function escape(s: string) {
  return (s || '').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}
