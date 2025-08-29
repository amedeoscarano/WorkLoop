'use client'

import * as React from 'react'
import { listRooms } from '../../spec/mockApi'
import { Room } from '../../spec/types'
import { RoomCard } from '../../ui'
import { getFlag } from '../../spec/featureFlags'
import { useRouter } from 'next/navigation'
import { findNextActiveRoom } from '../../lib/rooms'
import { FixedSizeList as List } from 'react-window'
import { capture } from '../../spec/posthog'

type Filter = 'all'|'public'|'private'

export default function RoomsPage() {
  const router = useRouter()
  const [rooms, setRooms] = React.useState<Room[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [filter, setFilter] = React.useState<Filter>('all')

  React.useEffect(() => {
    let on = true
    setLoading(true)
    listRooms().then(r => { if(on){ setRooms(r); setError(null) } }).catch(e=>{ if(on) setError('Impossibile caricare le stanze.') }).finally(()=>{ if(on) setLoading(false) })
    return () => { on = false }
  }, [])

  React.useEffect(() => {
    if (!loading && !error) {
      capture('room_list_viewed', { count: rooms.length })
    }
  }, [loading, error, rooms.length])

  const showPrivate = getFlag('privateRooms')
  const filtered = rooms.filter(r => {
    if (!showPrivate && r.visibility === 'private') return false
    if (filter === 'public') return r.visibility === 'public'
    if (filter === 'private') return r.visibility === 'private'
    return true
  })

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          {(['all','public','private'] as Filter[]).map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 text-sm ${filter===f? 'bg-slate-100 dark:bg-slate-800' : ''}`}>{f}</button>
          ))}
        </div>
        <button
          className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
          onClick={async ()=>{
            const id = await findNextActiveRoom()
            if (!id) return alert('Nessuna stanza attiva ora')
            router.push(`/room/${id}`)
          }}
        >
          Join next active room
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({length:6}).map((_,i)=> (
            <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 animate-pulse h-28" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-sm text-red-600">{error}</div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-sm text-slate-600">Nessuna stanza attiva.</div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div style={{ height: 600 }}>
          <List height={600} width={'100%'} itemCount={filtered.length} itemSize={112}>
            {({ index, style }) => {
              const r = filtered[index]
              return (
                <div style={style} key={r.id}>
                  <RoomCard
                    id={r.id}
                    name={r.name}
                    topic={r.topic}
                    membersOnline={r.membersOnline}
                    visibility={r.visibility}
                    onJoin={(id)=>{
                      capture('room_joined', { room_id: id, visibility: r.visibility })
                      if(r.visibility==='private' && !showPrivate){
                        window.location.href = '/billing'
                        return
                      }
                      window.location.href = `/room/${id}`
                    }}
                  />
                </div>
              )
            }}
          </List>
        </div>
      )}
    </section>
  )
}
