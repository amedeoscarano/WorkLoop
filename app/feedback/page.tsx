'use client'
import * as React from 'react'
import { DashboardShell } from '../../ui/DashboardShell'

export default function FeedbackPage() {
  const [text, setText] = React.useState('')
  function send() {
    const body = encodeURIComponent(text || '')
    window.location.href = `mailto:support@workloop.local?subject=Feedback&body=${body}`
  }
  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 max-w-2xl">
        <h2 className="text-lg font-semibold">Share feedback</h2>
        <textarea
          className="mt-3 w-full rounded-lg border px-3 py-2 min-h-[160px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Scrivi qui il tuo feedback…"
        />
        <button
          className="mt-2 px-3 py-1.5 rounded bg-indigo-600 text-white text-sm"
          onClick={send}
        >
          Invia via email
        </button>
      </div>
    </DashboardShell>
  )
}
