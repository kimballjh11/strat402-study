/** Generator tests: 500 seeds each — no NaN, defining conditions hold, answers self-consistent. */
import { describe, expect, it } from 'vitest'
import { generators } from '../../src/content'
import { checkNumeric } from '../../src/lib/answer'

const SEEDS = Array.from({ length: 500 }, (_, i) => i * 7919 + 13)

describe.each(generators.map((g) => [g.id, g] as const))('generator %s', (_id, g) => {
  it('500 seeds: finite answers, valid choices, verify() passes, steps present', () => {
    for (const s of SEEDS) {
      const p = g.make(s)
      expect(p.parts.length).toBeGreaterThan(0)
      expect(p.steps.length).toBeGreaterThan(0)
      expect(p.prompt).not.toMatch(/NaN|undefined|Infinity/)
      for (const st of p.steps) expect(st).not.toMatch(/NaN|undefined/)
      for (const part of p.parts) {
        if (part.type === 'num') {
          expect(Number.isFinite(part.answer), `${g.id} seed ${s}`).toBe(true)
          // the displayed answer must check as correct
          const shown = part.kind === 'percent' ? `${part.answer * 100}%` : String(part.answer)
          expect(checkNumeric(shown, { answer: part.answer, kind: part.kind, tol: part.tol, abs: part.abs })).toBe(true)
        } else {
          expect(part.correct).toBeGreaterThanOrEqual(0)
          expect(part.correct).toBeLessThan(part.options.length)
        }
      }
      if (g.verify) expect(g.verify(s), `${g.id} seed ${s}`).toBeNull()
    }
  })
  it('is deterministic for a seed', () => {
    expect(JSON.stringify(g.make(42))).toBe(JSON.stringify(g.make(42)))
  })
})

describe('S08 generator defining conditions', () => {
  it('linear OPE: OPE = −b·P/Q and revenue max at OPE = −1', () => {
    const g = generators.find((x) => x.id === 's08-ope-linear')!
    for (const s of SEEDS) {
      const p = g.make(s)
      const m = p.prompt.match(/Q = ([\d{},.]+) - ([\d{},.]+)P/)!
      const a = Number(m[1].replace(/[{},]/g, ''))
      const b = Number(m[2].replace(/[{},]/g, ''))
      const pstar = (p.parts[3] as { answer: number }).answer
      expect((-b * pstar) / (a - b * pstar)).toBeCloseTo(-1, 6)
    }
  })
  it('arc OPE: TR-test classification agrees with the actual revenue change', () => {
    const g = generators.find((x) => x.id === 's08-ope-arc')!
    for (const s of SEEDS) {
      const p = g.make(s)
      const e = (p.parts[2] as { answer: number }).answer
      const dp = (p.parts[1] as { answer: number }).answer
      const revRose = (p.parts[4] as { correct: number }).correct === 0
      const predictRose = e > -1 ? dp > 0 : dp < 0
      expect(revRose).toBe(predictRose)
    }
  })
})
