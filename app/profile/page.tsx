'use client'
import { DashboardShell } from '../../ui/DashboardShell'
import * as React from 'react'

export default function ProfilePage() {
  // In a future iteration, these could come from user profile data
  const name = 'Amedeo S.'
  const photoUrl: string | undefined = undefined
  const focusOn: string[] = ['Business Projects']
  const about = ''

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
            <Avatar name={name} photoUrl={photoUrl} />
            <div>
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-xs text-slate-500">Member since: Aug 29th, 2025</p>
            </div>
          </div>
          <button
            className="border border-slate-300 rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-100"
            onClick={signOut}
          >
            Sign out
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-sm font-medium">My Stats</p>
            <div className="mt-2 grid grid-cols-3 gap-3 text-center">
              <Stat icon="⏰" label="timeliness score" value="0%" />
              <Stat icon="🔥" label="weekly streak" value="0" />
              <Stat icon="📅" label="monthly streak" value="0" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-sm font-medium">My Tags</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Startup', 'Small Business', 'Neurodivergent', 'Technology', 'Design'].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-100 text-slate-700 text-sm px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 p-4">
            <p className="text-sm font-medium">I focus on</p>
            {focusOn.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {focusOn.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-slate-100 text-slate-700 text-sm px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-2 text-sm text-slate-500">Not specified yet</div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 p-4">
            <p className="text-sm font-medium">About me</p>
            {about ? (
              <div className="mt-2 text-sm text-slate-700">{about}</div>
            ) : (
              <div className="mt-2 text-sm text-slate-500">Tell us a bit about yourself…</div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 p-4 flex flex-col items-center">
      <div className="text-2xl mb-1" aria-hidden>
        {icon}
      </div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  )
}

function Avatar({ name, photoUrl }: { name: string; photoUrl?: string }) {
  const initials = React.useMemo(() => getInitials(name), [name])
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
        width={64}
        height={64}
      />
    )
  }
  return (
    <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center">
      <span className="text-slate-700 font-semibold">{initials}</span>
    </div>
  )
}

function getInitials(fullName: string) {
  const parts = fullName
    .split(/\s+/)
    .filter(Boolean)
    .map((s) => s[0]?.toUpperCase() ?? '')
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return `${parts[0]}${parts[parts.length - 1]}`
}
