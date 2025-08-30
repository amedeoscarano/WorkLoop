'use client'
import { DashboardShell } from '../../ui/DashboardShell'
import { useRouter } from 'next/navigation'

export default function HelpPage() {
  const router = useRouter()
  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <h2 className="text-lg font-semibold">Help and Resources</h2>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <Card title="Common Questions">
            <p className="text-sm text-slate-600">
              Get quick answers about sessions, scheduling and setup.
            </p>
          </Card>
          <Card title="Community Guidelines">
            <p className="text-sm text-slate-600">
              Learn how to show up respectfully and make the most of the community.
            </p>
          </Card>
        </div>
        <Card title="How to Use Workloop" className="mt-3">
          <p className="text-sm text-slate-600">Watch this quick demo to learn the basics.</p>
          <button
            className="mt-2 px-3 py-1.5 rounded bg-indigo-600 text-white text-sm"
            onClick={() => router.push('/help/demo')}
          >
            Watch Demo
          </button>
        </Card>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Getting Started', 'Help Center', 'Troubleshooting', 'Report a Bug', 'Contact Us'].map(
            (x) => (
              <button key={x} className="px-2 py-1 rounded-lg border text-xs">
                {x}
              </button>
            )
          )}
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
