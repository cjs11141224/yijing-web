import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flame, Heart, ChevronRight, Sparkles, Users, HelpCircle, CalendarHeart, Crown, Trophy, BookOpen } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { hexagrams } from '@/data/appData'
import type { Hexagram } from '@/types'

const POEMS = [
  '潜龙勿用，蓄势待发',
  '见龙在田，利见大人',
  '终日乾乾，与时偕行',
  '或跃在渊，进无咎也',
  '飞龙在天，大人造也',
  '亢龙有悔，盈不可久',
  '地势坤，君子以厚德载物',
  '云雷屯，君子以经纶',
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 6) return '夜深了'
  if (h < 12) return '早上好'
  if (h < 18) return '下午好'
  return '晚上好'
}

// 山水 + 云纹背景 SVG
function MountainScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg viewBox="0 0 480 220" preserveAspectRatio="xMidYMax slice" className="absolute bottom-0 w-full h-[200px]">
        <path d="M0,150 Q70,100 140,128 T280,118 Q360,86 440,124 T480,132 L480,220 L0,220 Z" fill="rgba(44,95,111,0.10)" />
        <path d="M0,168 Q90,120 180,152 T360,144 Q420,116 480,150 L480,220 L0,220 Z" fill="rgba(212,168,67,0.16)" />
        <path d="M0,192 Q110,158 220,184 T440,178 Q470,162 480,182 L480,220 L0,220 Z" fill="rgba(26,26,46,0.30)" />
      </svg>
      {/* 云纹 */}
      <svg className="absolute top-3 right-4 w-24 h-9 opacity-60" viewBox="0 0 96 36">
        <path d="M2,24 Q14,8 28,20 Q36,4 50,16 Q62,2 76,16 Q86,8 94,20" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8,32 Q20,20 34,30 Q44,18 58,28 Q70,18 84,30" fill="none" stroke="rgba(212,168,67,0.75)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f4ecd8] via-[#f4ecd8]/70 to-transparent" />
    </div>
  )
}

