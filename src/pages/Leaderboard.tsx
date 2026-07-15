import { Crown, Medal, Award } from 'lucide-react'
import { useStore } from '@/store/useStore'

const MOCK_USERS = [
  { rank: 1, name: '易学大师', avatar: '易', learned: 64, streak: 128, score: 9860, isMe: false },
  { rank: 2, name: '乾坤通鉴', avatar: '乾', learned: 58, streak: 96, score: 8420, isMe: false },
  { rank: 3, name: '卦象达人', avatar: '卦', learned: 52, streak: 77, score: 7210, isMe: false },
  { rank: 4, name: '周易学者', avatar: '周', learned: 47, streak: 65, score: 6580, isMe: false },
  { rank: 5, name: '太极爱好者', avatar: '太', learned: 41, streak: 54, score: 5830, isMe: false },
  { rank: 6, name: '国学少年', avatar: '国', learned: 38, streak: 43, score: 5210, isMe: false },
  { rank: 7, name: '梅花易数', avatar: '梅', learned: 33, streak: 39, score: 4680, isMe: false },
  { rank: 8, name: '解卦师老王', avatar: '解', learned: 29, streak: 35, score: 4120, isMe: false },
  { rank: 9, name: '卦象小生', avatar: '卦', learned: 24, streak: 28, score: 3560, isMe: false },
  { rank: 10, name: '初学小白', avatar: '初', learned: 18, streak: 21, score: 2890, isMe: false },
]

export default function Leaderboard() {
  const streak = useStore((s) => s.streak)
  const learningProgress = useStore((s) => s.learningProgress)
  const userInfo = useStore((s) => s.userInfo)
  const myLearned = Object.values(learningProgress).filter((p) => p?.status === 'completed').length
  const myScore = myLearned * 100 + streak * 20

  // 插入"我"
  const meEntry = {
    rank: 0,
    name: userInfo?.nickName || '我',
    avatar: (userInfo?.nickName || '我')[0],
    learned: myLearned,
    streak,
    score: myScore,
    isMe: true,
  }
  const allUsers = [...MOCK_USERS, meEntry].sort((a, b) => b.score - a.score)
  const myRank = allUsers.findIndex((u) => u.isMe) + 1

  const top3 = allUsers.slice(0, 3)
  const rest = allUsers.slice(3)

  const rankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={16} className="text-yellow-500" />
    if (rank === 2) return <Medal size={16} className="text-gray-400" />
    if (rank === 3) return <Award size={16} className="text-amber-700" />
    return <span className="text-xs text-muted-foreground w-4 text-center">{rank}</span>
  }

  return (
    <div className="min-h-screen pb-6">
      <div className="px-4 pt-4 pb-3">
        <h1 className="title-serif text-2xl">排行榜</h1>
        <p className="text-xs text-muted-foreground mt-1">我的排名：第 {myRank} 名 · {myScore} 分</p>
      </div>

      {/* 前三名 */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-br from-yiji-gold/15 to-yiji-gold/5 rounded-2xl p-4 flex justify-around items-end">
          {top3.map((u, i) => (
            <div key={i} className="flex flex-col items-center" style={{ order: u.rank === 1 ? 2 : u.rank === 2 ? 1 : 3 }}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center title-serif text-white mb-1 ${
                u.rank === 1 ? 'bg-yellow-500 h-14 w-14 text-lg' : u.rank === 2 ? 'bg-gray-400' : 'bg-amber-700'
              }`}>
                {u.avatar}
              </div>
              <div className="text-xs truncate max-w-[60px]">{u.name}</div>
              <div className="text-[11px] text-yiji-gold">{u.score}</div>
              <div className="mt-1">{rankIcon(u.rank)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 列表 */}
      <div className="px-4 space-y-2">
        {rest.map((u) => (
          <div
            key={u.rank}
            className={`bg-white rounded-2xl shadow-card p-3 flex items-center gap-3 ${u.isMe ? 'ring-2 ring-yiji-gold' : ''}`}
          >
            {rankIcon(u.rank)}
            <div className="w-8 h-8 rounded-full bg-yiji-gold-light flex items-center justify-center text-xs text-yiji-gold title-serif">
              {u.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate">{u.name}{u.isMe && <span className="text-yiji-gold text-xs ml-1">（我）</span>}</div>
              <div className="text-[11px] text-muted-foreground">已学 {u.learned} 卦 · 连胜 {u.streak} 天</div>
            </div>
            <div className="title-serif text-sm text-yiji-gold">{u.score}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
