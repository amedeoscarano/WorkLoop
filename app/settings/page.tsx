'use client'
import * as React from 'react'
import { DashboardShell } from '../../ui/DashboardShell'
import { openOAuthPopup } from '../../lib/ui'

export default function SettingsPage(){
  const [gc, setGc] = React.useState(false)
  const [invites, setInvites] = React.useState(true)
  const [reports, setReports] = React.useState(true)
  const [desktop, setDesktop] = React.useState(true)

  React.useEffect(()=>{
    if (typeof document !== 'undefined') {
      setGc(document.cookie.includes('google_connected=1'))
    }
  }, [])

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
          <Row label="Google Calendar Integration" desc="Get sessions added to your calendar." checked={gc} onChange={async (v)=>{
            if (v) {
              await openOAuthPopup('/api/oauth/google/start?popup=1')
              setGc(true)
            } else {
              document.cookie = 'google_connected=; Max-Age=0; path=/'
              setGc(false)
            }
          }} />
          <Row label="Email Calendar Invites" desc="Get calendar events for sessions via email." checked={invites} onChange={setInvites} />
          <Row label="Performance Reports" desc="Get weekly and monthly reports of your accomplishments." checked={reports} onChange={setReports} />
          <Row label="Desktop Notifications" desc="Get notified when a session is about to start." checked={desktop} onChange={setDesktop} />
          <p className="text-xs text-red-600">Please grant permissions in your browser settings to enable notifications.</p>
        </div>
      </div>
    </DashboardShell>
  )
}

function Row({ label, desc, checked, onChange }: { label:string; desc:string; checked:boolean; onChange:(v:boolean)=>void }){
  return (
    <div className="flex items-start justify-between rounded-xl border border-slate-200 dark:border-slate-800 p-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-slate-500">{desc}</p>
      </div>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only" checked={checked} onChange={e=>onChange(e.target.checked)} />
        <span className={`w-11 h-6 inline-flex items-center rounded-full p-1 transition ${checked? 'bg-indigo-600' : 'bg-slate-300'}`}>
          <span className={`w-4 h-4 bg-white rounded-full transition ${checked? 'translate-x-5' : ''}`} />
        </span>
      </label>
    </div>
  )
}
