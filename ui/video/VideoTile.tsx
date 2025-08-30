'use client'
import * as React from 'react'

export function VideoTile({
  label,
  stream,
  muted,
  speaking,
}: {
  label: string
  stream?: MediaStream
  muted?: boolean
  speaking?: boolean
}) {
  const ref = React.useRef<HTMLVideoElement>(null)
  React.useEffect(() => {
    if (ref.current && stream) {
      ;(ref.current as any).srcObject = stream
      ref.current.play().catch(() => {})
    }
  }, [stream])
  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-black ${speaking ? 'ring-2 ring-blue-500' : ''}`}
    >
      <video ref={ref} className="w-full h-full object-cover" muted={muted} playsInline />
      <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs text-white bg-black/40 flex items-center justify-between">
        <span>{label}</span>
        {muted && <span aria-live="polite">🔇</span>}
      </div>
    </div>
  )
}
