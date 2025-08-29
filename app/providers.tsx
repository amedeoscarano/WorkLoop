'use client'

import * as React from 'react'
import { initPostHog } from '../spec/posthog'

export function Providers({ children }: { children: React.ReactNode }){
  React.useEffect(()=>{
    initPostHog()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(()=>{})
    }
  }, [])
  return <>{children}</>
}

