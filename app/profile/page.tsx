'use client'
import { DashboardShell } from '../../ui/DashboardShell'

export default function ProfilePage() {
  function signOut() {
    try {
      localStorage.removeItem('user')
    } catch {}
    document.cookie = 'linkedin_connected=; Max-Age=0; path=/'
    document.cookie = 'google_connected=; Max-Age=0; path=/'
    window.location.href = '/login'
  }
  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-slate-200" />
            <div>
              <h2 className="text-lg font-semibold">Amedeo S.</h2>
              <p className="text-xs text-slate-500">Member since: Aug 29th, 2025</p>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded border" onClick={signOut}>
            Sign out
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-sm font-medium">My Stats</p>
            <div className="mt-2 grid grid-cols-3 gap-3 text-center">
              <Stat label="timeliness score" value="0%" />
              <Stat label="weekly streak" value="0" />
              <Stat label="monthly streak" value="0" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-sm font-medium">My Tags</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Startup', 'Small Business', 'Neurodivergent', 'Technology', 'Design'].map((t) => (
                <span key={t} className="px-2 py-1 rounded-lg bg-slate-100 text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-sm font-medium">I focus on</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-lg bg-slate-100 text-xs">Business Projects</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-sm font-medium">About me</p>
            <div className="mt-2 text-sm text-slate-500">—</div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-3">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  )
}
