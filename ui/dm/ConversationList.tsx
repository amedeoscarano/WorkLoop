'use client'
import { useRouter } from 'next/navigation'

export type Conversation = { id: string; name: string; last?: string; ts?: string; unread?: number }

export function ConversationList({ items }: { items: Conversation[] }) {
  const router = useRouter()
  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
      {items.map((c) => (
        <li
          key={c.id}
          className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          onClick={() => router.push(`/dm/${c.id}`)}
        >
          <div>
            <p className="font-medium text-sm">{c.name}</p>
            <p className="text-xs text-slate-500">{c.last || '—'}</p>
          </div>
          <div className="text-right">
            {c.unread ? (
              <span className="inline-block px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs">
                {c.unread}
              </span>
            ) : null}
          </div>
        </li>
      ))}
      {items.length === 0 && (
        <li className="p-6 text-sm text-slate-500 text-center">Nessuna conversazione</li>
      )}
    </ul>
  )
}
