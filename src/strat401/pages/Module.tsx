import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Cite, SiteBadge } from '../components/Cite'
import { ColdCallSim } from '../components/ColdCalls'
import { QuizRun } from '../components/Mcq'
import { NoteBox } from '../components/Note'
import { ModelPyramid, PyramidBuilder } from '../components/PyramidBuilder'
import { RecallDrill } from '../components/Recall'
import { Callout, R, Rich } from '../components/Rich'
import { mapById } from '../content/map'
import { MODULES } from '../content/registry'
import type { ModuleDef, SessionId } from '../content/types'
import { go, to, useRoute401 } from '../lib/router'
import { markVisited, recordMastery, setProgress, useP, NONE_ARR } from '../lib/store'

export const SCREENS = [
  { id: 'question', label: 'Key Question' },
  { id: 'framework', label: 'The framework' },
  { id: 'drill', label: 'Lock it in' },
  { id: 'terms', label: 'Key terms' },
  { id: 'argument', label: 'The brief’s argument' },
  { id: 'fails', label: 'How it fails' },
  { id: 'case', label: 'Case in 5 minutes' },
  { id: 'run', label: 'Run the framework' },
  { id: 'coldcall', label: 'Cold calls' },
  { id: 'devil', label: 'Devil’s advocate' },
  { id: 'present', label: 'Present it' },
  { id: 'check', label: 'Concept check' },
  { id: 'summary', label: 'One-page summary' },
] as const
type ScreenId = (typeof SCREENS)[number]['id']

