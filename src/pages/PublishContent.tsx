import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import { useSession } from '@/store/useSession'
import { marketApi } from '@/services/market'
import type { ContentType } from '@/types'

export default function PublishContent() {
  const nav = useNavigate()
  const { isGuest } = useSession()
  const [type, setType] = useState<ContentType>('note')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [price, setPrice] = useState('0')
  const [submitting, setSubmitting] = useState(false)

  const typeOptions: { key: ContentType; label: string }[] = [
    { key: 'note', label: '笔记' },
    { key: 'case', label: '解卦案例' },
    { key: 'course', label: '课程' },
  ]

  const onSubmit = async () => {
    if (title.trim().length < 2) { toast.error('请输入标题'); return }
    if (content.trim().length < 20) { toast.error('正文至少 20 字'); return }
    if (isGuest) { nav('/login?redirect=/publish-content'); return }
    setSubmitting(true)
    try {
      await marketApi.publish({
        type,
        title: title.trim(),
        summary: summary.trim() || content.trim().slice(0, 40),
        content: content.trim(),
        price: Number(price) || 0,
      })
      toast.success('发布成功')
      nav(-1)
    } catch (e: any) {
      toast.error(e?.message || '发布失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pb-24">
      <PageHeader title="发布内容" />
      <div className="p-4 space-y-4">
        <div>
          <label className="text-xs text-muted-foreground">内容类型</label>
          <div className="flex gap-2 mt-2">
            {typeOptions.map((t) => (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                className={`flex-1 py-2 rounded-lg text-sm transition ${type === t.key ? 'bg-yiji-gold text-white' : 'bg-white'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground">标题</label>
          <input
            className="w-full mt-2 bg-white rounded-xl px-3 py-2.5 text-sm outline-none shadow-xs"
            placeholder="内容标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={30}
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">简介（选填）</label>
          <input
            className="w-full mt-2 bg-white rounded-xl px-3 py-2.5 text-sm outline-none shadow-xs"
            placeholder="一句话介绍你的内容"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            maxLength={50}
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">价格（元，0 为免费）</label>
          <input
            type="number"
            min="0"
            step="0.1"
            className="w-full mt-2 bg-white rounded-xl px-3 py-2.5 text-sm outline-none shadow-xs"
            placeholder="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">正文</label>
          <textarea
            className="w-full mt-2 bg-white rounded-xl px-3 py-2.5 text-sm outline-none shadow-xs resize-none min-h-[200px]"
            placeholder="输入正文内容…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl p-4 bg-[hsl(var(--warm-white))] border-t border-[hsl(var(--border))]">
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="w-full h-11 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition disabled:opacity-60"
        >
          {submitting ? '发布中…' : '发布'}
        </button>
      </div>
    </div>
  )
}
