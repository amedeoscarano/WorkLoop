'use client'
import * as React from 'react'

export function DevicePreview({ onJoin }: { onJoin: (opts:{ muted:boolean; camOff:boolean; deviceIds?: { audio?: string; video?: string }})=>void }){
  const [devices, setDevices] = React.useState<{ mics: MediaDeviceInfo[]; cams: MediaDeviceInfo[] }>({ mics: [], cams: [] })
  const [audioId, setAudioId] = React.useState<string>('')
  const [videoId, setVideoId] = React.useState<string>('')
  const [muted, setMuted] = React.useState(true)
  const [camOff, setCamOff] = React.useState(true)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(()=>{
    async function load(){
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        const all = await navigator.mediaDevices.enumerateDevices()
        const mics = all.filter(d=>d.kind==='audioinput')
        const cams = all.filter(d=>d.kind==='videoinput')
        setDevices({ mics, cams })
        if (videoRef.current) { (videoRef.current as any).srcObject = stream; videoRef.current.play().catch(()=>{}) }
      } catch {}
    }
    load()
  }, [])

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Controllo audio e video</h4>
      <video ref={videoRef} className="w-full h-40 bg-black rounded" muted playsInline />
      <div className="grid grid-cols-2 gap-2 text-sm">
        <label className="block">Microfono
          <select className="mt-1 w-full rounded border" value={audioId} onChange={e=>setAudioId(e.target.value)}>
            <option value="">Predefinito</option>
            {devices.mics.map(d=> <option key={d.deviceId} value={d.deviceId}>{d.label||'Mic'}</option>)}
          </select>
        </label>
        <label className="block">Fotocamera
          <select className="mt-1 w-full rounded border" value={videoId} onChange={e=>setVideoId(e.target.value)}>
            <option value="">Predefinita</option>
            {devices.cams.map(d=> <option key={d.deviceId} value={d.deviceId}>{d.label||'Cam'}</option>)}
          </select>
        </label>
      </div>
      <div className="flex gap-2">
        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={muted} onChange={e=>setMuted(e.target.checked)} /> Avvia con microfono disattivato</label>
        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={camOff} onChange={e=>setCamOff(e.target.checked)} /> Avvia con fotocamera spenta</label>
      </div>
      <div className="flex gap-2 justify-end">
        <button className="px-3 py-2 rounded border" onClick={()=>onJoin({ muted, camOff, deviceIds: { audio: audioId||undefined, video: videoId||undefined } })}>Entra</button>
      </div>
    </div>
  )
}

