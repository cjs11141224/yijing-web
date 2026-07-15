// 真人解卦预约 · 后端接口层（付费 ¥39，扣账户余额）
import { getToken } from '@/services/account'
import type { RealDivinerOrder, DivineOrderStatus } from '@/types'

export const DIVINE_ORDER_PRICE = 39
const ADMIN_KEY_HEADER = 'x-admin-key'

export const divineOrderApi = {
  // 我的预约列表（需登录）
  async list(): Promise<RealDivinerOrder[]> {
    const token = getToken()
    const res = await fetch('/api/divine-orders', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || '加载失败')
    return (data.orders || []) as RealDivinerOrder[]
  },

  // 单个预约详情（对话消息）
  async get(id: string): Promise<RealDivinerOrder> {
    const token = getToken()
    const res = await fetch(`/api/divine-orders/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || '加载失败')
    return data.order as RealDivinerOrder
  },

  // 提交预约（扣 ¥39，返回新余额）
  async create(p: { question: string; method: 'time' | 'random' | 'manual'; notes?: string }): Promise<{ order: RealDivinerOrder; balance: number }> {
    const token = getToken()
    if (!token) throw new Error('未登录')
    const res = await fetch('/api/divine-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(p),
    })
    const data = await res.json().catch(() => ({}))
    if (res.status === 401) throw new Error('未登录')
    if (res.status === 400) throw new Error(data.error || '提交失败')
    if (!res.ok) throw new Error('提交失败，请稍后再试')
    return data as { order: RealDivinerOrder; balance: number }
  },

  // 用户发送追问消息
  async sendMessage(id: string, text: string): Promise<RealDivinerOrder> {
    const token = getToken()
    if (!token) throw new Error('未登录')
    const res = await fetch(`/api/divine-orders/${id}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.status === 401) throw new Error('未登录')
    if (res.status === 400) throw new Error(data.error || '发送失败')
    if (!res.ok) throw new Error('发送失败，请稍后再试')
    return data.order as RealDivinerOrder
  },
}

// 后台管理（真人解卦师 / 管理员手动回写），需管理密钥
export const divineOrderAdminApi = {
  // 全部预约（含用户名）
  async list(key: string): Promise<(RealDivinerOrder & { userName?: string; userNick?: string })[]> {
    const res = await fetch('/api/admin/divine-orders', {
      headers: { [ADMIN_KEY_HEADER]: key },
    })
    const data = await res.json().catch(() => ({}))
    if (res.status === 401) throw new Error('管理密钥无效')
    if (!res.ok) throw new Error(data.error || '加载失败')
    return (data.orders || []) as (RealDivinerOrder & { userName?: string; userNick?: string })[]
  },

  // 后台回复（追加真人解卦师消息，可选更新状态）
  async reply(id: string, text: string, key: string, status?: DivineOrderStatus): Promise<RealDivinerOrder> {
    const res = await fetch(`/api/admin/divine-orders/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', [ADMIN_KEY_HEADER]: key },
      body: JSON.stringify({ text, status }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.status === 401) throw new Error('管理密钥无效')
    if (res.status === 400) throw new Error(data.error || '回复失败')
    if (!res.ok) throw new Error('回复失败，请稍后再试')
    return data.order as RealDivinerOrder
  },

  // 后台更新状态（接单 / 完成）
  async setStatus(id: string, status: DivineOrderStatus, key: string): Promise<RealDivinerOrder> {
    const res = await fetch(`/api/admin/divine-orders/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', [ADMIN_KEY_HEADER]: key },
      body: JSON.stringify({ status }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.status === 401) throw new Error('管理密钥无效')
    if (res.status === 400) throw new Error(data.error || '操作失败')
    if (!res.ok) throw new Error('操作失败，请稍后再试')
    return data.order as RealDivinerOrder
  },
}
