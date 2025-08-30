// simple helpers; replace with real API later
export function isUserSubscribed(): boolean {
  // TODO: read from user profile or env; for now read flag:
  return (process.env.NEXT_PUBLIC_USER_SUBSCRIBED || 'false') === 'true'
}

export function requiresSubscription(room: {
  visibility: 'public' | 'private'
  hasVideo?: boolean
}): boolean {
  const privateRoom = room.visibility === 'private'
  const videoFeature = room.hasVideo === true
  return privateRoom || videoFeature
}
