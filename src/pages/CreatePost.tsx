import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import { useSession } from '@/store/useSession'
import { communityApi } from '@/services/community'
import { hexagrams } from '@/data/appData'
import type { PostType } from '@/types'

export default function CreatePost() {
  const nav = useNavigate()
  const isGuest = useSession((s) => s.isGuest)
  const [type, setType] = useState<PostType>('note')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [hexId, setHexId] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isGuest) nav('/login?redirect=/create-post')
  }, [isGuest, nav])

  const typeOptions: { key: PostType; label: string }[] = [
    { key: 'note', label: '学习笔记' },
    { key: 'case', label: '解卦案例' },
    { key: 'question', label: '问答' },
  ]

  const onSubmit = async () => {
    if (isGuest) {
      nav('/login?redirect=/create-post')
      return
    }
    if (title.trim().length < 2) {
      toast.error('请输入标题')
      return
    }
    if (content.trim().length < 5) {
      toast.error('内容太短了')
      return
    }
    const hex = hexagrams.find((h) => h.id === hexId)
    setSubmitting(true)
    try {
      const { post } = await communityApi.createPost({
        type,
        title: title.trim(),
        content: content.trim(),
        hexagramId: hexId,
        hexagramName: hex?.name || '',
      })
      toast.success('发布成功')
      nav(`/post/${post.id}`)
    } catch (e: any) {
      toast.error(e?.message || '发布失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pb-24">
      <PageHeader title="发布帖子" />
      <div className="p-4 space-y-4">
        {/* 类型 */}
        <div>
          <label className="text-xs text-muted-foreground">帖子类型</label>
          <div className="flex gap-2 mt-2">
            {typeOptions.map((t) => (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                className={`flex-1 py-2 rounded-lg text-sm transition ${type === t.key ? 'bg-yiji-gold text-white' : 'bg-white text-foreground'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 标题 */}
        <div>
          <label className="text-xs text-muted-foreground">标题</label>
          <input
            className="w-full mt-2 bg-white rounded-xl px-3 py-2.5 text-sm outline-none shadow-xs"
            placeholder="一句话概括你的分享"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={30}
          />
        </div>

        {/* 关联卦象 */}
        <div>
          <label className="text-xs text-muted-foreground">关联卦象（可选）</label>
          <select
            className="w-full mt-2 bg-white rounded-xl px-3 py-2.5 text-sm outline-none shadow-xs"
            value={hexId}
            onChange={(e) => setHexId(e.target.value)}
          >
            <option value="">不关联</option>
            {[...hexagrams].sort((a, b) => a.order - b.order).map((h) => (
              <option key={h.id} value={h.id}>{h.name}卦 · 第{h.order}卦</option>
            ))}
          </select>
        </div>

        {/* 内容 */}
        <div>
          <label className="text-xs text-muted-foreground">正文</label>
          <textarea
            className="w-full mt-2 bg-white rounded-xl px-3 py-2.5 text-sm outline-none shadow-xs resize-none min-h-[160px]"
            placeholder="分享你的学习心得、解卦案例或提出问题…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl p-4 bg-[hsl(var(--warm-white))] border-t border-[hsl(var(--border))]">
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="w-full h-11 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition disabled:opacity-50"
        >
          发布
        </button>
      </div>
    </div>
  )
}
