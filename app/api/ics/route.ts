import { NextResponse } from 'next/server'

export async function GET() {
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT',
    'UID:workloop-demo-1','DTSTART:20250101T090000Z','DTEND:20250101T093000Z',
    'SUMMARY:Deep Work 25','END:VEVENT','END:VCALENDAR'
  ].join('\r\n')
  return new NextResponse(ics, { headers: { 'Content-Type': 'text/calendar' } })
}

