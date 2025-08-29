'use client'

import * as React from 'react'
import { initPosthog } from '../spec/posthog'

export function Providers({ children }: { children: React.ReactNode }){
  React.useEffect(()=>{
    initPosthog()
  }, [])
  return <>{children}</>
}

export function PwaProvider(){
  React.useEffect(()=>{
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(()=>{})
    }
  }, [])
  return null
}
