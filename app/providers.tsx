'use client'

import * as React from 'react'
import { initPosthog } from '../spec/posthog'

export function Providers({ children }: { children: React.ReactNode }){
  React.useEffect(()=>{
    initPosthog()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(()=>{})
    }
  }, [])
  return <>{children}</>
}
