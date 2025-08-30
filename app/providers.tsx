"use client"
import * as React from 'react'
import { initPosthog } from '../spec/posthog'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }){
  React.useEffect(()=>{
    initPosthog()
  }, [])
  return <SessionProvider>{children}</SessionProvider>
}

export function PwaProvider(){
  React.useEffect(()=>{
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(()=>{})
    }
  }, [])
  return null
}
