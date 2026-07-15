// 易友社区接口层：封装对 Node 后端的请求，自动携带 Bearer token。
// 帖子 / 点赞 / 收藏 / 评论 均为服务端真实持久化，跨账号共享。
import { getToken } from '@/services/account'
import type { CommunityPost } from '@/types'

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

export interface CreatePostPayload {
  type: 'note' | 'case' | 'question'
  title: string
  content: string
  hexagramId?: string
  hexagramName?: string
}

export const communityApi = {
  // 列表：tab=qa 仅问答；keyword 服务端模糊搜
  listPosts: (params?: { tab?: string; keyword?: string }) => {
    const q = new URLSearchParams()
    if (params?.tab) q.set('tab', params.tab)
    if (params?.keyword) q.set('keyword', params.keyword)
    const qs = q.toString()
    return request<{ posts: CommunityPost[] }>(`/community/posts${qs ? '?' + qs : ''}`)
  },
  getPost: (id: string) => request<{ post: CommunityPost }>(`/community/posts/${id}`),
  createPost: (p: CreatePostPayload) =>
    request<{ post: CommunityPost }>('/community/posts', {
      method: 'POST',
      body: JSON.stringify(p),
    }),
  toggleLike: (id: string) =>
    request<{ liked: boolean; likeCount: number }>(`/community/posts/${id}/like`, { method: 'POST' }),
  toggleFavorite: (id: string) =>
    request<{ favorited: boolean }>(`/community/posts/${id}/favorite`, { method: 'POST' }),
  listComments: (id: string) => request<{ comments: any[] }>(`/community/posts/${id}/comments`),
  addComment: (id: string, content: string) =>
    request<{ comment: any; commentCount: number }>(`/community/posts/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),
  stats: () =>
    request<{ posts: number; likes: number; comments: number; myPosts: number }>('/community/stats'),
}
