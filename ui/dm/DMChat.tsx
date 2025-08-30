'use client'
import * as React from 'react'
import { supabase } from '../../lib/supabaseClient'
import { capture } from '../../spec/posthog'

export function DMChat({ id, me }: { id: string; me: { id: string; name: string } }) {
  const [messages, setMessages] = React.useState<
    { id: string; user: { id: string; name: string }; text: string; ts: string }[]
  >([])
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    const ch = supabase.channel(`dm:${id}`)
    ch.on('broadcast', { event: 'message' }, (payload: any) => {
      const m = payload.payload
      setMessages((prev) => [...prev, m])
      // Unread counter: if tab not focused or different DM, increment simple counter
      try {
        if (document.visibilityState === 'hidden') {
          const n = Number(localStorage.getItem('wl_unread') || '0') + 1
          localStorage.setItem('wl_unread', String(n))
        }
      } catch {}
    })
    ch.subscribe()
    return () => {
      ch.unsubscribe()
    }
  }, [id])

  async function send() {
    const t = text.trim()
    if (!t) return
    const m = {
      id: Math.random().toString(36).slice(2, 8),
      user: me,
      text: t,
      ts: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, m])
    setText('')
    supabase.channel(`dm:${id}`).send({ type: 'broadcast', event: 'message', payload: m })
    capture('message_sent', { type: 'dm', conversationId: id })
  }

  return (
    <section className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 h-full flex flex-col">
      <h4 className="text-sm text-slate-500">DM</h4>
      <ul className="mt-3 flex-1 overflow-auto space-y-2" role="log" aria-live="polite">
        {messages.map((m) => (
          <li key={m.id} className="text-sm">
            <span className="font-medium text-slate-800 dark:text-slate-100">{m.user.name}:</span>{' '}
            <span className="text-slate-700 dark:text-slate-200">{m.text}</span>
            <time className="ml-2 text-xs text-slate-400">
              {new Date(m.ts).toLocaleTimeString()}
            </time>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded-lg border"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
          placeholder="Scrivi…"
        />
        <button
          className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          onClick={send}
          disabled={!text.trim()}
        >
          Invia
        </button>
      </div>
    </section>
  )
}
