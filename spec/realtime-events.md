Channels and payloads

- rooms:room\_{id}
  - room.updated { roomId, membersOnline, topic? }
- sessions:room\_{id}
  - session.started { sessionId, roomId, startedAt, durationMinutes, goal, ownerId }
  - session.ended { sessionId, roomId, endedAt, status: 'completed'|'aborted' }
- presence:room\_{id}
  - presence.joined { roomId, user:{ id, name } }
  - presence.left { roomId, userId }
- chat:room\_{id}
  - chat.message { id, roomId, user:{ id, name }, text, ts }
