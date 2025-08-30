import { getFlag as getSpecFlag } from '../spec/featureFlags'

// Small wrapper so we can import from a stable place
export function getFlag(name: string): boolean {
  try { return getSpecFlag(name as any) } catch { return false }
}

