import { useEffect, useMemo, useState } from 'react'
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts'
import { useStore } from '@/store/useStore'
import { communityApi } from '@/services/community'
import { hexagrams } from '@/data/appData'

export default function Stats() {
  const learningProgress = useStore((s) => s.learningProgress)
  const streak = useStore((s) => s.streak)
  const longestStreak = useStore((s) => s.longestStreak)
  const collectedCards = useStore((s) => s.collectedCards)
  const divinationRecords = useStore((s) => s.divinationRecords)
  const signDates = useStore((s) => s.signDates)
  const [cStats, setCStats] = useState<{ posts: number; likes: number; comments: number }>({
    posts: 0,
    likes: 0,
    comments: 0,
  })
  useEffect(() => {
    communityApi
      .stats()
      .then((s) => setCStats({ posts: s.posts, likes: s.likes, comments: s.comments }))
      .catch(() => {})
  }, [])

  const learnedCount = useMemo(
    () => Object.values(learningProgress).filter((p) => p?.status === 'completed').length,
    [learningProgress]
  )
  const totalCards = hexagrams.length

  // 本周活跃 mock（基于 signDates 近 7 天）
  const weekData = useMemo(() => {
    const days = ['一', '二', '三', '四', '五', '六', '日']
    const today = new Date()
    return days.map((d, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() - (6 - i))
      const ds = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      const active = signDates.includes(ds) ? 1 : 0
      return { day: d, active: active + Math.floor(Math.random() * 2) }
    })
  }, [signDates])

  const stats = [
    { label: '已学卦数', value: `${learnedCount}`, sub: `/ ${totalCards}` },
    { label: '当前连胜', value: `${streak}`, sub: `天` },
    { label: '最长连胜', value: `${longestStreak}`, sub: `天` },
    { label: '卡牌收集', value: `${collectedCards.length}`, sub: `/ ${totalCards}` },
    { label: '解卦次数', value: `${divinationRecords.length}`, sub: `次` },
    { label: '签到天数', value: `${signDates.length}`, sub: `天` },
  ]

  return (
    <div className="min-h-screen pb-6">
      <div className="px-4 pt-4 pb-3">
        <h1 className="title-serif text-2xl">学习统计</h1>
        <p className="text-xs text-muted-foreground mt-1">坚持学习，自强不息</p>
      </div>

      <div className="px-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-card p-3 text-center">
            <div className="title-serif text-lg text-yiji-gold">
              {s.value}<span className="text-[11px] text-muted-foreground ml-0.5">{s.sub}</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 本周活跃图表 */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl shadow-card p-4">
          <h3 className="title-serif text-sm mb-3">本周学习活跃</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData} barSize={20}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999' }} />
                <Bar dataKey="active" radius={[4, 4, 0, 0]}>
                  {weekData.map((_, i) => (
                    <Cell key={i} fill="#d4a843" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 社区贡献 */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl shadow-card p-4">
          <h3 className="title-serif text-sm mb-3">社区贡献</h3>
          <div className="flex justify-around">
            <div className="text-center">
              <div className="title-serif text-xl text-yiji-gold">{cStats.posts}</div>
              <div className="text-[11px] text-muted-foreground">帖子</div>
            </div>
            <div className="text-center">
              <div className="title-serif text-xl text-yiji-gold">{cStats.likes}</div>
              <div className="text-[11px] text-muted-foreground">获赞</div>
            </div>
            <div className="text-center">
              <div className="title-serif text-xl text-yiji-gold">{cStats.comments}</div>
              <div className="text-[11px] text-muted-foreground">评论</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
