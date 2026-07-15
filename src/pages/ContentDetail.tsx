import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, ShoppingCart, Lock } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import { useSession } from '@/store/useSession'
import { marketApi } from '@/services/market'
import type { MarketContent } from '@/types'

export default function ContentDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const { currentUser, isGuest, setUser } = useSession()
  const [content, setContent] = useState<MarketContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [buying, setBuying] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    marketApi
      .get(id)
      .then((r) => setContent(r.content))
      .catch(() => setContent(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen">
        <PageHeader title="内容详情" />
        <div className="p-6 text-center text-sm text-muted-foreground">加载中…</div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen">
        <PageHeader title="内容详情" />
        <div className="p-6 text-center text-sm text-muted-foreground">内容不存在</div>
      </div>
    )
  }

  const balance = currentUser?.balance ?? 128
  const isFree = content.isFree
  const accessible = content.purchased || isFree
  const previewText = accessible
    ? content.content
    : content.content.slice(0, Math.floor(content.content.length * (content.previewPercent / 100)))

  const onBuy = async () => {
    if (isGuest) { nav(`/login?redirect=/content/${content.id}`); return }
    if (balance < content.price) {
      toast.error(`余额不足，还差 ¥${(content.price - balance).toFixed(2)}`)
      return
    }
    setBuying(true)
    try {
      const r = await marketApi.purchase(content.id)
      setUser({ balance: r.balance })
      setContent({ ...content, purchased: true })
      toast.success('购买成功')
    } catch (e: any) {
      toast.error(e?.message || '购买失败')
    } finally {
      setBuying(false)
    }
  }

  return (
    <div className="min-h-screen pb-24">
      <PageHeader title="内容详情" />

      <div className="p-4">
        {/* 头部 */}
        <div className="flex gap-3 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yiji-gold-light to-yiji-gold/30 flex items-center justify-center shrink-0">
            <span className="title-serif text-2xl text-yiji-gold">{content.typeName[0]}</span>
          </div>
          <div className="flex-1">
            <h1 className="title-serif text-base">{content.title}</h1>
            <div className="text-xs text-muted-foreground mt-1">{content.author.nickname}</div>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                <Star size={11} className="text-yiji-gold fill-yiji-gold" /> {content.rating}
              </span>
              <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                <ShoppingCart size={11} /> {content.sales}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground bg-yiji-warm-gray rounded-lg p-3 mb-4">{content.author.intro}</p>

        {/* 内容 */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <h3 className="title-serif text-sm mb-2">内容简介</h3>
          <p className="text-xs text-foreground/80 mb-3">{content.summary}</p>
          <div className="whitespace-pre-line text-sm text-foreground/90 leading-relaxed">{previewText}</div>
          {!accessible && (
            <div className="mt-4 flex flex-col items-center py-4 border-t border-dashed border-[hsl(var(--border))]">
              <Lock size={24} className="text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">剩余 {100 - content.previewPercent}% 内容需购买后查看</p>
            </div>
          )}
        </div>
      </div>

      {/* 底部购买栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl bg-white border-t border-[hsl(var(--border))] p-3 flex items-center gap-3 z-20">
        <div className="flex-1">
          <div className="text-[11px] text-muted-foreground">余额 ¥{balance.toFixed(2)}</div>
          <div className={`title-serif text-lg ${isFree ? 'text-yiji-green' : 'text-yiji-gold'}`}>
            {isFree ? '免费' : `¥${content.price}`}
          </div>
        </div>
        {accessible ? (
          <button className="px-6 h-11 rounded-xl bg-yiji-green text-white text-sm active:scale-95 transition">已解锁</button>
        ) : (
          <button onClick={onBuy} disabled={buying} className="px-6 h-11 rounded-xl bg-yiji-gold text-white title-serif active:scale-95 transition disabled:opacity-60">
            {buying ? '处理中…' : '购买'}
          </button>
        )}
      </div>
    </div>
  )
}
