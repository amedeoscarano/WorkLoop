'use client'
import { DashboardShell } from '../../ui/DashboardShell'

export default function FavoritesSchedulePage(){
  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <h2 className="text-lg font-semibold">Favorites Schedule</h2>
        <div className="h-[560px] flex items-center justify-center text-slate-500 text-sm">
          Nessun preferito ancora.
        </div>
      </div>
    </DashboardShell>
  )
}

