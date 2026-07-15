// 数据层 · 对应小程序 data/appData.js
import hexagrams from './hexagrams.js'
import knowledgeCards from './knowledge_cards.js'
import gameLevels from './game_levels.js'
import type { Hexagram, KnowledgeCard, GameLevel } from '@/types'

export { hexagrams, knowledgeCards, gameLevels }

export function getHexagram(id: string): Hexagram | null {
  return (hexagrams as Hexagram[]).find((h) => h.id === id) ?? null
}

export function getCards(hexagramId: string): KnowledgeCard[] {
  return (knowledgeCards as KnowledgeCard[])
    .filter((c) => c.hexagram_id === hexagramId)
    .sort((a, b) => a.order - b.order)
}

export function getLevels(hexagramId: string): GameLevel[] {
  return (gameLevels as GameLevel[])
    .filter((l) => l.hexagram_id === hexagramId)
    .sort((a, b) => a.order - b.order) as GameLevel[]
}

// 卡牌稀有度：1-16 普通，17-48 稀有，49-60 史诗，61-64 传说
export function getRarity(order: number): 0 | 1 | 2 | 3 {
  if (order >= 61) return 3
  if (order >= 49) return 2
  if (order >= 17) return 1
  return 0
}

export function getRarityLabel(rarity: number): string {
  return ['普通', '稀有', '史诗', '传说'][rarity] ?? '普通'
}
