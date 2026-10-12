import { useState } from 'react'
import { Cite, SiteBadge } from '../components/Cite'
import { NONE_OBJ, setTool, useP } from '../lib/store'
import { openTests, slideVerdict, verdict, type YN } from '../lib/vrio'

interface Res { name: string; kind: 'Resource' | 'Capability' | ''; tangible: 'Tangible' | 'Intangible' | ''; a: YN[]; sub: string; barrier: string }
interface State { firm: string; res: Res[]; diagnosis: string; change: string; recs: { action: string; logic: string; effect: string }[] }
const blankRes = (): Res => ({ name: '', kind: '', tangible: '', a: ['', '', '', ''], sub: '', barrier: '' })
const BLANK: State = { firm: '', res: [blankRes(), blankRes(), blankRes(), blankRes(), blankRes()], diagnosis: '', change: '', recs: [0, 1, 2].map(() => ({ action: '', logic: '', effect: '' })) }
const TESTS = ['Valuable?', 'Rare?', 'Costly to imitate?', 'Organized?']
const BARRIERS = ['', 'Unique history / path dependence', 'Causal ambiguity', 'Social complexity', 'Legal or economic deterrent (patents, scale, switching costs, network effects)']
const LOGIC = ['', 'Protect and reinforce a genuine advantage', 'Close an organization gap', 'Build or acquire a missing valuable resource', 'Neutralize an approaching imitation or substitution threat']

export const EXAMPLES: { firm: string; res: Res[]; note: string }[] = [
  {
    firm: 'The brief’s four diagnoses',
    note: 'Loaded from VRIO Brief Exhibit 1. Compare the verdicts the gate produces with the brief’s.',
    res: [
      { name: 'Visa — four-party payment network', kind: 'Resource', tangible: 'Intangible', a: ['Y', 'Y', 'Y', 'Y'], sub: 'Instant account-to-account rails (Pix, UPI); interchange regulation', barrier: 'Legal or economic deterrent (patents, scale, switching costs, network effects)' },
      { name: 'Regional bank — branch network in the home region', kind: 'Resource', tangible: 'Tangible', a: ['Y', 'N', '', ''], sub: 'Online-only accounts', barrier: '' },
      { name: 'McKinsey — reputation and alumni network', kind: 'Resource', tangible: 'Intangible', a: ['Y', 'Y', 'Y', ''], sub: '', barrier: 'Unique history / path dependence' },
      { name: 'Intel — leading-edge fabs and x86', kind: 'Resource', tangible: 'Tangible', a: ['Y', 'Y', 'Y', 'N'], sub: '', barrier: 'Legal or economic deterrent (patents, scale, switching costs, network effects)' },
    ],
  },
]

