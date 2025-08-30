'use client'
import * as React from 'react'

export function VideoPanel(){
  const [joined, setJoined] = React.useState(false)
  return (
    <section className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
      <h4 className="text-sm font-medium">Video (stub)</h4>
      {joined ? (
        <div className="mt-2 text-sm">
          <p>Sei nella stanza video (placeholder). Qui andrà LiveKit.</p>
          <button className="mt-2 px-3 py-1.5 rounded bg-slate-200 dark:bg-slate-800" onClick={()=>setJoined(false)}>Lascia</button>
        </div>
      ) : (
        <button className="mt-2 px-3 py-1.5 rounded bg-blue-600 text-white" onClick={()=>setJoined(true)}>Entra in video</button>
      )}
    </section>
  )
}

