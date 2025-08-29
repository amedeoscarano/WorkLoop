import * as React from 'react'

export type RoomCardProps = {
  id: string
  name: string
  topic?: string
  membersOnline: number
  visibility: 'public' | 'private'
  onJoin: (id: string) => void
  disabled?: boolean
}

export function RoomCard({
  id, name, topic, membersOnline, visibility, onJoin, disabled
}: RoomCardProps) {
  return (
    <article
      className={
        `rounded-xl border border-slate-200 dark:border-slate-800 shadow p-4
         bg-white dark:bg-slate-900 hover:shadow-md transition
         ${disabled ? 'opacity-60 pointer-events-none' : ''}`
      }
      aria-disabled={disabled || undefined}
    >
      <header className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {name}
        </h3>
        <span
          className={
            `text-xs px-2 py-1 rounded-full
             ${visibility === 'private'
               ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
               : 'bg-green-100 text-green-700'}`
          }
          aria-label={visibility === 'private' ? 'Stanza privata' : 'Stanza pubblica'}
        >
          {visibility === 'private' ? 'Privata' : 'Pubblica'}
        </span>
      </header>

      {topic && (
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{topic}</p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Utenti online: <strong className="text-slate-700 dark:text-slate-200">{membersOnline}</strong>
        </p>
        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
          onClick={() => onJoin(id)}
        >
          Entra
        </button>
      </div>
    </article>
  )
}

