import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

export async function getGoogleAccessToken() {
  const session = await getServerSession(authOptions)
  const access = (session as any)?.access_token as string | undefined
  return access || null
}

export async function googleFetch(path: string, init?: RequestInit) {
  const token = await getGoogleAccessToken()
  if (!token) throw new Error('NO_GOOGLE_TOKEN')
  const res = await fetch(`https://www.googleapis.com${path}`, {
    ...(init || {}),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  if (!res.ok) throw new Error(`GOOGLE_API_ERROR ${res.status}`)
  return res.json()
}
