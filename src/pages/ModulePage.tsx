import { useMemo, useState, type ReactNode } from 'react'
import { generatorById, mcqById, mcqs, generators } from '../content'
import type { ScreenKey, SessionModule } from '../content/types'
import { Cite, GeneralBadge } from '../components/Cite'
import { McqCard } from '../components/McqCard'
import { NumericAsk } from '../components/NumericAsk'
import { ProblemCard } from '../components/ProblemCard'
import { QuizRunner, type QuizItem } from '../components/QuizRunner'
import { Rich, Tex } from '../components/Rich'
import { WorkedExample } from '../components/WorkedExample'
import { Rng, newSeed } from '../lib/rng'
import { setProgress, useProgress } from '../lib/store'
import { Widget } from '../widgets/registry'

export const SCREENS: { key: ScreenKey; min: number }[] = [
  { key: 'why', min: 2 },
  { key: 'intuition', min: 3 },
  { key: 'terms', min: 4 },
  { key: 'math', min: 5 },
  { key: 'examples', min: 8 },
  { key: 'widgets', min: 6 },
  { key: 'check', min: 5 },
  { key: 'apply', min: 8 },
  { key: 'traps', min: 3 },
  { key: 'explain', min: 4 },
  { key: 'deeper', min: 3 },
  { key: 'mastery', min: 10 },
  { key: 'summary', min: 2 },
]

