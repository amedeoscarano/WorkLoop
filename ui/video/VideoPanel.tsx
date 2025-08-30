'use client'
import * as React from 'react'
import { DevicePreview } from './DevicePreview'
import { VideoGrid } from './VideoGrid'
import { MediaControls } from './MediaControls'
import { NetworkNotice } from './NetworkNotice'
import { capture } from '../../spec/posthog'

type State = 'idle' | 'preview' | 'connecting' | 'connected' | 'error'

export function VideoPanel({ roomId, identity }: { roomId: string; identity: string }) {
  const [state, setState] = React.useState<State>('preview')
  const [muted, setMuted] = React.useState(true)
  const [camOff, setCamOff] = React.useState(true)
  const [notice, setNotice] = React.useState('')
  const [localStream, setLocalStream] = React.useState<MediaStream | undefined>(undefined)
  const [remoteStreams, setRemoteStreams] = React.useState<
    Array<{ label: string; stream?: MediaStream; muted?: boolean }>
  >([])

  React.useEffect(() => {
    capture('video_preview_opened', { room_id: roomId })
  }, [roomId])

  async function join({
    muted: startMuted,
    camOff: startCamOff,
  }: {
    muted: boolean
    camOff: boolean
  }) {
    try {
      setState('connecting')
      capture('video_join_attempted', { room_id: roomId })
      const res = await fetch('/api/livekit/token', {
        method: 'POST',
        body: JSON.stringify({ roomId, identity }),
      })
      if (!res.ok) throw new Error('TOKEN_FAILED')
      await res.json() // token reserved for future use
      const stream = await navigator.mediaDevices.getUserMedia({
        video: !startCamOff,
        audio: !startMuted,
      })
      setLocalStream(stream)
      setMuted(startMuted)
      setCamOff(startCamOff)
      setState('connected')
      capture('video_joined', { room_id: roomId, muted_start: startMuted, cam_start: !startCamOff })
    } catch (e: any) {
      setState('error')
      capture('video_join_failed', { room_id: roomId, message: String(e?.message || e) })
    }
  }

  function leave() {
    try {
      localStream?.getTracks().forEach((t) => t.stop())
    } catch {}
    setLocalStream(undefined)
    setRemoteStreams([])
    setState('preview')
    capture('video_left', { room_id: roomId })
  }

  function openMeet() {
    try {
      setMuted(true)
      localStream?.getAudioTracks().forEach((t) => (t.enabled = false))
    } catch {}
    window.open('https://meet.google.com/new', '_blank', 'noopener')
    capture('video_open_meet_clicked', { room_id: roomId })
  }

  return (
    <section className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
      <NetworkNotice text={notice} />
      {state === 'preview' && <DevicePreview onJoin={(opts) => join(opts)} />}
      {state === 'connecting' && <div className="text-sm">Connessione…</div>}
      {state === 'error' && (
        <div className="text-sm">
          Errore nel join.{' '}
          <button className="underline" onClick={() => setState('preview')}>
            Riprova
          </button>{' '}
          o{' '}
          <button className="underline" onClick={openMeet}>
            Apri Google Meet (backup)
          </button>
        </div>
      )}
      {state === 'connected' && (
        <div>
          <VideoGrid local={{ label: 'Tu', stream: localStream, muted }} remotes={remoteStreams} />
          <MediaControls
            muted={muted}
            camOff={camOff}
            onToggleMic={() => {
              setMuted((m) => !m)
              localStream?.getAudioTracks().forEach((t) => (t.enabled = false))
              capture('video_muted_toggled', { room_id: roomId, muted: !muted, reason: 'user' })
            }}
            onToggleCam={() => {
              setCamOff((c) => !c)
              localStream?.getVideoTracks().forEach((t) => (t.enabled = !camOff))
              capture('video_camera_toggled', { room_id: roomId, on: camOff })
            }}
            onLeave={leave}
            onOpenMeet={openMeet}
          />
        </div>
      )}
    </section>
  )
}
