import { googleFetch } from '../../../../../lib/google'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const startISO = body.start || new Date().toISOString()
    const endISO = body.end || new Date(Date.now() + 30 * 60000).toISOString()
    const payload = {
      summary: body.summary || 'Workloop Session',
      description: body.description || '',
      location: body.location || '',
      start: { dateTime: startISO },
      end: { dateTime: endISO },
    }
    const data = await googleFetch('/calendar/v3/calendars/primary/events', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return NextResponse.json({ id: data.id, htmlLink: data.htmlLink })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'ERR' }, { status: 401 })
  }
}
