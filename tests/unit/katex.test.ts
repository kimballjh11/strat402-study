/** Every math snippet on the site must compile in KaTeX (content, questions, and 200 seeds of every generator). */
import katex from 'katex'
import { describe, expect, it } from 'vitest'
import { generators, mcqs, sessions } from '../../src/content'

const MATH = /\\\((.+?)\\\)|\\\[(.+?)\\\]/gs
function check(text: string, where: string) {
  for (const m of text.matchAll(MATH)) {
    const tex = m[1] ?? m[2]
    try {
      katex.renderToString(tex, { throwOnError: true, strict: false })
    } catch (e) {
      throw new Error(`${where}: ${(e as Error).message}\n  in: ${tex}`)
    }
  }
}

describe('KaTeX compiles everywhere', () => {
  it('session content', () => {
    for (const s of sessions) {
      const blob = JSON.stringify(s)
      // JSON.stringify doubles backslashes; parse each string field instead
      const walk = (v: unknown, path: string): void => {
        if (typeof v === 'string') check(v, `${s.id}${path}`)
        else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`))
        else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`)
      }
      walk(s, '')
      for (const f of s.formulas) katex.renderToString(f.latex, { throwOnError: true, strict: false })
      expect(blob.length).toBeGreaterThan(0)
    }
  })
  it('MCQs', () => {
    for (const q of mcqs) {
      check(q.stem, q.id)
      q.options.forEach((o, i) => (check(o.text, `${q.id} opt${i}`), check(o.why, `${q.id} why${i}`)))
    }
  })
  it.each(generators.map((g) => [g.id, g] as const))('generator %s (200 seeds)', (_id, g) => {
    for (let s = 1; s <= 200; s++) {
      const p = g.make(s * 104729)
      check(p.prompt, `${g.id}#${s} prompt`)
      p.steps.forEach((st, i) => check(st, `${g.id}#${s} step${i}`))
      p.parts.forEach((pt, i) => check(pt.label, `${g.id}#${s} part${i}`))
    }
  })
})
