import { useState, useMemo } from 'react'
import { Check } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/store/useStore'

export default function Checkin() {
  const signDates = useStore((s) => s.signDates)
  const checkSignIn = useStore((s) => s.checkSignIn)
  const doSignIn = useStore((s) => s.doSignIn)
  const getContinuousSignDays = useStore((s) => s.getContinuousSignDays)
  const [signed, setSigned] = useState(checkSignIn())
  const continuous = getContinuousSignDays()

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const todayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay() || 7 // 周一为 1
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const arr: ({ day: number; date: string; signed: boolean; isToday: boolean } | null)[] = []
    for (let i = 1; i < firstDay; i++) arr.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      arr.push({ day: d, date: ds, signed: signDates.includes(ds), isToday: ds === todayStr })
    }
    return arr
  }, [year, month, signDates, todayStr])

  const onSignIn = () => {
    if (signed) return
    const r = doSignIn()
    if (r) {
      setSigned(true)
      toast.success(`签到成功 · 连续第 ${r.continuous} 天`, {
        description: r.fragment ? `奖励：+${r.lives} 生命 + 1 卡牌碎片` : `奖励：+${r.lives} 生命值`,
      })
    }
  }

  const rewards = [
    { days: '每日', reward: '+1 生命值' },
    { days: '连续 3 天', reward: '+1 生命值' },
    { days: '连续 7 天', reward: '+2 生命 + 1 卡牌碎片' },
  ]

  return (
    <div className="min-h-screen pb-6">
      <div className="px-4 pt-4 pb-3">
        <h1 className="title-serif text-2xl">每日签到</h1>
        <p className="text-xs text-muted-foreground mt-1">坚持签到，福报自来</p>
      </div>

      {/* 连续签到卡片 */}
      <div className="px-4">
        <div className="bg-gradient-to-br from-yiji-gold to-[#b8881d] rounded-2xl p-5 text-white text-center">
          <div className="text-xs opacity-90">已连续签到</div>
          <div className="title-serif text-5xl my-1">{continuous}</div>
          <div className="text-xs opacity-90">天</div>
          <button
            onClick={onSignIn}
            disabled={signed}
            className={`mt-4 px-8 h-11 rounded-xl title-serif transition active:scale-95 ${
              signed ? 'bg-white/30 text-white' : 'bg-white text-yiji-gold'
            }`}
          >
            {signed ? '今日已签 ✓' : '立即签到'}
          </button>
        </div>
      </div>

      {/* 日历 */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl shadow-card p-4">
          <div className="title-serif text-sm text-center mb-3">
            {year}年 {month + 1}月
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['一', '二', '三', '四', '五', '六', '日'].map((d) => (
              <div key={d} className="text-center text-[11px] text-muted-foreground py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => (
              <div key={i} className="aspect-square flex items-center justify-center">
                {d && (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs relative ${
                      d.signed
                        ? 'bg-yiji-gold text-white'
                        : d.isToday
                          ? 'border-2 border-yiji-gold text-yiji-gold'
                          : 'text-foreground'
                    }`}
                  >
                    {d.signed ? <Check size={14} /> : d.day}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 奖励规则 */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl shadow-card p-4">
          <h3 className="title-serif text-sm mb-3">签到奖励</h3>
          <div className="space-y-2">
            {rewards.map((r) => (
              <div key={r.days} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{r.days}</span>
                <span className="text-yiji-gold">{r.reward}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
