Componenti principali (props)

RoomCard

```
type RoomCardProps = {
  id: string; name: string; topic?: string;
  membersOnline: number; visibility: 'public'|'private';
  onJoin: (id:string)=>void; disabled?: boolean
}
```

SessionTimer

```
type SessionTimerProps = {
  duration: 25|50; status: 'idle'|'scheduled'|'running'|'break'|'completed'|'aborted';
  remainingMs: number; onStart:()=>void; onAbort:()=>void; onComplete:()=>void; ariaLive?: 'off'|'polite'|'assertive'
}
```

ChatPanel

```
type ChatPanelProps = {
  roomId: string; messages: {id:string; user:{id:string;name:string}; text:string; ts:string}[];
  onSend: (text:string)=>Promise<void>; disabled?: boolean
}
```

Altri (stub): PresenceBar, ReactionBar, StreakWidget, PaywallNotice.
