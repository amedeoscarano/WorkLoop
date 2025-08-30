'use client'
import { DashboardShell } from '../../../ui/DashboardShell'

export default function HelpDemo(){
  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <h2 className="text-lg font-semibold">Workloop Demo</h2>
        <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ysz5S6PUM-U"
            title="Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </DashboardShell>
  )
}

