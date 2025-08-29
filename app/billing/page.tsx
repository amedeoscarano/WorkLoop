'use client'

import { checkout } from '../../lib/stripeStub'
import { useEffect } from 'react'
import { capture } from '../../spec/posthog'

export default function BillingPage(){
  useEffect(()=>{ capture('billing_viewed') }, [])
  return (
    <section className="max-w-2xl">
      <h2 className="text-xl font-semibold">Piano Pro</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Sblocca stanze private e video (fase 2).</p>
      <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
        <div>
          <p className="font-medium">Pro Mensile</p>
          <p className="text-sm text-slate-500">€9 / mese</p>
        </div>
        <button onClick={()=>checkout('pro-monthly','paywall')} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">Upgrade</button>
      </div>
    </section>
  )
}
