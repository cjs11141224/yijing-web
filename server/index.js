// 易学 Web 端账号后端
// 账号注册 / 登录 / 资料 / 改密 / 退出，密码 bcrypt 加密 + JWT。
// 生产环境同时托管前端 dist（SPA fallback），单进程即可部署。
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'yijing-dev-secret-change-me'
const DATA_DIR = path.join(__dirname, 'data')
const ACCOUNTS_FILE = path.join(DATA_DIR, 'accounts.json')

app.use(cors())
app.use(express.json())

// ---- 数据持久化（演示用 JSON 文件，生产可换数据库）----
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
function loadAccounts() {
  if (!fs.existsSync(ACCOUNTS_FILE)) return []
  try {
    return JSON.parse(fs.readFileSync(ACCOUNTS_FILE, 'utf8'))
  } catch {
    return []
  }
}
function saveAccounts(list) {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(list, null, 2))
}

// ---- 工具 ----
function publicUser(u) {
  return {
    id: u.id,
    username: u.username,
    phone: u.phone,
    email: u.email,
    nickName: u.nickName,
    avatar: u.avatar,
    bio: u.bio,
    balance: u.balance ?? 128,
    createdAt: u.createdAt,
  }
}
function auth(req, res, next) {
  const h = req.headers.authorization || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : ''
  if (!token) return res.status(401).json({ error: '未登录' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.userId = payload.sub
    next()
  } catch {
    return res.status(401).json({ error: '登录已过期，请重新登录' })
  }
}

function getAccount(userId) {
  const list = loadAccounts()
  return list.find((u) => u.id === userId)
}

// ---- 注册 ----
app.post('/api/auth/register', (req, res) => {
  const { username, phone, email, password, nickName } = req.body || {}
  if (!password || password.length < 6) {
    return res.status(400).json({ error: '密码至少 6 位' })
  }
  const idt = username || phone || email
  if (!idt) {
    return res.status(400).json({ error: '请填写用户名 / 手机号 / 邮箱之一' })
  }
  const accounts = loadAccounts()
  const dup = accounts.find(
    (a) =>
      (username && a.username === username) ||
      (phone && a.phone === phone) ||
      (email && a.email === email)
  )
  if (dup) return res.status(409).json({ error: '该账号已存在' })

  const user = {
    id: 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    username: username || null,
    phone: phone || null,
    email: email || null,
    passwordHash: bcrypt.hashSync(password, 10),
    nickName: nickName || username || (phone ? '易友' + phone.slice(-4) : '易友'),
    avatar: '',
    bio: '',
    balance: 128,
    createdAt: new Date().toISOString(),
  }
  accounts.push(user)
  saveAccounts(accounts)
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '30d' })
  res.json({ token, user: publicUser(user) })
})

// ---- 登录 ----
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body || {}
  if (!identifier || !password) {
    return res.status(400).json({ error: '请输入账号和密码' })
  }
  const accounts = loadAccounts()
  const user = accounts.find(
    (a) => a.username === identifier || a.phone === identifier || a.email === identifier
  )
  if (!user) return res.status(401).json({ error: '账号不存在' })
  if (!bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: '密码错误' })
  }
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '30d' })
  res.json({ token, user: publicUser(user) })
})

// ---- 当前账号 ----
app.get('/api/auth/me', auth, (req, res) => {
  const user = loadAccounts().find((a) => a.id === req.userId)
  if (!user) return res.status(404).json({ error: '账号不存在' })
  res.json({ user: publicUser(user) })
})

// ---- 修改资料 ----
app.put('/api/auth/profile', auth, (req, res) => {
  const { nickName, avatar, bio } = req.body || {}
  const accounts = loadAccounts()
  const user = accounts.find((a) => a.id === req.userId)
  if (!user) return res.status(404).json({ error: '账号不存在' })
  if (nickName !== undefined) user.nickName = nickName
  if (avatar !== undefined) user.avatar = avatar
  if (bio !== undefined) user.bio = bio
  saveAccounts(accounts)
  res.json({ user: publicUser(user) })
})

// ---- 修改密码 ----
app.put('/api/auth/password', auth, (req, res) => {
  const { oldPassword, newPassword } = req.body || {}
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: '新密码至少 6 位' })
  }
  const accounts = loadAccounts()
  const user = accounts.find((a) => a.id === req.userId)
  if (!user) return res.status(404).json({ error: '账号不存在' })
  if (!bcrypt.compareSync(oldPassword || '', user.passwordHash)) {
    return res.status(400).json({ error: '原密码错误' })
  }
  user.passwordHash = bcrypt.hashSync(newPassword, 10)
  saveAccounts(accounts)
  res.json({ ok: true })
})

