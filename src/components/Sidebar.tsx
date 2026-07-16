import { NavLink, useNavigate } from 'react-router-dom'
import { Home, BookOpen, MessagesSquare, BarChart3, HelpCircle, CalendarDays, UserRound, Sparkles, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { useSession } from '@/store/useSession'
import { accountApi } from '@/services/account'

const nav = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/hexagrams', icon: BookOpen, label: '卦象图谱' },
  { to: '/community', icon: MessagesSquare, label: '易友社区' },
  { to: '/stats', icon: BarChart3, label: '学习统计' },
  { to: '/qa', icon: HelpCircle, label: '问答求助' },
  { to: '/events', icon: CalendarDays, label: '限时活动' },
  { to: '/profile', icon: UserRound, label: '我的' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const userInfo = useStore((s) => s.userInfo)
  const streak = useStore((s) => s.streak)
  const lives = useStore((s) => s.lives)
  const { isGuest, clearSession } = useSession()
  const clearAccountUser = useStore((s) => s.clearAccountUser)
  const avatarText = (userInfo?.nickName || '易')[0]

  const onLogout = async () => {
    try { await accountApi.logout() } catch {}
    clearSession()
    clearAccountUser()
  }

  return (
    <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-60 z-40 bg-[linear-gradient(160deg,#221f33_0%,#1a1a2e_100%)] border-r border-[rgba(212,168,67,0.25)]">
      {/* Logo：朱砂印章 + 题名 */}
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-[rgba(212,168,67,0.18)] shrink-0">
        <img
          src="/logo.png"
          alt="易学"
          className="w-9 h-9 rounded-md object-cover ring-1 ring-[rgba(212,168,67,0.35)]"
        />
        <div className="leading-tight">
          <div className="title-serif text-xl text-yiji-gold">易学</div>
          <div className="text-[9px] text-white/35 tracking-widest">易经 · 游戏化修习</div>
        </div>
      </div>

      {/* 导航 */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition',
                isActive
                  ? 'bg-yiji-gold/15 text-yiji-gold font-medium shadow-[inset_3px_0_0_0_#d4a843]'
                  : 'text-white/65 hover:bg-white/8 hover:text-yiji-gold'
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* AI 解卦 */}
      <div className="px-3 pb-3">
        <button
          onClick={() => navigate('/divination')}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-yiji-gold text-[#1a1a2e] text-sm font-semibold active:scale-95 transition shadow-[0_2px_10px_rgba(212,168,67,0.35)]"
        >
          <Sparkles size={16} /> AI 解卦
        </button>
      </div>

      {/* 用户信息 */}
      <div className="px-3 pb-4 pt-3 border-t border-[rgba(212,168,67,0.18)]">
        <button onClick={() => navigate('/account')} className="w-full flex items-center gap-3 mb-2 text-left">
          <div className="w-9 h-9 rounded-full bg-[rgba(212,168,67,0.18)] text-yiji-gold flex items-center justify-center title-serif shrink-0">
            {avatarText}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-white/85 truncate">{userInfo?.nickName || '游客'}</div>
            <div className="text-[11px] text-white/45 flex items-center gap-2">
              <span>🔥 {streak}</span>
              <span>❤ {lives}</span>
            </div>
          </div>
          <Settings size={16} className="text-white/40" />
        </button>
        {isGuest ? (
          <button onClick={() => navigate('/login')} className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-yiji-gold text-[#1a1a2e] text-xs font-medium active:scale-95 transition">
            登录 / 注册
          </button>
        ) : (
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 text-white/55 text-xs active:scale-95 transition hover:bg-white/10">
            <LogOut size={14} /> 退出登录
          </button>
        )}
      </div>
    </aside>
  )
}
