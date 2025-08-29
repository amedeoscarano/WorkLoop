import * as React from 'react'

export type ChatPanelProps = {
  roomId: string
  messages: {id:string; user:{id:string;name:string}; text:string; ts:string}[]
  onSend: (text:string)=>Promise<void>
  disabled?: boolean
}

export function ChatPanel({ roomId, messages, onSend, disabled }: ChatPanelProps) {
  const [text, setText] = React.useState('')

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    await onSend(t)
    setText('')
  }

  return (
    <section className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 h-full flex flex-col">
      <h4 className="text-sm text-slate-500">Chat stanza</h4>
      <ul className="mt-3 flex-1 overflow-auto space-y-2" aria-live="polite">
        {messages.map(m => (
          <li key={m.id} className="text-sm">
            <span className="font-medium text-slate-800 dark:text-slate-100">{m.user.name}:</span>{' '}
            <span className="text-slate-700 dark:text-slate-200">{m.text}</span>
            <time className="ml-2 text-xs text-slate-400">{new Date(m.ts).toLocaleTimeString()}</time>
          </li>
        ))}
        {messages.length === 0 && (
          <li className="text-sm text-slate-500">Nessun messaggio. Rompi il ghiaccio con un saluto 👋</li>
        )}
      </ul>

      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
          placeholder="Scrivi un messaggio…"
          value={text}
          onChange={e=>setText(e.target.value)}
          disabled={disabled}
          aria-label="Scrivi un messaggio"
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
          disabled={disabled || !text.trim()}
        >
          Invia
        </button>
      </form>
    </section>
  )
}