/** The VRIO Assignment's four worksheets as one interactive tool. */
export function VrioTool() {
  const st = useP((p) => (p.tools['S06-vrio'] as State | undefined) ?? (NONE_OBJ as unknown as State))
  const s: State = st.res ? st : BLANK
  const [step, setStep] = useState(1)
  const save = (n: State) => setTool('S06-vrio', n)
  const setRes = (i: number, r: Partial<Res>) => save({ ...s, res: s.res.map((x, k) => (k === i ? { ...x, ...r } : x)) })
  const setAns = (i: number, t: number, v: YN) => {
    const a = [...s.res[i].a]
    a[t] = v
    for (let k = t + 1; k < 4; k++) if (v === 'N') a[k] = '' // the first "no" ends the analysis
    setRes(i, { a })
  }
  const named = s.res.filter((r) => r.name.trim())
  const yesAll = named.filter((r) => r.a.every((x) => x === 'Y')).length
  return (
    <div className="space-y-4" data-testid="vrio-tool">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Worksheets">
        {['1 · Inventory', '2 · VRIO grid', '3 · Diagnosis', '4 · Recommendations'].map((t, k) => (
          <button key={t} type="button" role="tab" aria-selected={step === k + 1} className="btn btn-sm" onClick={() => setStep(k + 1)} style={step === k + 1 ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}>
            {t}
          </button>
        ))}
        <button type="button" className="btn btn-sm" onClick={() => (save({ ...BLANK, firm: EXAMPLES[0].firm, res: EXAMPLES[0].res }), setStep(2))}>
          Load the brief’s examples
        </button>
        <button type="button" className="btn btn-sm" onClick={() => save(BLANK)}>
          Clear
        </button>
      </div>
      {step === 1 && (
        <section className="space-y-2">
          <label className="block text-sm">
            Firm
            <input type="text" className="w-full" value={s.firm} onChange={(e) => save({ ...s, firm: e.target.value })} placeholder="e.g., a firm from the assignment’s industries" />
          </label>
          <p className="text-sm muted">
            List five or more, stated specifically: “proprietary risk-pricing data drawn from forty years of claims” is a resource; “data” is not <Cite tag="VRIO Asg §1" />.
          </p>
          {s.res.map((r, i) => (
            <div key={i} className="card p-3 grid gap-2 md:grid-cols-[1fr_9rem_9rem]">
              <label className="text-sm">
                Resource or capability {i + 1}
                <input type="text" className="w-full" value={r.name} onChange={(e) => setRes(i, { name: e.target.value })} />
              </label>
              <label className="text-sm">
                Kind
                <select value={r.kind} onChange={(e) => setRes(i, { kind: e.target.value as Res['kind'] })}>
                  <option value="">–</option>
                  <option>Resource</option>
                  <option>Capability</option>
                </select>
              </label>
              <label className="text-sm">
                Tangible?
                <select value={r.tangible} onChange={(e) => setRes(i, { tangible: e.target.value as Res['tangible'] })}>
                  <option value="">–</option>
                  <option>Tangible</option>
                  <option>Intangible</option>
                </select>
              </label>
            </div>
          ))}
          <button type="button" className="btn btn-sm" onClick={() => save({ ...s, res: [...s.res, blankRes()] })}>
            + Add another
          </button>
          <p className="text-xs muted">Resources are stocks (owned or controlled); capabilities are flows — what the firm is repeatedly good at, held in routines and people <Cite tag="VRIO §2" />.</p>
        </section>
      )}
      {step === 2 && (
        <section className="space-y-2">
          <p className="text-sm">
            Answer in order. A “no” ends the analysis for that resource — later tests lock <Cite tag="VRIO §3" />. Rarity must be judged against named competitors; imitability must name the barrier and how long a funded rival would take <Cite tag="VRIO Asg §3" />.
          </p>
          {named.length === 0 && <p className="muted text-sm">Add resources in worksheet 1 first.</p>}
          {s.res.map((r, i) => {
            if (!r.name.trim()) return null
            const open = openTests(r.a)
            const v = verdict(r.a[0], r.a[1], r.a[2], r.a[3])
            const sv = slideVerdict(r.a[0], r.a[1], r.a[2], r.a[3])
            return (
              <div key={i} className="card p-3 space-y-2">
                <div className="font-semibold">{r.name}</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TESTS.map((t, k) => (
                    <fieldset key={t} disabled={!open[k]} className="text-sm" style={{ opacity: open[k] ? 1 : 0.45 }}>
                      <legend className="font-semibold">{t}</legend>
                      <div className="flex gap-1">
                        {(['Y', 'N'] as const).map((x) => (
                          <button key={x} type="button" className="btn btn-sm" aria-pressed={r.a[k] === x} onClick={() => setAns(i, k, x)} style={r.a[k] === x ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}>
                            {x === 'Y' ? 'Yes' : 'No'}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <label className="text-sm">
                    Close substitute?
                    <input type="text" className="w-full" value={r.sub} onChange={(e) => setRes(i, { sub: e.target.value })} />
                  </label>
                  <label className="text-sm">
                    Barrier to imitation
                    <select value={r.barrier} onChange={(e) => setRes(i, { barrier: e.target.value })}>
                      {BARRIERS.map((b) => (
                        <option key={b} value={b}>
                          {b || '–'}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <p className="text-sm" role="status">
                  <strong>Verdict (brief):</strong> {v ?? '…keep answering'} {sv && v && <span className="muted">· slide label: {sv}</span>}
                </p>
              </div>
            )
          })}
          {named.length >= 3 && yesAll >= Math.ceil(named.length * 0.6) && (
            <p className="callout text-sm" style={{ borderLeftColor: 'var(--warn-ink)', background: 'var(--warn-bg)' }}>
              ⚠ {yesAll} of {named.length} resources are “yes” on all four tests. The assignment warns: “Most resources are parity… a page of yes answers usually means the tests were not applied.” Re-check rarity against named rivals <Cite tag="VRIO Asg §2" />.
            </p>
          )}
        </section>
      )}
      {step === 3 && (
        <section className="space-y-2">
          <p className="text-sm">In two to four sentences: the firm’s overall position and the one or two resources that carry it. Then one sentence on what would have to become true for the verdict to change <Cite tag="VRIO Asg Ws.3" />.</p>
          <label className="block text-sm">
            Diagnosis
            <textarea className="w-full" rows={4} value={s.diagnosis} onChange={(e) => save({ ...s, diagnosis: e.target.value })} />
          </label>
          <label className="block text-sm">
            What would change the verdict (and how soon)?
            <textarea className="w-full" rows={2} value={s.change} onChange={(e) => save({ ...s, change: e.target.value })} />
          </label>
          <div className="card p-3 text-sm">
            <strong>Your verdicts:</strong>{' '}
            {named.map((r) => `${r.name.split('—')[0].trim()}: ${verdict(r.a[0], r.a[1], r.a[2], r.a[3]) ?? '?'}`).join(' · ') || 'none yet'}
          </div>
        </section>
      )}
      {step === 4 && (
        <section className="space-y-2">
          <p className="text-sm">Three concrete, prioritized actions, each within management’s control, each tied to a VRIO gap with an expected effect <Cite tag="VRIO Asg §3" />.</p>
          {s.recs.map((rc, i) => (
            <div key={i} className="card p-3 grid gap-2 md:grid-cols-3">
              <label className="text-sm">
                Priority {i + 1} — action
                <input type="text" className="w-full" value={rc.action} onChange={(e) => save({ ...s, recs: s.recs.map((x, k) => (k === i ? { ...x, action: e.target.value } : x)) })} />
              </label>
              <label className="text-sm">
                VRIO logic
                <select value={rc.logic} onChange={(e) => save({ ...s, recs: s.recs.map((x, k) => (k === i ? { ...x, logic: e.target.value } : x)) })}>
                  {LOGIC.map((l) => (
                    <option key={l} value={l}>
                      {l || '–'}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Expected effect
                <input type="text" className="w-full" value={rc.effect} onChange={(e) => save({ ...s, recs: s.recs.map((x, k) => (k === i ? { ...x, effect: e.target.value } : x)) })} />
              </label>
            </div>
          ))}
          <p className="text-xs muted">
            Strongest when the logic matches the verdict: unexploited → close the organization gap; temporary → defend imitability or build what’s missing; sustained → protect it and watch substitutes <Cite tag="VRIO §5" />. <SiteBadge>Mapping is the site’s summary of §5</SiteBadge>
          </p>
        </section>
      )}
    </div>
  )
}
