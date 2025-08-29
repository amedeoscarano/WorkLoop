'use client'

export default function LoginPage(){
  return (
    <section className="max-w-md">
      <h2 className="text-xl font-semibold">Login</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Magic link (stub). In dev: entra come Demo.</p>
      <div className="mt-4 flex gap-2">
        <button onClick={()=>{ localStorage.setItem('user', JSON.stringify({id:'user_demo', name:'Demo'})); window.location.href='/onboarding' }} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">Entra come Demo</button>
      </div>
    </section>
  )
}

