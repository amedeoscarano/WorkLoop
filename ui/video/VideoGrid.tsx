'use client'
import { VideoTile } from './VideoTile'

export function VideoGrid({
  local,
  remotes,
}: {
  local: { label: string; stream?: MediaStream; muted?: boolean }
  remotes: Array<{ label: string; stream?: MediaStream; muted?: boolean }>
}) {
  const tiles = [local, ...remotes]
  const count = tiles.length
  const gridClass = count <= 1 ? 'grid-cols-1' : count <= 4 ? 'grid-cols-2' : 'grid-cols-3'
  return (
    <div className={`grid ${gridClass} gap-2 min-h-[240px]`} style={{ gridAutoRows: '200px' }}>
      {tiles.map((t, i) => (
        <VideoTile key={i} label={t.label} stream={t.stream} muted={t.muted} />
      ))}
    </div>
  )
}
