'use client'

import * as React from 'react'

export default function SettingsPage(){
  const [defaultDuration, setDefaultDuration] = React.useState<'25'|'50'>( (localStorage.getItem('defaultDuration') as any) || '25')
  const [dark, setDark] = React.useState<boolean>(typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false)
  const [sounds, setSounds] = React.useState<boolean>(localStorage.getItem('sounds') === 'true')

  function save(){
    localStorage.setItem('defaultDuration', defaultDuration)
    localStorage.setItem('sounds', String(sounds))
    if (dark) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark')
    alert('Impostazioni salvate')
  }

  return (
    <section className="max-w-xl">
      <h2 className="text-xl font-semibold">Impostazioni</h2>
      <div className="mt-4 space-y-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <label className="text-sm text-slate-600">Durata predefinita</label>
          <div className="mt-2">
            <select value={defaultDuration} onChange={e=>setDefaultDuration(e.target.value as '25'|'50')} className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
              <option value="25">25 minuti</option>
              <option value="50">50 minuti</option>
            </select>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Tema scuro</p>
            <p className="text-xs text-slate-500">Mantiene contrasto AA</p>
          </div>
          <input aria-label="Dark mode" type="checkbox" checked={dark} onChange={e=>setDark(e.target.checked)} />
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Suoni timer</p>
            <p className="text-xs text-slate-500">Avvisi a fine sessione</p>
          </div>
          <input aria-label="Suoni timer" type="checkbox" checked={sounds} onChange={e=>setSounds(e.target.checked)} />
        </div>
        <div>
          <button onClick={save} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">Salva</button>
        </div>
      </div>
    </section>
  )
}