// ---- 退出（无状态 JWT，前端丢弃 token 即可）----
app.post('/api/auth/logout', auth, (req, res) => res.json({ ok: true }))

// ---- 深度解读（付费 ¥12，扣账户余额）----
app.post('/api/divine/deep', auth, (req, res) => {
  const price = 12
  const user = getAccount(req.userId)
  if (!user) return res.status(404).json({ error: '账户不存在' })
  const bal = user.balance ?? 128
  if (bal < price) return res.status(400).json({ error: '余额不足', balance: bal })
  user.balance = bal - price
  saveAccounts(loadAccounts().map((u) => (u.id === user.id ? user : u)))
  res.json({ ok: true, balance: user.balance, price })
})

// ============ 真人解卦预约（生产环境，付费 ¥39）============
// 预约数据服务端持久化（JSON 文件），按用户隔离；真人回复 reply 字段占位（待真人解卦师填写）。
const DIVINE_ORDER_PRICE = 39
const DIVINE_ORDERS_FILE = path.join(DATA_DIR, 'divine_orders.json')
const SEED_DIVINE_ORDERS = []

function defaultDivineOrders() {
  if (!fs.existsSync(DIVINE_ORDERS_FILE)) {
    saveDivineOrders(SEED_DIVINE_ORDERS)
    return SEED_DIVINE_ORDERS
  }
  try {
    return JSON.parse(fs.readFileSync(DIVINE_ORDERS_FILE, 'utf-8'))
  } catch {
    return []
  }
}
function loadDivineOrders() {
  return defaultDivineOrders()
}
function saveDivineOrders(list) {
  fs.writeFileSync(DIVINE_ORDERS_FILE, JSON.stringify(list, null, 2))
}