export default function Home() {
  const nav = useNavigate()
  const userInfo = useStore((s) => s.userInfo)
  const streak = useStore((s) => s.streak)
  const lives = useStore((s) => s.lives)
  const maxLives = useStore((s) => s.maxLives)
  const learningProgress = useStore((s) => s.learningProgress)
  const collectedCards = useStore((s) => s.collectedCards)
  const signDates = useStore((s) => s.signDates)
  const doSignIn = useStore((s) => s.doSignIn)
  const checkSignIn = useStore((s) => s.checkSignIn)

  const dayOfYear = useMemo(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    return Math.floor((now.getTime() - start.getTime()) / 86400000)
  }, [])

  const todayHex = useMemo<Hexagram>(() => hexagrams[dayOfYear % hexagrams.length], [dayOfYear])
  const poem = useMemo(() => POEMS[dayOfYear % POEMS.length], [dayOfYear])

  const sortedHex = useMemo(() => [...hexagrams].sort((a, b) => a.order - b.order), [])
  const completedCount = useMemo(
    () => Object.values(learningProgress).filter((p) => p?.status === 'completed').length,
    [learningProgress]
  )
  const currentHex = useMemo(() => {
    const unlocked = sortedHex.find((h) => learningProgress[h.id]?.status !== 'completed')
    return unlocked || sortedHex[0]
  }, [sortedHex, learningProgress])

  const remaining = 64 - completedCount
  const progressPercent = (completedCount / 64) * 100
  const achievementCount =
    (streak >= 3 ? 1 : 0) +
    (streak >= 7 ? 1 : 0) +
    (completedCount >= 1 ? 1 : 0) +
    (completedCount >= 8 ? 1 : 0) +
    (collectedCards.length >= 1 ? 1 : 0) +
    (signDates.length >= 7 ? 1 : 0)
  const avatarText = (userInfo?.nickName || '易')[0]
  const nickname = userInfo?.nickName || '易友'

  const handleCheckin = () => {
    if (checkSignIn()) {
      nav('/checkin')
      return
    }
    const r = doSignIn()
    if (r) {
      toast.success(`签到成功 · 连续第 ${r.continuous} 天`, {
        description: r.fragment ? `奖励：+${r.lives} 生命值 + 1 卡牌碎片` : `奖励：+${r.lives} 生命值`,
      })
    }
    nav('/checkin')
  }

  const marks = [
    { pct: 25, label: '上经' },
    { pct: 50, label: '半程' },
    { pct: 75, label: '下经' },
    { pct: 100, label: '圆满' },
  ]

  const quickLinks = [
    { icon: Users, grad: 'from-[#b03a2e] to-[#8a2a22]', title: '易友社区', desc: '同修分享心得', to: '/community' },
    { icon: CalendarHeart, grad: 'from-[#2c5f6f] to-[#1d4250]', title: '限时活动', desc: '节令专题 · 双倍奖励', to: '/events' },
    { icon: HelpCircle, grad: 'from-[#5d8a66] to-[#3f6b48]', title: '问答求助', desc: '高人解惑 · 每日精选', to: '/qa' },
  ]

  return (
    <div className="pb-6 lg:pb-8">
      {/* ===== Hero：山水云纹 + 身份 + 今日一卦 + 数据三联 ===== */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yiji-gold-light/60 to-[#f6efdc]/40 p-4 sm:p-5 mb-4 gold-frame">
        <MountainScene />
        <div className="relative">
          {/* 顶栏 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yiji-gold to-[#b8881d] flex items-center justify-center text-white title-serif text-lg shadow-card">
                {avatarText}
              </div>
              <div className="leading-tight">
                <div className="title-serif text-[15px]">{getGreeting()}，{nickname}</div>
                <div className="text-[11px] bg-[#b03a2e]/10 text-[#b03a2e] px-1.5 py-0.5 rounded inline-block mt-0.5">{poem}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleCheckin} className="flex items-center gap-1 bg-white/80 backdrop-blur rounded-full px-2.5 py-1 shadow-xs active:scale-95 transition">
                <Flame size={14} className="text-[#b03a2e]" />
                <span className="text-xs font-semibold text-foreground">{streak}</span>
              </button>
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur rounded-full px-2.5 py-1 shadow-xs">
                <Heart size={14} className="text-[#b03a2e] fill-[#b03a2e]" />
                <span className="text-xs font-semibold text-foreground">{lives}/{maxLives}</span>
              </div>
            </div>
          </div>

          {/* 今日一卦 */}
          <button
            onClick={() => nav(`/learn/${todayHex.id}`)}
            className="w-full yi-card rounded-2xl p-3.5 flex items-center gap-3 active:scale-[0.98] transition text-left"
          >
            <div className="flex flex-col items-center justify-center w-16 shrink-0">
              <span className="text-[10px] text-muted-foreground mb-0.5">今日一卦</span>
              <span className="hex-symbol text-4xl text-yiji-gold leading-none">{todayHex.symbol}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="title-serif text-lg">{todayHex.name}卦</span>
                <span className="text-[11px] text-muted-foreground">第 {todayHex.order} 卦</span>
              </div>
              <div className="text-[11px] text-foreground/70 line-clamp-1 mt-0.5">{todayHex.da_xiang}</div>
              <div className="flex gap-1.5 mt-1.5">
                {todayHex.keywords.slice(0, 3).map((k) => (
                  <span key={k} className="text-[10px] bg-[#2c5f6f]/12 text-[#2c5f6f] px-1.5 py-0.5 rounded">{k}</span>
                ))}
              </div>
            </div>
            <ChevronRight size={18} className="text-muted-foreground shrink-0" />
          </button>

          {/* 数据三联 */}
          <div className="mt-4 yi-card rounded-2xl flex items-center py-3">
            <button onClick={handleCheckin} className="flex-1 flex flex-col items-center">
              <span className="title-serif text-xl text-[#b03a2e]">{streak}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">连续签到</span>
            </button>
            <div className="w-px h-8 bg-border" />
            <div className="flex-1 flex flex-col items-center">
              <span className="title-serif text-xl text-[#5d8a66]">{collectedCards.length}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">已收卡牌</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <button onClick={() => nav('/achievements')} className="flex-1 flex flex-col items-center">
              <span className="title-serif text-xl text-yiji-gold">{achievementCount}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">已获成就</span>
            </button>
          </div>
        </div>
      </section>

      {/* ===== 两栏：主内容 + 侧栏 ===== */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* 主列 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 进度长卷 */}
          <section>
            <div className="flex items-baseline justify-between mb-2">
              <span className="title-serif text-sm">已学 {completedCount} / 64 卦</span>
              <span className="text-[11px] text-muted-foreground">距「易经通」还 {remaining} 卦</span>
            </div>
            <div className="relative h-2 bg-yiji-warm-gray rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#5d8a66] to-yiji-gold rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progressPercent, 3)}%` }}
              />
              {marks.map((m) => (
                <div key={m.pct} className="absolute top-0 h-full" style={{ left: `${m.pct}%` }}>
                  <div className="w-px h-full bg-white/60" />
                </div>
              ))}
            </div>
            <div className="relative h-4 mt-0.5">
              {marks.map((m) => (
                <span key={m.pct} className="absolute -translate-x-1/2 text-[9px] text-muted-foreground" style={{ left: `${m.pct}%` }}>
                  {m.label}
                </span>
              ))}
            </div>
          </section>

          {/* 易经图谱：仅展示 2 行，其余进图谱页 */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="title-serif text-sm flex items-center gap-1.5"><BookOpen size={15} className="text-yiji-gold" /> 易经图谱</span>
              <button onClick={() => nav('/hexagrams')} className="flex items-center text-[11px] text-muted-foreground">
                查看全部 <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
              {sortedHex.slice(0, 16).map((hex, i) => {
                const status = learningProgress[hex.id]?.status
                const isCurrent = hex.id === currentHex.id
                const vis =
                  i < 8 ? '' : i < 12 ? 'hidden sm:flex' : 'hidden lg:flex'
                return (
                  <button
                    key={hex.id}
                    onClick={() => nav(`/learn/${hex.id}`)}
                    className={cn(
                      'shrink-0 aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 transition active:scale-95 hex-cell',
                      status === 'completed'
                        ? 'bg-yiji-gold-light'
                        : status === 'unlocked'
                          ? 'bg-white shadow-xs'
                          : 'bg-yiji-warm-gray/60',
                      isCurrent ? 'ring-2 ring-yiji-gold' : '',
                      vis
                    )}
                  >
                    <span className={cn('hex-symbol text-[22px] leading-none', status === 'locked' ? 'text-light-gray' : 'text-yiji-gold')}>
                      {hex.symbol}
                    </span>
                    <span className={cn('text-[11px] leading-none', status === 'locked' ? 'text-light-gray' : 'text-foreground')}>
                      {hex.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* 双宫格 */}
          <section className="grid grid-cols-2 gap-3">
            <button
              onClick={() => nav(`/learn/${currentHex.id}`)}
              className="yi-card rounded-2xl p-4 text-left active:scale-[0.98] transition relative overflow-hidden"
            >
              <span className="text-[10px] bg-[#b03a2e]/12 text-[#b03a2e] px-1.5 py-0.5 rounded">今日学习</span>
              <div className="title-serif text-lg mt-2">{currentHex.name}卦</div>
              <div className="text-[11px] text-muted-foreground line-clamp-2 mt-1">{currentHex.da_xiang}</div>
              <ChevronRight size={16} className="absolute right-3 bottom-3 text-yiji-gold" />
            </button>
            <button
              onClick={() => nav('/divination')}
              className="ink-card rounded-2xl p-4 text-left active:scale-[0.98] transition relative overflow-hidden"
            >
              <span className="text-[10px] font-medium text-[#1a1a2e] px-2 py-0.5 rounded bg-[#f0e6c5]">铜钱起卦</span>
              <div className="title-serif text-lg mt-2 text-white">AI 解卦</div>
              <div className="text-[11px] text-white/60 mt-1">问一事，得一卦</div>
              <Sparkles size={16} className="absolute right-3 bottom-3 text-yiji-gold" />
            </button>
          </section>

          {/* 三个横卡 */}
          <section className="space-y-2.5">
            {quickLinks.map(({ icon: Icon, grad, title, desc, to }) => (
              <button
                key={to}
                onClick={() => nav(to)}
                className="w-full yi-card rounded-2xl shadow-card p-3 flex items-center gap-3 active:scale-[0.98] transition text-left"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shrink-0`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="title-serif text-sm">{title}</div>
                  <div className="text-[11px] text-muted-foreground">{desc}</div>
                </div>
                <ChevronRight size={16} className="text-yiji-gold" />
              </button>
            ))}
          </section>
        </div>

        {/* 侧栏（仅桌面） */}
        <aside className="hidden lg:flex flex-col gap-4">
          {/* 连胜卡 */}
          <div className="yi-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={16} className="text-[#b03a2e]" />
              <span className="title-serif text-sm">连续签到</span>
            </div>
            <div className="title-serif text-3xl text-[#b03a2e]">{streak}<span className="text-sm text-muted-foreground ml-1">天</span></div>
            <p className="text-xs text-muted-foreground mt-1">已学 {completedCount} / 64 卦 · 共 {signDates.length} 天签到</p>
            <button onClick={handleCheckin} className="mt-3 w-full py-2 rounded-xl bg-yiji-gold text-[#1a1a2e] text-sm font-semibold active:scale-95 transition">
              今日签到
            </button>
          </div>

          {/* 卡牌收集 */}
          <div className="yi-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="title-serif text-sm flex items-center gap-1.5"><Crown size={16} className="text-yiji-gold" /> 卡牌收集</span>
              <span className="text-sm text-yiji-gold">{collectedCards.length}/64</span>
            </div>
            <div className="h-2 bg-yiji-warm-gray rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#5d8a66] to-yiji-gold rounded-full transition-all" style={{ width: `${(collectedCards.length / 64) * 100}%` }} />
            </div>
          </div>

          {/* 快捷入口 */}
          <div className="yi-card rounded-2xl p-4">
            <div className="title-serif text-sm mb-2 flex items-center gap-1.5"><Trophy size={16} className="text-yiji-gold" /> 快速入口</div>
            <div className="space-y-1">
              {quickLinks.map(({ icon: Icon, title, to }) => (
                <button key={to} onClick={() => nav(to)} className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-yiji-gold-light/50 transition text-left">
                  <Icon size={16} className="text-yiji-gold" />
                  <span className="text-sm">{title}</span>
                  <ChevronRight size={14} className="ml-auto text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
