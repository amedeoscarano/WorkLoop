import { Room, Session, ChatMessage } from './types'

export async function listRooms(): Promise<Room[]> {
  await lag()
  return MOCK_ROOMS
}

export async function getRoom(id:string): Promise<Room> {
  await lag()
  const r = MOCK_ROOMS.find(r=>r.id===id)
  if(!r) throw new Error('ROOM_NOT_FOUND')
  return r
}

export async function startSession(input:{roomId:string; goal:string; duration:25|50}): Promise<Session> {
  await lag()
  if(!input.goal.trim()) throw new Error('GOAL_REQUIRED')
  return {
    id: 'sess_'+rand(),
    roomId: input.roomId,
    goal: input.goal,
    durationMinutes: input.duration,
    status: 'running',
    startedAt: new Date().toISOString(),
    endsAt: new Date(Date.now()+input.duration*60_000).toISOString(),
    ownerId: 'user_demo'
  }
}

export async function endSession(sessionId:string, completed:boolean): Promise<{ok:true}> {
  await lag()
  return { ok: true }
}

export async function sendMessage(roomId:string, text:string): Promise<ChatMessage> {
  await lag()
  if(!text.trim()) throw new Error('EMPTY_MESSAGE')
  return {
    id: 'msg_'+rand(),
    roomId,
    user: { id:'user_demo', name: 'Demo' },
    text,
    ts: new Date().toISOString()
  }
}

function lag(){ return new Promise(r=>setTimeout(r, 200)) }
function rand(){ return Math.random().toString(36).slice(2,8) }

const MOCK_ROOMS: Room[] = [
  { id:'room_a', name:'Deep Work 25', topic:'Pomodoro 25', visibility:'public', createdAt:new Date().toISOString(), membersOnline:3, hasVideo:false },
  { id:'room_b', name:'Strategia 🧠', topic:'50 min', visibility:'private', createdAt:new Date().toISOString(), membersOnline:8, hasVideo:false }
]

