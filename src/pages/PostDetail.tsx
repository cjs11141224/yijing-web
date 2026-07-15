import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, Send, Star } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import { useSession } from '@/store/useSession'
import { communityApi } from '@/services/community'
import type { CommunityPost } from '@/types'

export default function PostDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const isGuest = useSession((s) => s.isGuest)
  const [post, setPost] = useState<CommunityPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    communityApi
      .getPost(id)
      .then(({ post }) => setPost(post))
      .catch((e: any) => toast.error(e?.message || '加载失败'))
      .finally(() => setLoading(false))
  }, [id])

  const guardLogin = (): boolean => {
    if (isGuest) {
      nav(`/login?redirect=/post/${id}`)
      return false
    }
    return true
  }

  const onLike = async () => {
    if (!post || !guardLogin()) return
    try {
      const { liked, likeCount } = await communityApi.toggleLike(post.id)
      setPost({ ...post, liked, likeCount })
    } catch (e: any) {
      toast.error(e?.message || '操作失败')
    }
  }

  const onFav = async () => {
    if (!post || !guardLogin()) return
    try {
      const { favorited } = await communityApi.toggleFavorite(post.id)
      setPost({ ...post, favorited })
      toast.success(favorited ? '已收藏' : '已取消收藏')
    } catch (e: any) {
      toast.error(e?.message || '操作失败')
    }
  }

  const onSend = async () => {
    if (!post || !guardLogin()) return
    if (!comment.trim()) return
    try {
      const { comment: c, commentCount } = await communityApi.addComment(post.id, comment.trim())
      setPost({ ...post, comments: [...post.comments, c], commentCount })
      setComment('')
      toast.success('评论成功')
    } catch (e: any) {
      toast.error(e?.message || '评论失败')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <PageHeader title="帖子详情" />
        <div className="p-6 text-center text-muted-foreground text-sm">加载中…</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <PageHeader title="帖子详情" />
        <div className="p-6 text-center text-muted-foreground text-sm">帖子不存在或已被删除</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <PageHeader title="帖子详情" />
      <div className="p-4">
        {/* 作者 */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-full bg-yiji-gold-light flex items-center justify-center text-yiji-gold title-serif">
            {post.author.nickname[0]}
          </div>
          <div className="flex-1">
            <div className="text-sm">{post.author.nickname}</div>
            <div className="text-[11px] text-muted-foreground">{post.createdAt}</div>
          </div>
          <span className="text-[10px] bg-yiji-gold-light text-yiji-gold px-1.5 py-0.5 rounded">{post.typeName}</span>
        </div>

        {/* 标题 + 内容 */}
        <h1 className="title-serif text-lg mb-2">{post.title}</h1>
        <div className="text-sm text-foreground/90 whitespace-pre-line leading-relaxed">{post.content}</div>

        {post.hexagramName && (
          <button
            onClick={() => nav('/hexagrams')}
            className="mt-3 inline-block text-xs text-yiji-gold bg-yiji-gold-light/50 px-2 py-1 rounded"
          >
            ☰ {post.hexagramName}卦
          </button>
        )}

        {/* 互动 */}
        <div className="flex items-center gap-5 mt-4 pb-3 border-b border-[hsl(var(--border))]">
          <button
            onClick={onLike}
            className={`flex items-center gap-1.5 text-sm ${post.liked ? 'text-yiji-red' : 'text-muted-foreground'}`}
          >
            <Heart size={16} className={post.liked ? 'fill-yiji-red' : ''} /> {post.likeCount}
          </button>
          <button
            onClick={onFav}
            className={`flex items-center gap-1.5 text-sm ${post.favorited ? 'text-yiji-gold' : 'text-muted-foreground'}`}
          >
            <Star size={16} className={post.favorited ? 'fill-yiji-gold' : ''} /> {post.favorited ? '已收藏' : '收藏'}
          </button>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            💬 {post.commentCount}
          </span>
        </div>

        {/* 评论 */}
        <h3 className="title-serif text-sm mt-4 mb-3">评论 {post.comments.length}</h3>
        <div className="space-y-3">
          {post.comments.map((c) => (
            <div key={c.id} className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-yiji-warm-gray flex items-center justify-center text-[11px] shrink-0">
                {c.nickname[0]}
              </div>
              <div className="flex-1">
                <div className="text-xs text-yiji-gold">{c.nickname}</div>
                <div className="text-sm mt-0.5">{c.content}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{c.time}</div>
              </div>
            </div>
          ))}
          {post.comments.length === 0 && (
            <div className="text-center text-xs text-muted-foreground py-4">还没有评论，来抢沙发吧</div>
          )}
        </div>
      </div>

      {/* 评论输入 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl bg-white border-t border-[hsl(var(--border))] p-3 flex items-center gap-2 z-20">
        <input
          className="flex-1 bg-yiji-warm-gray rounded-full px-4 py-2 text-sm outline-none"
          placeholder="写下你的评论…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
        />
        <button onClick={onSend} className="w-9 h-9 rounded-full bg-yiji-gold text-white flex items-center justify-center active:scale-90 transition">
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
