import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-sm">
      <p className="font-medium">Pagina non trovata</p>
      <Link
        href="/"
        className="mt-2 inline-flex px-3 py-1.5 rounded bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Torna alla Home
      </Link>
    </div>
  )
}
