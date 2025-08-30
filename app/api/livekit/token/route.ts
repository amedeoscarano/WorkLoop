import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import { createLiveKitToken, getLiveKitUrl } from '../../../../lib/livekit.server'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }
  try {
    const { roomId, identity } = await req.json()
    if (!roomId) return NextResponse.json({ error: 'ROOM_ID_REQUIRED' }, { status: 400 })
    const token = createLiveKitToken({
      roomId,
      identity: identity || session.user.email,
      name: session.user.name || undefined,
    })
    const url = getLiveKitUrl()
    return NextResponse.json({ token, serverUrl: url })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'ERR' }, { status: 500 })
  }
}
