'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'

export function TodayPanel(){
  const router = useRouter()
  return (
    <aside className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 w-full max-w-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl">🙂</div>
        <div>
          <p className="text-sm font-semibold">Good Morning,</p>
          <p className="text-sm">Amedeo!</p>
          <p className="text-xs text-slate-500">Free Plan · 3 sessions per week</p>
        </div>
        <button className="ml-auto w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700">⋯</button>
      </div>

      <button className="mt-3 w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 text-sm font-medium">Upgrade to Plus</button>

      <div className="mt-4 space-y-2">
        <PanelButton icon="📅" label="My Schedule" onClick={()=>router.push('/schedule')} />
        <PanelButton icon="⭐" label="Favorites Schedule" onClick={()=>router.push('/favorites')} />
      </div>

      <div className="mt-6 space-y-2">
        <PanelButton icon="🎧" label="Test audio and video" variant="ghost" onClick={()=>router.push('/test')} />
        <PanelButton icon="✉️" label="Share feedback" variant="ghost" onClick={()=>router.push('/feedback')} />
        <PanelButton icon="🆘" label="Contact support" variant="ghost" onClick={()=>router.push('/support')} />
      </div>
    </aside>
  )
}

function PanelButton({ icon, label, variant='solid', onClick }: { icon: string; label: string; variant?: 'solid'|'ghost'; onClick?: ()=>void }){
  const base = 'w-full flex items-center justify-between rounded-xl border text-sm px-3 py-2'
  const style = variant==='solid'
    ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
  return (
    <button className={`${base} ${style}`} onClick={onClick}>
      <span className="inline-flex items-center gap-2"><span aria-hidden>{icon}</span> {label}</span>
      <span aria-hidden>›</span>
    </button>
  )
}
