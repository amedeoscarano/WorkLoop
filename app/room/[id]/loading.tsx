'use client'

export default function RoomLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 animate-pulse h-80" />
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 animate-pulse h-80" />
    </div>
  )
}
