'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { SidebarNav } from './SidebarNav'
import { SessionSetupCard } from './SessionSetupCard'
import { TodayPanel } from './TodayPanel'
import { createRoom } from '../spec/mockApi'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3rem_14rem_minmax(0,2fr)_14rem] gap-6 items-start px-6 md:px-12">
      <div className="hidden lg:flex">
        <SidebarNav />
      </div>
      <div className="hidden lg:block">
        <SessionSetupCard
          onStart={async (d, t) => {
            const r = await createRoom({ name: `Sessione ${d}m`, topic: t, visibility: 'public' })
            router.push(`/room/${r.id}`)
          }}
        />
      </div>
      <section className="min-w-0">{children}</section>
      <div className="hidden lg:block">
        <TodayPanel />
      </div>
    </div>
  )
}
