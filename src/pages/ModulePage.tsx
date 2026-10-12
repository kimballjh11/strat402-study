import { useEffect, useMemo, useState } from 'react'
import { generatorById, mcqById, mcqs, generators, sessionById } from '../content'
import type { ScreenKey, SessionId, SessionModule } from '../content/types'
import { Cite, GeneralBadge } from '../components/Cite'
import { McqCard } from '../components/McqCard'
import { NumericAsk } from '../components/NumericAsk'
import { ProblemCard } from '../components/ProblemCard'
import { QuizRunner, screenLabel, type QuizItem } from '../components/QuizRunner'
import { Rich, Tex } from '../components/Rich'
import { MasteryRing } from '../components/Ring'
import { WorkedExample } from '../components/WorkedExample'
import { navigate, useRoute } from '../lib/router'
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

export function ModulePage({ id }: { id: SessionId }) {
  const m = sessionById[id]
  const route = useRoute()
  const screenParam = route.query.get('screen') as ScreenKey | null
  const idx = Math.max(0, SCREENS.findIndex((s) => s.key === screenParam))
  const screen = SCREENS[idx].key
  const mastery = useProgress((p) => p.mastery[id])
  const visited = useProgress((p) => p.visited[id] ?? [])

  useEffect(() => {
    setProgress((p) => {
      const v = p.visited[id] ?? []
      return {
        ...p,
        lastPath: `/learn/${id}?screen=${screen}`,
        lastScreen: { ...p.lastScreen, [id]: idx },
        visited: v.includes(idx) ? p.visited : { ...p.visited, [id]: [...v, idx] },
      }
    })
    window.scrollTo({ top: 0 })
  }, [id, idx, screen])

  if (!m) return <p>Unknown session.</p>
  if (!m.ready) return <StubModule m={m} />

  const go = (k: number) => navigate(`/learn/${id}?screen=${SCREENS[Math.max(0, Math.min(SCREENS.length - 1, k))].key}`)
  const total = SCREENS.reduce((a, s) => a + s.min, 0)

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start gap-4">
        <MasteryRing value={visited.length / SCREENS.length} mastered={mastery?.passed} size={64} label={`${visited.length} of ${SCREENS.length} screens viewed`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm muted">
            Session {m.num} · {m.spine === 'markets' ? 'Markets to Pursue' : m.spine === 'value' ? 'Unique Value to Offer' : 'Course framing'} · about {m.minutes || total} min
          </p>
          <h1 className="text-3xl font-semibold">{m.title}</h1>
          {mastery && (
            <p className="text-sm mt-1">
              Mastery check best: <strong>{Math.round(mastery.best * 100)}%</strong> {mastery.passed ? '· Mastered ✓' : ''}
            </p>
          )}
        </div>
      </header>

      <nav aria-label="Lesson screens" className="scroll-x -mx-1 px-1">
        <ol className="flex gap-1.5 w-max pb-1">
          {SCREENS.map((s, k) => (
            <li key={s.key}>
              <a
                href={`#/learn/${id}?screen=${s.key}`}
                className={`btn btn-sm whitespace-nowrap ${k === idx ? 'btn-primary' : ''}`}
                aria-current={k === idx ? 'step' : undefined}
              >
                <span aria-hidden>{visited.includes(k) && k !== idx ? '✓ ' : `${k + 1}. `}</span>
                {screenLabel(s.key)}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section aria-labelledby="screen-title" className="space-y-4" data-testid={`screen-${screen}`}>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h2 id="screen-title" className="text-2xl font-semibold">
            {idx + 1}. {screenLabel(screen)}
          </h2>
          <span className="text-sm muted">~{SCREENS[idx].min} min</span>
        </div>
        <Screen m={m} screen={screen} />
      </section>

      <div className="flex justify-between gap-2 pt-4 border-t line no-print">
        <button type="button" className="btn" onClick={() => go(idx - 1)} disabled={idx === 0}>
          ← {idx > 0 ? screenLabel(SCREENS[idx - 1].key) : 'Back'}
        </button>
        {idx < SCREENS.length - 1 ? (
          <button type="button" className="btn btn-primary" onClick={() => go(idx + 1)}>
            {screenLabel(SCREENS[idx + 1].key)} →
          </button>
        ) : (
          <a className="btn btn-primary" href="#/learn">
            All modules
          </a>
        )}
      </div>
    </div>
  )
}

function Screen({ m, screen }: { m: SessionModule; screen: ScreenKey }) {
  switch (screen) {
    case 'why':
      return (
        <div className="space-y-4">
          <div className="callout text-lg">
            <Rich>{m.takeaway}</Rich>
          </div>
          <Rich>{m.why}</Rich>
          <div className="card p-4">
            <h3 className="font-semibold mb-2">Learning objectives (the contract)</h3>
            <ul className="space-y-1.5">
              {m.los.map((lo) => (
                <li key={lo.id} className="text-sm">
                  <span className="chip mr-2">{lo.id}</span>
                  {lo.text} <Cite tag={lo.src} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    case 'intuition':
      return <Rich className="text-lg">{m.intuition}</Rich>
    case 'terms':
      return <Terms m={m} />
    case 'math':
      return (
        <div className="space-y-4">
          {m.mathIntro && <Rich>{m.mathIntro}</Rich>}
          {m.formulas.length === 0 && <p className="callout">No formulas in this session. It’s concepts and course policies. Spend the time on the Check-yourself questions.</p>}
          {m.formulas.map((f) => (
            <div key={f.id} className="card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">{f.name}</h3>
                {f.general && <GeneralBadge />}
                <Cite tag={f.src} />
              </div>
              <div className="my-2 scroll-x">
                <Tex display>{f.latex}</Tex>
              </div>
              <table className="data-table">
                <tbody>
                  {f.vars.map(([sym, meaning]) => (
                    <tr key={sym}>
                      <td>
                        <Tex>{sym}</Tex>
                      </td>
                      <td>
                        <Rich>{meaning}</Rich>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-sm">
                <strong>Say it in words:</strong> <Rich className="inline">{f.words}</Rich>
              </p>
            </div>
          ))}
        </div>
      )
    case 'examples':
      return (
        <div className="space-y-4">
          {m.examples.map((ex) => (
            <WorkedExample key={ex.id} ex={ex} />
          ))}
        </div>
      )
    case 'widgets':
      return (
        <div className="space-y-6">
          {m.widgets.map((w) => (
            <section key={w.id} className="card p-4 md:p-5 space-y-3" aria-labelledby={`w-${w.id}`}>
              <h3 id={`w-${w.id}`} className="text-xl font-semibold">
                {w.title}
              </h3>
              <Rich className="muted">{w.intro}</Rich>
              <Widget id={w.id} />
              {(w.numeric?.length || w.questions.length) && (
                <div className="space-y-3 pt-2">
                  <h4 className="font-semibold">Use it</h4>
                  {w.numeric?.map((n) => (
                    <NumericAsk key={n.id} id={n.id} label={n.label} part={n.part} hint={n.hint} src={n.src} session={m.id} los={m.los.map((l) => l.id)} />
                  ))}
                  {w.questions.map((q) => (
                    <McqCard key={q.id} q={q} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )
    case 'check':
      return (
        <div className="space-y-4">
          <p className="muted">Quiz-style conceptual questions, with an explanation for every option. Want more? The Practice tab has the whole bank.</p>
          {m.checkIds.map((qid, k) => (
            <McqCard key={qid} q={mcqById[qid]} index={k} />
          ))}
        </div>
      )
    case 'apply':
      return (
        <div className="space-y-4">
          <p className="muted">{m.applyGenerators.length ? "Spreadsheet-style short answers. Every problem regenerates with new numbers, so practice until it's automatic." : 'No calculations in this session. Practice with the quiz-style questions instead.'}</p>
          {m.applyGenerators.length === 0 &&
            mcqs
              .filter((q) => q.session === m.id && !m.checkIds.includes(q.id))
              .slice(0, 6)
              .map((q, k) => <McqCard key={q.id} q={q} index={k} />)}
          {m.applyGenerators.map((gid, k) => (
            <ProblemCard key={gid} gen={generatorById[gid]} index={k} />
          ))}
        </div>
      )
    case 'traps':
      return (
        <div className="grid md:grid-cols-2 gap-3">
          {m.traps.map((t) => (
            <div key={t.title} className="card p-4">
              <h3 className="font-semibold">⚠ {t.title}</h3>
              <Rich className="text-sm">{t.body}</Rich>
            </div>
          ))}
        </div>
      )
    case 'explain':
      return (
        <div className="space-y-5">
          {m.feynman.map((f) => (
            <Feynman key={f.id} f={f} />
          ))}
        </div>
      )
    case 'deeper':
      return (
        <div className="space-y-3">
          <p className="muted">Optional. Extra depth, derivations, and case-interview connections.</p>
          {m.deeper.map((d) => (
            <details key={d.title} className="card p-4">
              <summary className="cursor-pointer font-semibold">
                {d.kind === 'case-interview' ? '💼 In a case interview: ' : d.kind === 'derivation' ? '∂ ' : '📘 '}
                {d.title.replace(/^In a case interview: /, '')}
              </summary>
              <Rich className="mt-2">{d.body}</Rich>
            </details>
          ))}
        </div>
      )
    case 'mastery':
      return <Mastery m={m} />
    case 'summary':
      return (
        <div className="card p-5">
          <div className="flex justify-between items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold">
              Session {m.num}: {m.title} — one-page summary
            </h3>
            <button type="button" className="btn btn-sm no-print" onClick={() => window.print()}>
              Print
            </button>
          </div>
          <Rich>{m.summary}</Rich>
        </div>
      )
  }
}

function Terms({ m }: { m: SessionModule }) {
  const starred = useProgress((p) => p.starred)
  return (
    <div className="space-y-3">
      <p className="muted text-sm">All of these are already in your flashcards. Star the ones you want to see more often.</p>
      {m.terms.map((t) => {
        const cardId = `card-${t.id}`
        const on = starred.includes(cardId)
        return (
          <div key={t.id} className="card p-4">
            <div className="flex items-start gap-2">
              <h3 className="font-semibold flex-1">
                {t.term} {t.general && <GeneralBadge />}
              </h3>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                aria-pressed={on}
                aria-label={on ? `Unstar ${t.term}` : `Star ${t.term} in flashcards`}
                onClick={() => setProgress((p) => ({ ...p, starred: on ? p.starred.filter((x) => x !== cardId) : [...p.starred, cardId] }))}
              >
                {on ? '★ Starred' : '☆ Star'}
              </button>
            </div>
            <Rich>{t.def}</Rich>
            <Cite tag={t.src} />
          </div>
        )
      })}
    </div>
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
        <button type="button" className="btn btn-primary" onClick={() => setAttempt(newSeed())} data-testid="start-mastery">
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
