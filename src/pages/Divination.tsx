import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Send, Coins, Lock, RotateCcw, ChevronDown, MessageCircleHeart, X } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import { useStore } from '@/store/useStore'
import { useSession } from '@/store/useSession'
import {
  divine,
  deepText,
  castHexagram,
  baguaNames,
  type DivineResult,
  type DivineMethod,
} from '@/services/aiService'
import { divineApi, BalanceError } from '@/services/divine'

// ---------- 卦符（初爻在下、上爻在上） ----------
function HexGlyph({ id, className = '' }: { id: string; className?: string }) {
  const lines = id.split('') // index0..2 下卦(底) → 3..5 上卦(顶)
  return (
    <div className={`flex flex-col-reverse gap-[3px] ${className}`}>
      {lines.map((b, i) =>
        b === '1' ? (
          <div key={i} className="h-[5px] w-9 rounded-sm bg-yiji-gold" />
        ) : (
          <div key={i} className="relative h-[5px] w-9">
            <div className="absolute left-0 top-0 h-[5px] w-[40%] rounded-sm bg-yiji-gold" />
            <div className="absolute right-0 top-0 h-[5px] w-[40%] rounded-sm bg-yiji-gold" />
          </div>
        )
      )}
    </div>
  )
}

// ---------- Markdown 轻量渲染 ----------
function formatMd(text: string): ReactNode {
  return text.split('\n').map((line, i) => {
    if (line.trim() === '') return <div key={i} className="h-2" />
    const parts = line.split(/(\*\*[^*]+\*\*)/g)
    return (
      <p key={i} className="mb-1.5 leading-relaxed">
        {parts.map((p, j) =>
          p.startsWith('**') && p.endsWith('**') ? (
            <strong key={j} className="title-serif text-yiji-gold">{p.slice(2, -2)}</strong>
          ) : (
            <span key={j}>{p}</span>
          )
        )}
      </p>
    )
  })
}

// ---------- 消息类型 ----------
type Msg =
  | { id: string; role: 'user'; text: string; method?: DivineMethod }
  | { id: string; role: 'ai'; status: 'thinking' }
  | { id: string; role: 'ai'; status: 'done'; question: string; result: DivineResult; deepUnlocked: boolean }

const EXAMPLES = [
  '最近工作遇到瓶颈，该不该换方向？',
  '和伴侣最近总吵架，关系怎么改善？',
  '想创业但很犹豫，现在时机合适吗？',
]

