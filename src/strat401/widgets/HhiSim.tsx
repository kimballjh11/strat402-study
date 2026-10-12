import { useMemo, useState } from 'react'
import { Cite } from '../components/Cite'
import { num } from '../lib/format'
import { band, c4, hhi, merge, numbersEquivalent, parseShares, presumed2010, PRESETS } from '../lib/hhi'

/** Enter shares, merge two firms, read ΔHHI against the 2023 Merger Guidelines. */
export function HhiSim() {
  const [pid, setPid] = useState(PRESETS[0].id)
  const preset = PRESETS.find((p) => p.id === pid)
  const [text, setText] = useState(PRESETS[0].shares.join(', '))
  const [pair, setPair] = useState<[number, number]>(PRESETS[0].pair ?? [0, 1])
  const shares = useMemo(() => parseShares(text), [text])
  const names = preset?.names && preset.names.length === shares.length ? preset.names : shares.map((_, i) => `Firm ${i + 1}`)
  const total = shares.reduce((a, b) => a + b, 0)
  const [a, b] = [Math.min(pair[0], shares.length - 1), Math.min(pair[1], shares.length - 1)]
  const valid = shares.length >= 2 && a !== b && a >= 0 && b >= 0
  const m = valid ? merge(shares, a, b) : null
  const load = (id: string) => {
    const p = PRESETS.find((x) => x.id === id)!
    setPid(id)
    setText(p.shares.join(', '))
    setPair(p.pair ?? [0, 1])
  }
  const h = hhi(shares)
  return (
    <div className="space-y-4" data-testid="hhi-sim">
      <label className="block text-sm">
        Load a worked example
        <select value={pid} onChange={(e) => load(e.target.value)}>
          {PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
          <option value="custom">Your own market…</option>
        </select>
      </label>
      <label className="block text-sm">
        Market shares in percent, separated by commas (every firm in the defined market)
        <input type="text" className="w-full" value={text} onChange={(e) => (setText(e.target.value), setPid('custom'))} inputMode="decimal" />
      </label>
      {total > 100.5 && <p className="verdict-bad text-sm">Shares add to {num(total, 1)}% — more than 100.</p>}
      <div className="grid gap-2 sm:grid-cols-4 text-sm" role="status">
        <div className="card p-3"><div className="muted text-xs">C4</div><strong>{num(c4(shares), 2)}%</strong></div>
        <div className="card p-3"><div className="muted text-xs">HHI</div><strong>{num(h, 2)}</strong></div>
        <div className="card p-3"><div className="muted text-xs">Numbers equivalent</div><strong>{num(numbersEquivalent(h), 1)} equal firms</strong></div>
        <div className="card p-3"><div className="muted text-xs">2023 band</div><strong>{band(h)}</strong></div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {[0, 1].map((k) => (
          <label key={k} className="text-sm">
            Merging firm {k === 0 ? 'A' : 'B'}
            <select value={pair[k]} onChange={(e) => setPair(k === 0 ? [Number(e.target.value), pair[1]] : [pair[0], Number(e.target.value)])}>
              {shares.map((s, i) => (
                <option key={i} value={i}>
                  {names[i]} ({s}%)
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      {m && (
        <div className="card p-4 space-y-2" role="status" data-testid="hhi-result">
          <p>
            <strong>ΔHHI = 2 × {shares[a]} × {shares[b]} = {num(m.delta, 2)}</strong> — the change depends only on the two merging shares <Cite tag="HHI §3" />.
          </p>
          <p>
            HHI {num(m.pre, 2)} → <strong>{num(m.post, 2)}</strong> ({band(m.post)}) · C4 {num(m.preC4, 1)}% → {num(m.postC4, 1)}% · merged share {num(m.mergedShare, 1)}%
          </p>
          <ul className="text-sm space-y-1">
            <li>{m.concentrationTest ? '✓ Meets' : '✗ Does not meet'} the <strong>concentration test</strong> (post-merger HHI &gt; 1,800 AND Δ &gt; 100)</li>
            <li>{m.shareTest ? '✓ Meets' : '✗ Does not meet'} the <strong>share test</strong> (merged share &gt; 30% AND Δ &gt; 100)</li>
          </ul>
          <p className={m.presumed ? 'verdict-bad' : 'verdict-ok'}>
            {m.presumed ? 'Presumed to substantially lessen competition (rebuttable).' : 'No structural presumption from these numbers.'}
          </p>
          <p className="text-sm muted">
            Under the 2010 Guidelines (2,500 and 200): {presumed2010(m.post, m.delta) ? 'presumed' : 'not presumed'} <Cite tag="HHI §4" />. A presumption shifts who must prove what; parties rebut with entry, failing-firm, no real overlap, or a too-narrow market definition <Cite tag="HHI Ex.3" />.
          </p>
        </div>
      )}
      {preset?.note && (
        <p className="text-sm callout">
          {preset.note} <Cite tag={preset.src} />
        </p>
      )}
      <p className="text-sm">
        <strong>Market definition decides the answer:</strong> re-run the same deal with a narrow and a broad definition (e.g., premium SVOD subscriptions vs. all TV and video including YouTube) and report both — “a single figure presented without its denominator should be treated as an assertion” <Cite tag="HHI §5" />.
      </p>
    </div>
  )
}