export function ModulePage({ id }: { id: SessionId }) {
  const m = MODULES[id]
  const s = mapById[id]
  const { query } = useRoute401()
  const screen = (SCREENS.find((x) => x.id === query.get('screen'))?.id ?? 'question') as ScreenId
  const idx = SCREENS.findIndex((x) => x.id === screen)
  const visited = useP((p) => p.visited[id] ?? NONE_ARR)
  useEffect(() => {
    markVisited(id, screen)
    window.scrollTo({ top: 0 })
  }, [id, screen])

  if (!m)
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">
          {id} · {s.title}
        </h1>
        <p className="muted">This module is being built. The content map for it is complete; the full module arrives in Phase 3.</p>
        <a className="btn" href={to('/learn')}>
          ← All sessions
        </a>
      </div>
    )
  const nav = (sid: ScreenId) => go(`/learn/${id}?screen=${sid}`)
  return (
    <div className="space-y-5" data-testid={`module-${id}`}>
      <header className="space-y-2">
        <a href={to('/learn')} className="text-sm muted underline">
          ← All sessions
        </a>
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip">{id}</span>
          <span className="chip">{s.part}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold">{s.title}</h1>
        <p className="text-sm muted">
          Reading: {s.reading.name} · Case: {s.case.name}
        </p>
      </header>
      <nav aria-label="Module screens" className="scroll-x -mx-1 px-1">
        <ol className="flex gap-1 min-w-max pb-1">
          {SCREENS.map((x, i) => (
            <li key={x.id}>
              <a
                href={to(`/learn/${id}?screen=${x.id}`)}
                aria-current={x.id === screen ? 'step' : undefined}
                className="btn btn-sm whitespace-nowrap"
                style={x.id === screen ? { borderColor: 'var(--accent)', color: 'var(--accent)', fontWeight: 700 } : undefined}
              >
                <span aria-hidden>{visited.includes(x.id) ? '✓' : i + 1}</span>
                <span>{x.label}</span>
                {visited.includes(x.id) && <span className="sr-only">(seen)</span>}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <section data-testid={`screen-${screen}`} aria-labelledby="screen-title" className="space-y-4 max-w-3xl">
        <h2 id="screen-title" className="text-xl font-semibold">
          {idx + 1}. {SCREENS[idx].label}
        </h2>
        <Screen m={m} screen={screen} />
      </section>
      <div className="flex justify-between max-w-3xl no-print">
        <button type="button" className="btn" disabled={idx === 0} onClick={() => nav(SCREENS[idx - 1].id)}>
          ← {idx > 0 ? SCREENS[idx - 1].label : 'Back'}
        </button>
        {idx < SCREENS.length - 1 ? (
          <button type="button" className="btn btn-primary" onClick={() => nav(SCREENS[idx + 1].id)}>
            {SCREENS[idx + 1].label} →
          </button>
        ) : (
          <a className="btn btn-primary" href={to('/learn')}>
            Done — all sessions
          </a>
        )}
      </div>
    </div>
  )
}

function Screen({ m, screen }: { m: ModuleDef; screen: ScreenId }) {
  const s = mapById[m.id]
  switch (screen) {
    case 'question':
      return <KeyQuestion m={m} />
    case 'framework':
      return (
        <div className="space-y-4">
          <div className="card p-4 space-y-1" style={{ borderColor: 'var(--accent)' }}>
            <div className="text-xs uppercase tracking-wide muted">{s.framework.name} — in one sentence</div>
            <p className="text-lg">
              <R t={m.framework.oneLiner} />
            </p>
          </div>
          <Callout title="Everyday analogy">
            <R t={m.framework.analogy} />
          </Callout>
          {m.framework.diagram?.()}
          <div className="space-y-2">
            {m.framework.intuition.map((p, i) => (
              <p key={i}>
                <R t={p} />
              </p>
            ))}
          </div>
          <h3 className="text-lg font-semibold">The components, in the professor’s terms</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {s.framework.components.map((c) => (
              <div key={c.name} className="card p-3 text-sm space-y-1">
                <div className="font-semibold">
                  {c.name} <Cite tag={c.src} />
                </div>
                <div>{c.what}</div>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold">Run it on any case — the procedure</h3>
          <ol className="space-y-1.5">
            {m.framework.howToRun.map((h, i) => (
              <li key={i} className="card p-3 text-sm">
                <R t={h} />
              </li>
            ))}
          </ol>
          {m.framework.variants?.map((v) => <Variant key={v.title} v={v} />)}
        </div>
      )
    case 'drill':
      return (
        <div className="space-y-4">
          <p>
            The exam asks you to <strong>apply</strong> these frameworks to scenarios you haven’t seen. First pull the parts from memory, then use them on fresh cases (the firms below are fictional).
          </p>
          {m.framework.recall.map((l) => (
            <RecallDrill key={l.id} list={l} />
          ))}
          <h3 className="text-lg font-semibold">Apply it to a new scenario</h3>
          {m.framework.newScenarios.map((n, i) => (
            <Reveal key={i} id={`${m.id}-ns-${i}`} prompt={n.prompt} answer={n.answer} badge />
          ))}
        </div>
      )
    case 'terms':
      return (
        <div className="space-y-2">
          <p className="text-sm muted">The professor’s definitions. Every term here is also a flashcard.</p>
          <dl className="space-y-2">
            {s.terms.map((t) => (
              <div key={t.term} className="card p-3">
                <dt className="font-semibold">
                  {t.term} <Cite tag={t.src} />
                </dt>
                <dd className="text-sm">{t.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      )
    case 'argument':
      return (
        <div className="space-y-4">
          <p>
            <R t={m.argument.intro} />
          </p>
          <h3 className="font-semibold">The claims, distilled</h3>
          <ol className="space-y-2 list-decimal pl-5">
            {m.argument.propositions.map((p, i) => (
              <li key={i}>
                <R t={p} />
              </li>
            ))}
          </ol>
          <details className="card p-3">
            <summary className="font-semibold cursor-pointer">Every claim in the readings, with sources ({s.claims.length})</summary>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              {s.claims.map((c, i) => (
                <li key={i}>
                  {c.claim} <Cite tag={c.src} />
                </li>
              ))}
            </ul>
          </details>
          {s.slideExtras.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">From the slides</h3>
              {s.slideExtras.map((x) => (
                <div key={x.topic} className="card p-3 text-sm">
                  <strong>{x.topic}</strong> <Cite tag={x.src} />
                  <div>{x.detail}</div>
                </div>
              ))}
            </div>
          )}
          <Callout title="Where this sits in the course">
            {s.courseMap.text} <Cite tag={s.courseMap.src} />
          </Callout>
        </div>
      )
    case 'fails':
      return (
        <div className="space-y-2">
          <p>How the framework gets misused — and the failure modes it predicts. These make excellent multiple-choice distractors, so know them cold.</p>
          {s.failures.map((f) => (
            <div key={f.name} className="card p-3 text-sm" style={{ borderLeft: '4px solid var(--bad)' }}>
              <strong>{f.name}</strong> <Cite tag={f.src} />
              <div>{f.what}</div>
            </div>
          ))}
        </div>
      )
    case 'case':
      return (
        <div className="space-y-4">
          <dl className="grid gap-2 md:grid-cols-2">
            <div className="card p-3">
              <dt className="text-xs uppercase muted">Protagonist</dt>
              <dd>
                <R t={m.case.protagonist} />
              </dd>
            </div>
            <div className="card p-3">
              <dt className="text-xs uppercase muted">The decision</dt>
              <dd>
                <R t={m.case.decision} />
              </dd>
            </div>
          </dl>
          <ol className="border-l-2 line pl-4 space-y-1.5">
            {m.case.timeline.map((t) => (
              <li key={t.when} className="text-sm">
                <strong className="tabular-nums">{t.when}</strong> — <R t={t.what} />
              </li>
            ))}
          </ol>
          <h3 className="text-lg font-semibold">The facts that matter</h3>
          <ul className="space-y-2">
            {s.caseFacts.map((f, i) => (
              <li key={i} className="card p-3 text-sm space-y-1">
                <div>
                  {f.fact} <Cite tag={f.src} />
                </div>
                <div className="muted">
                  <strong>Why it matters:</strong> {f.why}
                </div>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">Exhibits, redrawn</h3>
          {m.case.exhibits()}
        </div>
      )
    case 'run':
      return (
        <div className="space-y-4">
          <p>
            <R t={m.tool.intro} />
          </p>
          {m.tool.render()}
          <details className="card p-3">
            <summary className="font-semibold cursor-pointer">Model analysis — what a strong student brings to class</summary>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
              {s.strongAnalysis.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </details>
        </div>
      )
    case 'coldcall':
      return (
        <div className="space-y-3">
          <p className="text-sm">Ten questions, escalating from facts to analysis to judgment to “what would you do?” Answer out loud before you reveal. These are written for this site, in the style of a case discussion.</p>
          <ColdCallSim session={m.id} calls={m.coldCalls} />
        </div>
      )
    case 'devil':
      return <Devil m={m} />
    case 'present':
      return (
        <div className="space-y-3">
          <p className="text-sm">
            Answer the session’s question the way a consultant would: SCQA, one governing answer, supports underneath, the strongest alternative dismantled <Cite tag="Minto §2" />.
          </p>
          <PyramidBuilder id={m.id} prompt={m.pyramid.prompt} model={m.pyramid.model} />
        </div>
      )
    case 'check':
      return <Check m={m} />
    case 'summary':
      return <Summary m={m} />
  }
}

function KeyQuestion({ m }: { m: ModuleDef }) {
  const s = mapById[m.id]
  const gut = useP((p) => p.gut[m.id] ?? '')
  const [draft, setDraft] = useState(gut)
  return (
    <div className="space-y-4">
      <div className="card p-5 space-y-2" style={{ borderColor: 'var(--accent)' }}>
        <div className="text-xs uppercase tracking-wide muted">The Key Question for class</div>
        <p className="text-xl font-serif">
          {s.keyQuestion} <Cite tag={s.keyQuestionSrc} />
        </p>
      </div>
      <p>Commit to a one-sentence gut answer before the lesson. You’ll see it again at the end, next to the model answer.</p>
      <label className="block space-y-1">
        <span className="font-semibold text-sm">My gut answer (one sentence)</span>
        <textarea className="w-full" rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} />
      </label>
      <button type="button" className="btn btn-primary" disabled={!draft.trim()} onClick={() => (setProgress((p) => ({ ...p, gut: { ...p.gut, [m.id]: draft.trim() } })), go(`/learn/${m.id}?screen=framework`))}>
        Lock it in and start
      </button>
      {gut && <p className="text-sm muted">Saved: “{gut}”</p>}
    </div>
  )
}

function Variant({ v }: { v: NonNullable<ModuleDef['framework']['variants']>[number] }) {
  return (
    <div className="card p-4 space-y-2" style={{ borderColor: 'var(--warn-ink)' }}>
      <div className="font-semibold">⚖ Brief vs. slides: {v.title}</div>
      <div className="grid gap-2 md:grid-cols-2 text-sm">
        <div className="surface-2 rounded p-2">
          <div className="font-semibold">The brief (teach this)</div>
          <R t={v.brief} />
        </div>
        <div className="surface-2 rounded p-2">
          <div className="font-semibold">The slides</div>
          <R t={v.slides} />
        </div>
      </div>
      <p className="text-sm">
        <strong>How they differ: </strong>
        <R t={v.differ} />
      </p>
      <p className="text-sm">
        <R t={v.guess} /> <SiteBadge>Our guess, not the professor’s statement</SiteBadge>
      </p>
    </div>
  )
}

function Reveal({ id, prompt, answer, badge }: { id: string; prompt: string; answer: string; badge?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card p-4 space-y-2">
      <p>
        <R t={prompt} />
      </p>
      <NoteBox id={id} label="Your answer" rows={2} />
      <button type="button" className="btn btn-sm" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {open ? 'Hide' : 'Show'} model answer
      </button>
      {open && (
        <div className="callout text-sm">
          <R t={answer} /> {badge && <SiteBadge>Fictional scenario — applies the course framework</SiteBadge>}
        </div>
      )}
    </div>
  )
}

function Devil({ m }: { m: ModuleDef }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="space-y-3">
      <div className="card p-4" style={{ borderLeft: '4px solid var(--bad)' }}>
        <div className="text-xs uppercase muted">The strongest counterargument</div>
        <p className="text-lg font-serif">
          “<R t={m.devil.argument} />”
        </p>
      </div>
      <NoteBox id={`devil-${m.id}`} label="Your rebuttal — concede what’s true, then show why the answer still holds" rows={4} />
      <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
        Show a strong response
      </button>
      {open && (
        <div className="callout">
          <Rich t={m.devil.response} />
        </div>
      )}
      <div className="card p-3 text-sm">
        <div className="font-semibold mb-1">Follow-up probes to practice out loud</div>
        <ul className="list-disc pl-5">
          {m.devil.probes.map((p, i) => (
            <li key={i}>
              <R t={p} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Check({ m }: { m: ModuleDef }) {
  const [run, setRun] = useState(0)
  const best = useP((p) => p.mastery[m.id]?.best)
  const qs = useMemo(() => m.checkIds.map((cid) => m.bank.find((q) => q.id === cid)!).filter(Boolean), [m])
  return (
    <div className="space-y-3">
      <p className="text-sm">
        {qs.length} questions. Every option is explained after you check. Score <strong>80%+</strong> to mark this module mastered{best !== undefined && ` (best so far: ${Math.round(best * 100)}%)`}. More questions live in Practice.
      </p>
      <QuizRun key={run} qs={qs} onDone={(sc) => recordMastery(m.id, sc)} />
      <button type="button" className="btn btn-sm" onClick={() => setRun((r) => r + 1)}>
        Retake from blank
      </button>
    </div>
  )
}

function Summary({ m }: { m: ModuleDef }) {
  const s = mapById[m.id]
  const gut = useP((p) => p.gut[m.id])
  const Block = ({ title, children }: { title: string; children: ReactNode }) => (
    <section className="card p-4 space-y-2 break-inside-avoid">
      <h3 className="font-semibold">{title}</h3>
      {children}
    </section>
  )
  return (
    <div className="space-y-3" data-testid="summary">
      <div className="flex gap-2 no-print">
        <button type="button" className="btn btn-sm" onClick={() => window.print()}>
          🖨 Print this page
        </button>
      </div>
      <Block title="Key Question">
        <p className="font-serif text-lg">{s.keyQuestion}</p>
        <div className="grid gap-2 md:grid-cols-2 text-sm">
          <div className="surface-2 rounded p-2">
            <div className="font-semibold">Your gut answer (start of lesson)</div>
            {gut ? `“${gut}”` : <span className="muted">You didn’t record one.</span>}
          </div>
          <div className="surface-2 rounded p-2">
            <div className="font-semibold">The answer</div>
            <R t={m.summary.answer} />
          </div>
        </div>
      </Block>
      <Block title={`Framework: ${s.framework.name}`}>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {m.summary.frameworkBullets.map((b, i) => (
            <li key={i}>
              <R t={b} />
            </li>
          ))}
        </ul>
      </Block>
      <Block title={`Case: ${s.case.name}`}>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {m.summary.caseBullets.map((b, i) => (
            <li key={i}>
              <R t={b} />
            </li>
          ))}
        </ul>
      </Block>
      <Block title="Key numbers">
        <table className="data-table w-full">
          <tbody>
            {m.summary.numbers.map((n) => (
              <tr key={n.label}>
                <th scope="row">{n.label}</th>
                <td>
                  {n.value} <Cite tag={n.src} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Block>
      <Block title="Model pyramid">
        <ModelPyramid p={m.pyramid.model} />
      </Block>
      {m.crossLinks402 && (
        <Block title="See it in 402">
          {m.crossLinks402.map((c) => (
            <p key={c.topic} className="text-sm">
              <strong>{c.topic}:</strong> <R t={c.note} />{' '}
              <a className="underline" href={c.href ?? '#/learn'}>
                Open STRAT 402 →
              </a>
            </p>
          ))}
        </Block>
      )}
    </div>
  )
}
