// spec/posthog.ts
// Safe no-op shim: does not block build if PostHog is not used.
// When real PostHog is integrated, replace these functions with SDK calls.

type Props = Record<string, unknown>

// Public keys (can be empty; in that case everything is no-op)
const PH_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || ''
const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com'

// Type hints for optional global posthog object
declare global {
  interface Window {
    posthog?: {
      init?: (key: string, opts?: Record<string, unknown>) => void
      capture?: (event: string, props?: Props) => void
      identify?: (id: string, props?: Props) => void
      reset?: () => void
    }
  }
}

export function initPosthog(): void {
  if (!PH_KEY) return
  if (typeof window !== 'undefined' && window.posthog?.init) {
    window.posthog.init(PH_KEY, { api_host: PH_HOST, capture_pageview: false })
  }
}

export function capture(event: string, props?: Props): void {
  if (!PH_KEY) return
  if (typeof window !== 'undefined' && window.posthog?.capture) {
    window.posthog.capture(event, props)
  }
}

export function identify(id: string, props?: Props): void {
  if (!PH_KEY) return
  if (typeof window !== 'undefined' && window.posthog?.identify) {
    window.posthog.identify(id, props)
  }
}

export function shutdown(): void {
  if (!PH_KEY) return
  if (typeof window !== 'undefined' && window.posthog?.reset) {
    window.posthog.reset()
  }
}
