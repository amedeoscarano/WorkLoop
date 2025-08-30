'use client'
import { supabase } from '../lib/supabaseClient'

export function ReactionBar({ roomId }: { roomId: string }) {
  function send(emoji: string) {
    const ch = supabase.channel(`chat:room_${roomId}`)
    ch.send({ type: 'broadcast', event: 'reaction', payload: { emoji } })
  }
  const emojis = ['👍', '🔥', '🎯', '👏']
  return (
    <div className="mt-3 flex gap-2" aria-label="Reazioni rapide">
      {emojis.map((e) => (
        <button
          key={e}
          className="px-2 py-1 rounded border"
          onClick={() => send(e)}
          aria-label={`Reazione ${e}`}
        >
          {e}
        </button>
      ))}
    </div>
  )
}
