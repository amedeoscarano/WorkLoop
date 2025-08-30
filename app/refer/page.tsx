'use client'
import { DashboardShell } from '../../ui/DashboardShell'
import * as React from 'react'

export default function ReferPage() {
  const [link] = React.useState('workloop.com/r/friend/abc123')
  function copy() {
    navigator.clipboard?.writeText(link)
  }
  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <h2 className="text-lg font-semibold">Refer a friend</h2>
        <p className="mt-1 text-sm text-slate-600">
          Share your referral link to give a free month and earn a free month when they upgrade.
        </p>
        <div className="mt-3 flex gap-2 max-w-xl">
          <input value={link} readOnly className="flex-1 rounded-lg border px-3 py-2" />
          <button onClick={copy} className="rounded-lg px-3 py-2 bg-indigo-600 text-white">
            Copy link
          </button>
        </div>
        <div className="mt-4">
          <button className="px-3 py-1.5 rounded-lg border text-sm">
            Learn about our referral program
          </button>
        </div>
      </div>
    </DashboardShell>
  )
}
