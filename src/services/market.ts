// 内容市场接口层：封装对 Node 后端的请求，自动携带 Bearer token。
// 内容商品服务端持久化（共享），购买记录 per-user（purchased 字段由后端按当前用户返回）。
import { getToken } from '@/services/account'
import type { MarketContent, ContentType } from '@/types'

async function request<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`/api${path}`, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || '请求失败')
  }
  return data as T
}

export interface PublishContentPayload {
  type: ContentType
  title: string
  content: string
  summary?: string
  price: number
}

export const marketApi = {
  // 列表：tab 可按类型过滤（course/note/case）
  list: (tab?: string) => {
    const qs = tab ? `?tab=${tab}` : ''
    return request<{ contents: MarketContent[] }>(`/market/contents${qs}`)
  },
  get: (id: string) => request<{ content: MarketContent }>(`/market/contents/${id}`),
  publish: (p: PublishContentPayload) =>
    request<{ content: MarketContent }>('/market/contents', {
      method: 'POST',
      body: JSON.stringify(p),
    }),
  // 购买：扣余额 + 记购买记录，返回新余额
  purchase: (id: string) =>
    request<{ purchased: boolean; balance: number }>(`/market/contents/${id}/purchase`, {
      method: 'POST',
    }),
}
