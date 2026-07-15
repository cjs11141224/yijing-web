import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, ShoppingCart, Plus } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { useSession } from '@/store/useSession'
import { marketApi } from '@/services/market'
import type { ContentType, MarketContent } from '@/types'

const TYPE_LABEL: Record<string, string> = { course: '课程', note: '笔记', case: '解卦案例' }

export default function Market() {
  const nav = useNavigate()
  const { isGuest } = useSession()
  const [contents, setContents] = useState<MarketContent[]>([])
  const [tab, setTab] = useState<'all' | ContentType>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)
    marketApi
      .list(tab === 'all' ? undefined : tab)
      .then((r) => { if (alive) setContents(r.contents) })
      .catch(() => { if (alive) setContents([]) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [tab])

  const onPublish = () => {
    if (isGuest) { nav('/login?redirect=/publish-content'); return }
    nav('/publish-content')
  }

  const tabs: { key: 'all' | ContentType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'course', label: '课程' },
    { key: 'note', label: '笔记' },
    { key: 'case', label: '案例' },
  ]

  return (
    <div className="pb-20 lg:pb-8">
      <PageHeader
        title="内容市场"
        right={
          <button onClick={onPublish}>
            <Plus size={20} className="text-yiji-gold" />
          </button>
        }
      />

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

      {loading ? (
        <div className="mt-10 text-center text-sm text-muted-foreground">加载中…</div>
      ) : (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {contents.map((c) => (
            <button
              key={c.id}
              onClick={() => nav(`/content/${c.id}`)}
              className="bg-white rounded-2xl shadow-card p-3.5 flex gap-3 text-left active:scale-[0.98] transition"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yiji-gold-light to-yiji-gold/30 flex items-center justify-center shrink-0">
                <span className="title-serif text-2xl text-yiji-gold">{TYPE_LABEL[c.type][0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] bg-yiji-gold-light text-yiji-gold px-1.5 py-0.5 rounded">{c.typeName}</span>
                  {c.isFree && <span className="text-[10px] bg-yiji-green/15 text-yiji-green px-1.5 py-0.5 rounded">免费</span>}
                  {c.purchased && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">已购</span>}
                </div>
                <div className="title-serif text-sm line-clamp-1">{c.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{c.summary}</div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                    <Star size={11} className="text-yiji-gold fill-yiji-gold" /> {c.rating}
                  </span>
                  <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                    <ShoppingCart size={11} /> {c.sales}
                  </span>
                  <span className={`text-sm title-serif ml-auto ${c.isFree ? 'text-yiji-green' : 'text-yiji-gold'}`}>
                    {c.isFree ? '免费' : `¥${c.price}`}
                  </span>
                </div>
              </div>
            </button>
          ))}
          {contents.length === 0 && (
            <div className="col-span-full mt-10 text-center text-sm text-muted-foreground">暂无内容</div>
          )}
        </div>
      )}

      <button
        onClick={onPublish}
        className="fixed bottom-6 right-4 lg:right-8 px-4 h-11 rounded-full bg-yiji-gold text-white shadow-card flex items-center gap-1.5 text-sm active:scale-95 transition z-20"
      >
        <Plus size={18} /> 发布内容
      </button>
    </div>
  )
}
