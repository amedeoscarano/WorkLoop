export type User = { id: string; name: string }

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('user')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function loginAsDemo() {
  if (typeof window === 'undefined') return
  localStorage.setItem('user', JSON.stringify({ id: 'user_demo', name: 'Demo' }))
}

export function logout() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('user')
}