export default function Divination() {
  const nav = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [method, setMethod] = useState<DivineMethod>('time')
  const [showDeep, setShowDeep] = useState<string | null>(null) // 待解锁的消息 id
  const [unlocking, setUnlocking] = useState(false)

  const recordDivination = useStore((s) => s.recordDivination)
  const { isGuest, currentUser, setUser } = useSession()
  const balance = currentUser?.balance

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const startDivination = (text: string, chosenMethod: DivineMethod) => {
    const q = text.trim()
    if (q.length < 2) return
    const uid = `u${Date.now()}`
    const aid = `a${Date.now()}`
    const hexId = chosenMethod === 'manual' ? castHexagram() : undefined
    setMessages((m) => [
      ...m,
      { id: uid, role: 'user', text: q, method: chosenMethod },
      { id: aid, role: 'ai', status: 'thinking' },
    ])
    setInput('')
    divine(
      q,
      { method: chosenMethod, manualHexId: hexId },
      (r) => {
        setMessages((m) =>
          m.map((msg) =>
            msg.id === aid
              ? { id: aid, role: 'ai', status: 'done', question: q, result: r, deepUnlocked: false }
              : msg
          )
        )
        recordDivination(q, r.hexagram.name, r.hexagram.symbol, r.response)
      }
    )
  }

  const send = (text: string) => startDivination(text, method)

  const onDeep = (msgId: string) => {
    if (isGuest) {
      nav('/login?redirect=/divination')
      return
    }
    setShowDeep(msgId)
  }

  const confirmDeep = async () => {
    if (!showDeep) return
    setUnlocking(true)
    try {
      const r = await divineApi.deep(12)
      setUser({ balance: r.balance })
      setMessages((m) =>
        m.map((msg) => (msg.id === showDeep && msg.role === 'ai' ? { ...msg, deepUnlocked: true } : msg))
      )
      toast.success('已解锁深度解读')
      setShowDeep(null)
    } catch (e) {
      if (e instanceof BalanceError) toast.error('余额不足，请先充值')
      else toast.error(e instanceof Error ? e.message : '解锁失败')
    } finally {
      setUnlocking(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    setInput('')
  }

  return (
    <div className="flex flex-col h-[100dvh] -mt-4 lg:-mt-8 -mb-4 lg:-mb-8 bg-[#faf8f0]">
      <PageHeader
        title="AI 解卦咨询"
        subtitle="问一事，得一卦"
        right={
          <div className="flex items-center gap-2">
            {balance != null ? (
              <span className="text-[11px] text-yiji-gold border border-yiji-gold/50 px-1.5 py-0.5 rounded">
                ¥{balance}
              </span>
            ) : (
              <span className="text-[10px] text-muted-foreground">游客</span>
            )}
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                title="清空对话"
                className="text-muted-foreground hover:text-yiji-gold active:scale-90 transition"
              >
                <RotateCcw size={15} />
              </button>
            )}
          </div>
        }
      />

      {/* 消息区 */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 sm:px-4 py-3">
        <div className="mx-auto w-full max-w-2xl space-y-3">
          {messages.length === 0 && (
            <div className="flex flex-col items-center text-center py-10 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yiji-gold/20 to-yiji-gold/10 flex items-center justify-center mb-3">
                <Sparkles size={28} className="text-yiji-gold" />
              </div>
              <h2 className="title-serif text-xl">问一事，得一卦</h2>
              <p className="text-xs text-muted-foreground mt-1.5 px-6 leading-relaxed">
                提出你心中的困惑，让易经的智慧为你指引方向。
              </p>
              <div className="mt-5 flex flex-col gap-2 w-full max-w-xs">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => send(ex)}
                    className="text-left text-[13px] text-foreground/80 bg-white rounded-xl shadow-card px-3.5 py-2.5 active:scale-[0.98] transition border border-[hsl(var(--border))]"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) =>
            msg.role === 'user' ? (
              <div key={msg.id} className="flex justify-end animate-fade-in">
                <div className="max-w-[80%] bg-yiji-ink text-[#faf8f0] rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13.5px] leading-relaxed">
                  {msg.text}
                </div>
              </div>
            ) : msg.status === 'thinking' ? (
              <div key={msg.id} className="flex items-end gap-2 animate-fade-in">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yiji-gold to-yiji-zhusha text-white flex items-center justify-center text-xs shrink-0">
                  易
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-card">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-yiji-ink/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-yiji-ink/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-yiji-ink/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            ) : (
              <AiResultCard
                key={msg.id}
                result={msg.result}
                deepUnlocked={msg.deepUnlocked}
                onDeep={() => onDeep(msg.id)}
                onBookReal={() => nav('/divine-order')}
              />
            )
          )}
        </div>
      </div>

      {/* 输入栏 */}
      <div className="shrink-0 border-t border-[hsl(var(--border))] bg-[#faf8f0]/95 backdrop-blur px-3 sm:px-4 py-3">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex gap-2 mb-2">
            {(
              [
                { k: 'time', ico: '⏱', label: '时间' },
                { k: 'random', ico: '🎲', label: '随机' },
                { k: 'manual', ico: '✋', label: '手动' },
              ] as { k: DivineMethod; ico: string; label: string }[]
            ).map((m) => (
                <button
                key={m.k}
                onClick={() => {
                  if (m.k === 'time') {
                    startDivination('按当前时间起卦，请师指点近期运势', 'time')
                  } else if (m.k === 'random') {
                    startDivination('随机起卦，请师指点迷津', 'random')
                  } else {
                    setMethod('manual')
                    setTimeout(() => textareaRef.current?.focus(), 0)
                  }
                }}
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
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send(input)
                }
              }}
              placeholder={
                method === 'manual'
                  ? '手动起卦：写下你的心事，点击发送即摇出一卦'
                  : method === 'random'
                  ? '随便聊聊，摇一卦看看指引'
                  : '想问什么？如：最近事业该不该变动…'
              }
              className="flex-1 resize-none text-[13.5px] leading-relaxed outline-none bg-white border border-[hsl(var(--border))] rounded-xl px-3 py-2.5 max-h-28"
            />
            <button
              onClick={() => send(input)}
              disabled={input.trim().length < 2}
              className="w-11 h-11 shrink-0 rounded-full bg-yiji-zhusha text-white flex items-center justify-center active:scale-90 transition disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground/70 mt-2 leading-snug">
            本结果为传统文化推演，仅供娱乐与思考参考，不构成任何决策建议
          </p>
        </div>
      </div>

      {/* 深度解读付费确认 */}
      {showDeep && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-6" onClick={() => setShowDeep(null)}>
          <div className="bg-white rounded-2xl p-5 w-full max-w-xs text-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowDeep(null)} className="absolute top-3 right-3 text-muted-foreground">
              <X size={18} />
            </button>
            <div className="text-3xl mb-1">🔮</div>
            <h3 className="title-serif text-lg">解锁深度解读</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              含六爻精义、小象提点、应期与个性化行动指南。
            </p>
            <p className="text-yiji-zhusha font-semibold text-base mt-2">¥12.00</p>
            <p className="text-[11px] text-muted-foreground">当前余额 ¥{balance ?? 0}</p>
            <button
              onClick={confirmDeep}
              disabled={unlocking}
              className="w-full h-11 rounded-xl bg-yiji-zhusha text-white mt-4 active:scale-95 transition disabled:opacity-50"
            >
              {unlocking ? '解锁中…' : '立即解锁'}
            </button>
            <button onClick={() => setShowDeep(null)} className="w-full h-9 text-yiji-gold text-sm mt-1">
              暂不
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------- AI 结果卡 ----------
function AiResultCard({
  result,
  deepUnlocked,
  onDeep,
  onBookReal,
}: {
  result: DivineResult
  deepUnlocked: boolean
  onDeep: () => void
  onBookReal: () => void
}) {
  const [showOrig, setShowOrig] = useState(false)
  const hex = result.hexagram
  const { lower, upper } = baguaNames(hex.id)
  return (
    <div className="flex items-end gap-2 animate-fade-in">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yiji-gold to-yiji-zhusha text-white flex items-center justify-center text-xs shrink-0">
        易
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl rounded-bl-md shadow-card overflow-hidden">
          {/* 卦头 */}
          <div className="bg-gradient-to-br from-yiji-ink to-[#2a2a44] p-4 flex items-center gap-3">
            <HexGlyph id={hex.id} />
            <div className="flex-1 min-w-0">
              <div className="title-serif text-lg text-white leading-tight">{hex.name}卦</div>
              <div className="text-[11px] text-white/60 mt-0.5">
                下{lower}上{upper} · 第 {hex.order} 卦
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg border-2 border-yiji-zhusha text-yiji-zhusha flex items-center justify-center text-[10px] leading-tight text-center font-bold rotate-[-6deg] shrink-0">
              第{hex.order}卦
            </div>
          </div>

          <div className="p-4">
            {/* 卦辞原文（折叠） */}
            <button
              onClick={() => setShowOrig((v) => !v)}
              className="flex items-center gap-1 text-[12px] text-yiji-dai font-medium mb-2"
            >
              {showOrig ? '收起卦辞原文' : '查看卦辞原文'}
              <ChevronDown size={14} className={showOrig ? 'rotate-180 transition' : 'transition'} />
            </button>
            {showOrig && (
              <div className="text-[12.5px] text-yiji-dai bg-[#f3ecdb] border-l-2 border-yiji-gold px-3 py-2 rounded-md mb-3 leading-relaxed">
                <b className="text-yiji-zhusha">卦辞：</b>
                {hex.gua_ci}
              </div>
            )}

            {/* 白话解读 */}
            <div className="text-[13.5px] text-foreground/90">{formatMd(result.response)}</div>

            {/* 深度解读 */}
            {deepUnlocked ? (
              <div className="mt-3 border border-yiji-gold/60 bg-[#f3ecdb] rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-[12px] text-yiji-gold font-semibold mb-1.5">
                  <Coins size={13} /> 深度解读
                </div>
                <div className="text-[12.5px] text-foreground/85 leading-relaxed">{formatMd(deepText(hex))}</div>
              </div>
            ) : (
              <div className="mt-3 border border-dashed border-yiji-gold/70 rounded-xl p-3 text-center bg-[#f3ecdb]">
                <p className="text-[12.5px] text-muted-foreground mb-2 leading-snug">
                  以上为基础解读。<b className="text-yiji-zhusha">深度解读</b>含六爻精义、应期与行动指南。
                </p>
                <button
                  onClick={onDeep}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-br from-yiji-zhusha to-[#8c2c22] text-white px-5 py-2 rounded-full text-[13px] font-semibold active:scale-95 transition"
                >
                  <Lock size={13} /> 解锁深度解读 · ¥12
                </button>
              </div>
            )}

            {/* 真人解卦师入口 */}
            <button
              onClick={onBookReal}
              className="mt-2.5 w-full flex items-center justify-center gap-1.5 text-[12px] text-yiji-dai bg-white border border-[hsl(var(--border))] rounded-lg py-2.5 active:scale-[0.98] transition"
            >
              <MessageCircleHeart size={14} /> 想听真人解卦师解读？<span className="text-yiji-dai font-semibold">去预约 ›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
