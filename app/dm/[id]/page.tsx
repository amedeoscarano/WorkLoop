'use client'
import * as React from 'react'
import { useParams } from 'next/navigation'
import { DashboardShell } from '../../../ui/DashboardShell'
import { DMChat } from '../../../ui/dm/DMChat'
import { useSession } from 'next-auth/react'
import { AuthGuard } from '../../../ui/AuthGuard'
import { startPresence, setStatus } from '../../../lib/presence'
import { ScheduleModal } from '../../../ui/schedule/ScheduleModal'
import { capture } from '../../../spec/posthog'

export default function DMPage(){
  const params = useParams<{id:string}>()
  const id = params?.id as string
  const { data } = useSession()
  const me = { id: (data?.user?.email || 'me'), name: (data?.user?.name || 'Me') }
  const [scheduleOpen, setScheduleOpen] = React.useState(false)
  return (
    <AuthGuard>
      <DashboardShell>
        <DMEffects id={id} me={me} />
        <div className="mb-2">
          <button className="px-3 py-1.5 rounded border" onClick={()=>setScheduleOpen(true)}>Programma</button>
        </div>
        <div className="h-[70vh]">
          <DMChat id={id} me={me} />
        </div>
        <ScheduleModal open={scheduleOpen} onClose={()=>setScheduleOpen(false)} defaults={{ title: `DM con ${id}`, duration: 25 }} />
      </DashboardShell>
    </AuthGuard>
  )
}

function DMEffects({ id, me }: { id:string; me:{id:string;name:string} }){
  React.useEffect(()=>{ startPresence(me); setStatus('busy', { type:'dm', id, label:'DM' }); capture('dm_opened', { id }); return ()=>{ setStatus('available', null) } }, [id, me])
  return null
}