/** One session as a single reading, with its questions in a flip-through at the end. */
export function SessionArticle({ m }: { m: SessionModule }) {
  const mastery = useProgress((p) => p.mastery[m.id])
  if (!m.ready) return <StubModule m={m} />
  const spine = m.spine === 'markets' ? 'Markets to Pursue' : m.spine === 'value' ? 'Unique Value to Offer' : 'Course framing'
  return (
    <article id={m.id} className="lesson scroll-mt-20" data-testid={`session-${m.id}`}>
      <header className="lesson-read space-y-2">
        <p className="text-sm muted">
          Session {m.num} · {spine}
        </p>
        <h2 className="text-3xl font-semibold">{m.title}</h2>
        {mastery && (
          <p className="text-sm">
            Mastery check best: <strong>{Math.round(mastery.best * 100)}%</strong> {mastery.passed ? '· Mastered ✓' : ''}
          </p>
        )}
      </header>
      <div className="lesson-read">
        <div id={`${m.id}-why`} className="scroll-mt-20" data-testid={`screen-${m.id}-why`}>
          <div className="callout text-lg">
            <Rich>{m.takeaway}</Rich>
          </div>
          <Rich>{m.why}</Rich>
          <h3 className="lesson-h">What you need to be able to do</h3>
          <ul className="lesson-list">
            {m.los.map((lo) => (
              <li key={lo.id}>
                {lo.text} <Cite tag={lo.src} />
              </li>
            ))}
          </ul>
        </div>
        <div id={`${m.id}-intuition`} className="scroll-mt-20" data-testid={`screen-${m.id}-intuition`}>
          <Rich>{m.intuition}</Rich>
        </div>
        <section id={`${m.id}-terms`} className="scroll-mt-20" data-testid={`screen-${m.id}-terms`} aria-labelledby={`${m.id}-terms-title`}>
          <h3 id={`${m.id}-terms-title`} className="lesson-h">
            Terms
          </h3>
          <Terms m={m} />
        </section>
        <section id={`${m.id}-math`} className="scroll-mt-20" data-testid={`screen-${m.id}-math`} aria-labelledby={`${m.id}-math-title`}>
          <h3 id={`${m.id}-math-title`} className="lesson-h">
            The math
          </h3>
          <MathBlock m={m} />
        </section>
        {m.examples.length > 0 && (
          <section id={`${m.id}-examples`} className="scroll-mt-20 space-y-5" data-testid={`screen-${m.id}-examples`} aria-labelledby={`${m.id}-examples-title`}>
            <h3 id={`${m.id}-examples-title`} className="lesson-h">
              Worked examples
            </h3>
            {m.examples.map((ex) => (
              <WorkedExample key={ex.id} ex={ex} />
            ))}
          </section>
        )}
        {m.widgets.length > 0 && (
          <section id={`${m.id}-widgets`} className="scroll-mt-20 space-y-6" data-testid={`screen-${m.id}-widgets`} aria-labelledby={`${m.id}-widgets-title`}>
            <h3 id={`${m.id}-widgets-title`} className="lesson-h">
              Try it
            </h3>
            {m.widgets.map((w) => (
              <section key={w.id} className="space-y-3" aria-labelledby={`w-${w.id}`}>
                <h4 id={`w-${w.id}`} className="text-lg font-semibold">
                  {w.title}
                </h4>
                <Rich className="muted">{w.intro}</Rich>
                <Widget id={w.id} />
              </section>
            ))}
          </section>
        )}
        <section id={`${m.id}-traps`} className="scroll-mt-20" data-testid={`screen-${m.id}-traps`} aria-labelledby={`${m.id}-traps-title`}>
          <h3 id={`${m.id}-traps-title`} className="lesson-h">
            Easy to mix up
          </h3>
          <ul className="lesson-list">
            {m.traps.map((t) => (
              <li key={t.title}>
                <strong>{t.title}.</strong> <Rich className="inline">{t.body}</Rich>
              </li>
            ))}
          </ul>
        </section>
        {m.deeper.length > 0 && (
          <section id={`${m.id}-deeper`} className="scroll-mt-20" data-testid={`screen-${m.id}-deeper`} aria-labelledby={`${m.id}-deeper-title`}>
            <h3 id={`${m.id}-deeper-title`} className="lesson-h">
              If you want the extra depth
            </h3>
            {m.deeper.map((d) => (
              <details key={d.title} className="lesson-more">
                <summary>
                  {d.kind === 'case-interview' ? 'In a case interview: ' : ''}
                  {d.title.replace(/^In a case interview: /, '')}
                </summary>
                <Rich>{d.body}</Rich>
              </details>
            ))}
          </section>
        )}
        <section id={`${m.id}-summary`} className="scroll-mt-20" data-testid={`screen-${m.id}-summary`} aria-labelledby={`${m.id}-summary-title`}>
          <div className="flex justify-between items-baseline gap-3">
            <h3 id={`${m.id}-summary-title`} className="lesson-h">
              One-page summary
            </h3>
            <button type="button" className="btn btn-sm no-print" onClick={() => window.print()}>
              Print
            </button>
          </div>
          <Rich>{m.summary}</Rich>
        </section>
      </div>
      <QuestionDeck m={m} />
      <section id={`${m.id}-mastery`} className="lesson-deck scroll-mt-20" data-testid={`screen-${m.id}-mastery`} aria-labelledby={`${m.id}-mastery-title`}>
        <h3 id={`${m.id}-mastery-title`} className="text-xl font-semibold mb-3">
          Mastery check
        </h3>
        <Mastery m={m} />
      </section>
    </article>
  )
}

function MathBlock({ m }: { m: SessionModule }) {
  if (m.formulas.length === 0) return <p className="muted">No formulas in this session. The questions at the end cover it.</p>
  return (
    <div className="space-y-8">
      {m.mathIntro && <Rich>{m.mathIntro}</Rich>}
      {m.formulas.map((f) => (
        <div key={f.id}>
          <h4 className="text-lg font-semibold">
            {f.name} {f.general && <GeneralBadge />} <Cite tag={f.src} />
          </h4>
          <div className="my-3 scroll-x">
            <Tex display>{f.latex}</Tex>
          </div>
          <dl className="formula-vars">
            {f.vars.map(([sym, meaning]) => (
              <div key={sym}>
                <dt>
                  <Tex>{sym}</Tex>
                </dt>
                <dd>
                  <Rich>{meaning}</Rich>
                </dd>
              </div>
            ))}
          </dl>
          <p>
            <strong>In words.</strong>
          </p>
          <Rich>{f.words}</Rich>
        </div>
      ))}
    </div>
  )
}

