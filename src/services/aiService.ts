// AI 解卦服务 · 对应小程序 utils/ai-service.js
// Web 端暂用 Mock 占位（保护 API Key），预留后端代理接口
import type { Hexagram } from '@/types'
import { hexagrams } from '@/data/appData'

export interface DivineResult {
  hexagram: Hexagram
  response: string
  method: DivineMethod
}

export type DivineMethod = 'time' | 'random' | 'manual'

export interface DivineOptions {
  method?: DivineMethod
  /** 手动起卦（摇卦）时由前端生成的卦 id */
  manualHexId?: string
}

// 先天八卦：3 位二进制（阳=1）→ 卦名（下卦取 id 前 3 位，上卦取后 3 位）
const BAGUA: Record<string, string> = {
  '111': '乾', '110': '兑', '101': '离', '100': '震',
  '011': '巽', '010': '坎', '001': '艮', '000': '坤',
}

export function baguaNames(id: string): { lower: string; upper: string } {
  const lower = id.slice(0, 3)
  const upper = id.slice(3, 6)
  return { lower: BAGUA[lower] || '', upper: BAGUA[upper] || '' }
}

// 模拟 6 次摇卦：每次生成 1 爻（阳=1 / 阴=0），自下而上 → 返回 hexId
export function castHexagram(): string {
  let bits = ''
  for (let i = 0; i < 6; i++) {
    bits += Math.random() < 0.5 ? '1' : '0'
  }
  return bits // 前 3 位=下卦，后 3 位=上卦
}

function pickHexagram(question: string): Hexagram {
  const q = question.toLowerCase()
  const find = (id: string) => hexagrams.find((h) => h.id === id)!
  if (q.includes('工作') || q.includes('事业') || q.includes('创业') || q.includes('升职') || q.includes('跳槽')) {
    return find('100010') // 屯
  }
  if (q.includes('学习') || q.includes('考试') || q.includes('考研') || q.includes('成长') || q.includes('学业')) {
    return find('010001') // 蒙
  }
  if (q.includes('感情') || q.includes('关系') || q.includes('婚') || q.includes('恋') || q.includes('人际')) {
    return find('011100') // 咸
  }
  if (q.includes('财') || q.includes('钱') || q.includes('投资') || q.includes('生意')) {
    return find('001101') // 丰
  }
  if (q.includes('家庭') || q.includes('父母') || q.includes('家人') || q.includes('和睦')) {
    return find('101011') // 家人
  }
  return find('111111') // 乾
}

function buildResponse(question: string, hex: Hexagram): string {
  const q = question.toLowerCase()
  let theme = ''
  if (q.includes('工作') || q.includes('事业')) theme = '事业'
  else if (q.includes('学习') || q.includes('考试')) theme = '学业'
  else if (q.includes('感情') || q.includes('关系')) theme = '感情'
  else if (q.includes('财')) theme = '财运'
  else theme = '当下'

  return `根据你的问题，我选择**${hex.name}卦**（${hex.symbol}）来为你解读。

${hex.gua_ci}

**大象传**：${hex.da_xiang}

**核心智慧**：${hex.keywords.join('、')}。${hex.tuan_ci.slice(0, 40)}……

**关于你的${theme}**：
1. 从卦象来看，当前正处于「${hex.keywords[0]}」的阶段，需要顺应这个势态。
2. ${hex.yao_ci[1]} —— 提示你在具体行动中要保持中正。
3. 记住「${hex.keywords[hex.keywords.length - 1]}」，凡事不可过犹不及。

⚠️ 以上解读基于《易经》哲学，仅供学习参考，不构成任何人生决策建议。`
}

// 深度解读（付费）：基于爻辞 / 小象 / 关键词生成更丰富的推演
export function deepText(hex: Hexagram): string {
  const lines: string[] = []
  lines.push(`**【${hex.name}卦 · 深度解读】**`)
  lines.push(`卦辞：「${hex.gua_ci}」`)
  lines.push(`彖传：「${hex.tuan_ci}」`)
  lines.push('')
  lines.push('**六爻精义（自下而上）**：')
  hex.yao_ci.slice(0, 6).forEach((yc, i) => {
    const pos = ['初', '二', '三', '四', '五', '上'][i]
    lines.push(`· ${pos}爻：${yc}`)
  })
  if (hex.xiao_xiang?.length) {
    lines.push('')
    lines.push('**小象提点**：' + hex.xiao_xiang.slice(0, 3).join('；') + '。')
  }
  lines.push('')
  lines.push(`**应期与行动**：以「${hex.keywords.join('、')}」为纲，先立其本、后图其末；临事守中，待时而动。`)
  return lines.join('\n')
}

// 统一入口（Mock）
export function divine(question: string, options: DivineOptions = {}, callback: (r: DivineResult) => void) {
  const method = options.method || 'time'
  let hex: Hexagram
  if (method === 'manual' && options.manualHexId) {
    hex = (hexagrams as Hexagram[]).find((h) => h.id === options.manualHexId) || (hexagrams as Hexagram[])[0]
  } else if (method === 'random') {
    hex = (hexagrams as Hexagram[])[Math.floor(Math.random() * (hexagrams as Hexagram[]).length)]
  } else {
    hex = pickHexagram(question)
  }
  const response = buildResponse(question, hex)
  // 模拟思考延迟
  setTimeout(() => {
    callback({ hexagram: hex, response, method })
  }, 1500 + Math.random() * 800)
}

// 预留：真实后端代理接口
// export async function divineViaBackend(question: string): Promise<DivineResult> {
//   const res = await fetch('/api/divine', { method: 'POST', body: JSON.stringify({ question }) })
//   return res.json()
// }
