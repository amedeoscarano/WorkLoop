/* Minimal PostHog client-side wrapper */
export type CaptureProps = Record<string, any>

let ready = false

export function initPostHog() {
  if (typeof window === 'undefined') return
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return
  if ((window as any).posthog) { ready = true; return }
  // Lightweight loader
  ;(function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src="https://cdn.posthog.com/posthog.js",(r=t.getElementsByTagName("script")[0]).parentNode!.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once reset group set_group add_group remove_group register register_once unregister opt_out_capturing opt_in_capturing has_opted_out_capturing has_opted_in_capturing clear_opt_in_out_capturing onFeatureFlags override opt_out_capturing".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)})(document,(window as any).posthog||(window as any).posthog=[])
  ;(window as any).posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, { api_host: 'https://app.posthog.com' })
  ready = true
}

export function capture(event: string, props?: CaptureProps) {
  if (typeof window === 'undefined') return
  const ph = (window as any).posthog
  if (!ph) return
  try { ph.capture(event, props || {}) } catch {}
}

