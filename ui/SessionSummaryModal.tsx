'use client'

export function SessionSummaryModal({
  open,
  onClose,
  goal,
  duration,
}: {
  open: boolean
  onClose: () => void
  goal: string
  duration: number
}) {
  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div className="rounded-xl bg-white dark:bg-slate-900 p-4 w-[90%] max-w-md">
        <h3 className="text-lg font-semibold">Sessione completata</h3>
        <p className="mt-2 text-sm">Goal: {goal}</p>
        <p className="mt-1 text-sm">Durata: {duration} min</p>
        <p className="mt-2 text-sm">🎉 +1 alla tua streak!</p>
        <button className="mt-3 px-4 py-2 rounded-lg bg-blue-600 text-white" onClick={onClose}>
          Chiudi
        </button>
      </div>
    </div>
  )
}
