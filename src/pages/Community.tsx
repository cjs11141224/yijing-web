import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, PenLine, Heart, MessageCircle, Flame, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'
import { useSession } from '@/store/useSession'
import { communityApi } from '@/services/community'
import { hexagrams } from '@/data/appData'
import type { CommunityPost } from '@/types'

const TYPE_STYLES: Record<string, string> = {
  note: 'bg-yiji-gold-light text-yiji-gold',
  case: 'bg-blue-100 text-blue-600',
  question: 'bg-green-100 text-green-600',
}

export default function Community() {
  const nav = useNavigate()
  const isGuest = useSession((s) => s.isGuest)
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'hot' | 'hexagram' | 'qa'>('hot')
  const [keyword, setKeyword] = useState('')
  const [selectedHex, setSelectedHex] = useState('')
  const [stats, setStats] = useState<{ posts: number; comments: number } | null>(null)

  const hexList = useMemo(() => [...hexagrams].sort((a, b) => a.order - b.order), [])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const tabParam = tab === 'qa' ? 'qa' : undefined
      const [{ posts }, statsRes] = await Promise.all([
        communityApi.listPosts({ tab: tabParam }),
        communityApi.stats().catch(() => null),
      ])
      setPosts(posts)
      if (statsRes) setStats({ posts: statsRes.posts, comments: statsRes.comments })
    } catch (e: any) {
      toast.error(e?.message || '加载失败')
    } finally {
      setLoading(false)
    }
  }, [tab])

  useEffect(() => {
    load()
  }, [load])

  const displayPosts = useMemo(() => {
    let list = [...posts]
    if (keyword) {
      const k = keyword.toLowerCase()
      list = list.filter(
        (p) => p.title.toLowerCase().includes(k) || p.summary.toLowerCase().includes(k)
      )
    }
    if (tab === 'hexagram' && selectedHex) {
      list = list.filter((p) => p.hexagramId === selectedHex)
    }
    return list
  }, [posts, keyword, tab, selectedHex])

  const onLike = async (e: MouseEvent, p: CommunityPost) => {
    e.stopPropagation()
    if (isGuest) {
      nav('/login?redirect=/community')
      return
    }
    try {
      const { liked, likeCount } = await communityApi.toggleLike(p.id)
      setPosts((list) => list.map((x) => (x.id === p.id ? { ...x, liked, likeCount } : x)))
    } catch (err: any) {
      toast.error(err?.message || '操作失败')
    }
  }

  const onFab = () => {
    if (isGuest) {
      nav('/login?redirect=/create-post')
      return
    }
    nav('/create-post')
  }

  const tabs = [
    { key: 'hot' as const, label: '热门' },
    { key: 'hexagram' as const, label: '按卦' },
    { key: 'qa' as const, label: '问答' },
  ]

  const topAuthors = useMemo(
    () => [...posts].sort((a, b) => b.likeCount - a.likeCount).slice(0, 3),
    [posts]
  )
  const hotHexes = useMemo(
    () => [...hexagrams].sort((a, b) => a.order - b.order).slice(0, 8),
    []
  )

  return (
    <div className="pb-20 lg:pb-8">
      {/* 搜索 */}
      <div className="pt-4 pb-2 sticky top-0 bg-[hsl(var(--warm-white))]/95 backdrop-blur z-10">
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-xs">
          <Search size={16} className="text-muted-foreground" />
          <input
            className="flex-1 text-sm outline-none bg-transparent"
            placeholder="搜索卦名/话题…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && (
            <button onClick={() => setKeyword('')}>
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Tab */}
      <div className="flex gap-5 border-b border-[hsl(var(--border))]">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative py-2 text-sm transition ${tab === t.key ? 'text-yiji-gold title-serif' : 'text-muted-foreground'}`}
          >
            {t.label}
            {tab === t.key && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-yiji-gold rounded-full" />}
          </button>
        ))}
      </div>

      {/* 按卦筛选 */}
      {tab === 'hexagram' && (
        <div className="overflow-x-auto no-scrollbar py-2.5 border-b border-[hsl(var(--border))]">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedHex('')}
              className={`shrink-0 text-xs px-2.5 py-1 rounded-full ${selectedHex === '' ? 'bg-yiji-gold text-white' : 'bg-yiji-warm-gray text-foreground'}`}
            >
              全部
            </button>
            {hexList.slice(0, 20).map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedHex(h.id)}
                className={`shrink-0 text-xs px-2.5 py-1 rounded-full ${selectedHex === h.id ? 'bg-yiji-gold text-white' : 'bg-yiji-warm-gray text-foreground'}`}
              >
                {h.name}卦
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 两栏 */}
      <div className="mt-3 grid lg:grid-cols-3 gap-4">
        {/* 主列 feed */}
        <div className="lg:col-span-2 space-y-3">
          {loading && (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="text-sm text-muted-foreground">加载中…</div>
            </div>
          )}

          {!loading &&
            displayPosts.map((p: CommunityPost) => (
              <button
                key={p.id}
                onClick={() => nav(`/post/${p.id}`)}
                className="w-full bg-white rounded-2xl shadow-card p-3.5 text-left active:scale-[0.98] transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-yiji-gold-light flex items-center justify-center text-[11px] text-yiji-gold title-serif">
                    {p.author.nickname[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs truncate">{p.author.nickname}</div>
                    <div className="text-[10px] text-muted-foreground">{p.createdAt}</div>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${TYPE_STYLES[p.type]}`}>{p.typeName}</span>
                </div>
                <div className="text-sm title-serif mb-1">{p.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">{p.summary}</div>
                {p.hexagramName && (
                  <span className="inline-block mt-2 text-[10px] text-yiji-gold bg-yiji-gold-light/50 px-1.5 py-0.5 rounded">
                    ☰ {p.hexagramName}卦
                  </span>
                )}
                <div className="flex items-center gap-4 mt-2.5 text-[11px] text-muted-foreground">
                  <button
                    onClick={(e) => onLike(e, p)}
                    className={`flex items-center gap-1 transition ${p.liked ? 'text-yiji-red' : 'text-muted-foreground'}`}
                  >
                    <Heart size={12} className={p.liked ? 'fill-yiji-red' : ''} /> {p.likeCount}
                  </button>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={12} /> {p.commentCount}
                  </span>
                </div>
              </button>
            ))}

          {!loading && displayPosts.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-sm text-muted-foreground">暂无相关帖子</p>
              <p className="text-xs text-muted-foreground mt-1">快来发表第一条帖子吧</p>
            </div>
          )}
        </div>

        {/* 侧栏（仅桌面） */}
        <aside className="hidden lg:flex flex-col gap-4">
          {/* 社区概览 */}
          <div className="bg-white rounded-2xl shadow-card p-4">
            <div className="text-sm title-serif mb-3 flex items-center gap-1.5">
              <TrendingUp size={16} className="text-yiji-gold" /> 社区概览
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <div className="title-serif text-xl text-yiji-gold">{stats ? stats.posts : posts.length}</div>
                <div className="text-[11px] text-muted-foreground">帖子</div>
              </div>
              <div>
                <div className="title-serif text-xl text-yiji-gold">{stats ? stats.comments : posts.reduce((s, p) => s + p.commentCount, 0)}</div>
                <div className="text-[11px] text-muted-foreground">讨论</div>
              </div>
            </div>
          </div>

          {/* 活跃同修 */}
          <div className="bg-white rounded-2xl shadow-card p-4">
            <div className="text-sm title-serif mb-3 flex items-center gap-1.5">
              <Flame size={16} className="text-orange-500" /> 活跃同修
            </div>
            <div className="space-y-2">
              {topAuthors.map((p) => (
                <button
                  key={p.id}
                  onClick={() => nav(`/post/${p.id}`)}
                  className="w-full flex items-center gap-2.5 text-left hover:bg-yiji-gold-light/40 rounded-lg p-1.5 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-yiji-gold-light flex items-center justify-center text-yiji-gold title-serif text-xs">
                    {p.author.nickname[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs truncate">{p.author.nickname}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{p.title}</div>
                  </div>
                  <span className="text-[11px] text-yiji-gold flex items-center gap-0.5">
                    <Heart size={11} /> {p.likeCount}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 热门卦象 */}
          <div className="bg-white rounded-2xl shadow-card p-4">
            <div className="text-sm title-serif mb-3">热门卦象</div>
            <div className="flex flex-wrap gap-2">
              {hotHexes.map((h) => (
                <button
                  key={h.id}
                  onClick={() => {
                    setTab('hexagram')
                    setSelectedHex(h.id)
                  }}
                  className="text-xs px-2.5 py-1 rounded-full bg-yiji-warm-gray hover:bg-yiji-gold-light text-foreground transition"
                >
                  {h.name}卦
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 发帖 FAB */}
      <button
        onClick={onFab}
        className="fixed bottom-20 lg:bottom-6 right-4 lg:right-8 w-12 h-12 rounded-full bg-yiji-gold text-white shadow-card flex items-center justify-center active:scale-90 transition z-20"
      >
        <PenLine size={22} />
      </button>
    </div>
  )
}
