import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Coins, CheckCircle2, Clock, Send } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import { useSession } from '@/store/useSession'
import { qaApi } from '@/services/qa'
import type { QaQuestion } from '@/types'

export default function Qa() {
  const nav = useNavigate()
  const { currentUser, isGuest, setUser } = useSession()
  const [questions, setQuestions] = useState<QaQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [reward, setReward] = useState('5')

  const [answeringId, setAnsweringId] = useState<string | null>(null)
  const [answerText, setAnswerText] = useState('')

  const balance = currentUser?.balance ?? 128

  const load = () => {
    setLoading(true)
    qaApi
      .list()
      .then((r) => setQuestions(r.questions))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const onSubmit = async () => {
    if (title.trim().length < 2) { toast.error('请输入问题'); return }
    const r = Number(reward) || 0
    if (isGuest) { nav('/login?redirect=/qa'); return }
    if (r > balance) { toast.error('余额不足'); return }
    try {
      const res = await qaApi.ask({ title: title.trim(), content: content.trim(), reward: r })
      setUser({ balance: res.balance })
      setTitle(''); setContent(''); setReward('5'); setShowForm(false)
      await load()
      toast.success('提问成功')
    } catch (e: any) {
      toast.error(e?.message || '提问失败')
    }
  }

  const submitAnswer = async (qId: string) => {
    if (!answerText.trim()) { toast.error('请输入回答'); return }
    if (isGuest) { nav('/login?redirect=/qa'); return }
    try {
      await qaApi.resolve(qId, { content: answerText.trim() })
      setAnsweringId(null)
      setAnswerText('')
      await load()
      toast.success('已采纳为最佳回答')
    } catch (e: any) {
      toast.error(e?.message || '操作失败')
    }
  }

  return (
    <div className="pb-20 lg:pb-8">
      <PageHeader
        title="问答求助"
        right={<span className="text-xs text-yiji-gold">¥{balance}</span>}
      />

      {loading ? (
        <div className="mt-10 text-center text-sm text-muted-foreground">加载中…</div>
      ) : (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {questions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl shadow-card p-3.5 flex flex-col">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {q.status === 'resolved' ? (
                  <span className="flex items-center gap-1 text-[10px] bg-yiji-green/15 text-yiji-green px-1.5 py-0.5 rounded">
                    <CheckCircle2 size={11} /> 已解决
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">
                    <Clock size={11} /> 待回答
                  </span>
                )}
                {q.reward > 0 && (
                  <span className="flex items-center gap-0.5 text-[10px] bg-yiji-gold-light text-yiji-gold px-1.5 py-0.5 rounded">
                    <Coins size={11} /> {q.reward}
                  </span>
                )}
                {q.hexagramName && (
                  <span className="text-[10px] text-yiji-gold bg-yiji-gold-light/50 px-1.5 py-0.5 rounded">{q.hexagramName}卦</span>
                )}
              </div>
              <div className="title-serif text-sm">{q.title}</div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{q.content}</p>
              <div className="text-[11px] text-muted-foreground mt-1.5">提问者：{q.asker.nickname} · {q.createdAt}</div>

              {q.bestAnswer && (
                <div className="mt-2.5 bg-yiji-warm-gray rounded-lg p-2.5">
                  <div className="text-[11px] text-yiji-green flex items-center gap-1 mb-1">
                    <CheckCircle2 size={11} /> 最佳回答
                  </div>
                  <p className="text-xs text-foreground/80">{q.bestAnswer}</p>
                </div>
              )}

              {q.answers && q.answers.length > 0 && (
                <div className="mt-2.5 space-y-1.5">
                  {q.answers.map((a) => (
                    <div key={a.id} className="text-xs text-foreground/70 bg-yiji-warm-gray/60 rounded-lg p-2">
                      <span className="text-yiji-gold">{a.nickname}</span>：{a.content}
                      <div className="text-[10px] text-muted-foreground mt-0.5">{a.time}</div>
                    </div>
                  ))}
                </div>
              )}

              {q.status === 'pending' && (
                <div className="mt-2">
                  {answeringId !== q.id ? (
                    <button
                      onClick={() => { setAnsweringId(q.id); setAnswerText('') }}
                      className="self-start text-xs text-yiji-gold border border-yiji-gold px-3 py-1 rounded"
                    >
                      我来回答
                    </button>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      <textarea
                        className="w-full bg-yiji-warm-gray rounded-xl px-3 py-2 text-xs outline-none resize-none min-h-[64px]"
                        placeholder="输入你的回答，提交即采纳为最佳回答…"
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setAnsweringId(null); setAnswerText('') }}
                          className="flex-1 h-8 rounded-lg bg-yiji-warm-gray text-xs"
                        >
                          取消
                        </button>
                        <button
                          onClick={() => submitAnswer(q.id)}
                          className="flex-1 h-8 rounded-lg bg-yiji-gold text-white text-xs title-serif flex items-center justify-center gap-1"
                        >
                          <Send size={12} /> 提交
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {questions.length === 0 && (
            <div className="col-span-full mt-10 text-center text-sm text-muted-foreground">暂无问题，快来提问吧</div>
          )}
        </div>
      )}

      {/* 提问 FAB */}
      <button
        onClick={() => { if (isGuest) { nav('/login?redirect=/qa'); return } setShowForm(true) }}
        className="fixed bottom-6 right-4 lg:right-8 w-12 h-12 rounded-full bg-yiji-gold text-white shadow-card flex items-center justify-center active:scale-90 transition z-20"
      >
        <Plus size={22} />
      </button>

      {/* 提问弹窗 */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl p-4 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="title-serif text-base mb-3">提出问题</h3>
            <div className="space-y-3">
              <input
                className="w-full bg-yiji-warm-gray rounded-xl px-3 py-2.5 text-sm outline-none"
                placeholder="一句话描述你的问题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="w-full bg-yiji-warm-gray rounded-xl px-3 py-2.5 text-sm outline-none resize-none min-h-[100px]"
                placeholder="详细描述…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">悬赏</span>
                <input
                  type="number"
                  min="0"
                  className="flex-1 bg-yiji-warm-gray rounded-xl px-3 py-2 text-sm outline-none"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                />
                <span className="text-xs text-muted-foreground">元（余额 ¥{balance}）</span>
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={() => setShowForm(false)} className="flex-1 h-11 rounded-xl bg-yiji-warm-gray text-sm">取消</button>
                <button onClick={onSubmit} className="flex-1 h-11 rounded-xl bg-yiji-gold text-white title-serif">发布</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
