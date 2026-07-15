import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { X, Heart, Check, RotateCcw, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/store/useStore'
import { getHexagram, getCards, getLevels } from '@/data/appData'
import type { GameLevel, PuzzleLevel, ScenarioLevel, TrueFalseLevel, WordcloudLevel, KnowledgeCard } from '@/types'

interface PuzzleSlot { value: number; poolIdx: number; checked: boolean; correct: boolean }
interface PoolPiece { value: number; used: boolean; idx: number }
interface WcWord { text: string; is_correct: boolean; selected: boolean }

export default function Learn() {
  const { id = '' } = useParams()
  const nav = useNavigate()

  const hexagram = useMemo(() => getHexagram(id), [id])
  const cards = useMemo(() => getCards(id), [id])
  const levels = useMemo(() => getLevels(id), [id])

  const lives = useStore((s) => s.lives)
  const loseLife = useStore((s) => s.loseLife)
  const updateCardProgress = useStore((s) => s.updateCardProgress)
  const updateGameProgress = useStore((s) => s.updateGameProgress)
  const collectCard = useStore((s) => s.collectCard)
  const completeHexagram = useStore((s) => s.completeHexagram)

  const [stage, setStage] = useState(1)
  const [currentCard, setCurrentCard] = useState(0)
  const swiperRef = useRef<HTMLDivElement>(null)

  // stage2
  const [currentLevel, setCurrentLevel] = useState(0)
  const [levelData, setLevelData] = useState<GameLevel | null>(null)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameCorrect, setGameCorrect] = useState(0)
  const [gamePlayed, setGamePlayed] = useState(0)
  const startTimeRef = useRef(0)

  // puzzle
  const [puzzleSlots, setPuzzleSlots] = useState<(PuzzleSlot | null)[]>([])
  const [puzzlePool, setPuzzlePool] = useState<PoolPiece[]>([])
  const [selectedSlot, setSelectedSlot] = useState(-1)
  const [allFilled, setAllFilled] = useState(false)
  const [dragOverSlot, setDragOverSlot] = useState(-1)
  const dragSourceRef = useRef<{ type: 'pool' | 'slot'; idx: number } | null>(null)

  // scenario
  const [scenarioSelected, setScenarioSelected] = useState<string | null>(null)

  // truefalse
  const [tfSelected, setTfSelected] = useState<boolean | null>(null)
  const [tfTimeLeft, setTfTimeLeft] = useState(15)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // wordcloud
  const [wcWords, setWcWords] = useState<WcWord[]>([])
  const [wcSubmitted, setWcSubmitted] = useState(false)

  // stage4
  const [score, setScore] = useState(0)
  const [totalTimeText, setTotalTimeText] = useState('')
  const [reviewPoints, setReviewPoints] = useState<string[]>([])

  useEffect(() => {
    if (!hexagram) {
      toast.error('卦象不存在')
      setTimeout(() => nav(-1), 1200)
    }
  }, [hexagram, nav])

  useEffect(() => () => clearTimer(), [])

  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // ============ Stage 1: 卡片 ============
  function onSwiperScroll() {
    const el = swiperRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    if (idx !== currentCard) {
      setCurrentCard(idx)
      updateCardProgress(id, idx + 1, idx)
    }
  }

  function goToCard(idx: number) {
    const el = swiperRef.current
    const clamped = Math.max(0, Math.min(cards.length - 1, idx))
    if (el) {
      el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
    }
    setCurrentCard(clamped)
    updateCardProgress(id, clamped + 1, clamped)
  }

  function completeCards() {
    setStage(2)
    setCurrentLevel(0)
    setGameCorrect(0)
    setGamePlayed(0)
    startTimeRef.current = Date.now()
    loadLevel(0)
  }

  // ============ Stage 2: 游戏 ============
  function loadLevel(idx: number) {
    clearTimer()
    const lv = levels[idx]
    if (!lv) return
    setLevelData(lv)
    setAnswered(false)
    setIsCorrect(false)
    setScenarioSelected(null)
    setTfSelected(null)
    setWcSubmitted(false)
    setSelectedSlot(-1)
    setAllFilled(false)

    if (lv.type === 'puzzle') {
      const p = lv as PuzzleLevel
      setPuzzleSlots(p.correct_lines.map(() => null))
      setPuzzlePool(p.pool.map((v, i) => ({ value: v, used: false, idx: i })))
    } else if (lv.type === 'truefalse') {
      setTfTimeLeft((lv as TrueFalseLevel).time_limit)
      startTimer((lv as TrueFalseLevel).time_limit)
    } else if (lv.type === 'wordcloud') {
      setWcWords((lv as WordcloudLevel).words.map((w) => ({ text: w.text, is_correct: w.is_correct, selected: false })))
    }
    setCurrentLevel(idx)
  }

  function startTimer(limit: number) {
    clearTimer()
    let left = limit
    timerRef.current = setInterval(() => {
      left -= 1
      setTfTimeLeft(left)
      if (left <= 0) {
        clearTimer()
        answerTf(null)
      }
    }, 1000)
  }

  // puzzle
  function onTapSlot(i: number) {
    if (answered) return
    const slots = [...puzzleSlots]
    if (slots[i]) {
      const poolIdx = (slots[i] as PuzzleSlot).poolIdx
      const pool = puzzlePool.map((p) => (p.idx === poolIdx ? { ...p, used: false } : p))
      slots[i] = null
      setPuzzleSlots(slots)
      setPuzzlePool(pool)
      setSelectedSlot(-1)
      setAllFilled(slots.every((s) => s !== null))
      return
    }
    setSelectedSlot(i)
  }

  function onTapPool(i: number) {
    if (answered) return
    const piece = puzzlePool[i]
    if (piece.used) return
    if (selectedSlot < 0) {
      toast.error('请先选择爻位')
      return
    }
    const slots = [...puzzleSlots]
    slots[selectedSlot] = { value: piece.value, poolIdx: i, checked: false, correct: false }
    const pool = puzzlePool.map((p) => (p.idx === i ? { ...p, used: true } : p))
    setPuzzleSlots(slots)
    setPuzzlePool(pool)
    setSelectedSlot(-1)
    setAllFilled(slots.every((s) => s !== null))
  }

  function submitPuzzle() {
    if (!allFilled || answered || !levelData) return
    const lv = levelData as PuzzleLevel
    const slots = puzzleSlots.map((s, i) => {
      const slot = s as PuzzleSlot
      const correct = slot.value === lv.correct_lines[i]
      return { ...slot, checked: true, correct }
    })
    const ok = slots.every((s) => s.correct)
    setPuzzleSlots(slots)
    setAnswered(true)
    setIsCorrect(ok)
    handleAnswer(ok)
  }

  // 拖拽：从爻池放到爻位
  function placePoolToSlot(poolIdx: number, slotIdx: number) {
    if (answered) return
    const piece = puzzlePool[poolIdx]
    if (piece.used) return
    const slots = [...puzzleSlots]
    const pool = [...puzzlePool]
    if (slots[slotIdx]) {
      const old = slots[slotIdx] as PuzzleSlot
      pool[old.poolIdx] = { ...pool[old.poolIdx], used: false }
    }
    slots[slotIdx] = { value: piece.value, poolIdx, checked: false, correct: false }
    pool[poolIdx] = { ...pool[poolIdx], used: true }
    setPuzzleSlots(slots)
    setPuzzlePool(pool)
    setSelectedSlot(-1)
    setAllFilled(slots.every((s) => s !== null))
  }

  // 拖拽：爻位之间移动
  function moveSlotToSlot(fromIdx: number, toIdx: number) {
    if (answered || fromIdx === toIdx) return
    const slots = [...puzzleSlots]
    const pool = [...puzzlePool]
    const moving = slots[fromIdx] as PuzzleSlot | null
    if (!moving) return
    if (slots[toIdx]) {
      const old = slots[toIdx] as PuzzleSlot
      pool[old.poolIdx] = { ...pool[old.poolIdx], used: false }
    }
    slots[toIdx] = moving
    slots[fromIdx] = null
    setPuzzleSlots(slots)
    setPuzzlePool(pool)
    setSelectedSlot(-1)
    setAllFilled(slots.every((s) => s !== null))
  }

  // 拖拽：爻位拖回爻池
  function removeSlotToPool(slotIdx: number) {
    if (answered) return
    const slot = puzzleSlots[slotIdx] as PuzzleSlot | null
    if (!slot) return
    const slots = [...puzzleSlots]
    const pool = puzzlePool.map((p) => (p.idx === slot.poolIdx ? { ...p, used: false } : p))
    slots[slotIdx] = null
    setPuzzleSlots(slots)
    setPuzzlePool(pool)
    setSelectedSlot(-1)
    setAllFilled(slots.every((s) => s !== null))
  }

  function onDropSlot(i: number) {
    const src = dragSourceRef.current
    if (!src) return
    if (src.type === 'pool') placePoolToSlot(src.idx, i)
    else moveSlotToSlot(src.idx, i)
    setDragOverSlot(-1)
  }

  function onDropPool() {
    const src = dragSourceRef.current
    if (src?.type === 'slot') removeSlotToPool(src.idx)
    setDragOverSlot(-1)
  }

  // scenario
  function onSelectScenario(key: string) {
    if (answered || !levelData) return
    const lv = levelData as ScenarioLevel
    const ok = lv.options[key as 'A' | 'B'].is_correct
    setScenarioSelected(key)
    setAnswered(true)
    setIsCorrect(ok)
    handleAnswer(ok)
  }

  // truefalse
  function onSelectTf(ans: boolean) {
    if (answered || !levelData) return
    clearTimer()
    answerTf(ans)
  }

  function answerTf(ans: boolean | null) {
    if (answered || !levelData) return
    clearTimer()
    const lv = levelData as TrueFalseLevel
    const ok = ans !== null && ans === lv.correct
    setTfSelected(ans)
    setAnswered(true)
    setIsCorrect(ok)
    handleAnswer(ok)
  }

  // wordcloud
  function onToggleWord(i: number) {
    if (wcSubmitted) return
    const words = wcWords.map((w, idx) => (idx === i ? { ...w, selected: !w.selected } : w))
    setWcWords(words)
  }

  function submitWordcloud() {
    if (wcSubmitted || !levelData) return
    if (!wcWords.some((w) => w.selected)) return
    const lv = levelData as WordcloudLevel
    let ok = true
    for (let i = 0; i < wcWords.length; i++) {
      if (lv.words[i].is_correct !== wcWords[i].selected) {
        ok = false
        break
      }
    }
    setWcSubmitted(true)
    setAnswered(true)
    setIsCorrect(ok)
    handleAnswer(ok)
  }

  function handleAnswer(ok: boolean) {
    const played = gamePlayed + 1
    let correct = gameCorrect
    if (ok) correct += 1
    else loseLife()
    setGamePlayed(played)
    setGameCorrect(correct)
    updateGameProgress(id, correct, played, false)
  }

  function nextLevel() {
    if (currentLevel === levels.length - 1) {
      finishGame()
    } else {
      loadLevel(currentLevel + 1)
    }
  }

  function finishGame() {
    const accuracy = gameCorrect / levels.length
    if (accuracy >= 0.6) {
      collectCard(id)
      setStage(3)
    } else {
      setStage(5)
    }
  }

  // ============ Stage 3 → 4 ============
  function goSummary() {
    const totalSec = Math.floor((Date.now() - startTimeRef.current) / 1000)
    const m = Math.floor(totalSec / 60)
    const s = totalSec % 60
    setTotalTimeText(m > 0 ? `${m}分${s}秒` : `${s}秒`)
    setScore(gameCorrect * 100 + lives * 20)
    setReviewPoints(cards.slice(0, 3).map((c: KnowledgeCard) => c.original_text || `${c.title}：${c.content.slice(0, 24)}…`))
    setStage(4)
    completeHexagram(id)
  }

  function finishLearn() {
    toast.success('学习完成，已解锁下一卦')
    setTimeout(() => nav('/hexagrams'), 1000)
  }

  if (!hexagram) return null

  // ============ 爻线渲染 ============
  const Yao = ({ value, size = 'normal' }: { value: number; size?: 'normal' | 'small' }) => {
    const h = size === 'small' ? 'h-2' : 'h-3.5'
    if (value === 1) return <div className={`w-full ${h} bg-yiji-ink rounded`} />
    return (
      <div className={`w-full ${h} flex gap-1.5`}>
        <div className="flex-1 bg-yiji-ink rounded" />
        <div className="w-2" />
        <div className="flex-1 bg-yiji-ink rounded" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-white))]">
      {/* ===== Stage 1: 知识卡片 ===== */}
      {stage === 1 && (
        <div className="min-h-screen flex flex-col">
          <div className="flex items-center justify-between px-3 h-12">
            <button onClick={() => nav(-1)} className="text-2xl text-muted-foreground w-8">‹</button>
            <span className="title-serif text-base">{hexagram.name}卦</span>
            <button onClick={() => nav('/hexagrams')} className="w-8"><X size={20} className="text-muted-foreground ml-auto" /></button>
          </div>

          <div className="flex flex-col items-center py-4">
            <span className="hex-symbol text-6xl text-yiji-gold leading-none">{hexagram.symbol}</span>
            <span className="title-serif text-xl mt-2">{hexagram.name}卦</span>
            <div className="flex flex-wrap gap-1.5 justify-center mt-2 px-6">
              {hexagram.keywords.map((k) => (
                <span key={k} className="text-[11px] bg-yiji-gold-light text-yiji-gold px-2 py-0.5 rounded">{k}</span>
              ))}
            </div>
          </div>

          <div className="relative flex-1 min-h-0">
            <div
              ref={swiperRef}
              onScroll={onSwiperScroll}
              className="h-full overflow-x-auto no-scrollbar snap-x snap-mandatory px-4"
            >
              <div className="flex h-full">
                {cards.map((c) => (
                  <div key={c.id} className="snap-center shrink-0 w-full pr-0 h-full flex items-center">
                    <div
                      onClick={() => { if (currentCard < cards.length - 1) goToCard(currentCard + 1) }}
                      className="bg-white rounded-2xl shadow-card p-5 min-h-[300px] w-full cursor-pointer select-none"
                    >
                      <h3 className="title-serif text-base mb-2">{c.title}</h3>
                      <div className="h-px bg-[hsl(var(--border))] mb-3" />
                      <p className="text-sm leading-relaxed text-foreground/90">{c.content}</p>
                      {c.original_text && (
                        <div className="original-text text-sm mt-3">{c.original_text}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {currentCard > 0 && (
              <button
                onClick={() => goToCard(currentCard - 1)}
                aria-label="上一页"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 shadow-card flex items-center justify-center text-yiji-gold active:scale-90 transition"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {currentCard < cards.length - 1 && (
              <button
                onClick={() => goToCard(currentCard + 1)}
                aria-label="下一页"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 shadow-card flex items-center justify-center text-yiji-gold active:scale-90 transition"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>

          <div className="flex justify-center gap-1.5 py-3">
            {cards.map((c, i) => (
              <button
                key={c.id}
                onClick={() => goToCard(i)}
                aria-label={`第 ${i + 1} 页`}
                className={`h-1.5 rounded-full transition-all ${i === currentCard ? 'w-4 bg-yiji-gold' : 'w-1.5 bg-light-gray'}`}
              />
            ))}
          </div>
          <div className="text-center text-xs text-muted-foreground pb-2">{currentCard + 1}/{cards.length}</div>

          {currentCard === cards.length - 1 && (
            <div className="px-4 pb-8 pt-2">
              <button onClick={completeCards} className="w-full h-12 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition">
                开始闯关
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===== Stage 2: 游戏闯关 ===== */}
      {stage === 2 && levelData && (
        <div className="min-h-screen flex flex-col">
          <div className="flex items-center justify-between px-3 h-12">
            <button onClick={() => nav(-1)} className="text-2xl text-muted-foreground w-8">‹</button>
            <span className="title-serif text-base">{hexagram.name}卦·闯关</span>
            <div className="flex items-center gap-1 text-sm">
              <Heart size={14} className="text-yiji-red fill-yiji-red" />
              <span>{lives}</span>
            </div>
          </div>

          <div className="px-4 py-2 flex items-center gap-2">
            <span className="text-xs text-yiji-gold title-serif">{currentLevel + 1}/{levels.length}</span>
            <div className="flex-1 h-1.5 bg-yiji-warm-gray rounded-full overflow-hidden">
              <div className="h-full bg-yiji-gold rounded-full transition-all" style={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }} />
            </div>
          </div>

          <div className="px-4 py-3">
            {/* puzzle */}
            {levelData.type === 'puzzle' && (
              <div>
                <p className="text-sm text-center mb-4">{(levelData as PuzzleLevel).prompt}</p>
                <div
                  className="flex flex-col-reverse items-center gap-2 mb-6"
                  onDragOver={(e) => e.preventDefault()}
                >
                  {puzzleSlots.map((slot, i) => (
                    <div
                      key={i}
                      onClick={() => onTapSlot(i)}
                      onDragOver={(e) => { e.preventDefault(); setDragOverSlot(i) }}
                      onDragLeave={() => setDragOverSlot(-1)}
                      onDrop={(e) => { e.preventDefault(); onDropSlot(i) }}
                      className={`w-48 h-10 rounded-lg flex items-center justify-center border-2 transition cursor-pointer ${
                        selectedSlot === i ? 'border-yiji-gold bg-yiji-gold/10' : slot ? 'border-transparent bg-yiji-warm-gray' : 'border-dashed border-light-gray'
                      } ${dragOverSlot === i ? 'ring-2 ring-yiji-gold' : ''}`}
                    >
                      {slot ? (
                        <div
                          draggable
                          onDragStart={() => { dragSourceRef.current = { type: 'slot', idx: i } }}
                          className={`w-32 cursor-grab active:cursor-grabbing ${(slot as PuzzleSlot).checked ? ((slot as PuzzleSlot).correct ? 'opacity-100' : 'opacity-40') : ''}`}
                        >
                          <Yao value={(slot as PuzzleSlot).value} />
                        </div>
                      ) : (
                        <span className="text-xs text-light-gray">爻位 {i + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div
                  className="flex flex-wrap justify-center gap-2"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); onDropPool() }}
                >
                  {puzzlePool.map((p) => (
                    <div
                      key={p.idx}
                      draggable={!p.used}
                      onDragStart={() => { dragSourceRef.current = { type: 'pool', idx: p.idx } }}
                      onClick={() => onTapPool(p.idx)}
                      className={`w-16 h-7 rounded flex items-center px-1 ${p.used ? 'opacity-20' : 'bg-yiji-warm-gray cursor-grab active:cursor-grabbing'}`}
                    >
                      <Yao value={p.value} size="small" />
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground text-center mt-3">拖动爻到对应爻位，或先点爻位再点爻</p>
              </div>
            )}

            {/* scenario */}
            {levelData.type === 'scenario' && (
              <div>
                <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
                  <p className="text-sm leading-relaxed">{(levelData as ScenarioLevel).scenario}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {(['A', 'B'] as const).map((key) => {
                    const opt = (levelData as ScenarioLevel).options[key]
                    const right = answered && opt.is_correct
                    const wrong = answered && scenarioSelected === key && !opt.is_correct
                    return (
                      <button
                        key={key}
                        onClick={() => onSelectScenario(key)}
                        disabled={answered}
                        className={`bg-white rounded-2xl shadow-card p-4 text-left transition active:scale-95 border-2 ${
                          right ? 'border-yiji-green' : wrong ? 'border-yiji-red' : scenarioSelected === key ? 'border-yiji-gold' : 'border-transparent'
                        }`}
                      >
                        <div className="title-serif text-yiji-gold mb-1.5">{key}</div>
                        <p className="text-sm">{opt.text}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* truefalse */}
            {levelData.type === 'truefalse' && (
              <div>
                <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
                  <p className="text-sm leading-relaxed">{(levelData as TrueFalseLevel).statement || levelData.prompt}</p>
                </div>
                {!answered && (
                  <div className="h-1.5 bg-yiji-warm-gray rounded-full overflow-hidden mb-5">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${tfTimeLeft <= 3 ? 'bg-yiji-red' : tfTimeLeft <= 7 ? 'bg-yellow-500' : 'bg-yiji-green'}`}
                      style={{ width: `${(tfTimeLeft / (levelData as TrueFalseLevel).time_limit) * 100}%` }}
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => onSelectTf(true)}
                    disabled={answered}
                    className={`py-6 rounded-2xl shadow-card flex flex-col items-center gap-1 border-2 transition active:scale-95 ${
                      answered && (levelData as TrueFalseLevel).correct === true ? 'border-yiji-green bg-yiji-green/10' : answered && tfSelected === true ? 'border-yiji-red bg-yiji-red/10' : 'border-transparent bg-white'
                    }`}
                  >
                    <Check size={28} className="text-yiji-green" />
                    <span className="text-sm">对</span>
                  </button>
                  <button
                    onClick={() => onSelectTf(false)}
                    disabled={answered}
                    className={`py-6 rounded-2xl shadow-card flex flex-col items-center gap-1 border-2 transition active:scale-95 ${
                      answered && (levelData as TrueFalseLevel).correct === false ? 'border-yiji-green bg-yiji-green/10' : answered && tfSelected === false ? 'border-yiji-red bg-yiji-red/10' : 'border-transparent bg-white'
                    }`}
                  >
                    <X size={28} className="text-yiji-red" />
                    <span className="text-sm">错</span>
                  </button>
                </div>
              </div>
            )}

            {/* wordcloud */}
            {levelData.type === 'wordcloud' && (
              <div>
                <p className="text-sm text-center mb-4">{levelData.prompt}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {wcWords.map((w, i) => {
                    const right = wcSubmitted && w.selected === w.is_correct
                    const wrong = wcSubmitted && w.selected !== w.is_correct
                    return (
                      <button
                        key={i}
                        onClick={() => onToggleWord(i)}
                        disabled={wcSubmitted}
                        className={`px-3 py-2 rounded-full text-sm border transition active:scale-95 ${
                          right ? 'border-yiji-green bg-yiji-green/10 text-yiji-green' : wrong ? 'border-yiji-red bg-yiji-red/10 text-yiji-red' : w.selected ? 'border-yiji-gold bg-yiji-gold/10 text-yiji-gold' : 'border-[hsl(var(--border))] bg-white'
                        }`}
                      >
                        {w.text}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 反馈 */}
          {answered && (
            <div className={`mx-4 mb-3 rounded-2xl p-3.5 ${isCorrect ? 'bg-yiji-green/10' : 'bg-yiji-red/10'}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span>{isCorrect ? '✅' : '❌'}</span>
                <span className={`title-serif text-sm ${isCorrect ? 'text-yiji-green' : 'text-yiji-red'}`}>{isCorrect ? '回答正确' : '回答错误'}</span>
              </div>
              <p className="text-xs text-foreground/80">{levelData.explanation}</p>
            </div>
          )}

          {/* 底部按钮 */}
          <div className="px-4 pt-4 pb-8">
            {levelData.type === 'puzzle' && !answered && (
              <button onClick={submitPuzzle} disabled={!allFilled} className="w-full h-12 rounded-xl bg-yiji-gold text-white title-serif disabled:bg-light-gray transition active:scale-[0.98]">
                提交
              </button>
            )}
            {levelData.type === 'wordcloud' && !wcSubmitted && (
              <button onClick={submitWordcloud} disabled={!wcWords.some((w) => w.selected)} className="w-full h-12 rounded-xl bg-yiji-gold text-white title-serif disabled:bg-light-gray transition active:scale-[0.98]">
                提交
              </button>
            )}
            {answered && (
              <button onClick={nextLevel} className="w-full h-12 rounded-xl bg-yiji-gold text-white title-serif transition active:scale-[0.98]">
                {currentLevel === levels.length - 1 ? '查看成绩' : '下一关'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===== Stage 3: 卡牌获得 ===== */}
      {stage === 3 && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <p className="title-serif text-lg text-yiji-gold mb-4">恭喜获得</p>
          <div className="bg-gradient-to-br from-white to-yiji-gold-light/40 rounded-3xl shadow-card p-8 w-full flex flex-col items-center">
            <span className="hex-symbol text-7xl text-yiji-gold leading-none mb-3 animate-float">{hexagram.symbol}</span>
            <span className="title-serif text-2xl">{hexagram.name}卦</span>
            <div className="w-12 h-px bg-yiji-gold/40 my-3" />
            <p className="text-xs text-foreground/70 text-center leading-relaxed">{hexagram.da_xiang}</p>
            <div className="flex flex-wrap gap-1.5 justify-center mt-3">
              {hexagram.keywords.map((k) => (
                <span key={k} className="text-[11px] bg-yiji-gold-light text-yiji-gold px-2 py-0.5 rounded">{k}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 w-full mt-6">
            <button onClick={() => nav('/')} className="flex-1 h-12 rounded-xl bg-white border border-yiji-gold text-yiji-gold title-serif active:scale-[0.98] transition">
              返回首页
            </button>
            <button onClick={goSummary} className="flex-1 h-12 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition">
              继续
            </button>
          </div>
        </div>
      )}

      {/* ===== Stage 4: 学习总结 ===== */}
      {stage === 4 && (
        <div className="min-h-screen px-4 py-6">
          <div className="text-center mb-6">
            <h2 className="title-serif text-2xl">学习完成！</h2>
            <p className="text-xs text-muted-foreground mt-1">{hexagram.name}卦 · 已解锁下一卦</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 mb-4">
            {[
              { v: score, l: '得分' },
              { v: totalTimeText, l: '用时' },
              { v: `${gameCorrect}/${levels.length}`, l: '答对关数' },
            ].map((s) => (
              <div key={s.l} className="bg-white rounded-2xl shadow-card p-3 text-center">
                <div className="title-serif text-lg text-yiji-gold">{s.v}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
            <h3 className="title-serif text-sm mb-3">核心知识点回顾</h3>
            <div className="space-y-2">
              {reviewPoints.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-yiji-gold">•</span>
                  <span className="text-xs text-foreground/80 leading-relaxed">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => nav('/divination')} className="w-full bg-white rounded-2xl shadow-card p-3.5 flex items-center justify-between mb-3 active:scale-[0.98] transition">
            <span className="text-sm flex items-center gap-2"><Sparkles size={16} className="text-yiji-gold" /> 去 AI 解卦试试</span>
            <ChevronRight size={16} className="text-yiji-gold" />
          </button>

          <button onClick={finishLearn} className="w-full h-12 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition flex items-center justify-center gap-2">
            <RotateCcw size={16} /> 完成学习，返回卦象
          </button>
        </div>
      )}

      {/* ===== Stage 5: 闯关结算（未通关） ===== */}
      {stage === 5 && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <p className="title-serif text-lg text-yiji-red mb-4">再接再厉</p>
          <div className="bg-gradient-to-br from-white to-yiji-gold-light/40 rounded-3xl shadow-card p-8 w-full flex flex-col items-center">
            <div className="title-serif text-5xl text-yiji-gold my-3">
              {Math.round((gameCorrect / levels.length) * 100)}<span className="text-lg text-muted-foreground">分</span>
            </div>
            <p className="text-xs text-foreground/70 text-center leading-relaxed">
              本次答对 {gameCorrect}/{levels.length} 关，未达 60% 通关线，再闯一次吧
            </p>
          </div>
          <div className="flex gap-3 w-full mt-6">
            <button
              onClick={() => { setGameCorrect(0); setGamePlayed(0); setStage(2); loadLevel(0) }}
              className="flex-1 h-12 rounded-xl bg-white border border-yiji-gold text-yiji-gold title-serif active:scale-[0.98] transition"
            >
              重新挑战
            </button>
            <button onClick={() => nav('/hexagrams')} className="flex-1 h-12 rounded-xl bg-yiji-gold text-white title-serif active:scale-[0.98] transition">
              返回卦象
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
