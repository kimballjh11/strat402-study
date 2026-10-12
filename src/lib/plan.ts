import { isoDay, parseIsoDay } from './format'
import type { Progress } from './store'

export interface StudyBlock {
  day: string
  title: string
  minutes: number
  items: { label: string; href: string }[]
  kind: 'learn' | 'mixed' | 'exam' | 'review' | 'examday'
}

/** Default priority: calculation-heavy sessions first (short answers come from spreadsheets). */
export const DEFAULT_ORDER = ['S10', 'S08', 'S09', 'S07', 'S06', 'S05', 'S03', 'S04', 'S11', 'S01', 'S12']

export function moduleOrder(p: Progress, titles: Record<string, string>): string[] {
  // Weakest sessions first, by LO accuracy (diagnostic + practice), then the default order.
  const score = (s: string) => {
    let c = 0
    let a = 0
    for (const [lo, [cc, aa]] of Object.entries(p.loAccuracy)) if (lo.startsWith(s + '-')) (c += cc), (a += aa)
    return a === 0 ? 0.5 : c / a
  }
  const mastered = (s: string) => p.mastery[s]?.passed
  return [...DEFAULT_ORDER]
    .filter((s) => titles[s])
    .sort((x, y) => Number(mastered(x)) - Number(mastered(y)) || score(x) - score(y) || DEFAULT_ORDER.indexOf(x) - DEFAULT_ORDER.indexOf(y))
}

export function buildPlan(p: Progress, titles: Record<string, string>, minutes: Record<string, number>, today = new Date()): StudyBlock[] {
  const exam = parseIsoDay(p.examDate)
  const days: string[] = []
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  while (d < exam) {
    days.push(isoDay(d))
    d.setDate(d.getDate() + 1)
  }
  const out: StudyBlock[] = []
  const n = days.length
  const examSlots = new Set<number>()
  if (n >= 3) examSlots.add(n - 2)
  if (n >= 6) examSlots.add(n - 4)
  else if (n >= 4) examSlots.add(n - 3)
  const reviewDay = n - 1
  const learnDays = days.map((_, i) => i).filter((i) => i !== reviewDay && !examSlots.has(i))
  const mods = moduleOrder(p, titles).filter((s) => !p.mastery[s]?.passed)
  // New modules early: spread across the first ~70% of learning days.
  const learnSpan = Math.max(1, Math.min(learnDays.length, Math.ceil(learnDays.length * 0.7)))
  const perDay = Math.ceil(mods.length / learnSpan)
  let mi = 0
  days.forEach((day, i) => {
    if (i === reviewDay && n > 1) {
      out.push({ day, kind: 'review', title: 'Final review: mistakes + flashcards', minutes: 90, items: [{ label: 'Mistake Log — retry every open miss', href: '#/mistakes' }, { label: 'Flashcards — all due cards', href: '#/flashcards' }, { label: 'Formula Sheet — blank-page drill', href: '#/formulas?tab=drill' }] })
      return
    }
    if (examSlots.has(i)) {
      out.push({ day, kind: 'exam', title: `Full practice exam #${[...examSlots].sort((a, b) => a - b).indexOf(i) + 1}`, minutes: 120, items: [{ label: 'Exam Mode — 30 MC + 6 short answer, 90 min', href: '#/exam' }, { label: 'Then: Mistake Log for every miss', href: '#/mistakes' }] })
      return
    }
    const today: string[] = []
    for (let k = 0; k < perDay && mi < mods.length; k++) today.push(mods[mi++])
    if (today.length) {
      out.push({
        day,
        kind: 'learn',
        title: `Learn: ${today.map((s) => titles[s]).join(' + ')}`,
        minutes: today.reduce((a, s) => a + (minutes[s] ?? 45), 0) + 15,
        items: [...today.map((s) => ({ label: `Session ${s.slice(1).replace(/^0/, '')}: ${titles[s]} (full module + mastery check)`, href: `#/learn/${s}` })), { label: '15 min flashcards', href: '#/flashcards' }],
      })
    } else {
      out.push({ day, kind: 'mixed', title: 'Mixed practice', minutes: 75, items: [{ label: 'Practice — mixed, weakest LOs first', href: '#/practice' }, { label: 'Quiz retakes', href: '#/quizzes' }, { label: 'Flashcards', href: '#/flashcards' }] })
    }
  })
  out.push({ day: p.examDate, kind: 'examday', title: 'Exam day — Testing Center (closed book, no AI)', minutes: 0, items: [{ label: 'Skim the Formula Sheet once, then go', href: '#/formulas' }] })
  return out
}
