import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, Clock } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import { useStore } from '@/store/useStore'

interface Question {
  q: string
  options: string[]
  correct: number
}

const QUESTIONS: Question[] = [
  { q: '乾卦的核心精神是？', options: ['厚德载物', '自强不息', '顺势而动', '适可而止'], correct: 1 },
  { q: '"潜龙勿用"是乾卦哪一爻的爻辞？', options: ['初九', '九二', '九三', '九五'], correct: 0 },
  { q: '坤卦象征什么？', options: ['天', '地', '水', '火'], correct: 1 },
  { q: '"地势坤，君子以厚德载物"出自？', options: ['卦辞', '爻辞', '大象传', '彖辞'], correct: 2 },
  { q: '蒙卦的核心含义是？', options: ['万事开头难', '启蒙教育', '等待时机', '争讼不利'], correct: 1 },
  { q: '屯卦象征什么阶段？', options: ['事业巅峰', '万事初生', '退避隐遁', '丰收盛大'], correct: 1 },
  { q: '"天行健"下一句是？', options: ['厚德载物', '自强不息', '循序渐进', '与时偕行'], correct: 1 },
  { q: '六十四卦由什么重叠而成？', options: ['五行', '八卦', '十天干', '十二地支'], correct: 1 },
]

export default function Exam() {
  const nav = useNavigate()
  const setCertification = useStore((s) => s.setCertification)
  const addExamRecord = useStore((s) => s.addExamRecord)

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const q = QUESTIONS[current]
  const answered = answers[current] !== null

  const onSelect = (i: number) => {
    if (submitted) return
    const arr = [...answers]
    arr[current] = i
    setAnswers(arr)
  }

  const onNext = () => {
    if (current < QUESTIONS.length - 1) setCurrent(current + 1)
    else onSubmit()
  }

  const onSubmit = () => {
    let s = 0
    answers.forEach((a, i) => {
      if (a === QUESTIONS[i].correct) s += 1
    })
    const finalScore = Math.round((s / QUESTIONS.length) * 100)
    setScore(finalScore)
    setSubmitted(true)
    const passed = finalScore >= 60
    addExamRecord({
      id: Date.now(),
      level: 'primary',
      score: finalScore,
      passed,
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-'),
    })
    if (passed) {
      setCertification('primary')
      toast.success(`恭喜通过！得分 ${finalScore}，已获得初级解卦师认证`)
    } else {
      toast.error(`未通过，得分 ${finalScore}，需 ≥60 分`)
    }
  }

  return (
    <div className="min-h-screen pb-24">
      <PageHeader title="初级认证考试" subtitle={`第 ${current + 1} / ${QUESTIONS.length} 题`} />

      {!submitted ? (
        <div className="p-4">
          {/* 进度 */}
          <div className="flex gap-1 mb-4">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full ${i === current ? 'bg-yiji-gold' : answers[i] !== null ? 'bg-yiji-gold/50' : 'bg-yiji-warm-gray'}`} />
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Clock size={13} /> 单选题 · 满分 100 分 · 60 分通过
            </div>
            <h2 className="title-serif text-base mb-4">{current + 1}. {q.q}</h2>
            <div className="space-y-2.5">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition active:scale-[0.98] flex items-center gap-3 ${
                    answers[current] === i ? 'border-yiji-gold bg-yiji-gold/5' : 'border-transparent bg-yiji-warm-gray'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${answers[current] === i ? 'bg-yiji-gold text-white' : 'bg-white text-muted-foreground'}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm">{opt}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onNext}
            disabled={!answered}
            className="w-full mt-4 h-12 rounded-xl bg-yiji-gold text-white title-serif disabled:bg-light-gray transition active:scale-[0.98]"
          >
            {current < QUESTIONS.length - 1 ? '下一题' : '提交答卷'}
          </button>
        </div>
      ) : (
        /* 结果 */
        <div className="p-4 flex flex-col items-center pt-12">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${score >= 60 ? 'bg-yiji-green/15' : 'bg-yiji-red/15'}`}>
            {score >= 60 ? <Check size={48} className="text-yiji-green" /> : <X size={48} className="text-yiji-red" />}
          </div>
          <h2 className="title-serif text-xl">{score >= 60 ? '恭喜通过！' : '未通过'}</h2>
          <div className="title-serif text-5xl text-yiji-gold my-3">{score}<span className="text-lg text-muted-foreground">分</span></div>
          <p className="text-xs text-muted-foreground text-center px-8">
            {score >= 60 ? '已获得初级解卦师认证，可在「我的」查看' : '需 60 分以上通过，再接再厉'}
          </p>

          {/* 答题回顾 */}
          <div className="w-full mt-6 space-y-2">
            {QUESTIONS.map((qq, i) => (
              <div key={i} className={`bg-white rounded-xl p-3 flex items-center gap-2 text-xs ${answers[i] === qq.correct ? 'border-l-4 border-yiji-green' : 'border-l-4 border-yiji-red'}`}>
                <span className="text-muted-foreground">第{i + 1}题</span>
                <span className="flex-1 truncate">{qq.q}</span>
                {answers[i] === qq.correct ? <Check size={14} className="text-yiji-green" /> : <X size={14} className="text-yiji-red" />}
              </div>
            ))}
          </div>

          <button onClick={() => nav(-1)} className="w-full mt-6 h-12 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition">
            返回
          </button>
        </div>
      )}
    </div>
  )
}
