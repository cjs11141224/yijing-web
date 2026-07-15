// 账号接口层：封装对 Node 后端的请求，自动携带 Bearer token。
// 演示环境：后端用 JSON 文件存账号，密码 bcrypt 加密。
const TOKEN_KEY = 'yj_auth_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}
export function setToken(t: string): void {
  localStorage.setItem(TOKEN_KEY, t)
}
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export interface AccountUser {
  id: string
  username: string | null
  phone: string | null
  email: string | null
  nickName: string
  avatar: string
  bio: string
  balance: number
  createdAt: string
}

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

export const accountApi = {
  register: (p: { username?: string; phone?: string; email?: string; password: string; nickName?: string }) =>
    request<{ token: string; user: AccountUser }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(p),
    }),
  login: (p: { identifier: string; password: string }) =>
    request<{ token: string; user: AccountUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(p),
    }),
  me: () => request<{ user: AccountUser }>('/auth/me'),
  updateProfile: (p: { nickName?: string; avatar?: string; bio?: string }) =>
    request<{ user: AccountUser }>('/auth/profile', { method: 'PUT', body: JSON.stringify(p) }),
  changePassword: (p: { oldPassword: string; newPassword: string }) =>
    request<{ ok: boolean }>('/auth/password', { method: 'PUT', body: JSON.stringify(p) }),
  logout: () => request<{ ok: boolean }>('/auth/logout', { method: 'POST' }),
}
