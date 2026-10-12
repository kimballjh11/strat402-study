import { useState } from 'react'
import type { Pyramid } from '../content/types'
import { checkPyramid, RUBRIC, type PyramidInput } from '../lib/pyramid'
import { setTool, useP, NONE_OBJ } from '../lib/store'
import { Cite } from './Cite'
import { R } from './Rich'

const EMPTY: PyramidInput = { structure: 'inductive', s: '', c: '', q: '', a: '', supports: [0, 1, 2].map(() => ({ point: '', evidence: '' })), sowhat: '', competing: '' }

export function PyramidBuilder({ id, prompt, model }: { id: string; prompt: string; model?: Pyramid }) {
  const saved = useP((p) => (p.tools[`pyr-${id}`] as PyramidInput | undefined) ?? EMPTY)
  const scores = useP((p) => (p.tools[`pyr-${id}-score`] as Record<string, number> | undefined) ?? NONE_OBJ)
  const [v, setV] = useState<PyramidInput>(saved)
  const [showChecks, setShowChecks] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const save = (n: PyramidInput) => (setV(n), setTool(`pyr-${id}`, n))
  const set = (k: keyof PyramidInput, val: string) => save({ ...v, [k]: val })
  const setSup = (i: number, k: 'point' | 'evidence', val: string) => save({ ...v, supports: v.supports.map((s, j) => (j === i ? { ...s, [k]: val } : s)) })
  const labels = v.structure === 'deductive' ? ['Major premise', 'Minor premise', 'Therefore'] : v.structure === 'combined' ? ['Major premise (spine)', 'Minor premise (spine)', 'Therefore'] : ['Reason 1', 'Reason 2', 'Reason 3', 'Reason 4']
  const checks = checkPyramid(v)
  const total = RUBRIC.reduce((a, r) => a + (scores[r.id] ?? 0), 0)

  return (
    <div className="space-y-4" data-testid="pyramid">
      <div className="callout">
        <div className="font-semibold">The prompt</div>
        <R t={prompt} />
      </div>
      <fieldset className="space-y-1">
        <legend className="text-sm font-semibold">Structure</legend>
        <div className="flex flex-wrap gap-2">
          {(['deductive', 'inductive', 'combined'] as const).map((s) => (
            <button key={s} type="button" className="btn btn-sm" aria-pressed={v.structure === s} onClick={() => save({ ...v, structure: s })} style={v.structure === s ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}>
              {s === 'combined' ? 'Combined (spine + groups)' : s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-3 md:grid-cols-2">
        {([['s', 'Situation — what the reader already accepts'], ['c', 'Complication — what changed and makes it untenable'], ['q', 'Question — one, sharp'], ['a', 'Answer — one declarative, falsifiable sentence']] as const).map(([k, l]) => (
          <label key={k} className="block space-y-1">
            <span className="text-sm font-semibold">{l}</span>
            <textarea className="w-full" rows={k === 'a' ? 2 : 3} value={v[k]} onChange={(e) => set(k, e.target.value)} />
          </label>
        ))}
      </div>
      <div className="space-y-3">
        <div className="text-sm font-semibold">Bottom pyramid</div>
        {labels.map((l, i) => (
          <div key={l} className="card p-3 space-y-2">
            <label className="block space-y-1">
              <span className="text-sm font-semibold">{l}</span>
              <textarea className="w-full" rows={2} value={v.supports[i]?.point ?? ''} onChange={(e) => setSup(i, 'point', e.target.value)} />
            </label>
            <label className="block space-y-1">
              <span className="text-xs muted">Evidence beneath it</span>
              <input type="text" className="w-full" value={v.supports[i]?.evidence ?? ''} onChange={(e) => setSup(i, 'evidence', e.target.value)} />
            </label>
          </div>
        )).map((el, i) => (i >= v.supports.length ? null : el))}
        {v.structure === 'inductive' && v.supports.length < 4 && (
          <button type="button" className="btn btn-sm" onClick={() => save({ ...v, supports: [...v.supports, { point: '', evidence: '' }] })}>
            + Add a reason
          </button>
        )}
        {v.structure !== 'deductive' && (
          <label className="block space-y-1">
            <span className="text-sm font-semibold">So what — the one kind of claim your supports all are</span>
            <input type="text" className="w-full" value={v.sowhat} onChange={(e) => set('sowhat', e.target.value)} />
          </label>
        )}
        <label className="block space-y-1">
          <span className="text-sm font-semibold">Strongest competing answer — and why it fails on its own terms</span>
          <textarea className="w-full" rows={2} value={v.competing} onChange={(e) => set('competing', e.target.value)} />
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={() => setShowChecks(true)} data-testid="check-structure">
          Check my structure
        </button>
        {model && (
          <button type="button" className="btn" onClick={() => setShowModel((s) => !s)}>
            {showModel ? 'Hide' : 'Compare with'} the model pyramid
          </button>
        )}
      </div>
      {showChecks && (
        <div className="card p-4 space-y-2" role="status">
          <div className="font-semibold">
            Structure checks <span className="muted text-sm font-normal">(automatic flags — you judge)</span>
          </div>
          <ul className="space-y-1.5">
            {checks.map((c) => (
              <li key={c.id} className="text-sm flex gap-2">
                <span aria-hidden className={c.ok ? 'verdict-ok' : c.ok === null ? 'muted' : 'verdict-bad'}>
                  {c.ok ? '✓' : c.ok === null ? '○' : '✗'}
                </span>
                <span>
                  <strong>{c.ok ? 'Pass' : c.ok === null ? 'Not written yet' : 'Fix'}:</strong> {c.label}
                  {!c.ok && <span className="muted"> — {c.tip}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showModel && model && <ModelPyramid p={model} />}
      <details className="card p-4">
        <summary className="font-semibold cursor-pointer">Self-grade against the Minto rubric ({total}/100)</summary>
        <p className="text-sm muted mt-2">
          Rubric from the Minto assignment <Cite tag="Minto Asg §5" />. Grade structure and rigor, not whether your conclusion matches the model <Cite tag="Minto Key" />.
        </p>
        <div className="space-y-3 mt-3">
          {RUBRIC.map((r) => (
            <label key={r.id} className="block">
              <span className="text-sm font-semibold">
                {r.label}: {scores[r.id] ?? 0}/{r.max}
              </span>
              <span className="block text-xs muted">{r.look}</span>
              <input type="range" min={0} max={r.max} value={scores[r.id] ?? 0} onChange={(e) => setTool(`pyr-${id}-score`, { ...scores, [r.id]: Number(e.target.value) })} className="w-full" />
            </label>
          ))}
        </div>
      </details>
    </div>
  )
}

export function ModelPyramid({ p }: { p: Pyramid }) {
  return (
    <div className="card p-4 space-y-3" data-testid="model-pyramid">
      <div className="flex items-center gap-2">
        <span className="chip">Model pyramid · {p.structure}</span>
      </div>
      <dl className="grid gap-2 md:grid-cols-2 text-sm">
        {(['s', 'c', 'q'] as const).map((k) => (
          <div key={k} className="surface-2 rounded-lg p-2">
            <dt className="font-semibold">{{ s: 'Situation', c: 'Complication', q: 'Question' }[k]}</dt>
            <dd>
              <R t={p[k]} />
            </dd>
          </div>
        ))}
      </dl>
      <div className="rounded-lg p-3 text-center font-semibold" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
        <R t={p.a} />
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {p.supports.map((s) => (
          <div key={s.label} className="card p-3 text-sm space-y-1">
            <div className="font-semibold">{s.label}</div>
            <R t={s.point} />
            <ul className="list-disc pl-4 muted">
              {s.evidence.map((e, i) => (
                <li key={i}>
                  <R t={e} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {p.competing && (
        <div className="callout">
          <div className="font-semibold">Competing answer, dismantled</div>
          <R t={p.competing} />
        </div>
      )}
      <p className="text-sm">
        <strong>Why this structure: </strong>
        <R t={p.memo} />
      </p>
    </div>
  )
}
