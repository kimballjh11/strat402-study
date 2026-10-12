import { useState } from 'react'
import { Cite, SiteBadge } from '../components/Cite'
import { R } from '../components/Rich'
import { recordAnswer } from '../lib/store'

export interface LogicItem { id: string; text: string; answer: 'Inductive' | 'Deductive'; why: string; src: string }
export interface BestItem { id: string; claim: string; options: { text: string; tag: 'Best' | 'Not MECE' | 'Mixed logic'; why: string }[]; src: string }

/** Part 1: name the logic. Part 2: pick the best-structured support. */
export function LogicDrill({ items, best }: { items: LogicItem[]; best: BestItem[] }) {
  const [pick, setPick] = useState<Record<string, string>>({})
  const choose = (id: string, v: string, ok: boolean) => {
    if (pick[id]) return
    setPick((p) => ({ ...p, [id]: v }))
    recordAnswer(id, ok)
  }
  return (
    <div className="space-y-6" data-testid="logic-drill">
      <section className="space-y-2">
        <h3 className="font-semibold">Part 1 — Name the logic</h3>
        <p className="text-sm muted">Inductive = parallel reasons grouped under a conclusion. Deductive = premises that force the conclusion.</p>
        {items.map((it, i) => {
          const p = pick[it.id]
          return (
            <div key={it.id} className="card p-3 space-y-2">
              <p className="text-sm">
                <strong>{i + 1}.</strong> {it.text} <Cite tag={it.src} />
              </p>
              <div className="flex gap-2">
                {(['Inductive', 'Deductive'] as const).map((v) => (
                  <button key={v} type="button" className={`btn btn-sm ${p ? (v === it.answer ? 'ok' : p === v ? 'bad' : '') : ''}`} aria-pressed={p === v} onClick={() => choose(it.id, v, v === it.answer)} style={p && v === it.answer ? { borderColor: 'var(--ok)', color: 'var(--ok)' } : p === v ? { borderColor: 'var(--bad)', color: 'var(--bad)' } : undefined}>
                    {p && v === it.answer ? '✓ ' : p === v ? '✗ ' : ''}
                    {v}
                  </button>
                ))}
              </div>
              {p && (
                <p className="text-sm">
                  <strong>{it.answer}.</strong> <R t={it.why} />
                </p>
              )}
            </div>
          )
        })}
      </section>
      <section className="space-y-2">
        <h3 className="font-semibold">Part 2 — Pick the best-structured support</h3>
        <p className="text-sm muted">
          In each set one answer is well-structured, one is not MECE (overlapping or gappy), and one mixes inductive and deductive logic <Cite tag="S2 slides 16" />.
        </p>
        {best.map((b) => {
          const p = pick[b.id]
          return (
            <div key={b.id} className="card p-3 space-y-2">
              <p className="font-semibold text-sm">
                Best support for: “{b.claim}” <Cite tag={b.src} />
              </p>
              {b.options.map((o, k) => {
                const isPick = p === String(k)
                return (
                  <div key={k}>
                    <button type="button" className={`opt ${p ? (o.tag === 'Best' ? 'ok' : isPick ? 'bad' : '') : ''}`} aria-pressed={isPick} onClick={() => choose(b.id, String(k), o.tag === 'Best')}>
                      <span className="opt-key">{String.fromCharCode(97 + k)}</span>
                      <span>{o.text}</span>
                    </button>
                    {p && (
                      <p className="text-xs ml-9 mt-1">
                        <strong>{o.tag}:</strong> {o.why}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
        <SiteBadge>Items marked “S2 slides” are the professor’s in-class exercise; others are new items written for this site</SiteBadge>
      </section>
    </div>
  )
}
