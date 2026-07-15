// 解卦咨询 · 后端接口层（深度解读付费）
import { getToken } from '@/services/account'

export interface DeepResult {
  ok: boolean
  balance: number
  price: number
}

export class BalanceError extends Error {
  balance: number
  constructor(balance: number) {
    super('余额不足')
    this.balance = balance
  }
}

export const divineApi = {
  // 解锁深度解读（扣 ¥12），返回新余额
  async deep(price = 12): Promise<DeepResult> {
    const token = getToken()
    if (!token) throw new Error('未登录')
    const res = await fetch('/api/divine/deep', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ price }),
    })
    if (res.status === 401) throw new Error('未登录')
    if (res.status === 400) {
      const d = await res.json().catch(() => ({}))
      throw new BalanceError(d.balance ?? 0)
    }
    if (!res.ok) throw new Error('解锁失败，请稍后再试')
    return res.json()
  },
}
