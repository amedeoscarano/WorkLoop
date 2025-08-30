'use client'
import * as React from 'react'

export function OfflineBanner() {
  const [online, setOnline] = React.useState(true)
  React.useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    update()
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])
  if (online) return null
  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-amber-500 text-white text-sm text-center py-2 shadow">
      Connessione assente
    </div>
  )
}
