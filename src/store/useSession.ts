// 会话状态：登录态（token / 当前账号），不持久化，token 单独存 localStorage 供接口层读取。
import { create } from 'zustand'
import {
  accountApi,
  getToken,
  setToken,
  clearToken,
  type AccountUser,
} from '@/services/account'

interface SessionState {
  token: string | null
  currentUser: AccountUser | null
  isGuest: boolean
  isAuthed: boolean
  setSession: (token: string, user: AccountUser) => void
  setUser: (partial: Partial<AccountUser>) => void
  clearSession: () => void
  init: () => Promise<void>
}

export const useSession = create<SessionState>((set) => ({
  token: getToken(),
  currentUser: null,
  isGuest: !getToken(),
  isAuthed: false,
  setSession: (token, user) => {
    setToken(token)
    set({ token, currentUser: user, isGuest: false, isAuthed: true })
  },
  setUser: (partial) => {
    const cur = useSession.getState().currentUser
    if (!cur) return
    set({ currentUser: { ...cur, ...partial } })
  },
  clearSession: () => {
    clearToken()
    set({ token: null, currentUser: null, isGuest: true, isAuthed: false })
  },
  init: async () => {
    const t = getToken()
    if (!t) {
      set({ isGuest: true, isAuthed: true })
      return
    }
    try {
      const { user } = await accountApi.me()
      set({ token: t, currentUser: user, isGuest: false, isAuthed: true })
    } catch {
      clearToken()
      set({ token: null, currentUser: null, isGuest: true, isAuthed: false })
    }
  },
}))
