'use client'
import * as React from 'react'
import { useParams } from 'next/navigation'
import { DashboardShell } from '../../../ui/DashboardShell'
import { DMChat } from '../../../ui/dm/DMChat'
import { useSession } from 'next-auth/react'
import { AuthGuard } from '../../../ui/AuthGuard'
import { startPresence, setStatus } from '../../../lib/presence'

export default function DMPage(){
  const params = useParams<{id:string}>()
  const id = params?.id as string
  const { data } = useSession()
  const me = { id: (data?.user?.email || 'me'), name: (data?.user?.name || 'Me') }
  return (
    <AuthGuard>
      <DashboardShell>
        <DMEffects id={id} me={me} />
        <div className="h-[70vh]">
          <DMChat id={id} me={me} />
        </div>
      </DashboardShell>
    </AuthGuard>
  )
}

function DMEffects({ id, me }: { id:string; me:{id:string;name:string} }){
  React.useEffect(()=>{ startPresence(me); setStatus('busy', { type:'dm', id, label:'DM' }); return ()=>{ setStatus('available', null) } }, [id, me])
  return null
}
