'use client'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AuthGuard({ children }: { children: React.ReactNode }){
  const { status } = useSession()
  const router = useRouter()
  useEffect(()=>{
    if (status === 'unauthenticated') router.replace('/login')
  }, [status, router])
  if (status === 'loading') return <div className="p-4 text-sm text-slate-500">Caricamento…</div>
  if (status === 'unauthenticated') return null
  return <>{children}</>
}

