'use client'
import * as React from 'react'
import { DashboardShell } from '../../ui/DashboardShell'
import { openOAuthPopup } from '../../lib/ui'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function SettingsPage() {
  const { data: session } = useSession()
  const [gc, setGc] = React.useState(false)
  const [invites, setInvites] = React.useState(true)
  const [reports, setReports] = React.useState(true)
  const [desktop, setDesktop] = React.useState(true)

  React.useEffect(() => {
    const s: any = session as any
    if (s?.provider === 'google' || s?.access_token) setGc(true)
  }, [session])

  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <h2 className="text-lg font-semibold">Settings</h2>
        <div className="mt-3 border-b border-slate-200 dark:border-slate-800 text-sm">
          <div className="inline-flex gap-4">
            <button className="border-b-2 border-indigo-600 pb-2">Notifications</button>
            <button className="text-slate-500">Preferences</button>
            <button className="text-slate-500">Account</button>
          </div>
        </div>
        <div className="mt-4 space-y-4 text-sm">
          <Row
            label={`Google Calendar Integration ${gc && session?.user?.email ? `(as ${session.user.email})` : ''}`}
            desc="Get sessions added to your calendar."
            checked={gc}
            onChange={async (v) => {
              if (v) {
                await signIn('google', { callbackUrl: '/settings?google=connected' })
              } else {
                await signOut({ redirect: false })
                setGc(false)
              }
            }}
          />
          {gc && (
            <div>
              <button
                className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm"
                onClick={async () => {
                  const now = Date.now()
                  const res = await fetch('/api/google/calendar/create', {
                    method: 'POST',
                    body: JSON.stringify({
                      summary: 'Workloop Test',
                      start: new Date(now + 5 * 60000).toISOString(),
                      end: new Date(now + 35 * 60000).toISOString(),
                    }),
                  })
                  const data = await res.json()
                  alert(data.htmlLink ? `Creato: ${data.htmlLink}` : JSON.stringify(data))
                }}
              >
                Create test event
              </button>
            </div>
          )}
          <Row
            label="Email Calendar Invites"
            desc="Get calendar events for sessions via email."
            checked={invites}
            onChange={(v) => {
              setInvites(v)
              try {
                localStorage.setItem('set_invites', String(v))
              } catch {}
            }}
          />
          <Row
            label="Performance Reports"
            desc="Get weekly and monthly reports of your accomplishments."
            checked={reports}
            onChange={(v) => {
              setReports(v)
              try {
                localStorage.setItem('set_reports', String(v))
              } catch {}
            }}
          />
          <Row
            label="Desktop Notifications"
            desc="Get notified when a session is about to start."
            checked={desktop}
            onChange={(v) => {
              setDesktop(v)
              try {
                localStorage.setItem('set_desktop', String(v))
              } catch {}
            }}
          />
          <p className="text-xs text-red-600">
            Please grant permissions in your browser settings to enable notifications.
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <h3 className="text-md font-semibold">Audio & Video</h3>
        <div className="mt-3 grid md:grid-cols-3 gap-3 text-sm">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => {
                try {
                  localStorage.setItem(
                    'wl_join_muted',
                    String((e.target as HTMLInputElement).checked)
                  )
                } catch {}
              }}
            />
            Join silenziato di default
          </label>
          <button
            className="px-3 py-1.5 rounded border"
            onClick={() => {
              const ev = new CustomEvent('wl_open_device_preview')
              window.dispatchEvent(ev)
            }}
          >
            Test dispositivi
          </button>
        </div>
      </div>
    </DashboardShell>
  )
}

function Row({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string
  desc: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between rounded-xl border border-slate-200 dark:border-slate-800 p-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-slate-500">{desc}</p>
      </div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          className={`w-11 h-6 inline-flex items-center rounded-full p-1 transition ${checked ? 'bg-indigo-600' : 'bg-slate-300'}`}
        >
          <span
            className={`w-4 h-4 bg-white rounded-full transition ${checked ? 'translate-x-5' : ''}`}
          />
        </span>
      </label>
    </div>
  )
}
