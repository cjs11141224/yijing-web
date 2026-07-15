import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, RotateCcw, Loader2, ShieldCheck, MessageCircleHeart } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import { divineOrderAdminApi } from '@/services/divineOrder'
import type { RealDivinerOrder, DivineOrderStatus } from '@/types'

const STATUS_MAP: Record<DivineOrderStatus, { label: string; cls: string }> = {
  pending: { label: '待接单', cls: 'bg-[#f0e6c8] text-[#8a6d1f]' },
  accepted: { label: '已接单', cls: 'bg-yiji-dai/15 text-yiji-dai' },
  done: { label: '已完成', cls: 'bg-yiji-green/15 text-yiji-green' },
}

const METHOD_LABEL: Record<string, string> = { time: '时间起卦', random: '随机起卦', manual: '手动起卦' }

const ADMIN_KEY_STORAGE = 'yj_admin_key'

type AdminOrder = RealDivinerOrder & { userName?: string; userNick?: string }

export default function AdminDivine() {
  const nav = useNavigate()
  const [key, setKey] = useState(() => localStorage.getItem(ADMIN_KEY_STORAGE) || '')
  const [entered, setEntered] = useState(false)

  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(false)

  const [view, setView] = useState<'list' | 'chat'>('list')
  const [activeOrder, setActiveOrder] = useState<AdminOrder | null>(null)
  const activeIdRef = useRef<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const [replyDraft, setReplyDraft] = useState('')
  const [replying, setReplying] = useState(false)

  const loadList = async () => {
    setLoading(true)
    try {
      const list = await divineOrderAdminApi.list(key)
      setOrders(list)
      setEntered(true)
      localStorage.setItem(ADMIN_KEY_STORAGE, key)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '加载失败')
      setEntered(false)
    } finally {
      setLoading(false)
    }
  }

  // 对话视图：每 5s 轮询，及时看到用户新追问
  useEffect(() => {
    if (view !== 'chat' || !activeIdRef.current) return
    const id = activeIdRef.current
    const t = setInterval(async () => {
      try {
        const o = await divineOrderAdminApi.list(key).then((l) => l.find((x) => x.id === id))
        if (o) setActiveOrder(o)
      } catch {
        /* 忽略 */
      }
    }, 5000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeOrder?.messages.length, view])

  const openChat = (o: AdminOrder) => {
    activeIdRef.current = o.id
    setActiveOrder(o)
    setView('chat')
  }

  const backToList = () => {
    activeIdRef.current = null
    setActiveOrder(null)
    setView('list')
    loadList()
  }

  const sendReply = async () => {
    if (!activeOrder) return
    if (replyDraft.trim().length < 1) {
      toast.error('请输入回复内容')
      return
    }
    setReplying(true)
    try {
      const updated = await divineOrderAdminApi.reply(activeOrder.id, replyDraft.trim(), key)
      setActiveOrder(updated)
      setReplyDraft('')
      toast.success('已回写，用户端将实时看到')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '回复失败')
    } finally {
      setReplying(false)
    }
  }

  const markStatus = async (status: DivineOrderStatus) => {
    if (!activeOrder) return
    try {
      const updated = await divineOrderAdminApi.setStatus(activeOrder.id, status, key)
      setActiveOrder(updated)
      toast.success(status === 'done' ? '已标记完成' : '已标记接单')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '操作失败')
    }
  }

  // ---------------- 未进入后台：密钥输入 ----------------
  if (!entered) {
    return (
      <div className="min-h-screen pb-6">
        <PageHeader title="真人解卦 · 后台" />
        <div className="px-4 pt-4">
          <div className="bg-white rounded-2xl shadow-card p-5 space-y-3">
            <div className="flex items-center gap-2 text-yiji-zhusha">
              <ShieldCheck size={18} />
              <span className="title-serif text-sm">管理密钥验证</span>
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              此页用于真人解卦师 / 管理员手动回写解读。请输入管理密钥（演示默认 <code className="px-1 bg-yiji-warm-gray rounded">yijing-admin-dev-key</code>，生产请通过环境变量 ADMIN_KEY 设置）。
            </p>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="请输入管理密钥"
              className="w-full text-[13.5px] outline-none bg-yiji-warm-gray rounded-xl px-3 py-2.5"
            />
            <button
              onClick={loadList}
              disabled={loading || key.trim().length === 0}
              className="w-full h-11 rounded-xl bg-yiji-ink text-white title-serif active:scale-95 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
              {loading ? '验证中…' : '进入后台'}
            </button>
            <button onClick={() => nav('/divine-order')} className="w-full text-center text-[12px] text-yiji-gold">
              返回用户端 →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ---------------- 对话视图（后台） ----------------
  if (view === 'chat' && activeOrder) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-10 bg-[#faf8f0] border-b border-[hsl(var(--border))] px-3 py-2.5 flex items-center gap-2">
          <button onClick={backToList} className="p-1.5 -ml-1 rounded-full active:scale-95">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="text-sm title-serif truncate">{activeOrder.question}</div>
            <div className="text-[11px] text-muted-foreground">
              {activeOrder.userName} · {METHOD_LABEL[activeOrder.method] ?? activeOrder.method} ·{' '}
              {new Date(activeOrder.createdAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <span className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 ${STATUS_MAP[activeOrder.status].cls}`}>
            {STATUS_MAP[activeOrder.status].label}
          </span>
        </div>

        <div className="flex-1 px-4 py-3 space-y-3">
          {activeOrder.notes ? (
            <div className="text-[11px] text-muted-foreground bg-yiji-warm-gray rounded-xl px-3 py-2">
              用户补充：{activeOrder.notes}
            </div>
          ) : null}

          {activeOrder.messages.map((m) =>
            m.role === 'user' ? (
              <div key={m.id} className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full bg-yiji-dai text-white flex items-center justify-center text-xs shrink-0 mt-0.5">用</div>
                <div className="max-w-[82%]">
                  <div className="text-[11px] text-yiji-dai mb-0.5">{activeOrder.userName ?? '用户'}</div>
                  <div className="bg-white rounded-2xl rounded-tl-sm shadow-card px-3.5 py-2 text-[13.5px] leading-relaxed whitespace-pre-wrap">
                    {m.text}
                  </div>
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-end gap-2">
                <div className="max-w-[82%]">
                  <div className="text-[11px] text-yiji-zhusha mb-0.5 text-right">真人解卦师（我）</div>
                  <div className="bg-yiji-ink text-[#faf8f0] rounded-2xl rounded-tr-sm px-3.5 py-2 text-[13.5px] leading-relaxed whitespace-pre-wrap">
                    {m.text}
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-yiji-zhusha text-white flex items-center justify-center text-xs shrink-0 mt-0.5">师</div>
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>

        <div className="sticky bottom-0 bg-[#faf8f0] border-t border-[hsl(var(--border))] px-3 py-2.5 space-y-2">
          <div className="flex items-end gap-2">
            <textarea
              rows={1}
              value={replyDraft}
              onChange={(e) => setReplyDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendReply()
                }
              }}
              placeholder="撰写真人解卦解读，回车发送…"
              className="flex-1 resize-none text-[13.5px] leading-relaxed outline-none bg-white rounded-xl px-3 py-2 max-h-28 border border-[hsl(var(--border))]"
            />
            <button
              onClick={sendReply}
              disabled={replying}
              className="h-9 w-9 shrink-0 rounded-xl bg-yiji-zhusha text-white flex items-center justify-center active:scale-95 transition disabled:opacity-50"
            >
              {replying ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
          <div className="flex gap-2">
            {activeOrder.status !== 'accepted' && (
              <button onClick={() => markStatus('accepted')} className="flex-1 h-8 rounded-lg text-[12px] border border-yiji-dai text-yiji-dai active:scale-95 transition">
                标记接单
              </button>
            )}
            {activeOrder.status !== 'done' && (
              <button onClick={() => markStatus('done')} className="flex-1 h-8 rounded-lg text-[12px] border border-yiji-green text-yiji-green active:scale-95 transition">
                标记完成
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ---------------- 列表视图（后台） ----------------
  return (
    <div className="min-h-screen pb-6">
      <PageHeader title="真人解卦 · 后台" />
      <div className="px-4 pt-2">
        <div className="bg-gradient-to-br from-yiji-ink to-[#2a2a44] rounded-2xl p-4 text-white flex items-center gap-2">
          <MessageCircleHeart size={18} className="text-yiji-gold" />
          <span className="text-sm title-serif">全部预约（{orders.length}）</span>
          <button onClick={loadList} className="ml-auto text-[11px] text-yiji-gold flex items-center gap-1">
            <RotateCcw size={11} /> 刷新
          </button>
        </div>
      </div>

      <div className="px-4 mt-4">
        {loading ? (
          <div className="flex justify-center py-8 text-muted-foreground">
            <Loader2 className="animate-spin" size={20} />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-card p-8 flex flex-col items-center text-center">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-sm text-muted-foreground">暂无真人解卦预约</p>
          </div>
        ) : (
          <div className="space-y-2">
            {orders.map((o) => {
              const st = STATUS_MAP[o.status]
              const last = o.messages[o.messages.length - 1]
              return (
                <button
                  key={o.id}
                  onClick={() => openChat(o)}
                  className="w-full text-left bg-white rounded-2xl shadow-card p-3.5 active:scale-[0.99] transition"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm leading-snug truncate">{o.question}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {o.userName} · {METHOD_LABEL[o.method] ?? o.method} · {o.messages.length} 条 ·{' '}
                        {new Date(o.createdAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <span className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                  </div>
                  {last ? (
                    <div className="text-[12px] text-muted-foreground truncate">
                      {last.role === 'user' ? '用户' : '师'}：{last.text}
                    </div>
                  ) : null}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
