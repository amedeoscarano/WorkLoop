'use client'

import * as React from 'react'
import { capture } from '../../spec/posthog'

export function InstallPrompt(){
  const [deferred, setDeferred] = React.useState<any>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(()=>{
    function onBeforeInstallPrompt(e: any){
      e.preventDefault()
      setDeferred(e)
      if (Number(localStorage.getItem('visits')||'0') >= 2 && Number(localStorage.getItem('sessionsCompleted')||'0') >= 1) {
        setVisible(true)
        capture('install_pwa_prompted')
      }
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    return ()=>window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow p-4 text-sm">
      <p>Installa Workloop per un accesso più rapido. Funziona offline per la home e le liste.</p>
      <div className="mt-2 flex gap-2 justify-end">
        <button className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800" onClick={()=>setVisible(false)}>Più tardi</button>
        <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white" onClick={async()=>{ await deferred.prompt(); setVisible(false); capture('install_pwa_accepted') }}>Installa</button>
      </div>
    </div>
  )
}

