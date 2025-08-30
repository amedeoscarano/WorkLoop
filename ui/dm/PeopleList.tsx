'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { listOnlinePeople, type Person } from '../../spec/people'

export function PeopleList(){
  const [items, setItems] = React.useState<Person[]>([])
  const router = useRouter()
  React.useEffect(()=>{ let on=true; listOnlinePeople().then(p=>on&&setItems(p)); return ()=>{on=false} }, [])
  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
      {items.map(p => (
        <li key={p.id} className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-slate-500">
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${p.status==='available'?'bg-green-500':p.status==='online'?'bg-sky-500':'bg-amber-500'}`} />
                {p.status==='available'?'Disponibile':p.status==='online'?'Online':'In pausa'}
              </p>
            </div>
          </div>
          <button className="px-2 py-1 rounded border text-xs" onClick={()=>router.push(`/dm/dm_${p.id}`)}>Messaggia</button>
        </li>
      ))}
    </ul>
  )
}

