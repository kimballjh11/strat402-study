/** STRAT 401 content rules: every module meets the template and every question is well-formed. */
import { describe, expect, it } from 'vitest'
import { cardsFor } from '../../../src/strat401/content/cards'
import { SESSIONS } from '../../../src/strat401/content/map'
import { MODULES } from '../../../src/strat401/content/registry'
import { describeSource } from '../../../src/strat401/content/sources'

const ids = SESSIONS.map((s) => s.id)

describe('every session has a full module', () => {
  it.each(ids)('%s is built', (id) => expect(MODULES[id]).toBeTruthy())
})

describe.each(ids)('%s template', (id) => {
  const m = MODULES[id]!
  it('framework: one-liner, analogy, intuition, procedure, recall drills, new scenarios', () => {
    expect(m.framework.oneLiner.length).toBeGreaterThan(40)
    expect(m.framework.analogy.length).toBeGreaterThan(40)
    expect(m.framework.intuition.length).toBeGreaterThanOrEqual(5)
    expect(m.framework.howToRun.length).toBeGreaterThanOrEqual(5)
    expect(m.framework.recall.length).toBeGreaterThanOrEqual(4)
    expect(m.framework.newScenarios.length).toBeGreaterThanOrEqual(3)
  })
  it('10 cold calls escalating Facts → Action', () => {
    expect(m.coldCalls).toHaveLength(10)
    const order = ['Facts', 'Analysis', 'Judgment', 'Action']
    const lv = m.coldCalls.map((c) => order.indexOf(c.level))
    expect([...lv].sort((a, b) => a - b)).toEqual(lv)
    for (const c of m.coldCalls) expect(c.model && c.weak && c.whyWeak).toBeTruthy()
  })
  it('≥20 bank questions, each with an explanation on every option', () => {
    expect(m.bank.length).toBeGreaterThanOrEqual(20)
    for (const q of m.bank) {
      expect(q.session).toBe(id)
      expect(q.options.length).toBeGreaterThanOrEqual(3)
      expect(q.correct).toBeGreaterThanOrEqual(0)
      expect(q.correct).toBeLessThan(q.options.length)
      for (const o of q.options) expect(o.why.length).toBeGreaterThan(1)
      expect(q.src).toBeTruthy()
    }
    expect(new Set(m.bank.map((q) => q.id)).size).toBe(m.bank.length)
  })
  it('concept check: 8–10 questions drawn from the bank', () => {
    expect(m.checkIds.length).toBeGreaterThanOrEqual(8)
    expect(m.checkIds.length).toBeLessThanOrEqual(10)
    for (const c of m.checkIds) expect(m.bank.some((q) => q.id === c)).toBe(true)
  })
  it('devil’s advocate, model pyramid, written and oral prompts, summary', () => {
    expect(m.devil.argument && m.devil.response).toBeTruthy()
    expect(m.devil.probes.length).toBeGreaterThanOrEqual(3)
    expect(m.pyramid.model.a.length).toBeGreaterThan(30)
    expect(m.pyramid.model.supports.length).toBeGreaterThanOrEqual(3)
    expect(m.written.rubric.length).toBeGreaterThanOrEqual(3)
    expect(m.oral.probes.length).toBeGreaterThanOrEqual(3)
    expect(m.summary.numbers.length).toBeGreaterThanOrEqual(3)
    expect(m.shorts.length).toBeGreaterThanOrEqual(4)
  })
  it('flashcards are generated from terms, framework parts and case facts', () => {
    expect(cardsFor(id).length).toBeGreaterThanOrEqual(15)
  })
})

describe('source tags', () => {
  const tags = new Set<string>()
  for (const m of Object.values(MODULES)) {
    for (const q of m!.bank) tags.add(q.src)
    const text = JSON.stringify(m)
    for (const t of text.matchAll(/\[\[([^\]]+)\]\]/g)) tags.add(t[1])
  }
  it.each([...tags])('“%s” resolves to a document', (t) => expect(describeSource(t)).not.toBe('STRAT 401 course materials'))
})

describe('global uniqueness', () => {
  it('question ids are unique across sessions', () => {
    const all = Object.values(MODULES).flatMap((m) => m!.bank.map((q) => q.id))
    expect(new Set(all).size).toBe(all.length)
  })
})
