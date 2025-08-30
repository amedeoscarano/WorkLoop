import { supabase } from './supabaseClient'

export type PresenceStatus = 'online' | 'available' | 'busy' | 'break'
export type PresenceContext = { type: 'dm' | 'room'; id: string; label: string } | null

let currentUser: { id: string; name: string; avatarUrl?: string } | null = null
let currentStatus: PresenceStatus = 'online'
let currentContext: PresenceContext = null
let channel: any = null
const listeners = new Set<() => void>()

export function startPresence(user: { id: string; name: string; avatarUrl?: string }) {
  currentUser = user
  if (!channel) {
    channel = supabase.channel('presence:global', { config: { presence: { key: user.id } } })
    channel.on('presence', { event: 'sync' }, () => {
      // notify listeners when presence state changes
      listeners.forEach((fn) => {
        try {
          fn()
        } catch {}
      })
    })
    channel.subscribe((status: any) => {
      if (status === 'SUBSCRIBED') {
        channel.track({
          userId: user.id,
          name: user.name,
          avatarUrl: user.avatarUrl,
          status: currentStatus,
          context: currentContext,
        })
      }
    })
  }
}

export function setStatus(status: PresenceStatus, context: PresenceContext = null) {
  currentStatus = status
  currentContext = context
  if (channel && currentUser) {
    channel.track({
      userId: currentUser.id,
      name: currentUser.name,
      avatarUrl: currentUser.avatarUrl,
      status,
      context,
    })
  }
}

export function getPresenceState() {
  if (!channel) return [] as any[]
  const state = channel.presenceState?.() || {}
  // state is keyed by user.id => arrays
  const list = Object.values(state).flat() as any[]
  return list
}

export function onPresenceChange(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}
