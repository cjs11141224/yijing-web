// 易学 Web 端类型定义 · 对应小程序数据结构

// ============ 卦象 ============
export interface Hexagram {
  id: string
  name: string
  symbol: string
  gua_ci: string
  tuan_ci: string
  da_xiang: string
  yao_ci: string[]
  xiao_xiang: string[]
  keywords: string[]
  order: number
}

// ============ 知识卡片 ============
export interface KnowledgeCard {
  id: string
  hexagram_id: string
  order: number
  title: string
  content: string
  original_text: string | null
  illustration: string
}

// ============ 游戏关卡 ============
export type GameLevelType = 'puzzle' | 'scenario' | 'truefalse' | 'wordcloud'

export interface BaseLevel {
  id: string
  type: GameLevelType
  hexagram_id: string
  order: number
  prompt?: string
  explanation?: string
}

export interface PuzzleLevel extends BaseLevel {
  type: 'puzzle'
  correct_lines: number[]
  pool: number[]
}

export interface ScenarioOption {
  text: string
  is_correct: boolean
}

export interface ScenarioLevel extends BaseLevel {
  type: 'scenario'
  scenario: string
  options: { A: ScenarioOption; B: ScenarioOption }
}

export interface TrueFalseLevel extends BaseLevel {
  type: 'truefalse'
  correct: boolean
  time_limit: number
  statement?: string
  question?: string
}

export interface WordcloudWord {
  text: string
  is_correct: boolean
}

export interface WordcloudLevel extends BaseLevel {
  type: 'wordcloud'
  words: WordcloudWord[]
}

export type GameLevel = PuzzleLevel | ScenarioLevel | TrueFalseLevel | WordcloudLevel

// ============ 学习进度 ============
export type HexStatus = 'locked' | 'unlocked' | 'completed'

export interface LearningProgress {
  hexagramId: string
  status: HexStatus
  currentStage: number
  cardsViewed: number
  currentCard: number
  gameCompleted: boolean
  gameCorrect: number
  gamePlayed: number
  cardCollected: boolean
  completedAt: number | null
}

// ============ 用户 ============
export type LoginType = 'wechat' | 'phone' | 'guest' | 'account'

export interface UserInfo {
  nickName: string
  avatarUrl?: string
  loginType: LoginType
}

// ============ 卡牌 ============
export type Rarity = 0 | 1 | 2 | 3

export interface CollectionCard {
  id: string
  order: number
  name: string
  symbol: string
  collected: boolean
  rarity: Rarity
  rarityLabel: string
}

// ============ 解卦记录 ============
export interface DivinationRecord {
  id: number
  question: string
  hexagramName: string
  hexagramSymbol: string
  response: string
  createdAt: string
}

// ============ 社区 ============
export type PostType = 'note' | 'case' | 'question'

export interface Comment {
  id: number
  nickname: string
  content: string
  time: string
}

export interface CommunityPost {
  id: string
  type: PostType
  typeName: string
  title: string
  summary: string
  content: string
  images: string[]
  hexagramId: string
  hexagramName: string
  author: { nickname: string; avatar: string }
  likeCount: number
  commentCount: number
  comments: Comment[]
  createdAt: string
  liked: boolean
  favorited?: boolean
}

// ============ 内容市场 ============
export type ContentType = 'course' | 'note' | 'case'

export interface MarketContent {
  id: string
  type: ContentType
  typeName: string
  title: string
  cover: string
  summary: string
  content: string
  author: { nickname: string; avatar: string; intro: string }
  price: number
  isFree: boolean
  sales: number
  rating: number
  purchased: boolean
  previewPercent: number
}

// ============ 问答 ============
export interface QaAnswer {
  id: number
  authorId: string
  nickname: string
  content: string
  time: string
}
export interface QaQuestion {
  id: string
  title: string
  reward: number
  status: 'resolved' | 'pending'
  statusName: string
  answerCount: number
  hexagramId: string
  hexagramName: string
  asker: { nickname: string }
  content: string
  bestAnswer: string
  answers: QaAnswer[]
  createdAt: string
  resolvedAt: string
}

// ============ 活动 ============
export interface AppEvent {
  id: string
  name: string
  desc: string
  targetHexagramId: string
  reward: string
  active: boolean
}

// ============ 会员/认证 ============
export type MemberType = 'monthly' | 'quarterly' | 'yearly'
export type CertLevel = 'primary' | 'middle' | 'senior'

export interface ExamRecord {
  id: number
  level: string
  score: number
  passed: boolean
  createdAt: string
}

export interface DivineOrder {
  id: number
  question: string
  hexagramName: string
  price: number
  status: 'paid' | 'resolved'
  createdAt: string
}

// 真人解卦预约（生产环境，付费 ¥39）
export type DivineOrderStatus = 'pending' | 'accepted' | 'done'
export type DivineMessageRole = 'user' | 'diviner'
export interface DivineMessage {
  id: string
  role: DivineMessageRole // user=用户提问/追问, diviner=真人解卦师回复
  text: string
  createdAt: string
}
export interface RealDivinerOrder {
  id: string
  userId: string
  question: string
  method: 'time' | 'random' | 'manual'
  notes?: string
  status: DivineOrderStatus // pending 待接单 / accepted 已接单 / done 已完成
  messages: DivineMessage[] // 对话消息流（首条为用户的 question）
  reply: string // 最近一条真人解卦师回复文本（列表预览用，初始为空）
  price: number
  createdAt: string
}
