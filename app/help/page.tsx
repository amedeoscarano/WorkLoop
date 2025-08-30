'use client'
import { DashboardShell } from '../../ui/DashboardShell'
import { useRouter } from 'next/navigation'

export default function HelpPage() {
  const router = useRouter()
  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <h2 className="text-lg font-semibold">Help and Resources</h2>
        <div className="mt-3 grid md:grid-cols-2 gap-4">
          <Card title="❓ Common Questions">
            <p className="text-sm text-slate-700">
              Get quick answers about sessions, scheduling and setup.
            </p>
          </Card>
          <Card title="📘 Community Guidelines">
            <p className="text-sm text-slate-700">
              Learn how to show up respectfully and make the most of the community.
            </p>
          </Card>
        </div>
        <Card title="🎬 How to Use Workloop" className="mt-4">
          <p className="text-sm text-slate-700">Watch this quick demo to learn the basics.</p>
          <button
            className="mt-2 px-4 py-2 rounded-lg text-base font-medium bg-blue-600 text-white hover:bg-blue-500"
            onClick={() => router.push('/help/demo')}
          >
            Watch demo
          </button>
        </Card>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Getting Started', 'Help Center', 'Troubleshooting', 'Report a Bug'].map((x) => (
            <div key={x} className="rounded-lg border border-slate-200 p-3 shadow-sm">
              <p className="text-sm text-slate-700">{x}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}

function Card({ title, children, className = '' }: any) {
  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-800 p-3 ${className}`}>
      <p className="text-sm font-medium">{title}</p>
      <div className="mt-2">{children}</div>
    </div>
  )
}
