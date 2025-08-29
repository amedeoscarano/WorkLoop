'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function PresenceBar({ roomId }: { roomId: string }) {
  const [users, setUsers] = useState<{id:string;name:string}[]>([])
  useEffect(() => {
    const ch = supabase.channel(`presence:room_${roomId}`, { config: { presence: { key: 'user_demo' }}})
    ch.on('presence', { event: 'sync' }, () => {
      const state = ch.presenceState()
      const list = Object.values(state).flat() as any[]
      setUsers(list as any)
    })
    ch.subscribe((status) => { if (status === 'SUBSCRIBED') ch.track({ id:'user_demo', name:'Demo' }) })
    return () => { ch.untrack(); ch.unsubscribe() }
  }, [roomId])
  return (
    <div className="flex -space-x-2" role="list" aria-label="Utenti presenti">
      {users.map(u => (
        <div key={u.id} role="listitem" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-xs">
          {u.name?.[0]?.toUpperCase()}
        </div>
      ))}
      {users.length === 0 && <span className="text-xs text-slate-500">Nessuno online</span>}
    </div>
  )}
