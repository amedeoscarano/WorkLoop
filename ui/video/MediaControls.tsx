'use client'
import * as React from 'react'

export function MediaControls({ muted, camOff, onToggleMic, onToggleCam, onLeave, onOpenMeet }: {
  muted: boolean
  camOff: boolean
  onToggleMic: ()=>void
  onToggleCam: ()=>void
  onLeave: ()=>void
  onOpenMeet: ()=>void
}){
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <button aria-label="Attiva/disattiva microfono" aria-pressed={muted? 'true':'false'} onClick={onToggleMic} className="px-3 py-1.5 rounded bg-slate-200 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600">{muted? 'Mic off' : 'Mic on'}</button>
      <button aria-label="Attiva/disattiva fotocamera" aria-pressed={camOff? 'true':'false'} onClick={onToggleCam} className="px-3 py-1.5 rounded bg-slate-200 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600">{camOff? 'Cam off' : 'Cam on'}</button>
      <button aria-label="Lascia la chiamata" onClick={onLeave} className="px-3 py-1.5 rounded bg-red-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-600">Lascia</button>
      <button aria-label="Apri Google Meet (backup)" onClick={onOpenMeet} className="px-3 py-1.5 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600">Apri Google Meet (backup)</button>
    </div>
  )
}

