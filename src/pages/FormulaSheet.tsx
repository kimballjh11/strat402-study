import { useState } from 'react'
import { sessions } from '../content'
import { Cite, GeneralBadge } from '../components/Cite'
import { Rich, Tex } from '../components/Rich'
import { navigate, useRoute } from '../lib/router'
import { setProgress, useProgress } from '../lib/store'

/** One printable page of every formula, plus a blank-page recall drill. */
export function FormulaSheet() {
  const route = useRoute()
  const tab = route.query.get('tab') === 'drill' ? 'drill' : 'sheet'
  const withFormulas = sessions.filter((s) => s.formulas.length)
  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end gap-3">
        <div className="flex-1">
          <h1 className="text-3xl font-semibold">Formula Sheet</h1>
          <p className="muted">The exam is closed book, so memorize this page. The drill tests you with a blank page.</p>
        </div>
        <div className="flex gap-1 no-print">
          <button type="button" className={`btn btn-sm ${tab === 'sheet' ? 'btn-primary' : ''}`} onClick={() => navigate('/formulas')}>
            Sheet
          </button>
          <button type="button" className={`btn btn-sm ${tab === 'drill' ? 'btn-primary' : ''}`} onClick={() => navigate('/formulas?tab=drill')}>
            Blank-page drill
          </button>
          {tab === 'sheet' && (
            <button type="button" className="btn btn-sm" onClick={() => window.print()}>
              Print
            </button>
          )}
        </div>
      </header>
      {tab === 'sheet' ? (
        <div className="grid md:grid-cols-2 gap-4">
          {withFormulas.map((s) => (
            <section key={s.id} className="card p-4 break-inside-avoid">
              <h2 className="font-semibold text-lg">
                Session {s.num}: {s.title}
              </h2>
              <ul className="mt-2 space-y-2">
                {s.formulas.map((f) => (
                  <li key={f.id} className="text-sm">
                    <div className="font-medium">
                      {f.name} {f.general && <GeneralBadge />} <Cite tag={f.src} />
                    </div>
                    <div className="scroll-x">
                      <Tex display>{f.latex}</Tex>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {withFormulas.length < sessions.length && <p className="muted text-sm">More sessions' formulas appear here as modules are built.</p>}
        </div>
      ) : (
        <Drill />
      )}
    </div>
  )
}

function Drill() {
  const avail = sessions.filter((s) => s.formulas.length)
  const [sid, setSid] = useState(avail[0]?.id ?? 'S08')
  const saved = useProgress((p) => p.formulaDrill[sid] ?? '')
  const [text, setText] = useState(saved)
  const [show, setShow] = useState(false)
  const s = sessions.find((x) => x.id === sid)!
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium flex flex-col gap-1 max-w-sm">
        Session
        <select
          value={sid}
          onChange={(e) => {
            setSid(e.target.value as typeof sid)
            setShow(false)
            setText('')
          }}
        >
          {avail.map((x) => (
            <option key={x.id} value={x.id}>
              {x.num}. {x.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium" htmlFor="drill-text">
        List every formula you can remember for Session {s.num}, one per line:
      </label>
      <textarea id="drill-text" rows={8} className="w-full font-mono text-sm" value={text} onChange={(e) => setText(e.target.value)} onBlur={() => setProgress((p) => ({ ...p, formulaDrill: { ...p.formulaDrill, [sid]: text } }))} />
      <button type="button" className="btn btn-primary" onClick={() => setShow(true)}>
        Compare with the full list ({s.formulas.length})
      </button>
      {show && (
        <ol className="card p-4 space-y-3 list-decimal pl-8">
          {s.formulas.map((f) => (
            <li key={f.id}>
              <div className="font-medium">{f.name}</div>
              <Tex display>{f.latex}</Tex>
              <Rich className="text-sm muted">{f.words}</Rich>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
