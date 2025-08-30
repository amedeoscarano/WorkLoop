export type Person = { id: string; name: string; status: 'online' | 'available' | 'break' }

export async function listOnlinePeople(): Promise<Person[]> {
  await new Promise((r) => setTimeout(r, 150))
  return [
    { id: 'u1', name: 'Alex', status: 'online' },
    { id: 'u2', name: 'Bianca', status: 'available' },
    { id: 'u3', name: 'Carlo', status: 'break' },
    { id: 'u4', name: 'Daria', status: 'available' },
  ]
}
