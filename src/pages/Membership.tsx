import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import { useStore } from '@/store/useStore'
import type { MemberType } from '@/types'

const PLANS: { type: MemberType; name: string; price: number; original?: number; perks: string[]; hot?: boolean }[] = [
  {
    type: 'monthly', name: '月度会员', price: 12, perks: ['AI 无限解卦', '全部卦象学习', '每日双倍生命恢复'],
  },
  {
    type: 'quarterly', name: '季度会员', price: 30, original: 36, perks: ['月度全部权益', '专属解卦师徽章', '每月 +5 卡牌碎片'], hot: true,
  },
  {
    type: 'yearly', name: '年度会员', price: 98, original: 144, perks: ['季度全部权益', '解卦师认证免考', '专属国潮主题', '限量实体卦卡'],
  },
]

export default function Membership() {
  const nav = useNavigate()
  const memberType = useStore((s) => s.memberType)
  const setMember = useStore((s) => s.setMember)
  const [selected, setSelected] = useState<MemberType>('quarterly')

  const onPay = () => {
    setMember(selected)
    toast.success('开通成功，已解锁全部权益')
    setTimeout(() => nav(-1), 1000)
  }

  return (
    <div className="pb-24 lg:pb-8">
      <PageHeader title="会员中心" />

      {/* 顶部权益 */}
      <div className="pt-2">
        <div className="bg-gradient-to-br from-yiji-ink to-[#2a2a44] rounded-2xl p-5 text-white text-center">
          <Sparkles size={28} className="text-yiji-gold mx-auto mb-2" />
          <h2 className="title-serif text-lg">易学尊享会员</h2>
          <p className="text-xs text-white/60 mt-1">解锁全部卦象 · 无限 AI 解卦 · 专属特权</p>
          {memberType && (
            <div className="mt-3 inline-block text-xs bg-yiji-gold text-white px-3 py-1 rounded-full">
              当前：{({ monthly: '月度', quarterly: '季度', yearly: '年度' }[memberType])}会员
            </div>
          )}
        </div>
      </div>

      {/* 套餐 */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {PLANS.map((p) => (
          <button
            key={p.type}
            onClick={() => setSelected(p.type)}
            className={`w-full bg-white rounded-2xl p-4 text-left transition active:scale-[0.98] border-2 relative ${
              selected === p.type ? 'border-yiji-gold shadow-card' : 'border-transparent shadow-xs'
            }`}
          >
            {p.hot && (
              <span className="absolute -top-2 right-3 text-[10px] bg-yiji-red text-white px-2 py-0.5 rounded-full">热门</span>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="title-serif text-base">{p.name}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs">¥</span>
                <span className="title-serif text-2xl text-yiji-gold">{p.price}</span>
                {p.original && <span className="text-xs text-muted-foreground line-through">¥{p.original}</span>}
              </div>
            </div>
            <div className="space-y-1.5">
              {p.perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2 text-xs text-foreground/80">
                  <Check size={13} className="text-yiji-green shrink-0" /> {perk}
                </div>
              ))}
            </div>
            <div className={`mt-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === p.type ? 'border-yiji-gold bg-yiji-gold' : 'border-light-gray'}`}>
              {selected === p.type && <Check size={12} className="text-white" />}
            </div>
          </button>
        ))}
      </div>

      {/* 底部支付 */}
      <div className="fixed bottom-0 left-0 right-0 lg:pl-60 p-4 bg-[hsl(var(--warm-white))] border-t border-[hsl(var(--border))] z-30">
        <div className="max-w-7xl mx-auto">
          <button onClick={onPay} className="w-full h-12 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition">
            立即开通 · ¥{PLANS.find((p) => p.type === selected)?.price}
          </button>
          <p className="text-[10px] text-muted-foreground text-center mt-2">支付即表示同意《会员服务协议》· Web 端为模拟支付</p>
        </div>
      </div>
    </div>
  )
}
