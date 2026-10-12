/**
 * Fidelity audit (automated first pass). Samples 40 cited claims from the site with a fixed seed,
 * extracts the numbers in each claim, and checks them against the extracted text of the cited source
 * (slide page text, workbook dump, quiz page, Math Review). Writes work/audit-raw.json for manual review.
 * Skipped when work/ (local extraction) is absent.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { mcqs, sessions } from '../../src/content'
import { Rng } from '../../src/lib/rng'

const WORK = 'work'
const have = existsSync(`${WORK}/text`)

function slidesText(deck: string, pages: number[]) {
  const f = readdirSync(`${WORK}/text`).find((x) => x.startsWith(deck + '-Slides'))
  if (!f) return null
  const t = readFileSync(`${WORK}/text/${f}`, 'utf8')
  return pages.map((p) => t.split(`===== PAGE ${p} =====`)[1]?.split('===== PAGE')[0] ?? '').join('\n')
}
function sourceText(tag: string): string | null {
  let m = tag.match(/^(S\d\d) slides? pp?\.(\d+)(?:-(\d+))?/)
  if (m) {
    const a = Number(m[2])
    const b = Number(m[3] ?? m[2])
    return slidesText(m[1], Array.from({ length: b - a + 1 }, (_, i) => a + i))
  }
  m = tag.match(/^(S06) Video Slides pp?\.(\d+)/)
  if (m) return readFileSync(`${WORK}/text/S06-Video-Slides-Economic-Costs.txt`, 'utf8')
  m = tag.match(/^CQ(\d) Q(\d+)/)
  if (m) {
    const dir = readdirSync(`${WORK}/quizzes`).find((d) => d.includes(`Quiz-${m![1]}-`))
    const t = readFileSync(`${WORK}/quizzes/${dir}/page.txt`, 'utf8')
    return t.split(`Results for question ${m[2]}.`)[1]?.split('Results for question')[0] ?? t
  }
  m = tag.match(/^(S0\d) workbook/)
  if (m) {
    const f = readdirSync(`${WORK}/workbooks`).find((x) => x.startsWith(`course--${m![1]}`))
    return f ? readFileSync(`${WORK}/workbooks/${f}`, 'utf8') : null
  }
  if (/^S04 Solution|Five Forces Tool/.test(tag)) return readFileSync(`${WORK}/workbooks/course--S04-Solution-Industry-Analysis.txt`, 'utf8')
  if (/^Math Review/.test(tag)) return readFileSync(`${WORK}/text/STRAT-402-Math-Review.txt`, 'utf8')
  if (/Optional Practice/.test(tag)) return readFileSync(`${WORK}/text/S05-Optional-Practice-Math-Review-Problems.txt`, 'utf8')
  if (/HSIA/.test(tag)) return readFileSync(`${WORK}/text/HSIA-Wars-iBahn-and-Guest-Tek.txt`, 'utf8')
  return null
}
const norm = (s: string) => s.replace(/[−–]/g, '-').replace(/(\d),(\d{3})/g, '$1$2')
function numbersIn(s: string) {
  const plain = norm(s.replace(/\\[a-z]+|[{}]/gi, ' ').replace(/\[\[.*?\]\]/g, ''))
  return [...new Set((plain.match(/-?\d+(?:\.\d+)?/g) ?? []).filter((x) => x.replace(/[-.]/g, '').length >= 2))]
}

interface Claim {
  where: string
  text: string
  tag: string
}
function collect(): Claim[] {
  const out: Claim[] = []
  const walk = (v: unknown, where: string) => {
    if (typeof v === 'string') {
      // each citation supports the text between the previous citation (or paragraph start) and itself
      for (const para of v.split(/\n\s*\n/)) {
        let last = 0
        for (const m of para.matchAll(/\[\[(.+?)\]\]/g)) {
          const seg = para.slice(last, m.index).replace(/\[\[.*?\]\]/g, '').trim().slice(-320)
          last = m.index! + m[0].length
          const tag = m[1]
          if (tag === 'GEN' || !seg) continue
          if (sourceText(tag) !== null && numbersIn(seg).length) out.push({ where, text: seg, tag })
        }
      }
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${where}[${i}]`))
    else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => walk(x, `${where}.${k}`))
  }
  sessions.forEach((s) => walk(s, s.id))
  mcqs.forEach((q) => walk(q, q.id))
  return out
}

describe.skipIf(!have)('fidelity audit (automated first pass)', () => {
  it('samples 40 cited claims and checks their numbers against the cited source', () => {
    const claims = collect()
    const sample = new Rng(402).shuffle(claims).slice(0, 40)
    const rows = sample.map((c) => {
      const src = norm(sourceText(c.tag) ?? '')
      const nums = numbersIn(c.text)
      const missing = nums.filter((n) => !src.includes(n) && !src.includes(n.replace(/^-/, '')) && !src.includes(String(Number(n))))
      return { ...c, nums, missing, auto: missing.length === 0 ? 'verified' : 'needs manual check' }
    })
    writeFileSync(`${WORK}/audit-raw.json`, JSON.stringify({ population: claims.length, rows }, null, 1))
    expect(rows.length).toBe(40)
  })
})
