Channels and payloads

- rooms:room_{id}
  - room.updated { roomId, membersOnline, topic? }
- sessions:room_{id}
  - session.started { sessionId, roomId, startedAt, durationMinutes, goal, ownerId }
  - session.ended { sessionId, roomId, endedAt, status: 'completed'|'aborted' }
- presence:room_{id}
  - presence.joined { roomId, user:{ id, name } }
  - presence.left { roomId, userId }
- chat:room_{id}
  - chat.message { id, roomId, user:{ id, name }, text, ts }

