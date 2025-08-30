'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { getPresenceState, onPresenceChange } from '../../lib/presence'

export function PeopleList() {
  const [tick, setTick] = React.useState(0)
  const router = useRouter()
  React.useEffect(() => {
    const off = onPresenceChange(() => setTick((t) => t + 1))
    return off
  }, [])
  const items = React.useMemo(
    () =>
      getPresenceState().map((p: any) => ({
        id: p.userId,
        name: p.name,
        status: p.status,
        context: p.context,
      })),
    [tick]
  )
  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
      {items.map((p: any) => (
        <li key={p.id} className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-slate-700">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-1 ${p.status === 'available' ? 'bg-green-500' : p.status === 'online' ? 'bg-sky-500' : 'bg-amber-500'}`}
                />
                {p.status === 'busy' && p.context
                  ? `Busy (in ${p.context.label})`
                  : p.status === 'available'
                    ? 'Available'
                    : p.status === 'online'
                      ? 'Online'
                      : 'On break'}
              </p>
            </div>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-base font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={() => router.push(`/dm/dm_${p.id}`)}
          >
            Message
          </button>
        </li>
      ))}
      {items.length === 0 && (
        <li className="p-8">
          <div className="flex flex-col items-center justify-center text-slate-500">
            <div className="text-3xl mb-2">🗣️</div>
            <p>Nothing here yet. Start a session to meet new people!</p>
          </div>
        </li>
      )}
    </ul>
  )
}
