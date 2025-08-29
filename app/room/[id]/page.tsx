'use client'

import * as React from 'react'
import { useParams } from 'next/navigation'
import { getRoom, startSession, endSession, sendMessage } from '../../../spec/mockApi'
import { SessionTimer, ChatPanel } from '../../../ui'
import type { SessionStatus } from '../../../spec/types'
import { requiresSubscription, isUserSubscribed } from '../../../lib/subscription'
import { PaywallGate } from '../../../ui/PaywallGate'
import { checkout } from '../../../lib/stripeStub'

export default function RoomPage() {
  const params = useParams<{ id: string }>()
  const roomId = params?.id as string
  const [roomName, setRoomName] = React.useState<string>('')
  const [roomObj, setRoomObj] = React.useState<any | null>(null)
  const [goal, setGoal] = React.useState('')
  const [duration, setDuration] = React.useState<25|50>(25)
  const [status, setStatus] = React.useState<SessionStatus>('idle')
  const [remainingMs, setRemainingMs] = React.useState(25*60_000)
  const [messages, setMessages] = React.useState<any[]>([])
  const [error, setError] = React.useState<string|null>(null)

  React.useEffect(() => {
    let on = true
    getRoom(roomId)
      .then(r => { if(on){ setRoomName(r.name); setRoomObj(r as any); setError(null) } })
      .catch(e=>{ if(on) setError('La stanza non esiste o è privata.') })
    return () => { on = false }
  }, [roomId])

  React.useEffect(() => {
    if (status !== 'running') return
    const tick = setInterval(() => {
      setRemainingMs((ms) => Math.max(0, ms - 1000))
    }, 1000)
    return () => clearInterval(tick)
  }, [status])

  function resetTimer() {
    setRemainingMs(duration*60_000)
  }

  async function handleStart(){
    if(!goal.trim()){ alert('Scrivi un goal, anche breve.'); return }
    try{
      await startSession({ roomId, goal, duration })
      setStatus('running')
      resetTimer()
    }catch(e:any){ alert(e?.message || 'Errore.') }
  }

  async function handleAbort(){
    setStatus('aborted')
    await endSession('current', false)
  }

  async function handleComplete(){
    if(status !== 'running') return
    setStatus('completed')
    await endSession('current', true)
    alert('Sessione completata! Goal raggiunto?')
  }

  async function handleSend(text:string){
    const m = await sendMessage(roomId, text)
    setMessages((prev)=>[...prev, m])
  }

  // Paywall: gate private/video rooms for unsubscribed users
  if (roomObj && requiresSubscription(roomObj) && !isUserSubscribed()) {
    return <PaywallGate onUpgrade={() => { checkout('pro-monthly','paywall') }} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold">{roomName || 'Stanza'}</h2>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <label className="block text-sm text-slate-600">Goal per questa sessione</label>
          <div className="mt-2 flex gap-2">
            <input value={goal} onChange={(e)=>setGoal(e.target.value)} placeholder="Scrivi un goal per iniziare" className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            <select value={duration} onChange={(e)=>setDuration(Number(e.target.value) as 25|50)} className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <SessionTimer
            duration={duration}
            status={status}
            remainingMs={remainingMs}
            onStart={handleStart}
            onAbort={handleAbort}
            onComplete={handleComplete}
            ariaLive={remainingMs <= 10_000 ? 'assertive' : 'polite'}
          />
        </div>

        <div className="mt-2 text-xs text-slate-500">Scrivi un goal per avviare.</div>
      </div>

      <div className="flex flex-col h-[70vh]">
        <ChatPanel roomId={roomId} messages={messages} onSend={handleSend} />
      </div>
    </div>
  )
}
