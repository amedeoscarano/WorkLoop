'use client'
import { DashboardShell } from '../../ui/DashboardShell'

export default function PeoplePage() {
  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">People</div>
          <div className="flex items-center gap-2 text-sm">
            <select className="rounded-lg border px-2 py-1">
              <option>Favorites</option>
              <option>All</option>
            </select>
            <select className="rounded-lg border px-2 py-1">
              <option>Recently met</option>
              <option>By name</option>
            </select>
          </div>
        </div>
        <div className="h-[560px] flex items-center justify-center text-slate-500 text-sm">
          <span>Nothing to show here…</span>
        </div>
      </div>
    </DashboardShell>
  )
}