// 提交预约（需登录，扣余额 ¥39）
app.post('/api/divine-orders', auth, (req, res) => {
  const { question, method, notes } = req.body || {}
  if (!question || question.trim().length < 2) return res.status(400).json({ error: '请填写您想问的问题' })
  const accounts = loadAccounts()
  const user = accounts.find((a) => a.id === req.userId)
  if (!user) return res.status(404).json({ error: '账号不存在' })
  const price = DIVINE_ORDER_PRICE
  const bal = user.balance ?? 128
  if (bal < price) return res.status(400).json({ error: '余额不足' })
  user.balance = bal - price
  const now = new Date().toISOString()
  const order = {
    id: 'do_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    userId: user.id,
    question: question.trim(),
    method: method || 'time',
    notes: (notes || '').trim(),
    status: 'pending', // pending 待接单 / accepted 已接单 / done 已完成
    messages: [
      { id: 'm_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), role: 'user', text: question.trim(), createdAt: now },
    ],
    reply: '',
    price,
    createdAt: now,
  }
  const data = loadDivineOrders()
  data.unshift(order)
  saveDivineOrders(data)
  saveAccounts(accounts)
  res.json({ order, balance: user.balance })
})

// 我的预约列表（需登录）
app.get('/api/divine-orders', auth, (req, res) => {
  const data = loadDivineOrders()
  const list = data.filter((o) => o.userId === req.userId)
  res.json({ orders: list })
})

// 单个预约详情（对话消息，需本人）
app.get('/api/divine-orders/:id', auth, (req, res) => {
  const data = loadDivineOrders()
  const order = data.find((o) => o.id === req.params.id && o.userId === req.userId)
  if (!order) return res.status(404).json({ error: '预约不存在' })
  res.json({ order })
})

// 用户发送追问消息（需本人，已完成订单不可再发）
app.post('/api/divine-orders/:id/messages', auth, (req, res) => {
  const { text } = req.body || {}
  if (!text || text.trim().length < 1) return res.status(400).json({ error: '消息不能为空' })
  const data = loadDivineOrders()
  const order = data.find((o) => o.id === req.params.id && o.userId === req.userId)
  if (!order) return res.status(404).json({ error: '预约不存在' })
  if (order.status === 'done') return res.status(400).json({ error: '该预约已完成，无法继续追问' })
  order.messages.push({ id: 'm_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), role: 'user', text: text.trim(), createdAt: new Date().toISOString() })
  saveDivineOrders(data)
  res.json({ order })
})

// ---- 后台管理（真人解卦师 / 管理员手动回写）----
const ADMIN_KEY = process.env.ADMIN_KEY || 'yijing-admin-dev-key'
function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'] || ''
  if (key !== ADMIN_KEY) return res.status(401).json({ error: '管理密钥无效' })
  next()
}

// 全部预约（后台，含用户名）
app.get('/api/admin/divine-orders', adminAuth, (req, res) => {
  const data = loadDivineOrders()
  const accounts = loadAccounts()
  const list = data.map((o) => {
    const u = accounts.find((a) => a.id === o.userId)
    return { ...o, userName: u ? u.username : '(未知)', userNick: u ? u.nickName || '' : '' }
  })
  res.json({ orders: list })
})

// 后台回复（追加真人解卦师消息；首次回复自动标记已接单，可显式标记完成）
app.post('/api/admin/divine-orders/:id/reply', adminAuth, (req, res) => {
  const { text, status } = req.body || {}
  if (!text || text.trim().length < 1) return res.status(400).json({ error: '回复内容不能为空' })
  const data = loadDivineOrders()
  const order = data.find((o) => o.id === req.params.id)
  if (!order) return res.status(404).json({ error: '预约不存在' })
  order.messages.push({ id: 'm_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), role: 'diviner', text: text.trim(), createdAt: new Date().toISOString() })
  order.reply = text.trim()
  if (order.status === 'pending') order.status = 'accepted'
  if (status === 'done') order.status = 'done'
  saveDivineOrders(data)
  res.json({ order })
})

// 后台更新状态（接单 / 完成）
app.post('/api/admin/divine-orders/:id/status', adminAuth, (req, res) => {
  const { status } = req.body || {}
  if (!['pending', 'accepted', 'done'].includes(status)) return res.status(400).json({ error: '状态无效' })
  const data = loadDivineOrders()
  const order = data.find((o) => o.id === req.params.id)
  if (!order) return res.status(404).json({ error: '预约不存在' })
  order.status = status
  saveDivineOrders(data)
  res.json({ order })
})

// ============ 易友社区（生产环境）============
// 帖子等数据服务端持久化（JSON 文件），跨账号共享；点赞/收藏按用户记录。
const POST_TYPE_NAMES = { note: '学习笔记', case: '解卦案例', question: '问答' }
const COMMUNITY_FILE = path.join(DATA_DIR, 'community.json')

function nowStr() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}
function formatDate(d) {
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

// 首启动种子帖子（保证社区非空，可由用户在前端互动）
const SEED_POSTS = [
  {
    id: 'p_seed1', type: 'note', typeName: '学习笔记',
    title: '乾卦初九"潜龙勿用"的生活启示',
    summary: '初入职场或新环境时，保持低调积累实力比急于表现更重要。',
    content: '初入职场或新环境时，保持低调积累实力比急于表现更重要。乾卦初九爻辞"潜龙勿用"告诉我们，在时机未到时应潜心修炼。\n\n我自己的体会是，刚入职前三个月，少说话多做事，默默观察公司的文化和人际关系。等到有了足够的积累和人脉，自然会有施展的机会。',
    images: [], hexagramId: '1', hexagramName: '乾',
    authorId: 'seed', author: { nickname: '易学小生', avatar: '' },
    likeCount: 42, commentCount: 2,
    comments: [
      { id: 101, authorId: 'seed', nickname: '太极爱好者', content: '说得太好了！我也是这样过来的。', time: '2026-07-01 14:30' },
      { id: 102, authorId: 'seed', nickname: '周易学者', content: '九二"见龙在田"才是真正的开始，初九是打基础。', time: '2026-07-01 15:20' },
    ],
    createdAt: '2026-07-01 10:15',
  },
  {
    id: 'p_seed2', type: 'case', typeName: '解卦案例',
    title: '问事业得坤卦，脚踏实地终有成',
    summary: '一位朋友问今年跳槽时机，摇得坤卦。建议先稳扎稳打积累经验。',
    content: '一位朋友问今年跳槽时机，摇得坤卦。坤卦主柔顺、厚德载物，建议先稳扎稳打积累经验，等到秋冬之际再考虑。\n\n爻辞"直方大，不习无不利"提示保持正直宽厚的态度即可。\n\n反馈：朋友听从建议后，在原公司沉淀了半年，年底顺利升职加薪。',
    images: [], hexagramId: '000000', hexagramName: '坤',
    authorId: 'seed', author: { nickname: '卦象达人', avatar: '' },
    likeCount: 67, commentCount: 1,
    comments: [
      { id: 201, authorId: 'seed', nickname: '小白学易', content: '受教了！我也在犹豫要不要跳槽。', time: '2026-07-01 16:00' },
    ],
    createdAt: '2026-07-01 09:30',
  },
  {
    id: 'p_seed3', type: 'question', typeName: '问答',
    title: '初学易经应该从哪一卦开始？',
    summary: '对易经很感兴趣但完全零基础，想请教各位前辈应该从哪一卦入门学习？',
    content: '对易经很感兴趣但完全零基础，想请教各位前辈应该从哪一卦入门学习？是乾卦还是另有推荐？\n\n目前已经看了几本入门书籍，但感觉还是不得要领。希望大家分享一下自己的学习路径。',
    images: [], hexagramId: '', hexagramName: '',
    authorId: 'seed', author: { nickname: '零基础小白', avatar: '' },
    likeCount: 35, commentCount: 3,
    comments: [
      { id: 301, authorId: 'seed', nickname: '易学导师', content: '建议从乾卦和坤卦入手，一阳一阴是基础中的基础。', time: '2026-07-01 11:00' },
      { id: 302, authorId: 'seed', nickname: '老易友', content: '可以先看《周易》的系辞传，了解整体框架再学卦爻。', time: '2026-07-01 12:00' },
      { id: 303, authorId: 'seed', nickname: '国学爱好者', content: '推荐南怀瑾先生的《易经杂说》，入门非常好。', time: '2026-07-01 13:00' },
    ],
    createdAt: '2026-06-30 20:00',
  },
  {
    id: 'p_seed4', type: 'note', typeName: '学习笔记',
    title: '泰卦"天地交而万物通"的现代解读',
    summary: '泰卦乾下坤上，象征天地交泰、上下沟通。在现代管理中，领导者要多倾听基层声音。',
    content: '泰卦乾下坤上，象征天地交泰、上下沟通。在现代管理中，领导者要多倾听基层声音才能实现组织和谐。\n\n应用到现代管理：高层要放下身段了解基层的实际情况，而基层的声音也能直达高层，这样的组织才有生命力。',
    images: [], hexagramId: '111000', hexagramName: '泰',
    authorId: 'seed', author: { nickname: '国学少年', avatar: '' },
    likeCount: 28, commentCount: 1,
    comments: [
      { id: 401, authorId: 'seed', nickname: '管理者老张', content: '这个角度很新颖，应用到管理上确实有启发。', time: '2026-06-30 18:00' },
    ],
    createdAt: '2026-06-30 15:00',
  },
  {
    id: 'p_seed5', type: 'case', typeName: '解卦案例',
    title: '问感情得咸卦，两情相悦的好兆头',
    summary: '为一位90后女孩问姻缘，摇得咸卦。咸卦上兑下艮，山泽通气，男女感应，是婚恋的大吉之卦。',
    content: '为一位90后女孩问姻缘，摇得咸卦。咸卦上兑下艮，山泽通气，男女感应，是婚恋的大吉之卦。\n\n解读：咸卦卦辞"亨，利贞，取女吉"，明确指向婚姻吉兆。\n\n建议：顺其自然，不必强求。果然三个月后对方通过朋友介绍认识了现在的男友。',
    images: [], hexagramId: '011100', hexagramName: '咸',
    authorId: 'seed', author: { nickname: '解卦师老王', avatar: '' },
    likeCount: 89, commentCount: 2,
    comments: [
      { id: 501, authorId: 'seed', nickname: '单身青年', content: '希望我也能遇到这样的好卦！', time: '2026-06-29 22:00' },
      { id: 502, authorId: 'seed', nickname: '情感导师', content: '咸卦确实是感情卦中最吉的一个。', time: '2026-06-30 08:00' },
    ],
    createdAt: '2026-06-29 20:00',
  },
]

function defaultCommunity() {
  return { posts: SEED_POSTS, likes: {}, favorites: {} }
}
function loadCommunity() {
  if (!fs.existsSync(COMMUNITY_FILE)) {
    const seed = defaultCommunity()
    fs.writeFileSync(COMMUNITY_FILE, JSON.stringify(seed, null, 2))
    return seed
  }
  try {
    return JSON.parse(fs.readFileSync(COMMUNITY_FILE, 'utf8'))
  } catch {
    return defaultCommunity()
  }
}
function saveCommunity(data) {
  fs.writeFileSync(COMMUNITY_FILE, JSON.stringify(data, null, 2))
}

// 给帖子附加当前用户的点赞/收藏状态
function decoratePost(p, data, userId) {
  const likes = data.likes[p.id] || []
  const favs = data.favorites[p.id] || []
  return {
    id: p.id,
    type: p.type,
    typeName: p.typeName,
    title: p.title,
    summary: p.summary,
    content: p.content,
    images: p.images || [],
    hexagramId: p.hexagramId,
    hexagramName: p.hexagramName,
    author: p.author,
    likeCount: p.likeCount,
    commentCount: p.commentCount,
    comments: p.comments || [],
    createdAt: p.createdAt,
    liked: userId ? likes.includes(userId) : false,
    favorited: userId ? favs.includes(userId) : false,
  }
}

// 可选鉴权：带 token 则解析 userId，否则匿名
function optionalAuth(req, res, next) {
  const h = req.headers.authorization || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : ''
  if (token) {
    try {
      req.userId = jwt.verify(token, JWT_SECRET).sub
    } catch {
      // 无效 token 当作匿名
    }
  }
  next()
}

// 列表
app.get('/api/community/posts', optionalAuth, (req, res) => {
  const data = loadCommunity()
  const { tab, keyword } = req.query
  let list = data.posts
  if (tab === 'qa') list = list.filter((p) => p.type === 'question')
  if (keyword) {
    const k = String(keyword).toLowerCase()
    list = list.filter(
      (p) =>
        (p.title || '').toLowerCase().includes(k) ||
        (p.summary || '').toLowerCase().includes(k) ||
        (p.content || '').toLowerCase().includes(k)
    )
  }
  list = list.slice().sort((a, b) => {
    if (b.likeCount !== a.likeCount) return b.likeCount - a.likeCount
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
  res.json({ posts: list.map((p) => decoratePost(p, data, req.userId)) })
})

// 发帖（需登录）
app.post('/api/community/posts', auth, (req, res) => {
  const { type, title, content, hexagramId, hexagramName } = req.body || {}
  if (!title || title.trim().length < 2) return res.status(400).json({ error: '请输入标题' })
  if (!content || content.trim().length < 5) return res.status(400).json({ error: '内容太短了' })
  const accounts = loadAccounts()
  const user = accounts.find((a) => a.id === req.userId)
  const post = {
    id: 'p_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    type: POST_TYPE_NAMES[type] ? type : 'note',
    typeName: POST_TYPE_NAMES[type] || '学习笔记',
    title: title.trim(),
    summary: (content || '').slice(0, 50),
    content: content.trim(),
    images: [],
    hexagramId: hexagramId || '',
    hexagramName: hexagramName || '',
    authorId: req.userId,
    author: { nickname: user?.nickName || '易友', avatar: user?.avatar || '' },
    likeCount: 0,
    commentCount: 0,
    comments: [],
    createdAt: nowStr(),
  }
  const data = loadCommunity()
  data.posts.unshift(post)
  saveCommunity(data)
  res.json({ post: decoratePost(post, data, req.userId) })
})

// 详情
app.get('/api/community/posts/:id', optionalAuth, (req, res) => {
  const data = loadCommunity()
  const p = data.posts.find((x) => x.id === req.params.id)
  if (!p) return res.status(404).json({ error: '帖子不存在' })
  res.json({ post: decoratePost(p, data, req.userId) })
})

// 点赞 toggle（需登录）
app.post('/api/community/posts/:id/like', auth, (req, res) => {
  const data = loadCommunity()
  const p = data.posts.find((x) => x.id === req.params.id)
  if (!p) return res.status(404).json({ error: '帖子不存在' })
  data.likes[p.id] = data.likes[p.id] || []
  const arr = data.likes[p.id]
  const i = arr.indexOf(req.userId)
  let liked
  if (i >= 0) {
    arr.splice(i, 1)
    liked = false
  } else {
    arr.push(req.userId)
    liked = true
  }
  p.likeCount = arr.length
  saveCommunity(data)
  res.json({ liked, likeCount: p.likeCount })
})

// 收藏 toggle（需登录）
app.post('/api/community/posts/:id/favorite', auth, (req, res) => {
  const data = loadCommunity()
  const p = data.posts.find((x) => x.id === req.params.id)
  if (!p) return res.status(404).json({ error: '帖子不存在' })
  data.favorites[p.id] = data.favorites[p.id] || []
  const arr = data.favorites[p.id]
  const i = arr.indexOf(req.userId)
  let favorited
  if (i >= 0) {
    arr.splice(i, 1)
    favorited = false
  } else {
    arr.push(req.userId)
    favorited = true
  }
  saveCommunity(data)
  res.json({ favorited })
})

// 评论列表
app.get('/api/community/posts/:id/comments', (req, res) => {
  const data = loadCommunity()
  const p = data.posts.find((x) => x.id === req.params.id)
  if (!p) return res.status(404).json({ error: '帖子不存在' })
  res.json({ comments: p.comments || [] })
})

// 发表评论（需登录）
app.post('/api/community/posts/:id/comments', auth, (req, res) => {
  const { content } = req.body || {}
  if (!content || !content.trim()) return res.status(400).json({ error: '评论不能为空' })
  const data = loadCommunity()
  const p = data.posts.find((x) => x.id === req.params.id)
  if (!p) return res.status(404).json({ error: '帖子不存在' })
  const accounts = loadAccounts()
  const user = accounts.find((a) => a.id === req.userId)
  const c = {
    id: Date.now(),
    authorId: req.userId,
    nickname: user?.nickName || '易友',
    content: content.trim(),
    time: nowStr(),
  }
  p.comments.push(c)
  p.commentCount = p.comments.length
  saveCommunity(data)
  res.json({ comment: c, commentCount: p.commentCount })
})

// 社区统计（可选登录，登录后返回 myPosts）
app.get('/api/community/stats', optionalAuth, (req, res) => {
  const data = loadCommunity()
  const posts = data.posts.length
  const likes = Object.values(data.likes).reduce((a, x) => a + x.length, 0)
  const comments = data.posts.reduce((a, p) => a + (p.comments ? p.comments.length : 0), 0)
  const myPosts = req.userId ? data.posts.filter((p) => p.authorId === req.userId).length : 0
  res.json({ posts, likes, comments, myPosts })
})

// ============ 内容市场（生产环境）============
// 内容商品服务端持久化（共享），购买记录 per-user 存 accounts.purchased。
const MARKET_FILE = path.join(DATA_DIR, 'market.json')
const CONTENT_TYPE_NAMES = { course: '课程', note: '笔记', case: '解卦案例' }

const SEED_MARKET = [
  {
    id: 'm_seed1', type: 'course', typeName: '课程',
    title: '易经六十四卦精讲：从入门到精通',
    cover: '', summary: '系统讲解六十四卦的卦象、卦辞、爻辞，配合生活案例深入浅出，适合零基础学习者。',
    content: '这是易经六十四卦精讲课程的完整内容...\n\n第一章：易经概述与八卦基础\n易经作为群经之首，蕴含了古人观察宇宙自然的智慧结晶。八卦（乾兑离震巽坎艮坤）是六十四卦的基础，每一卦由三爻组成...\n\n第二章：六十四卦详解\n六十四卦由八卦两两重叠而成，每一卦都有独特的卦象和含义...',
    author: { nickname: '国学大师张老师', avatar: '', intro: '清华大学国学研究院研究员，从事易学研究20年' },
    price: 29.9, isFree: false, sales: 1248, rating: 4.8, previewPercent: 30,
  },
  {
    id: 'm_seed2', type: 'note', typeName: '笔记',
    title: '手把手教你用梅花易数断卦',
    cover: '', summary: '梅花易数的核心方法和实操案例合集，包含20个真实断卦案例分析。',
    content: '梅花易数断卦的核心方法详解...\n\n一、起卦方法\n梅花易数有数字起卦、时间起卦、方位起卦等多种方法。最常用的是数字起卦法...\n\n二、体用生克\n体卦代表自己或问卦的主体，用卦代表对方或问卦的对象。体用之间的生克关系决定了吉凶...',
    author: { nickname: '梅花易数传人', avatar: '', intro: '梅花易数第十代传人，擅长数术与卦象分析' },
    price: 0, isFree: true, sales: 3567, rating: 4.6, previewPercent: 100,
  },
  {
    id: 'm_seed3', type: 'case', typeName: '解卦案例',
    title: '职场进阶：用周易智慧规划职业发展',
    cover: '', summary: '收录30个真实的职场解卦案例，涵盖跳槽、晋升、创业等场景的卦象分析。',
    content: '职场周易应用案例集...\n\n案例一：问跳槽得晋卦\n晋卦上离下坤，火在地上，光明普照。卦辞"康侯用锡马蕃庶，昼日三接"，预示着晋升和机遇...\n\n案例二：问创业得屯卦\n屯卦上坎下震，云雷交加，万物初生。爻辞"屯如邅如，乘马班如"，提示创业初期艰难...',
    author: { nickname: '职场易学', avatar: '', intro: '企业咨询顾问，将易经智慧融入现代管理' },
    price: 19.9, isFree: false, sales: 892, rating: 4.5, previewPercent: 30,
  },
]

function defaultMarket() {
  return { contents: SEED_MARKET }
}
function loadMarket() {
  if (!fs.existsSync(MARKET_FILE)) {
    const seed = defaultMarket()
    fs.writeFileSync(MARKET_FILE, JSON.stringify(seed, null, 2))
    return seed
  }
  try {
    return JSON.parse(fs.readFileSync(MARKET_FILE, 'utf8'))
  } catch {
    return defaultMarket()
  }
}
function saveMarket(d) {
  fs.writeFileSync(MARKET_FILE, JSON.stringify(d, null, 2))
}

// 给内容附加当前用户的购买状态
function decorateContent(c, accounts, userId) {
  const user = accounts.find((a) => a.id === userId)
  const purchased = user ? (user.purchased || []).includes(c.id) : false
  return { ...c, purchased }
}

// 列表
app.get('/api/market/contents', optionalAuth, (req, res) => {
  const data = loadMarket()
  const accounts = loadAccounts()
  const { tab } = req.query
  let list = data.contents
  if (tab && CONTENT_TYPE_NAMES[tab]) list = list.filter((c) => c.type === tab)
  list = list.slice().sort((a, b) => (b.sales || 0) - (a.sales || 0))
  res.json({ contents: list.map((c) => decorateContent(c, accounts, req.userId)) })
})

// 详情
app.get('/api/market/contents/:id', optionalAuth, (req, res) => {
  const data = loadMarket()
  const accounts = loadAccounts()
  const c = data.contents.find((x) => x.id === req.params.id)
  if (!c) return res.status(404).json({ error: '内容不存在' })
  res.json({ content: decorateContent(c, accounts, req.userId) })
})

// 发布（需登录）
app.post('/api/market/contents', auth, (req, res) => {
  const { type, title, summary, content, price } = req.body || {}
  if (!title || title.trim().length < 2) return res.status(400).json({ error: '请输入标题' })
  if (!content || content.trim().length < 20) return res.status(400).json({ error: '正文至少 20 字' })
  const accounts = loadAccounts()
  const user = accounts.find((a) => a.id === req.userId)
  const priceNum = Number(price) || 0
  const newC = {
    id: 'm_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    type: CONTENT_TYPE_NAMES[type] ? type : 'note',
    typeName: CONTENT_TYPE_NAMES[type] || '笔记',
    title: title.trim(),
    cover: '',
    summary: (summary || '').trim() || (content || '').trim().slice(0, 40),
    content: content.trim(),
    author: { nickname: user?.nickName || '易友', avatar: user?.avatar || '', intro: '' },
    price: priceNum,
    isFree: priceNum === 0,
    sales: 0,
    rating: 0,
    previewPercent: priceNum === 0 ? 100 : 30,
  }
  const data = loadMarket()
  data.contents.unshift(newC)
  saveMarket(data)
  res.json({ content: decorateContent(newC, accounts, req.userId) })
})

// 购买（需登录，扣余额 + 记购买记录）
app.post('/api/market/contents/:id/purchase', auth, (req, res) => {
  const accounts = loadAccounts()
  const user = accounts.find((a) => a.id === req.userId)
  if (!user) return res.status(404).json({ error: '账号不存在' })
  const data = loadMarket()
  const c = data.contents.find((x) => x.id === req.params.id)
  if (!c) return res.status(404).json({ error: '内容不存在' })
  user.purchased = user.purchased || []
  if (c.isFree || user.purchased.includes(c.id)) {
    return res.json({ purchased: true, balance: user.balance ?? 128 })
  }
  const bal = user.balance ?? 128
  if (bal < c.price) return res.status(400).json({ error: '余额不足' })
  user.balance = bal - c.price
  user.purchased.push(c.id)
  c.sales = (c.sales || 0) + 1
  saveAccounts(accounts)
  saveMarket(data)
  res.json({ purchased: true, balance: user.balance })
})

// ============ 问答求助（生产环境）============
// 问题/回答服务端持久化（共享），悬赏从余额扣减。
const QA_FILE = path.join(DATA_DIR, 'qa.json')

const SEED_QA = [
  {
    id: 'q_seed1', title: '求问今年财运如何？摇得丰卦', reward: 10, status: 'resolved', statusName: '已解决',
    answerCount: 3, hexagramId: '001101', hexagramName: '丰', askerId: 'seed', asker: { nickname: '创业者小李' },
    content: '我今年开始创业做电商，想问问财运走势如何？',
    bestAnswer: '丰卦雷火交加，卦辞"亨，王假之，勿忧，宜日中"，整体财运不错但要注意把握时机。丰卦提示在事业发展如日中天时要保持清醒，不宜过度扩张。',
    answers: [], createdAt: '2026-06-28', resolvedAt: '2026-06-29',
  },
  {
    id: 'q_seed2', title: '和家人关系紧张，如何用易经化解？', reward: 5, status: 'pending', statusName: '待回答',
    answerCount: 1, hexagramId: '', hexagramName: '', askerId: 'seed', asker: { nickname: '烦恼的小张' },
    content: '最近和父母因为职业选择问题争执很多，想请教易经中有没有关于家庭和睦的智慧？',
    bestAnswer: '', answers: [], createdAt: '2026-07-01', resolvedAt: '',
  },
  {
    id: 'q_seed3', title: '即将考研，求问学业运势', reward: 8, status: 'resolved', statusName: '已解决',
    answerCount: 4, hexagramId: '111111', hexagramName: '乾', askerId: 'seed', asker: { nickname: '考研人小王' },
    content: '12月份考研，想知道学业运势怎么样？',
    bestAnswer: '乾卦六爻代表事物发展的六个阶段，你正处于"终日乾乾"的第三阶段，需要持续努力、保持警惕。卦象显示只要坚持不懈就能取得好成绩。',
    answers: [], createdAt: '2026-06-25', resolvedAt: '2026-06-26',
  },
]

function defaultQa() {
  return { questions: SEED_QA }
}
function loadQa() {
  if (!fs.existsSync(QA_FILE)) {
    const seed = defaultQa()
    fs.writeFileSync(QA_FILE, JSON.stringify(seed, null, 2))
    return seed
  }
  try {
    return JSON.parse(fs.readFileSync(QA_FILE, 'utf8'))
  } catch {
    return defaultQa()
  }
}
function saveQa(d) {
  fs.writeFileSync(QA_FILE, JSON.stringify(d, null, 2))
}

// 列表
app.get('/api/qa/questions', optionalAuth, (req, res) => {
  const data = loadQa()
  const { tab } = req.query
  let list = data.questions
  if (tab === 'resolved') list = list.filter((q) => q.status === 'resolved')
  if (tab === 'pending') list = list.filter((q) => q.status === 'pending')
  list = list.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.json({ questions: list })
})

// 提问（需登录，扣余额悬赏）
app.post('/api/qa/questions', auth, (req, res) => {
  const { title, content, reward, hexagramId, hexagramName } = req.body || {}
  if (!title || title.trim().length < 2) return res.status(400).json({ error: '请输入问题' })
  const rewardNum = Number(reward) || 0
  const accounts = loadAccounts()
  const user = accounts.find((a) => a.id === req.userId)
  if (!user) return res.status(404).json({ error: '账号不存在' })
  const bal = user.balance ?? 128
  if (bal < rewardNum) return res.status(400).json({ error: '余额不足' })
  user.balance = bal - rewardNum
  const q = {
    id: 'q_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title: title.trim(),
    content: (content || '').trim(),
    reward: rewardNum,
    status: 'pending',
    statusName: '待回答',
    answerCount: 0,
    hexagramId: hexagramId || '',
    hexagramName: hexagramName || '',
    askerId: req.userId,
    asker: { nickname: user.nickName || '易友' },
    bestAnswer: '',
    answers: [],
    createdAt: formatDate(new Date()),
    resolvedAt: '',
  }
  const data = loadQa()
  data.questions.unshift(q)
  saveQa(data)
  saveAccounts(accounts)
  res.json({ question: q, balance: user.balance })
})

// 回答（需登录）
app.post('/api/qa/questions/:id/answers', auth, (req, res) => {
  const { content } = req.body || {}
  if (!content || !content.trim()) return res.status(400).json({ error: '回答不能为空' })
  const accounts = loadAccounts()
  const user = accounts.find((a) => a.id === req.userId)
  const data = loadQa()
  const q = data.questions.find((x) => x.id === req.params.id)
  if (!q) return res.status(404).json({ error: '问题不存在' })
  const ans = {
    id: Date.now(),
    authorId: req.userId,
    nickname: user?.nickName || '易友',
    content: content.trim(),
    time: nowStr(),
  }
  q.answers = q.answers || []
  q.answers.push(ans)
  q.answerCount = q.answers.length
  saveQa(data)
  res.json({ answer: ans, answerCount: q.answerCount })
})

// 采纳（需登录，可由回答者一步达成：提供 content 即作为最佳回答；或指定 answerId）
app.post('/api/qa/questions/:id/resolve', auth, (req, res) => {
  const { answerId, content } = req.body || {}
  const data = loadQa()
  const q = data.questions.find((x) => x.id === req.params.id)
  if (!q) return res.status(404).json({ error: '问题不存在' })
  let best = ''
  let ansId = null
  if (answerId) {
    const a = (q.answers || []).find((x) => String(x.id) === String(answerId))
    if (a) { best = a.content; ansId = a.id }
  } else if (content && content.trim()) {
    const accounts = loadAccounts()
    const user = accounts.find((a) => a.id === req.userId)
    const ans = { id: Date.now(), authorId: req.userId, nickname: user?.nickName || '易友', content: content.trim(), time: nowStr() }
    q.answers = q.answers || []
    q.answers.push(ans)
    q.answerCount = q.answers.length
    best = ans.content
    ansId = ans.id
  }
  if (!best) return res.status(400).json({ error: '请先提供或选择回答' })
  q.bestAnswer = best
  q.status = 'resolved'
  q.statusName = '已解决'
  q.resolvedAt = formatDate(new Date())
  saveQa(data)
  res.json({ ok: true, question: q, acceptedAnswerId: ansId })
})

// ---- 生产：托管前端 ----
const distDir = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: '接口不存在' })
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`易学账号后端已启动: http://localhost:${PORT}`)
})
