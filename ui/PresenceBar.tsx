'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useSession } from 'next-auth/react'

export function PresenceBar({ roomId }: { roomId: string }) {
  const { data } = useSession()
  const me = { id: data?.user?.email || 'me', name: data?.user?.name || 'Me' }
  const [users, setUsers] = useState<{ id: string; name: string }[]>([])
  useEffect(() => {
    const ch = supabase.channel(`presence:room_${roomId}`, { config: { presence: { key: me.id } } })
    ch.on('presence', { event: 'sync' }, () => {
      const state = ch.presenceState()
      const list = Object.values(state).flat() as any[]
      setUsers(list as any)
    })
    ch.subscribe((status: any) => {
      if (status === 'SUBSCRIBED') ch.track({ id: me.id, name: me.name })
    })
    return () => {
      ch.untrack()
      ch.unsubscribe()
    }
  }, [roomId, me.id, me.name])
  return (
    <div className="flex -space-x-2" role="list" aria-label="Utenti presenti">
      {users.map((u) => (
        <a
          key={u.id}
          role="listitem"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-xs hover:ring-2 ring-blue-500"
          href={u.id !== me.id ? `/dm/dm_${u.id}` : undefined}
          title={u.name}
          aria-label={`Utente ${u.name}${u.id !== me.id ? ', apri DM' : ''}`}
        >
          {u.name?.[0]?.toUpperCase()}
        </a>
      ))}
      {users.length === 0 && <span className="text-xs text-slate-500">Nessuno online</span>}
    </div>
  )
}
