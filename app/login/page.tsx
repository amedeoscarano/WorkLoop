'use client'
import { openOAuthPopup } from '../../lib/ui'

export default function LoginPage(){
  return (
    <section className="max-w-md">
      <h2 className="text-xl font-semibold">Accedi</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Scegli un metodo per iniziare.</p>
      <div className="mt-4 space-y-2">
        <button onClick={()=>{ openOAuthPopup('/api/oauth/linkedin/start?popup=1').then(()=>{ window.location.href='/onboarding' }) }} className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Continua con LinkedIn</button>
        <button onClick={()=>{ localStorage.setItem('user', JSON.stringify({id:'user_demo', name:'Demo'})); window.location.href='/onboarding' }} className="w-full px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800">Entra come Demo</button>
      </div>
    </section>
  )
}
