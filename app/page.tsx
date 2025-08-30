'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">Lavora da remoto, senza sentirti solo.</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Sessioni 25/50. Obiettivi chiari. Comunità gentile.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            Vai alle stanze
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            Accedi
          </Link>
        </div>
        <ul className="mt-4 text-slate-700 dark:text-slate-200 list-disc pl-5 space-y-1">
          <li>Timer 25/50</li>
          <li>Obiettivi chiari</li>
          <li>Comunità gentile</li>
        </ul>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow">
        <p className="text-sm text-slate-500">Cos’è Workloop?</p>
        <p className="mt-2 text-slate-700 dark:text-slate-200">
          Un coworking digitale leggero: entri in una stanza, scrivi un goal, avvii un timer
          condiviso, lavori in compagnia. Niente fronzoli.
        </p>
      </div>
    </section>
  )
}
