import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Send, RotateCcw, MessageCircleHeart, Loader2, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import { useSession } from '@/store/useSession'
import { divineOrderApi, DIVINE_ORDER_PRICE } from '@/services/divineOrder'
import type { RealDivinerOrder } from '@/types'
import type { DivineMethod } from '@/services/aiService'

const STATUS_MAP: Record<RealDivinerOrder['status'], { label: string; cls: string }> = {
  pending: { label: '待接单', cls: 'bg-[#f0e6c8] text-[#8a6d1f]' },
  accepted: { label: '已接单', cls: 'bg-yiji-dai/15 text-yiji-dai' },
  done: { label: '已完成', cls: 'bg-yiji-green/15 text-yiji-green' },
}

const METHOD_LABEL: Record<DivineMethod, string> = { time: '时间起卦', random: '随机起卦', manual: '手动起卦' }

function lastPreview(o: RealDivinerOrder): string {
  const m = o.messages[o.messages.length - 1]
  if (!m) return o.question
  return `${m.role === 'user' ? '我' : '解卦师'}：${m.text}`
}

export default function DivineOrder() {
  const nav = useNavigate()
  const { currentUser, isGuest, setUser } = useSession()

  // 列表视图 / 对话视图
  const [view, setView] = useState<'list' | 'chat'>('list')
  const [orders, setOrders] = useState<RealDivinerOrder[]>([])
  const [activeOrder, setActiveOrder] = useState<RealDivinerOrder | null>(null)
  const activeIdRef = useRef<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [question, setQuestion] = useState('')
  const [method, setMethod] = useState<DivineMethod>('time')
  const [notes, setNotes] = useState('')
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)

  const loadOrders = async () => {
    if (isGuest) {
      setOrders([])
      return
    }
    setLoading(true)
    try {
      setOrders(await divineOrderApi.list())
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '加载失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest])

  // 对话视图：每 4s 轮询拉取最新消息（近实时）
  useEffect(() => {
    if (view !== 'chat' || !activeIdRef.current) return
    const id = activeIdRef.current
    const t = setInterval(async () => {
      try {
        const o = await divineOrderApi.get(id)
        setActiveOrder(o)
      } catch {
        /* 忽略轮询瞬时错误 */
      }
    }, 4000)
    return () => clearInterval(t)
  }, [view])

  // 新消息自动滚动到底
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeOrder?.messages.length, view])

  const openChat = (o: RealDivinerOrder) => {
    activeIdRef.current = o.id
    setActiveOrder(o)
    setView('chat')
  }

  const backToList = () => {
    activeIdRef.current = null
    setActiveOrder(null)
    setView('list')
    loadOrders()
  }

  const submit = async () => {
    if (isGuest) {
      nav('/login?redirect=/divine-order')
      return
    }
    if (question.trim().length < 2) {
      toast.error('请填写您想问的问题')
      return
    }
    setSubmitting(true)
    try {
      const { order, balance } = await divineOrderApi.create({ question: question.trim(), method, notes: notes.trim() })
      setUser({ balance })
      setQuestion('')
      setNotes('')
      setDraft('')
      toast.success('预约成功，真人解卦师将尽快为您解读')
      // 直接进入对话视图，展示提交的提问
      openChat(order)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '提交失败')
    } finally {
      setSubmitting(false)
    }
  }

  const sendFollowUp = async () => {
    if (!activeOrder) return
    if (draft.trim().length < 1) {
      toast.error('请输入消息')
      return
    }
    if (activeOrder.status === 'done') {
      toast.error('该预约已完成，无法继续追问')
      return
    }
    setSending(true)
    try {
      const updated = await divineOrderApi.sendMessage(activeOrder.id, draft.trim())
      setActiveOrder(updated)
      setDraft('')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : '发送失败')
    } finally {
      setSending(false)
    }
  }

  // ---------------- 对话视图 ----------------
  if (view === 'chat' && activeOrder) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* 顶部栏 */}
        <div className="sticky top-0 z-10 bg-[#faf8f0] border-b border-[hsl(var(--border))] px-3 py-2.5 flex items-center gap-2">
          <button onClick={backToList} className="p-1.5 -ml-1 rounded-full active:scale-95">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="text-sm title-serif truncate">{activeOrder.question}</div>
            <div className="text-[11px] text-muted-foreground">
              {METHOD_LABEL[activeOrder.method]} · {new Date(activeOrder.createdAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <span className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 ${STATUS_MAP[activeOrder.status].cls}`}>
            {STATUS_MAP[activeOrder.status].label}
          </span>
        </div>

        {/* 消息流 */}
        <div className="flex-1 px-4 py-3 space-y-3">
          {activeOrder.notes ? (
            <div className="text-[11px] text-muted-foreground bg-yiji-warm-gray rounded-xl px-3 py-2">
              补充信息：{activeOrder.notes}
            </div>
          ) : null}

          {activeOrder.messages.map((m) =>
            m.role === 'user' ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[82%] bg-yiji-ink text-[#faf8f0] rounded-2xl rounded-tr-sm px-3.5 py-2 text-[13.5px] leading-relaxed whitespace-pre-wrap">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full bg-yiji-zhusha text-white flex items-center justify-center text-xs shrink-0 mt-0.5">师</div>
                <div className="max-w-[82%]">
                  <div className="text-[11px] text-yiji-dai mb-0.5">真人解卦师</div>
                  <div className="bg-white rounded-2xl rounded-tl-sm shadow-card px-3.5 py-2 text-[13.5px] leading-relaxed whitespace-pre-wrap">
                    {m.text}
                  </div>
                </div>
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>

        {/* 输入区 */}
        <div className="sticky bottom-0 bg-[#faf8f0] border-t border-[hsl(var(--border))] px-3 py-2.5">
          {activeOrder.status === 'done' ? (
            <p className="text-center text-[11px] text-muted-foreground py-1.5">该预约已完成，对话已结束</p>
          ) : (
            <div className="flex items-end gap-2">
              <textarea
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendFollowUp()
                  }
                }}
                placeholder="继续向真人解卦师提问…"
                className="flex-1 resize-none text-[13.5px] leading-relaxed outline-none bg-white rounded-xl px-3 py-2 max-h-28 border border-[hsl(var(--border))]"
              />
              <button
                onClick={sendFollowUp}
                disabled={sending}
                className="h-9 w-9 shrink-0 rounded-xl bg-yiji-zhusha text-white flex items-center justify-center active:scale-95 transition disabled:opacity-50"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ---------------- 列表视图 ----------------
  return (
    <div className="min-h-screen pb-6">
      <PageHeader title="真人解卦" />

      <div className="px-4 pt-2">
        {/* 真人解卦师介绍卡 */}
        <div className="bg-gradient-to-br from-yiji-ink to-[#2a2a44] rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircleHeart size={20} className="text-yiji-gold" />
            <h2 className="title-serif text-base">真人解卦师 · 一对一解读</h2>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            由资深易经学者结合六十四卦、命理与您的具体处境，给出有温度、可落地的真人解读。提交预约后进入接单队列，解读完成即可在此查看回复，也可继续追问。
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-white/60">单次服务</span>
            <span className="text-yiji-gold title-serif font-semibold">¥{DIVINE_ORDER_PRICE.toFixed(2)}</span>
          </div>
          {!isGuest && currentUser && (
            <div className="text-[11px] text-white/50 mt-1">当前余额 ¥{(currentUser.balance ?? 0).toFixed(2)}</div>
          )}
        </div>
      </div>

      {/* 预约表单 */}
      <div className="px-4 mt-4">
        <h3 className="title-serif text-sm mb-2">提交预约</h3>
        <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
          <div>
            <label className="text-xs text-muted-foreground">您想问的问题</label>
            <textarea
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：近期事业该不该变动？感情走向如何？"
              className="w-full mt-1 resize-none text-[13.5px] leading-relaxed outline-none bg-yiji-warm-gray rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">起卦方式</label>
            <div className="flex gap-2 mt-1">
              {(
                [
                  { k: 'time', ico: '⏱', label: '时间' },
                  { k: 'random', ico: '🎲', label: '随机' },
                  { k: 'manual', ico: '✋', label: '手动' },
                ] as { k: DivineMethod; ico: string; label: string }[]
              ).map((m) => (
                <button
                  key={m.k}
                  onClick={() => setMethod(m.k)}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-[11px] border transition active:scale-95 ${
                    method === m.k
                      ? 'bg-yiji-ink text-[#faf8f0] border-yiji-ink'
                      : 'bg-white text-muted-foreground border-[hsl(var(--border))]'
                  }`}
                >
                  <span className="text-base leading-none">{m.ico}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">补充信息（选填）</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="可补充生辰、现状等，帮助解卦师更精准解读"
              className="w-full mt-1 resize-none text-[13.5px] leading-relaxed outline-none bg-yiji-warm-gray rounded-xl px-3 py-2.5"
            />
          </div>

          <button
            onClick={submit}
            disabled={submitting}
            className="w-full h-11 rounded-xl bg-yiji-zhusha text-white title-serif active:scale-95 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {isGuest ? '登录后预约' : submitting ? '提交中…' : `提交预约 · ¥${DIVINE_ORDER_PRICE.toFixed(2)}`}
          </button>
        </div>
      </div>

      {/* 我的预约 */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="title-serif text-sm">我的预约</h3>
          {orders.length > 0 && (
            <button onClick={loadOrders} className="text-[11px] text-yiji-gold flex items-center gap-1">
              <RotateCcw size={11} /> 刷新
            </button>
          )}
        </div>

        {isGuest ? (
          <div className="bg-white rounded-2xl shadow-card p-8 flex flex-col items-center text-center">
            <div className="text-4xl mb-2">🔮</div>
            <p className="text-sm text-muted-foreground">登录后可提交真人解卦预约</p>
            <button
              onClick={() => nav('/login?redirect=/divine-order')}
              className="mt-3 text-xs text-yiji-gold border border-yiji-gold px-4 py-1.5 rounded"
            >
              去登录
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-8 text-muted-foreground">
            <Loader2 className="animate-spin" size={20} />
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-2">
            {orders.map((o) => {
              const st = STATUS_MAP[o.status]
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
                        {METHOD_LABEL[o.method]} ·{' '}
                        {new Date(o.createdAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <span className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                  </div>
                  <div className="text-[12px] text-muted-foreground truncate flex items-center gap-1">
                    {o.status === 'pending' ? <Sparkles size={11} className="text-yiji-gold shrink-0" /> : null}
                    {lastPreview(o)}
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-card p-8 flex flex-col items-center text-center">
            <div className="text-4xl mb-2">📜</div>
            <p className="text-sm text-muted-foreground">还没有真人解卦预约</p>
            <p className="text-[11px] text-muted-foreground mt-1">提交上方预约，真人解卦师将为您解读</p>
          </div>
        )}
      </div>
    </div>
  )
}
