'use client'
import * as React from 'react'
import { DashboardShell } from '../../ui/DashboardShell'
import { ConversationList } from '../../ui/dm/ConversationList'
import { PeopleList } from '../../ui/dm/PeopleList'

import { AuthGuard } from '../../ui/AuthGuard'
import { useSession } from 'next-auth/react'
import { startPresence, setStatus } from '../../lib/presence'

export default function InboxPage(){
  const { data } = useSession()
  const conversations = React.useMemo(()=>[
    { id: 'dm_u1', name: 'Alex', last: 'A dopo!', ts: new Date().toISOString(), unread: 0 },
    { id: 'dm_u2', name: 'Bianca', last: 'Ok', ts: new Date().toISOString(), unread: 2 }
  ], [])
  React.useEffect(()=>{
    if (data?.user?.email) startPresence({ id: data.user.email, name: data.user.name || data.user.email })
    setStatus('available', null)
  }, [data])
  return (
    <AuthGuard>
    <DashboardShell>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Conversations</h3>
          <ConversationList items={conversations} />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">People</h3>
          <PeopleList />
        </div>
      </div>
    </DashboardShell>
    </AuthGuard>
  )
}
