import { CalendarHeart, Gift } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/store/useStore'
import { hexagrams } from '@/data/appData'

export default function Events() {
  const events = useStore((s) => s.events)
  const eventParticipated = useStore((s) => s.eventParticipated)

  const onJoin = (eventId: string) => {
    if (eventParticipated[eventId]) {
      toast.info('今日已参与该活动')
      return
    }
    // 简化：标记参与
    toast.success('参与成功，完成对应卦象学习即可领取奖励')
  }

  return (
    <div className="min-h-screen pb-6">
      <div className="px-4 pt-4 pb-3">
        <h1 className="title-serif text-2xl">限时活动</h1>
        <p className="text-xs text-muted-foreground mt-1">节令专题 · 双倍奖励</p>
      </div>

      <div className="px-4 space-y-3">
        {events.map((e) => {
          const hex = hexagrams.find((h) => h.id === e.targetHexagramId)
          return (
            <div
              key={e.id}
              className={`rounded-2xl p-4 ${
                e.active ? 'bg-gradient-to-br from-[#c84a4a] to-[#962a2a] text-white shadow-card' : 'bg-yiji-warm-gray/60 text-muted-foreground'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${e.active ? 'bg-white/20' : 'bg-white'}`}>
                  <CalendarHeart size={22} className={e.active ? 'text-white' : 'text-muted-foreground'} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="title-serif text-base">{e.name}</span>
                    {e.active ? (
                      <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded">进行中</span>
                    ) : (
                      <span className="text-[10px] bg-gray-300/30 px-1.5 py-0.5 rounded">未开始</span>
                    )}
                  </div>
                  <p className={`text-xs mt-1 ${e.active ? 'text-white/80' : ''}`}>{e.desc}</p>
                  {hex && (
                    <p className={`text-xs mt-1 ${e.active ? 'text-white/90' : ''}`}>
                      指定卦象：<span className="title-serif">{hex.name}卦</span> {hex.symbol}
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 mt-2">
                    <Gift size={13} className={e.active ? 'text-yiji-gold-light' : 'text-muted-foreground'} />
                    <span className={`text-xs ${e.active ? 'text-yiji-gold-light' : ''}`}>{e.reward}</span>
                  </div>
                </div>
              </div>
              {e.active && (
                <button
                  onClick={() => onJoin(e.id)}
                  disabled={!!eventParticipated[e.id]}
                  className={`w-full mt-3 h-9 rounded-lg text-sm transition active:scale-95 ${
                    eventParticipated[e.id] ? 'bg-white/20 text-white/70' : 'bg-white text-[#c84a4a] title-serif'
                  }`}
                >
                  {eventParticipated[e.id] ? '已参与' : '立即参与'}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="px-4 mt-6 text-center">
        <p className="text-xs text-muted-foreground">更多精彩活动敬请期待</p>
      </div>
    </div>
  )
}
