import { capture } from '../spec/posthog'

export function checkout(plan: 'pro-monthly', from: 'paywall' | 'settings') {
  capture('checkout_clicked', { plan, from })
  alert('Checkout (stub) – finto redirect a Stripe')
}
