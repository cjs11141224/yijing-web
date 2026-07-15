import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/store/useStore'
import { hexagrams } from '@/data/appData'
import type { Hexagram } from '@/types'

export default function Hexagrams() {
  const nav = useNavigate()
  const learningProgress = useStore((s) => s.learningProgress)

  const sorted = useMemo(() => [...hexagrams].sort((a, b) => a.order - b.order), [])
  const upper = sorted.filter((h) => h.order <= 30)
  const lower = sorted.filter((h) => h.order >= 31)
  const completed = Object.values(learningProgress).filter((p) => p?.status === 'completed').length

  const onTap = (hex: Hexagram) => {
    const status = learningProgress[hex.id]?.status
    if (status === 'locked') {
      toast.error('完成前一卦的学习即可解锁')
      return
    }
    nav(`/learn/${hex.id}`)
  }

  const renderGrid = (list: Hexagram[]) => (
    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
      {list.map((hex) => {
        const status = learningProgress[hex.id]?.status
        const locked = status === 'locked'
        const done = status === 'completed'
        return (
          <button
            key={hex.id}
            onClick={() => onTap(hex)}
            className={[
              'relative aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition active:scale-95',
              done ? 'bg-yiji-gold-light' : locked ? 'bg-yiji-warm-gray/50' : 'bg-white shadow-xs',
            ].join(' ')}
          >
            <span className={['hex-symbol text-3xl leading-none', locked ? 'text-light-gray' : 'text-yiji-gold'].join(' ')}>
              {hex.symbol}
            </span>
            <span className={['text-xs', locked ? 'text-light-gray' : 'text-foreground'].join(' ')}>
              {hex.name}
            </span>
            {done && <CheckCircle2 size={14} className="absolute top-1 right-1 text-yiji-gold" />}
            {locked && <Lock size={12} className="absolute top-1 right-1 text-light-gray" />}
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="pb-4">
      <div className="pt-4 pb-3">
        <h1 className="title-serif text-2xl">卦象图谱</h1>
        <p className="text-xs text-muted-foreground mt-1">循序渐进，自强不息</p>
      </div>

      <div className="mb-4">
        <div className="bg-white rounded-2xl shadow-card p-3.5">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm">学习进度</span>
            <span className="title-serif text-sm text-yiji-gold">{completed} / 64</span>
          </div>
          <div className="h-2 bg-yiji-warm-gray rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yiji-gold to-yiji-gold/80 rounded-full transition-all"
              style={{ width: `${(completed / 64) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <section className="mb-5">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="title-serif text-base">上经</h2>
          <span className="text-xs text-muted-foreground">乾至离 · 30 卦</span>
        </div>
        {renderGrid(upper)}
      </section>

      <section className="mb-5">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="title-serif text-base">下经</h2>
          <span className="text-xs text-muted-foreground">咸至未济 · 34 卦</span>
        </div>
        {renderGrid(lower)}
      </section>
    </div>
  )
}
