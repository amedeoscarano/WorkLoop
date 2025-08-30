'use client'
import * as React from 'react'
import { DashboardShell } from '../../ui/DashboardShell'

export default function TestAvPage() {
  const [videoSupported, setVideoSupported] = React.useState<boolean | null>(null)
  const [audioSupported, setAudioSupported] = React.useState<boolean | null>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  async function startTest() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setVideoSupported(true)
      setAudioSupported(true)
      if (videoRef.current) {
        ;(videoRef.current as any).srcObject = stream
        await (videoRef.current as any).play()
      }
    } catch (err) {
      setVideoSupported(false)
      setAudioSupported(false)
      alert('Permessi negati o dispositivo non disponibile')
    }
  }

  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <h2 className="text-lg font-semibold">Test audio and video</h2>
        <div className="mt-3 grid md:grid-cols-2 gap-4">
          <div>
            <video ref={videoRef} className="w-full rounded-lg bg-black" muted playsInline />
            <button
              className="mt-2 px-3 py-1.5 rounded bg-indigo-600 text-white text-sm"
              onClick={startTest}
            >
              Start test
            </button>
          </div>
          <div className="text-sm">
            <p>Video: {videoSupported === null ? '—' : videoSupported ? 'OK' : 'Errore'}</p>
            <p>Audio: {audioSupported === null ? '—' : audioSupported ? 'OK' : 'Errore'}</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