function Terms({ m }: { m: SessionModule }) {
  return (
    <dl className="glossary">
      {m.terms.map((t) => (
        <div key={t.id}>
          <dt>
            {t.term} {t.general && <GeneralBadge />} <Cite tag={t.src} />
          </dt>
          <dd>
            <Rich>{t.def}</Rich>
          </dd>
        </div>
      ))}
    </dl>
  )
}

function QuestionDeck({ m }: { m: SessionModule }) {
  const slides = useMemo(() => {
    const los = m.los.map((l) => l.id)
    const out: { key: string; kind: string; node: ReactNode }[] = []
    m.checkIds.forEach((qid, k) => {
      const q = mcqById[qid]
      if (q) out.push({ key: qid, kind: 'Concept', node: <McqCard q={q} index={k} /> })
    })
    if (m.applyGenerators.length === 0) {
      mcqs
        .filter((q) => q.session === m.id && !m.checkIds.includes(q.id))
        .slice(0, 6)
        .forEach((q, k) => out.push({ key: q.id, kind: 'Concept', node: <McqCard q={q} index={k} /> }))
    }
    m.applyGenerators.forEach((gid, k) => {
      const gen = generatorById[gid]
      if (gen) out.push({ key: gid, kind: 'Calculation', node: <ProblemCard gen={gen} index={k} /> })
    })
    for (const w of m.widgets) {
      w.numeric?.forEach((n) =>
        out.push({
          key: n.id,
          kind: 'Use the interactive',
          node: <NumericAsk id={n.id} label={n.label} part={n.part} hint={n.hint} src={n.src} session={m.id} los={los} />,
        }),
      )
      w.questions.forEach((q) => out.push({ key: q.id, kind: 'Use the interactive', node: <McqCard q={q} /> }))
    }
    m.feynman.forEach((f) => out.push({ key: f.id, kind: 'Explain it', node: <Feynman f={f} /> }))
    return out
  }, [m])
  const [i, setI] = useState(0)
  const n = slides.length
  const at = Math.min(i, Math.max(0, n - 1))
  if (n === 0) return null
  return (
    <section id={`${m.id}-check`} className="lesson-deck scroll-mt-20" data-testid={`screen-${m.id}-check`} aria-roledescription="carousel" aria-label={`Questions for session ${m.num}`}>
      <span id={`${m.id}-apply`} className="sr-only" />
      <span id={`${m.id}-explain`} className="sr-only" />
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold">Questions</h3>
        <p className="text-sm muted" aria-live="polite">
          {slides[at].kind} · {at + 1} of {n}
        </p>
      </div>
      <p className="text-sm muted">One at a time. The Practice tab has the rest of the bank.</p>
      <div className="mt-3">
        {slides.map((s, k) => (
          <div key={s.key} hidden={k !== at}>
            {s.node}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 mt-4">
        <button type="button" className="btn" disabled={at === 0} onClick={() => setI(at - 1)}>
          ← Previous
        </button>
        <button type="button" className="btn btn-primary" disabled={at === n - 1} onClick={() => setI(at + 1)}>
          Next →
        </button>
      </div>
    </section>
  )
}

function Feynman({ f }: { f: SessionModule['feynman'][number] }) {
  const saved = useProgress((p) => p.feynman[f.id])
  const [text, setText] = useState(saved?.text ?? '')
  const [show, setShow] = useState(false)
  const checks = saved?.checks ?? f.rubric.map(() => false)
  const save = (patch: Partial<{ text: string; checks: boolean[] }>) =>
    setProgress((p) => ({ ...p, feynman: { ...p.feynman, [f.id]: { ...{ text, checks }, ...p.feynman[f.id], ...patch } } }))
  return (
    <div className="card p-4 space-y-3">
      <Rich className="font-semibold text-lg">{f.prompt}</Rich>
      <label className="sr-only" htmlFor={`fey-${f.id}`}>
        Your explanation
      </label>
      <textarea
        id={`fey-${f.id}`}
        rows={5}
        className="w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => save({ text })}
        placeholder="Type your explanation as if you were talking to a friend…"
      />
      <button type="button" className="btn" onClick={() => (save({ text }), setShow(true))} disabled={!text.trim()}>
        Compare to the model answer
      </button>
      {show && (
        <div className="space-y-3">
          <div className="callout">
            <Rich>{f.model}</Rich>
          </div>
          <fieldset>
            <legend className="font-semibold text-sm mb-1">Self-grade: did your answer…</legend>
            {f.rubric.map((r, k) => (
              <label key={k} className="flex gap-2 items-start text-sm py-1">
                <input
                  type="checkbox"
                  className="mt-1 size-4"
                  checked={checks[k] ?? false}
                  onChange={(e) => save({ checks: checks.map((c, j) => (j === k ? e.target.checked : c)) })}
                />
                {r}
              </label>
            ))}
          </fieldset>
          <p className="text-sm muted">
            {checks.filter(Boolean).length}/{f.rubric.length} rubric points
          </p>
        </div>
      )}
    </div>
  )
}

function Mastery({ m }: { m: SessionModule }) {
  const [attempt, setAttempt] = useState<number | null>(null)
  const items = useMemo<QuizItem[]>(() => {
    if (attempt === null) return []
    const g = new Rng(attempt)
    const bank = mcqs.filter((q) => q.session === m.id)
    const gens = g.shuffle(generators.filter((x) => x.session === m.id)).slice(0, 3)
    const qs = g.shuffle(bank).slice(0, 9 - gens.length)
    return g.shuffle<QuizItem>([...qs.map((q) => ({ kind: 'mcq' as const, id: q.id })), ...gens.map((x) => ({ kind: 'gen' as const, id: x.id, seed: g.int(1, 2 ** 30) }))])
  }, [attempt, m.id])

  if (attempt === null)
    return (
      <div className="card p-5 space-y-3">
        <p>
          9 mixed questions (conceptual multiple choice plus short-answer calculations where the session has them), drawn fresh each time. No hints until you submit. Score <strong>80% or better</strong> to mark Session {m.num} mastered. Misses link back to the exact screen to review.
        </p>
        <button type="button" className="btn btn-primary" onClick={() => setAttempt(newSeed())} data-testid={`start-mastery-${m.id}`}>
          Start mastery check
        </button>
      </div>
    )
  return (
    <div>
      <QuizRunner
        key={attempt}
        items={items}
        title={`Session ${m.num} mastery check`}
        reviewLinks
        passMark={0.8}
        onFinish={(r) => {
          const score = r.score / r.total
          setProgress((p) => {
            const prev = p.mastery[m.id]
            return { ...p, mastery: { ...p.mastery, [m.id]: { best: Math.max(prev?.best ?? 0, score), passed: (prev?.passed ?? false) || score >= 0.8 } } }
          })
        }}
      />
      <button type="button" className="btn mt-4" onClick={() => setAttempt(newSeed())}>
        New mastery check ↻
      </button>
    </div>
  )
}

function StubModule({ m }: { m: SessionModule }) {
  return (
    <div className="space-y-4">
      <p className="text-sm muted">Session {m.num}</p>
      <h1 className="text-3xl font-semibold">{m.title}</h1>
      <div className="callout">This module is being built. Its learning objectives are listed below, and you can already drill its Comprehension Quiz questions under Quizzes.</div>
      <ul className="space-y-1.5">
        {m.los.map((lo) => (
          <li key={lo.id} className="text-sm">
            <span className="chip mr-2">{lo.id}</span>
            {lo.text} <Cite tag={lo.src} />
          </li>
        ))}
      </ul>
    </div>
  )
}
