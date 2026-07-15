import { useNavigate } from 'react-router-dom'
import { GraduationCap, Lock, CheckCircle2, ChevronRight } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { toast } from 'sonner'
import { useStore } from '@/store/useStore'
import type { CertLevel } from '@/types'

const LEVELS: { level: CertLevel; name: string; desc: string; requirement: string }[] = [
  { level: 'primary', name: '初级解卦师', desc: '掌握易经基础，能解读常见卦象', requirement: '通过初级考试（≥60分）' },
  { level: 'middle', name: '中级解卦师', desc: '深入理解卦爻辞，能独立解卦', requirement: '学完 32 卦 + 初级认证' },
  { level: 'senior', name: '高级解卦师', desc: '融会贯通，可指导他人学习', requirement: '学完全部 64 卦 + 中级认证' },
]

export default function Certification() {
  const nav = useNavigate()
  const certificationLevel = useStore((s) => s.certificationLevel)
  const primaryExamPassed = useStore((s) => s.primaryExamPassed)
  const learningProgress = useStore((s) => s.learningProgress)
  const learnedCount = Object.values(learningProgress).filter((p) => p?.status === 'completed').length

  const levelOrder: CertLevel[] = ['primary', 'middle', 'senior']

  return (
    <div className="min-h-screen pb-6">
      <PageHeader title="解卦师认证" />

      <div className="px-4 pt-2">
        <div className="bg-gradient-to-br from-yiji-gold/15 to-yiji-gold/5 rounded-2xl p-5 text-center">
          <GraduationCap size={36} className="text-yiji-gold mx-auto mb-2" />
          <h2 className="title-serif text-lg">解卦师成长之路</h2>
          <p className="text-xs text-muted-foreground mt-1">逐级认证，成为真正的解卦师</p>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {LEVELS.map((lv, i) => {
          const achieved = certificationLevel ? levelOrder.indexOf(certificationLevel) >= i : false
          const canTake = i === 0 ? true : (certificationLevel === levelOrder[i - 1] && (i === 1 ? learnedCount >= 32 : learnedCount >= 64))
          return (
            <div
              key={lv.level}
              className={`bg-white rounded-2xl shadow-card p-4 ${achieved ? 'ring-1 ring-yiji-gold' : ''}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${achieved ? 'bg-yiji-gold text-white' : 'bg-yiji-warm-gray text-muted-foreground'}`}>
                  {achieved ? <CheckCircle2 size={22} /> : <Lock size={18} />}
                </div>
                <div className="flex-1">
                  <div className="title-serif text-base">{lv.name}</div>
                  <div className="text-xs text-muted-foreground">{lv.desc}</div>
                </div>
                {achieved && <span className="text-[10px] bg-yiji-gold-light text-yiji-gold px-2 py-0.5 rounded">已认证</span>}
              </div>
              <div className="text-[11px] text-muted-foreground bg-yiji-warm-gray rounded-lg px-3 py-2">
                认证条件：{lv.requirement}
              </div>
              {!achieved && (
                <button
                  onClick={() => {
                    if (i === 0 || canTake) nav('/exam')
                    else toast.info('条件未达，请先完成前置认证与卦象学习')
                  }}
                  disabled={!(i === 0 || canTake)}
                  className={`w-full mt-3 h-9 rounded-lg text-sm transition active:scale-95 flex items-center justify-center gap-1 ${
                    i === 0 || canTake ? 'bg-yiji-gold text-white title-serif' : 'bg-yiji-warm-gray text-muted-foreground'
                  }`}
                >
                  {i === 0 ? (primaryExamPassed ? '重新考试' : '参加考试') : canTake ? '参加考试' : '条件未达'}
                  {(i === 0 || canTake) && <ChevronRight size={14} />}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
