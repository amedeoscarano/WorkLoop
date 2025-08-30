// Server-only LiveKit token utilities
import { AccessToken } from 'livekit-server-sdk'

export function createLiveKitToken({ roomId, identity, name }: { roomId: string; identity: string; name?: string }) {
  const apiKey = process.env.LIVEKIT_API_KEY || ''
  const apiSecret = process.env.LIVEKIT_API_SECRET || ''
  if (!apiKey || !apiSecret) throw new Error('LIVEKIT_API_KEY/SECRET missing')
  const at = new AccessToken(apiKey, apiSecret, {
    identity,
    name,
    ttl: 60 * 10 // 10 minutes
  })
  at.addGrant({
    room: `room_${roomId}`,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true
  } as any)
  return at.toJwt()
}

export function getLiveKitUrl() {
  return process.env.LIVEKIT_URL || ''
}

