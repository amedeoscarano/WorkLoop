'use client'
import { DashboardShell } from '../../ui/DashboardShell'

export default function SupportPage() {
  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 max-w-xl">
        <h2 className="text-lg font-semibold">Contact support</h2>
        <p className="mt-2 text-sm text-slate-600">Hai bisogno di aiuto? Contattaci.</p>
        <div className="mt-3 space-y-2">
          <a
            className="inline-block px-3 py-1.5 rounded bg-indigo-600 text-white text-sm"
            href="mailto:support@workloop.local"
          >
            Email supporto
          </a>
          <a className="block text-sm underline" href="https://calendly.com/" target="_blank">
            Prenota una call
          </a>
        </div>
      </div>
    </DashboardShell>
  )
}
