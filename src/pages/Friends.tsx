import { UserPlus, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'

const MOCK_FRIENDS = [
  { name: '易学小生', avatar: '易', learned: 42, streak: 35, online: true },
  { name: '卦象达人', avatar: '卦', learned: 58, streak: 96, online: true },
  { name: '太极爱好者', avatar: '太', learned: 41, streak: 54, online: false },
  { name: '国学少年', avatar: '国', learned: 38, streak: 43, online: false },
  { name: '解卦师老王', avatar: '解', learned: 29, streak: 35, online: true },
  { name: '梅花易数', avatar: '梅', learned: 33, streak: 39, online: false },
]

export default function Friends() {
  return (
    <div className="min-h-screen pb-6">
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <div>
          <h1 className="title-serif text-2xl">我的好友</h1>
          <p className="text-xs text-muted-foreground mt-1">共 {MOCK_FRIENDS.length} 位易友</p>
        </div>
        <button
          onClick={() => toast.info('邀请功能开发中')}
          className="w-9 h-9 rounded-full bg-yiji-gold text-white flex items-center justify-center active:scale-90 transition"
        >
          <UserPlus size={18} />
        </button>
      </div>

      <div className="px-4 space-y-2">
        {MOCK_FRIENDS.map((f) => (
          <div key={f.name} className="bg-white rounded-2xl shadow-card p-3 flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-yiji-gold-light flex items-center justify-center title-serif text-yiji-gold">
                {f.avatar}
              </div>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${f.online ? 'bg-yiji-green' : 'bg-gray-300'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm">{f.name}</div>
              <div className="text-[11px] text-muted-foreground">已学 {f.learned} 卦 · 连胜 {f.streak} 天</div>
            </div>
            <button
              onClick={() => toast.info(`向 ${f.name} 发起对话`)}
              className="w-9 h-9 rounded-full bg-yiji-warm-gray flex items-center justify-center active:scale-90 transition"
            >
              <MessageCircle size={16} className="text-yiji-gold" />
            </button>
          </div>
        ))}
      </div>

      <div className="px-4 mt-6">
        <button
          onClick={() => toast.info('邀请功能开发中')}
          className="w-full h-11 rounded-xl bg-white border border-dashed border-yiji-gold text-yiji-gold text-sm active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <UserPlus size={16} /> 邀请好友一起学易
        </button>
      </div>
    </div>
  )
}
