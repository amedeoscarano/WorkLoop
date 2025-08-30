export type SlotStatus = 'scheduled' | 'requested'
export type ScheduleSlot = {
  id: string
  title: string
  start: Date
  end: Date
  status: SlotStatus
}

export async function listScheduleSlots(): Promise<ScheduleSlot[]> {
  await new Promise((r) => setTimeout(r, 100))
  const now = new Date()
  const day = 24 * 60 * 60 * 1000
  function slot(
    offsetMinutes: number,
    lengthMin: number,
    title: string,
    status: SlotStatus
  ): ScheduleSlot {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0)
    const s = new Date(start.getTime() + offsetMinutes * 60000)
    const e = new Date(s.getTime() + lengthMin * 60000)
    return { id: Math.random().toString(36).slice(2, 9), title, start: s, end: e, status }
  }
  return [
    slot(0, 25, 'Deep Work 25 (Anna + Luca)', 'scheduled'),
    slot(60, 50, 'Strategia 50 (Team)', 'requested'),
    {
      id: 'tom_1',
      title: 'Co-focus 25 (Bianca)',
      start: new Date(now.getTime() + day + 2 * 60 * 60000),
      end: new Date(now.getTime() + day + 3 * 60 * 60000),
      status: 'scheduled',
    },
    {
      id: 'tom_2',
      title: 'Pausa 15',
      start: new Date(now.getTime() + 2 * day + 4 * 60 * 60000),
      end: new Date(now.getTime() + 2 * day + 4 * 60 * 60000 + 15 * 60000),
      status: 'requested',
    },
  ]
}
