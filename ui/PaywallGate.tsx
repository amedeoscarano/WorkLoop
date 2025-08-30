'use client'

export function PaywallGate({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <section className="rounded-xl border p-4 bg-white dark:bg-slate-900">
      <h3 className="text-lg font-semibold">Questa stanza è per abbonati</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Sblocca stanze private e video con il piano Pro.
      </p>
      <button
        onClick={onUpgrade}
        className="mt-3 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
      >
        Upgrade
      </button>
    </section>
  )
}
