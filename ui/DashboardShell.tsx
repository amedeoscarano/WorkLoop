'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { SidebarNav } from './SidebarNav'
import { SessionSetupCard } from './SessionSetupCard'
import { TodayPanel } from './TodayPanel'
import { createRoom } from '../spec/mockApi'

export function DashboardShell({ children }: { children: React.ReactNode }){
  const router = useRouter()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3rem_20rem_minmax(0,1fr)_22rem] gap-4 items-start">
      <SidebarNav />
      <SessionSetupCard onStart={async (d, t)=>{
        const r = await createRoom({ name: `Sessione ${d}m`, topic: t, visibility: 'public' })
        router.push(`/room/${r.id}`)
      }} />
      <section>
        {children}
      </section>
      <TodayPanel />
    </div>
  )
}

