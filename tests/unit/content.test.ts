/** Content integrity: every reference resolves, every question is well-formed, every LO has coverage. */
import { describe, expect, it } from 'vitest'
import { allLos, cqLos, cqQuestions, generatorById, generators, mcqById, mcqs, sessions } from '../../src/content'
import { widgetIds } from '../../src/widgets/registry'

const loIds = new Set(allLos.map((l) => l.id))

describe('content integrity', () => {
  it('MCQ ids are unique and well-formed', () => {
    const ids = mcqs.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const q of mcqs) {
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(2)
      expect(q.correct, q.id).toBeGreaterThanOrEqual(0)
      expect(q.correct, q.id).toBeLessThan(q.options.length)
      for (const o of q.options) {
        expect(o.text.trim().length, q.id).toBeGreaterThan(0)
        expect(o.why.trim().length, `${q.id} missing why`).toBeGreaterThan(0)
        expect(o.text, q.id).not.toMatch(/NaN|undefined|Infinity/)
        expect(o.why, q.id).not.toMatch(/NaN|undefined/)
      }
      expect(new Set(q.options.map((o) => o.text)).size, `${q.id} duplicate options`).toBe(q.options.length)
      for (const lo of q.los) expect(loIds.has(lo), `${q.id} → ${lo}`).toBe(true)
      expect(q.src.length).toBeGreaterThan(0)
    }
  })
  it('generator ids are unique and LOs exist', () => {
    const ids = generators.map((g) => g.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const g of generators) for (const lo of g.los) expect(loIds.has(lo), `${g.id} → ${lo}`).toBe(true)
  })
  it.each(sessions.filter((s) => s.ready).map((s) => [s.id, s] as const))('%s references resolve', (_id, s) => {
    for (const id of s.checkIds) expect(mcqById[id], `${s.id} checkId ${id}`).toBeDefined()
    for (const id of s.applyGenerators) expect(generatorById[id], `${s.id} gen ${id}`).toBeDefined()
    for (const w of s.widgets) expect(widgetIds, `${s.id} widget ${w.id}`).toContain(w.id)
    expect(s.terms.length).toBeGreaterThan(0)
    expect(s.examples.length).toBeGreaterThan(0)
    expect(s.feynman.length).toBeGreaterThan(0)
    expect(s.summary.length).toBeGreaterThan(50)
  })
  it('CQ questions all map to real LOs', () => {
    expect(cqQuestions.length).toBe(40)
    for (const q of cqQuestions) for (const lo of cqLos[q.id]) expect(loIds.has(lo), `${q.id} → ${lo}`).toBe(true)
  })
  it('verbatim CQ MCQs match the professor’s correct answer', () => {
    const strip = (h: string) => h.replace(/<[^>]+>/g, '').replace(/\\\(|\\\)|\{,\}|[{}]|\\/g, '').replace(/\s+/g, '').replace(/_/g, '')
    for (const q of mcqs.filter((m) => m.origin === 'cq')) {
      const m = q.src.match(/CQ(\d+) Q(\d+)/)!
      const cq = cqQuestions.find((x) => x.quiz === Number(m[1]) && x.number === Number(m[2]))!
      expect(cq, q.id).toBeDefined()
      expect(strip(q.options[q.correct].text), q.id).toBe(strip(cq.optionsHtml[cq.correct]))
    }
  })
})
