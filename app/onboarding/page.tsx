'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage(){
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const [nickname, setNickname] = React.useState('')
  const [tz, setTz] = React.useState(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC')
  const [preset, setPreset] = React.useState('Deep work 25m')

  function next(){ setStep(s=>Math.min(3, s+1)) }
  function prev(){ setStep(s=>Math.max(1, s-1)) }
  function finish(){ router.push('/rooms') }

  return (
    <section className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold">Onboarding</h2>
      {/* Account connections */}
      <div className="mt-3 rounded-xl border border-slate-200 dark:border-slate-800 p-3">
        <p className="text-sm font-medium">Account</p>
        <div className="mt-2 space-y-2">
          <button className="w-full px-3 py-2 rounded bg-indigo-600 text-white" onClick={()=>{ window.open('/api/oauth/linkedin/start?popup=1', 'oauth_popup', 'width=600,height=700') }}>Continua con LinkedIn</button>
          <label className="flex items-center justify-between w-full px-3 py-2 rounded border">
            <span className="text-sm">Connetti Google Calendar</span>
            <input type="checkbox" onChange={e=>{ if((e.target as HTMLInputElement).checked) window.open('/api/oauth/google/start?popup=1', 'oauth_popup', 'width=600,height=700') }} />
          </label>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        {step===1 && (
          <div>
            <label className="text-sm text-slate-600">Nickname</label>
            <input value={nickname} onChange={e=>setNickname(e.target.value)} className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Es. Ale" />
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-3 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50" disabled={!nickname.trim()} onClick={next}>Continua</button>
            </div>
          </div>
        )}
        {step===2 && (
          <div>
            <label className="text-sm text-slate-600">Fuso orario</label>
            <select value={tz} onChange={e=>setTz(e.target.value)} className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
              <option value={tz}>{tz}</option>
              <option value="UTC">UTC</option>
            </select>
            <div className="mt-4 flex justify-between gap-2">
              <button className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800" onClick={prev}>Indietro</button>
              <button className="px-3 py-2 rounded-lg bg-blue-600 text-white" onClick={next}>Continua</button>
            </div>
          </div>
        )}
        {step===3 && (
          <div>
            <label className="text-sm text-slate-600">Obiettivo tipico</label>
            <input value={preset} onChange={e=>setPreset(e.target.value)} className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            <div className="mt-4 flex justify-between gap-2">
              <button className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800" onClick={prev}>Indietro</button>
              <button className="px-3 py-2 rounded-lg bg-blue-600 text-white" onClick={finish}>Finisci e vai alle stanze</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
