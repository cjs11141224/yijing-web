// 全局状态 · 对应小程序 app.js globalData + 全部逻辑
import { create } from 'zustand'
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import { hexagrams } from '@/data/appData'
import type {
  UserInfo, LearningProgress, DivinationRecord,
  AppEvent, MemberType, CertLevel,
  ExamRecord, DivineOrder,
} from '@/types'
import type { AccountUser } from '@/services/account'

// ============ 工具函数 ============
function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function dayDiff(d1: string, d2: string): number {
  const date1 = new Date(d1)
  const date2 = new Date(d2)
  return Math.floor((date2.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000))
}

function nowStr(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day} ${h}:${min}`
}

// ============ Mock 数据（对应 app.js initMockData） ============

const DEFAULT_EVENTS: AppEvent[] = [
  { id: 'solar_term', name: '节气学卦', desc: '今日学完指定卦额外+2生命', targetHexagramId: '111111', reward: '+2生命', active: true },
  { id: 'weekend_rush', name: '周末冲刺', desc: '周六日学卦双倍积分', targetHexagramId: '', reward: '双倍积分', active: false },
]

// ============ 按账号分桶持久化（每账号独立数据）============
const UID_KEY = 'yj_current_uid'
function setCurrentUid(uid: string | null) {
  if (uid) localStorage.setItem(UID_KEY, uid)
  else localStorage.removeItem(UID_KEY)
}
function getCurrentUid(): string | null {
  return localStorage.getItem(UID_KEY)
}
function nsKey(): string {
  const uid = getCurrentUid()
  return uid ? `yj_data_web_${uid}` : 'yj_data_web_guest'
}
const rawNsStorage: StateStorage = {
  getItem: () => localStorage.getItem(nsKey()),
  setItem: (_name, value) => {
    localStorage.setItem(nsKey(), value)
  },
  removeItem: () => {
    localStorage.removeItem(nsKey())
  },
}
const namespacedStorage = createJSONStorage(() => rawNsStorage)

// ============ State 类型 ============
interface AppState {
  // 用户
  userInfo: UserInfo | null
  isPaid: boolean
  freeTrialUsed: boolean
  // 生命值
  lives: number
  maxLives: number
  lastRefill: number
  // 连胜
  streak: number
  longestStreak: number
  lastStudyDate: string
  // 学习进度
  learningProgress: Record<string, LearningProgress>
  collectedCards: string[]
  // 解卦
  divinationRecords: DivinationRecord[]
  dailyDivineCount: number
  dailyDivineDate: string
  // 签到
  signDates: string[]
  // 会员/认证
  memberType: MemberType | null
  memberExpireAt: number | null
  paidAt: number | null
  certificationLevel: CertLevel | null
  certificationAt: number | null
  primaryExamPassed: boolean
  examRecords: ExamRecord[]
  divineOrders: DivineOrder[]
  // 活动
  events: AppEvent[]
  eventParticipated: Record<string, boolean>
  eventCompleted: Record<string, string>

  // ===== Actions =====
  init: () => void
  applyAccountUser: (user: AccountUser) => void
  setAccountUserInfo: (user: AccountUser) => void
  clearAccountUser: () => void
  loseLife: () => void
  checkLifeRefill: () => void
  updateStreak: () => void
  checkSignIn: () => boolean
  getContinuousSignDays: () => number
  doSignIn: () => { lives: number; fragment: number; continuous: number } | null
  canDivineToday: () => boolean
  recordDivination: (question: string, hexagramName: string, hexagramSymbol: string, response: string) => void
  updateCardProgress: (hexId: string, viewed: number, current: number) => void
  updateGameProgress: (hexId: string, correct: number, played: number, completed: boolean) => void
  collectCard: (hexId: string) => boolean
  completeHexagram: (hexId: string) => void
  // 会员/认证
  setMember: (type: MemberType) => void
  setCertification: (level: CertLevel) => void
  addExamRecord: (rec: ExamRecord) => void
}

// ============ 初始学习进度 ============
function buildInitialProgress(): Record<string, LearningProgress> {
  const progress: Record<string, LearningProgress> = {}
  hexagrams.forEach((hex, index) => {
    progress[hex.id] = {
      hexagramId: hex.id,
      status: index === 0 ? 'unlocked' : 'locked',
      currentStage: 1,
      cardsViewed: 0,
      currentCard: 0,
      gameCompleted: false,
      gameCorrect: 0,
      gamePlayed: 0,
      cardCollected: false,
      completedAt: null,
    }
  })
  return progress
}

// ============ Store ============
export const useStore = create<AppState>()(
  persist(
    (set, get, api) => ({
      userInfo: null,
      isPaid: false,
      freeTrialUsed: false,
      lives: 5,
      maxLives: 5,
      lastRefill: Date.now(),
      streak: 0,
      longestStreak: 0,
      lastStudyDate: '',
      learningProgress: {},
      collectedCards: [],
      divinationRecords: [],
      dailyDivineCount: 0,
      dailyDivineDate: '',
      signDates: [],
      memberType: null,
      memberExpireAt: null,
      paidAt: null,
      certificationLevel: null,
      certificationAt: null,
      primaryExamPassed: false,
      examRecords: [],
      divineOrders: [],
      events: DEFAULT_EVENTS,
      eventParticipated: {},
      eventCompleted: {},

      init: () => {
        const s = get()
        // 初始化学习进度
        if (!s.learningProgress || Object.keys(s.learningProgress).length === 0) {
          set({ learningProgress: buildInitialProgress() })
        }
        // 生命值恢复检查
        get().checkLifeRefill()
      },

      applyAccountUser: (user) => {
        setCurrentUid(user.id)
        set({ userInfo: { nickName: user.nickName, avatarUrl: user.avatar, loginType: 'account' } })
        api.persist.rehydrate()
      },
      setAccountUserInfo: (user) =>
        set({ userInfo: { nickName: user.nickName, avatarUrl: user.avatar, loginType: 'account' } }),
      clearAccountUser: () => {
        setCurrentUid(null)
        set({ userInfo: null })
        api.persist.rehydrate()
      },

      loseLife: () => {
        const s = get()
        if (s.lives > 0) {
          set({ lives: s.lives - 1, lastRefill: Date.now() })
        }
      },

      checkLifeRefill: () => {
        const s = get()
        if (s.lives >= s.maxLives) return
        const interval = 30 * 60 * 1000 // 30分钟
        const elapsed = Date.now() - s.lastRefill
        const recovered = Math.floor(elapsed / interval)
        if (recovered > 0) {
          set({
            lives: Math.min(s.maxLives, s.lives + recovered),
            lastRefill: Date.now(),
          })
        }
      },

      updateStreak: () => {
        const s = get()
        const today = formatDate(new Date())
        if (s.lastStudyDate === today) return
        let streak = s.streak
        if (s.lastStudyDate) {
          const diff = dayDiff(s.lastStudyDate, today)
          if (diff === 1) streak += 1
          else if (diff > 1) streak = 1
        } else {
          streak = 1
        }
        set({
          streak,
          lastStudyDate: today,
          longestStreak: Math.max(s.longestStreak, streak),
        })
      },

      checkSignIn: () => {
        const today = formatDate(new Date())
        return get().signDates.includes(today)
      },

      getContinuousSignDays: () => {
        const dates = get().signDates
        if (dates.length === 0) return 0
        const dateSet = new Set(dates)
        const today = new Date()
        const todayStr = formatDate(today)
        let cursor = new Date(today)
        if (!dateSet.has(todayStr)) {
          cursor.setDate(cursor.getDate() - 1)
        }
        let continuous = 0
        while (dateSet.has(formatDate(cursor))) {
          continuous++
          cursor.setDate(cursor.getDate() - 1)
        }
        return continuous
      },

      doSignIn: () => {
        const s = get()
        if (s.checkSignIn()) return null
        const today = formatDate(new Date())
        set({ signDates: [...s.signDates, today] })
        const continuous = get().getContinuousSignDays()
        let addLives = 1
        let fragment = 0
        if (continuous % 7 === 0) { addLives = 2; fragment = 1 }
        else if (continuous % 3 === 0) { addLives = 1 }
        set({ lives: Math.min(s.maxLives, s.lives + addLives) })
        return { lives: addLives, fragment, continuous }
      },

      canDivineToday: () => {
        const s = get()
        if (s.isPaid) return true
        const today = formatDate(new Date())
        if (s.dailyDivineDate !== today) return true
        return s.dailyDivineCount < 1
      },

      recordDivination: (question, hexagramName, hexagramSymbol, response) => {
        const s = get()
        const today = formatDate(new Date())
        const newCount = s.dailyDivineDate === today ? s.dailyDivineCount + 1 : 1
        const record: DivinationRecord = {
          id: Date.now(),
          question, hexagramName, hexagramSymbol, response,
          createdAt: nowStr(),
        }
        set({
          divinationRecords: [record, ...s.divinationRecords].slice(0, 20),
          dailyDivineCount: newCount,
          dailyDivineDate: today,
        })
      },

      updateCardProgress: (hexId, viewed, current) => {
        const s = get()
        const progress = { ...s.learningProgress }
        const p = progress[hexId] || {} as LearningProgress
        progress[hexId] = {
          ...p,
          hexagramId: hexId,
          cardsViewed: Math.max(p.cardsViewed || 0, viewed),
          currentCard: current,
          currentStage: 1,
          status: p.status || 'unlocked',
        }
        set({ learningProgress: progress })
      },

      updateGameProgress: (hexId, correct, played, completed) => {
        const s = get()
        const progress = { ...s.learningProgress }
        const p = progress[hexId] || {} as LearningProgress
        progress[hexId] = {
          ...p,
          hexagramId: hexId,
          gameCorrect: correct,
          gamePlayed: played,
          gameCompleted: completed,
        }
        set({ learningProgress: progress })
      },

      collectCard: (hexId) => {
        const s = get()
        const cardId = 'c-' + hexId
        if (s.collectedCards.includes(cardId)) return false
        set({ collectedCards: [...s.collectedCards, cardId] })
        const progress = { ...s.learningProgress }
        const p = progress[hexId] || {} as LearningProgress
        progress[hexId] = { ...p, cardCollected: true }
        set({ learningProgress: progress })
        return true
      },

      completeHexagram: (hexId) => {
        const s = get()
        const progress = { ...s.learningProgress }
        const p = progress[hexId] || {} as LearningProgress
        progress[hexId] = {
          ...p,
          status: 'completed',
          completedAt: Date.now(),
          currentStage: 4,
        }
        // 解锁下一卦
        const hex = hexagrams.find((h) => h.id === hexId)
        if (hex) {
          const nextHex = hexagrams.find((h) => h.order === hex.order + 1)
          if (nextHex) {
            const np = progress[nextHex.id] || {} as LearningProgress
            progress[nextHex.id] = { ...np, status: 'unlocked' }
          }
        }
        set({ learningProgress: progress })
        get().updateStreak()
      },


      setMember: (type) => set({ memberType: type, isPaid: true, paidAt: Date.now() }),
      setCertification: (level) => {
        set({ certificationLevel: level, certificationAt: Date.now() })
        if (level === 'primary') set({ primaryExamPassed: true })
      },
      addExamRecord: (rec) => set((s) => ({ examRecords: [rec, ...s.examRecords] })),
    }),
    {
      name: 'yj_data_web',
      storage: namespacedStorage,
    }
  )
)
