'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { getPresenceState, onPresenceChange } from '../../lib/presence'

export function PeopleList(){
  const [tick, setTick] = React.useState(0)
  const router = useRouter()
  React.useEffect(()=>{
    const off = onPresenceChange(()=>setTick(t=>t+1))
    return off
  }, [])
  const items = React.useMemo(()=>getPresenceState().map((p:any)=>({ id:p.userId, name:p.name, status: p.status, context: p.context })), [tick])
  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
      {items.map((p:any) => (
        <li key={p.id} className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-slate-500">
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${p.status==='available'?'bg-green-500':p.status==='online'?'bg-sky-500':'bg-amber-500'}`} />
                {p.status==='busy' && p.context? `Occupato (in ${p.context.label})` : p.status==='available'?'Disponibile':p.status==='online'?'Online':'In pausa'}
              </p>
            </div>
          </div>
          <button className="px-2 py-1 rounded border text-xs" onClick={()=>router.push(`/dm/dm_${p.id}`)}>Messaggia</button>
        </li>
      ))}
    </ul>
  )
}
