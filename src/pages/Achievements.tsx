import { useEffect, useMemo, useState } from 'react'
import { Lock } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { communityApi } from '@/services/community'
import { hexagrams } from '@/data/appData'

interface Achievement {
  id: string
  name: string
  desc: string
  icon: string
  unlocked: boolean
}

export default function Achievements() {
  const streak = useStore((s) => s.streak)
  const collectedCards = useStore((s) => s.collectedCards)
  const signDates = useStore((s) => s.signDates)
  const divinationRecords = useStore((s) => s.divinationRecords)
  const learningProgress = useStore((s) => s.learningProgress)
  const [myPosts, setMyPosts] = useState(0)
  useEffect(() => {
    communityApi.stats().then((s) => setMyPosts(s.myPosts)).catch(() => {})
  }, [])

  const learnedCount = useMemo(
    () => Object.values(learningProgress).filter((p) => p?.status === 'completed').length,
    [learningProgress]
  )

  const achievements: Achievement[] = [
    { id: 'first_learn', name: '初窥门径', desc: '完成第一卦学习', icon: '🌱', unlocked: learnedCount >= 1 },
    { id: 'learn_8', name: '渐入佳境', desc: '学完 8 卦', icon: '📖', unlocked: learnedCount >= 8 },
    { id: 'learn_64', name: '易学宗师', desc: '学完全部 64 卦', icon: '🏆', unlocked: learnedCount >= hexagrams.length },
    { id: 'streak_3', name: '三日不辍', desc: '连续学习 3 天', icon: '🔥', unlocked: streak >= 3 },
    { id: 'streak_7', name: '一周不间断', desc: '连续学习 7 天', icon: '⚡', unlocked: streak >= 7 },
    { id: 'streak_30', name: '月度坚持', desc: '连续学习 30 天', icon: '💎', unlocked: streak >= 30 },
    { id: 'card_1', name: '收藏新手', desc: '获得第 1 张卡牌', icon: '🃏', unlocked: collectedCards.length >= 1 },
    { id: 'card_16', name: '卡牌收藏家', desc: '收集 16 张卡牌', icon: '🎴', unlocked: collectedCards.length >= 16 },
    { id: 'card_64', name: '卦象全集', desc: '集齐 64 张卡牌', icon: '👑', unlocked: collectedCards.length >= hexagrams.length },
    { id: 'divine_1', name: '初次问卦', desc: '完成 1 次 AI 解卦', icon: '🔮', unlocked: divinationRecords.length >= 1 },
    { id: 'divine_10', name: '解卦达人', desc: '完成 10 次解卦', icon: '✨', unlocked: divinationRecords.length >= 10 },
    { id: 'sign_7', name: '签到一周', desc: '累计签到 7 天', icon: '📅', unlocked: signDates.length >= 7 },
    { id: 'post_1', name: '分享之星', desc: '发布第 1 条帖子', icon: '✍️', unlocked: myPosts >= 1 },
    { id: 'post_5', name: '社区活跃', desc: '发布 5 条帖子', icon: '💬', unlocked: myPosts >= 5 },
  ]

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="min-h-screen pb-6">
      <div className="px-4 pt-4 pb-3">
        <h1 className="title-serif text-2xl">成就徽章</h1>
        <p className="text-xs text-muted-foreground mt-1">已解锁 {unlockedCount} / {achievements.length}</p>
      </div>

      <div className="px-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`rounded-2xl p-3 flex flex-col items-center text-center aspect-square justify-center ${
              a.unlocked ? 'bg-gradient-to-br from-yiji-gold-light to-white shadow-card' : 'bg-yiji-warm-gray/60'
            }`}
          >
            <span className={`text-3xl mb-1 ${a.unlocked ? '' : 'opacity-30 grayscale'}`}>{a.icon}</span>
            <span className={`title-serif text-xs ${a.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>{a.name}</span>
            <span className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{a.desc}</span>
            {!a.unlocked && <Lock size={10} className="text-light-gray mt-1" />}
          </div>
        ))}
      </div>
    </div>
  )
}
