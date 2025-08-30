'use client'
import * as React from 'react'

type Duration = 25 | 50 | 75
type Task = 'desk' | 'moving' | 'anything'

export function SessionSetupCard({ onStart }: { onStart: (d: Duration, t: Task) => void }) {
  const [open, setOpen] = React.useState(true)
  const [duration, setDuration] = React.useState<Duration>(25)
  const [task, setTask] = React.useState<Task>('desk')
  const [quiet, setQuiet] = React.useState(false)

  return (
    <aside className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 w-full max-w-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide">WELCOME CHECKLIST</h3>
        <div className="flex items-center gap-2">
          <span className="inline-flex gap-1" aria-hidden>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" />
          </span>
        </div>
      </div>

      <button
        onClick={() => onStart(duration, task)}
        className="mt-3 w-full rounded-lg px-4 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        New session
      </button>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Session Settings</p>
          <button
            aria-label={open ? 'Chiudi impostazioni' : 'Apri impostazioni'}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden>{open ? '▾' : '▸'}</span>
          </button>
        </div>

        {open && (
          <div className="mt-3 space-y-3">
            <div>
              <p className="text-xs text-slate-500">Duration</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[25, 50, 75].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d as Duration)}
                    className={`rounded-lg border px-3 py-2 text-center ${duration === d ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    <div className="text-sm font-semibold">{d}</div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-500">min</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500">My Task</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(
                  [
                    { k: 'desk', label: 'Desk' },
                    { k: 'moving', label: 'Moving' },
                    { k: 'anything', label: 'Anything' },
                  ] as { k: Task; label: string }[]
                ).map((opt) => (
                  <button
                    key={opt.k}
                    onClick={() => setTask(opt.k)}
                    className={`rounded-lg border px-3 py-2 text-center text-sm ${task === opt.k ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm">Focus Mode</p>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={quiet}
                  onChange={(e) => setQuiet(e.target.checked)}
                />
                <span
                  className={`w-10 h-6 inline-flex items-center rounded-full p-1 transition ${quiet ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full transition ${quiet ? 'translate-x-4' : ''}`}
                  />
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
