export type Visibility = 'public' | 'private'
export type SessionStatus = 'idle' | 'scheduled' | 'running' | 'break' | 'completed' | 'aborted'

export type Room = {
  id: string
  name: string
  topic?: string
  visibility: Visibility
  createdAt: string
  membersOnline: number
  hasVideo?: boolean
}

export type Session = {
  id: string
  roomId: string
  goal: string
  durationMinutes: 25 | 50
  status: SessionStatus
  startedAt?: string
  endsAt?: string
  endedAt?: string
  ownerId: string
}

export type ChatMessage = {
  id: string
  roomId: string
  user: { id: string; name: string }
  text: string
  ts: string
}
