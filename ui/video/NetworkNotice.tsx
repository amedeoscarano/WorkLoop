'use client'

export function NetworkNotice({ text }: { text: string }) {
  if (!text) return null
  return (
    <div
      role="status"
      className="mb-2 rounded border border-amber-300 bg-amber-50 text-amber-800 px-3 py-1 text-xs"
    >
      {text}
    </div>
  )
}
