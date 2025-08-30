'use client'

import { checkout } from '../../lib/stripeStub'
import { useEffect } from 'react'
import { capture } from '../../spec/posthog'

export default function BillingPage() {
  useEffect(() => {
    capture('billing_viewed')
  }, [])
  return (
    <section className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-2xl rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 shadow-md text-center">
        <h2 className="text-2xl font-semibold">Pro plan</h2>
        <p className="mt-2 text-slate-700">
          Upgrade to unlock private rooms and video (coming soon)
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
          <div className="text-left">
            <p className="font-medium">Monthly</p>
            <p className="text-sm text-slate-700">€9 / month</p>
            <ul className="mt-2 text-sm list-disc pl-5 space-y-1 text-slate-700">
              <li>Private rooms</li>
              <li>Video access (phase 2)</li>
              <li>Priority support</li>
            </ul>
          </div>
          <button
            onClick={() => checkout('pro-monthly', 'paywall')}
            className="px-4 py-2 rounded-lg text-base font-medium bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Upgrade
          </button>
        </div>
      </div>
    </section>
  )
}
