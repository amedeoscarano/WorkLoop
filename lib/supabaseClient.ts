import { createClient } from '@supabase/supabase-js'

// Export a safe client. If env vars are missing, we return a no-op stub so
// UI components can call channel().on().subscribe() without crashing.
function makeStub() {
  const ch = () => ({
    on: () => ch(),
    subscribe: (cb?: any) => {
      cb?.('SUBSCRIBED')
      return ch()
    },
    track: () => {},
    untrack: () => {},
    unsubscribe: () => {},
    presenceState: () => ({}),
    send: () => ({ status: 'ok' }),
  })
  return { channel: ch }
}

export const supabase: any =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON)
    : makeStub()
