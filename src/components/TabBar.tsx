import { NavLink } from 'react-router-dom'
import { Home, BookOpen, MessagesSquare, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/hexagrams', icon: BookOpen, label: '卦象' },
  { to: '/community', icon: MessagesSquare, label: '社区' },
  { to: '/profile', icon: UserRound, label: '我的' },
]

// 仅移动端底部 Tab；桌面端导航由 Sidebar 承载
export default function TabBar({ showTab }: { showTab: boolean }) {
  if (!showTab) return null
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-[hsl(var(--border))] flex items-center justify-around z-30 pb-[env(safe-area-inset-bottom)]">
      {items.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center gap-0.5 py-2 flex-1 transition-colors',
              isActive ? 'text-yiji-gold' : 'text-mid-gray'
            )
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} />
              <span className="text-[11px] leading-none">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
