'use client'
import * as React from 'react'
import { useParams } from 'next/navigation'
import { DashboardShell } from '../../../ui/DashboardShell'
import { DMChat } from '../../../ui/dm/DMChat'
import { useSession } from 'next-auth/react'

export default function DMPage(){
  const params = useParams<{id:string}>()
  const id = params?.id as string
  const { data } = useSession()
  const me = { id: (data?.user?.email || 'me'), name: (data?.user?.name || 'Me') }
  return (
    <DashboardShell>
      <div className="h-[70vh]">
        <DMChat id={id} me={me} />
      </div>
    </DashboardShell>
  )
}

