'use client'

export function SidebarNav(){
  // Simple vertical icon bar; replace with real icons/routes later.
  const items = [
    { key: 'home', label: 'Home', emoji: '🏠' },
    { key: 'calendar', label: 'Calendario', emoji: '📅' },
    { key: 'groups', label: 'Gruppi', emoji: '👥' },
    { key: 'gifts', label: 'Rewards', emoji: '🎁' },
    { key: 'settings', label: 'Impostazioni', emoji: '⚙️' },
  ]
  return (
    <nav aria-label="Navigazione" className="hidden lg:flex flex-col items-center w-12 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50">
      {items.map(i => (
        <button key={i.key} title={i.label} aria-label={i.label}
          className="mt-2 w-9 h-9 rounded-full bg-white dark:bg-slate-900 shadow flex items-center justify-center text-base hover:bg-slate-50">
          <span aria-hidden>{i.emoji}</span>
        </button>
      ))}
    </nav>
  )
}

