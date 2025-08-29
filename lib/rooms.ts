import { listRooms } from '../spec/mockApi'

export async function findNextActiveRoom() {
  const rooms = await listRooms()
  // naive placeholder: first public room with membersOnline < 10
  const r = rooms.find(r => r.visibility === 'public' && r.membersOnline < 10)
  return r?.id ?? null
}
