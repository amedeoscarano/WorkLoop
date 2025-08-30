import { googleFetch } from '../../../../../lib/google'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await googleFetch('/calendar/v3/users/me/calendarList')
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'ERR' }, { status: 401 })
  }
}

