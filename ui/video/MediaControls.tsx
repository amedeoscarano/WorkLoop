'use client'
import * as React from 'react'

export function MediaControls({
  muted,
  camOff,
  onToggleMic,
  onToggleCam,
  onLeave,
  onOpenMeet,
}: {
  muted: boolean
  camOff: boolean
  onToggleMic: () => void
  onToggleCam: () => void
  onLeave: () => void
  onOpenMeet: () => void
}) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <button
        aria-label="Toggle microphone"
        aria-pressed={muted ? 'true' : 'false'}
        onClick={onToggleMic}
        className="px-4 py-2 rounded-lg text-base font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {muted ? 'Mic off' : 'Mic on'}
      </button>
      <button
        aria-label="Toggle camera"
        aria-pressed={camOff ? 'true' : 'false'}
        onClick={onToggleCam}
        className="px-4 py-2 rounded-lg text-base font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {camOff ? 'Cam off' : 'Cam on'}
      </button>
      <button
        aria-label="Leave call"
        onClick={onLeave}
        className="px-4 py-2 rounded-lg text-base font-medium bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Leave
      </button>
      <button
        aria-label="Open Google Meet (backup)"
        onClick={onOpenMeet}
        className="px-4 py-2 rounded-lg text-base font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Open Google Meet (backup)
      </button>
    </div>
  )
}
