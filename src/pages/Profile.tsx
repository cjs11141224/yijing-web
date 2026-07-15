import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Gem, GraduationCap, Sparkles, FileText, BarChart3,
  Award, Users, Trophy, ChevronRight, LogOut, Settings,
} from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/store/useStore'
import { useSession } from '@/store/useSession'
import { accountApi } from '@/services/account'

export default function Profile() {
  const nav = useNavigate()
  const userInfo = useStore((s) => s.userInfo)
  const isPaid = useStore((s) => s.isPaid)
  const memberType = useStore((s) => s.memberType)
  const certificationLevel = useStore((s) => s.certificationLevel)
  const streak = useStore((s) => s.streak)
  const collectedCards = useStore((s) => s.collectedCards)
  const divinationRecords = useStore((s) => s.divinationRecords)
  const learningProgress = useStore((s) => s.learningProgress)
  const { clearSession, currentUser } = useSession()
  const clearAccountUser = useStore((s) => s.clearAccountUser)
  const userBalance = currentUser?.balance ?? 128

  const learnedCount = useMemo(
    () => Object.values(learningProgress).filter((p) => p?.status === 'completed').length,
    [learningProgress]
  )

  const memberText = memberType ? ({ monthly: '月度', quarterly: '季度', yearly: '年度' }[memberType]) : ''
  const certText = certificationLevel ? ({ primary: '初级', middle: '中级', senior: '高级' }[certificationLevel]) : ''
  const nickname = userInfo?.nickName || '未登录'
  const loginTypeText = userInfo ? ({ wechat: '微信登录', phone: '手机号登录', guest: '游客模式', account: '账号登录' }[userInfo.loginType]) : '未登录'
  const avatarText = (userInfo?.nickName || '易')[0]

  const onLogout = async () => {
    try { await accountApi.logout() } catch {}
    clearSession()
    clearAccountUser()
    toast.success('已退出登录')
    nav('/')
  }

  const entries1 = [
    { icon: Gem, name: '会员中心', badge: memberText, to: '/membership' },
    { icon: GraduationCap, name: '解卦师认证', badge: certText, to: '/certification' },
    { icon: Sparkles, name: '付费解卦', badge: '', to: '/divine-order' },
    { icon: FileText, name: '我的内容', badge: '', to: '/market' },
  ]
  const entries2 = [
    { icon: BarChart3, name: '学习统计', to: '/stats' },
    { icon: Award, name: '成就徽章', to: '/achievements' },
    { icon: Users, name: '我的好友', to: '/friends' },
    { icon: Trophy, name: '排行榜', to: '/leaderboard' },
  ]

  return (
    <div className="min-h-screen pb-6">
      {/* 用户卡 */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yiji-gold to-yiji-gold/70 flex items-center justify-center text-white title-serif text-2xl shrink-0">
            {avatarText}
          </div>
          <div className="flex-1 min-w-0">
            <div className="title-serif text-base truncate">{nickname}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{loginTypeText}</div>
          </div>
          {!userInfo && (
            <button onClick={() => nav('/login')} className="text-xs text-yiji-gold border border-yiji-gold px-3 py-1 rounded-full">
              去登录
            </button>
          )}
          {userInfo?.loginType === 'account' && (
            <button onClick={() => nav('/account')} className="text-yiji-gold" aria-label="账号设置">
              <Settings size={18} />
            </button>
          )}
        </div>
      </div>

      {/* 付费状态 */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-2xl shadow-card p-4 flex items-center justify-between">
          <div>
            <div className="text-sm">AI 解卦</div>
            <div className={`text-xs mt-0.5 ${isPaid ? 'text-yiji-gold' : 'text-muted-foreground'}`}>
              {isPaid ? '已解锁无限解卦' : '未解锁，仅免费体验 1 次'}
            </div>
          </div>
          {isPaid ? (
            <span className="text-[10px] bg-yiji-gold-light text-yiji-gold px-2 py-1 rounded">已解锁</span>
          ) : (
            <button onClick={() => nav('/membership')} className="text-xs bg-yiji-gold text-white px-3 py-1.5 rounded-lg">
              去解锁
            </button>
          )}
        </div>
      </div>

      {/* 入口组1 */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {entries1.map((e, i) => (
            <button
              key={e.name}
              onClick={() => nav(e.to)}
              className={`w-full flex items-center gap-3 px-4 py-3 active:bg-yiji-warm-gray transition ${i > 0 ? 'border-t border-[hsl(var(--border))]' : ''}`}
            >
              <e.icon size={20} className="text-yiji-gold shrink-0" />
              <span className="flex-1 text-left text-sm">{e.name}</span>
              {e.badge && <span className="text-[10px] bg-yiji-gold-light text-yiji-gold px-1.5 py-0.5 rounded">{e.badge}</span>}
              {e.name === '我的内容' && <span className="text-xs text-muted-foreground">¥{userBalance}</span>}
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* 学习统计 */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-2xl shadow-card p-4">
          <h3 className="title-serif text-sm mb-3">学习统计</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            <div className="text-center">
              <div className="title-serif text-xl text-yiji-gold">{learnedCount}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">已学卦数</div>
            </div>
            <div className="text-center border-x border-[hsl(var(--border))]">
              <div className="title-serif text-xl text-yiji-gold">{streak}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">连胜天数</div>
            </div>
            <div className="text-center">
              <div className="title-serif text-xl text-yiji-gold">{collectedCards.length}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">卡牌数</div>
            </div>
          </div>
        </div>
      </div>

      {/* 入口组2 */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {entries2.map((e, i) => (
            <button
              key={e.name}
              onClick={() => nav(e.to)}
              className={`w-full flex items-center gap-3 px-4 py-3 active:bg-yiji-warm-gray transition ${i > 0 ? 'border-t border-[hsl(var(--border))]' : ''}`}
            >
              <e.icon size={20} className="text-yiji-gold shrink-0" />
              <span className="flex-1 text-left text-sm">{e.name}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* 解卦历史 */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-2xl shadow-card p-4">
          <h3 className="title-serif text-sm mb-3">解卦历史</h3>
          {divinationRecords.length > 0 ? (
            <div className="space-y-2.5">
              {divinationRecords.slice(0, 10).map((r) => (
                <div key={r.id} className="flex gap-2.5">
                  <span className="hex-symbol text-2xl text-yiji-gold leading-none shrink-0">{r.hexagramSymbol}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs truncate">{r.question}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {r.hexagramName}卦 · {r.createdAt}
                    </div>
                  </div>
                </div>
              ))}
              {divinationRecords.length >= 10 && <div className="text-[11px] text-muted-foreground text-center pt-1">仅显示最近 10 条</div>}
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              <div className="text-3xl mb-1">🔮</div>
              <p className="text-xs text-muted-foreground">还没有解卦记录</p>
              <button onClick={() => nav('/divination')} className="mt-2 text-xs text-yiji-gold border border-yiji-gold px-3 py-1 rounded">
                去试一次
              </button>
            </div>
          )}
        </div>
      </div>

      {userInfo && (
        <div className="px-4 mt-3">
          <button
            onClick={onLogout}
            className="w-full h-11 rounded-xl bg-white border border-[hsl(var(--border))] text-sm text-muted-foreground active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <LogOut size={16} /> 退出登录
          </button>
        </div>
      )}

      <p className="text-center text-[10px] text-muted-foreground mt-4">易学 · V2.4 Web · 仅供学习参考</p>
    </div>
  )
}
