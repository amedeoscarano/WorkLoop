'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SidebarNav() {
  const pathname = usePathname()
  const items = [
    { href: '/rooms', label: 'Schedule', emoji: '📅' },
    { href: '/people', label: 'People', emoji: '👥' },
    { href: '/refer', label: 'Refer', emoji: '🎁' },
    { href: '/help', label: 'Help', emoji: '❓' },
    { href: '/settings', label: 'Settings', emoji: '⚙️' },
    { href: '/profile', label: 'Profile', emoji: '👤' },
  ]
  return (
    <nav
      aria-label="Navigazione"
      className="hidden lg:flex flex-col items-center w-12 py-3 rounded-xl bg-indigo-600 text-white"
    >
      {items.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href as any}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
            className={`mt-3 w-9 h-9 rounded-full flex items-center justify-center text-base transition border border-white/10 ${active ? 'bg-white text-indigo-600 shadow ring-2 ring-white/40' : 'bg-white/10 hover:bg-white/20'}`}
          >
            <span aria-hidden>{item.emoji}</span>
          </Link>
        )
      })}
    </nav>
  )
}
