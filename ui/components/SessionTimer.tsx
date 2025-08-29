import * as React from 'react'

export type SessionTimerProps = {
  duration: 25 | 50
  status: 'idle'|'scheduled'|'running'|'break'|'completed'|'aborted'
  remainingMs: number
  onStart: ()=>void
  onAbort: ()=>void
  onComplete: ()=>void
  ariaLive?: 'off'|'polite'|'assertive'
}

export function SessionTimer({
  duration, status, remainingMs, onStart, onAbort, onComplete, ariaLive='polite'
}: SessionTimerProps) {

  const mins = Math.floor(remainingMs / 60000)
  const secs = Math.floor((remainingMs % 60000) / 1000)
  const timeStr = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`

  React.useEffect(()=>{
    if (status === 'running' && remainingMs <= 0) {
      onComplete()
    }
  }, [status, remainingMs, onComplete])

  return (
    <section aria-live={ariaLive} className="rounded-xl p-4 border border-slate-200 dark:border-slate-800">
      <h4 className="text-sm text-slate-500">Timer condiviso</h4>
      <p className="mt-2 text-5xl font-bold tabular-nums text-slate-900 dark:text-slate-100" aria-label={`Tempo rimanente ${mins} minuti e ${secs} secondi`}>
        {timeStr}
      </p>
      {status==='running' && remainingMs<=10000 && (
        <span className="sr-only" aria-live="assertive">Mancano {Math.ceil(remainingMs/1000)} secondi</span>
      )}
      <p className="mt-1 text-xs text-slate-500">Durata: {duration} min</p>

      <div className="mt-4 flex gap-2">
        {status === 'idle' || status === 'scheduled' ? (
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            onClick={onStart}
          >
            Avvia
          </button>
        ) : null}

        {status === 'running' ? (
          <button
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700"
            onClick={onAbort}
          >
            Interrompi
          </button>
        ) : null}

        {(status === 'completed' || status === 'aborted' || status === 'break') ? (
          <span className="text-sm text-slate-600 dark:text-slate-300">
            Stato: {status}
          </span>
        ) : null}
      </div>
    </section>
  )
}
