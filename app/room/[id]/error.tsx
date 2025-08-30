'use client'

export default function RoomError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-sm">
      <p className="text-red-600">Errore durante il caricamento della stanza.</p>
      <button
        onClick={reset}
        className="mt-2 px-3 py-1.5 rounded bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Riprova
      </button>
    </div>
  )
}
