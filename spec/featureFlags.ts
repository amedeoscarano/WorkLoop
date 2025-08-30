type Flags = Record<string, boolean>

function parseFlags(env: string | undefined): Flags {
  const flags: Flags = {}
  if (!env) return flags
  for (const part of env.split(',')) {
    const [k, v] = part.split('=').map((s) => s.trim())
    if (!k) continue
    flags[k] = v === 'true'
  }
  return flags
}

const DEFAULTS: Flags = {
  videoEnabled: false,
  privateRooms: true,
  gamificationV1: true,
  darkMode: false,
}

const RUNTIME = parseFlags(process.env.NEXT_PUBLIC_FLAGS)

export function getFlag(name: keyof typeof DEFAULTS | string): boolean {
  if (name in RUNTIME) return !!RUNTIME[name]
  if (name in DEFAULTS) return (DEFAULTS as any)[name]
  return false
}
