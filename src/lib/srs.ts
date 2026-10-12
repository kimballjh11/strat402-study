import { isoDay } from './format'
import type { CardState } from './store'

/** Leitner intervals in days for boxes 1..5. */
export const INTERVALS = [0, 1, 2, 4, 8]

export function nextCard(prev: CardState | undefined, knewIt: boolean, today = new Date()): CardState {
  const box = knewIt ? Math.min(5, (prev?.box ?? 1) + 1) : 1
  const due = new Date(today)
  due.setDate(due.getDate() + INTERVALS[box - 1])
  return { box, due: isoDay(due) }
}

export function isDue(c: CardState | undefined, today = isoDay()) {
  return !c || c.due <= today
}
