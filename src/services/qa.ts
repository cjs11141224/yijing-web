// 问答求助接口层：封装对 Node 后端的请求，自动携带 Bearer token。
// 问题/回答服务端持久化（共享），悬赏从余额扣减。
import { getToken } from '@/services/account'
import type { QaQuestion } from '@/types'

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

export interface AskPayload {
  title: string
  content: string
  reward: number
  hexagramId?: string
  hexagramName?: string
}

export const qaApi = {
  // 列表：tab=resolved 仅已解决；tab=pending 仅待回答
  list: (tab?: string) => {
    const qs = tab ? `?tab=${tab}` : ''
    return request<{ questions: QaQuestion[] }>(`/qa/questions${qs}`)
  },
  ask: (p: AskPayload) =>
    request<{ question: QaQuestion; balance: number }>('/qa/questions', {
      method: 'POST',
      body: JSON.stringify(p),
    }),
  answer: (id: string, content: string) =>
    request<{ answer: any; answerCount: number }>(`/qa/questions/${id}/answers`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),
  // 采纳：提供 content 即作为最佳回答一步达成；或指定 answerId
  resolve: (id: string, payload: { answerId?: number; content?: string }) =>
    request<{ ok: boolean; question: QaQuestion; acceptedAnswerId: number | null }>(
      `/qa/questions/${id}/resolve`,
      { method: 'POST', body: JSON.stringify(payload) }
    ),
}
