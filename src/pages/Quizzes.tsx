import { useEffect, useMemo, useRef, useState } from 'react'
import { cqLos, cqQuestions, cqSession, mcqs, type CqQuestion } from '../content'
import { QuizHtml, RichInline } from '../components/Rich'
import { useRoute } from '../lib/router'
import { recordAnswer, useProgress } from '../lib/store'

const QUIZZES = [
  { n: 1, title: 'Comprehension Quiz 1', covers: 'Session 1 — syllabus, policies, AI use' },
  { n: 3, title: 'Comprehension Quiz 3', covers: 'Session 6 — costs (J-Dawgs), cost advantage, scale curves' },
  { n: 4, title: 'Comprehension Quiz 4', covers: 'Sessions 7–8 — demand, consumer surplus, elasticity' },
  { n: 5, title: 'Comprehension Quiz 5', covers: 'Sessions 9–10 — regression output, profit maximization' },
]

/** My explanations of why each wrong option is wrong, when a session bank has the verbatim question. */
function extraWhy(q: CqQuestion) {
  const m = mcqs.find((x) => x.origin === 'cq' && x.src === `CQ${q.quiz} Q${q.number}`)
  return m ? m.options.map((o) => o.why) : null
}

export function Quizzes() {
  const route = useRoute()
  const n = Number(route.query.get('q')) || null
  const answers = useProgress((p) => p.answers)
  if (n) return <TakeQuiz n={n} />
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-semibold">Quiz retakes</h1>
        <p className="muted">
          Your Comprehension Quizzes, word for word, with the professor's answer and explanation for every question. The professor says multiple choice on the midterm “will focus on conceptual understanding (quizzes).” There was no CQ2.
        </p>
      </header>
      <div className="grid sm:grid-cols-2 gap-3">
        {QUIZZES.map((qz) => {
          const qs = cqQuestions.filter((q) => q.quiz === qz.n)
          const done = qs.filter((q) => answers[q.id]?.attempts)
          const right = qs.filter((q) => answers[q.id]?.last)
          return (
            <a key={qz.n} href={`#/quizzes?q=${qz.n}`} className="card p-4" data-testid={`cq-${qz.n}`}>
              <div className="font-semibold">{qz.title}</div>
              <div className="text-sm muted">{qz.covers}</div>
              <div className="text-sm mt-2">
                {qs.length} questions · {done.length ? `last attempt: ${right.length}/${qs.length} correct` : 'not retaken yet'}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

function TakeQuiz({ n }: { n: number }) {
  const qs = useMemo(() => cqQuestions.filter((q) => q.quiz === n), [n])
  const [i, setI] = useState(0)
  const [sel, setSel] = useState<number | null>(null)
  const [done, setDone] = useState<boolean[]>([])
  const q = qs[i]
  const checked = done[i] !== undefined
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setSel(null)
    ref.current?.focus({ preventScroll: true })
  }, [i])
  if (!q) return <p>Quiz not found.</p>
  const why = extraWhy(q)
  const check = () => {
    if (sel === null || checked) return
    const ok = sel === q.correct
    setDone((d) => {
      const c = [...d]
      c[i] = ok
      return c
    })
    const session = cqSession[q.id]
    recordAnswer({ id: q.id, correct: ok, los: cqLos[q.id], session, mistake: { key: q.id, qid: q.id, kind: 'cq', summary: `CQ${q.quiz} Q${q.number}: ${q.stemHtml.replace(/<[^>]+>/g, ' ').slice(0, 120)}` } })
  }
  const finished = done.filter((x) => x !== undefined).length === qs.length
  return (
    <div className="space-y-4">
      <a className="text-sm underline" href="#/quizzes">
        ← All quizzes
      </a>
      <h1 className="text-2xl font-semibold">
        Comprehension Quiz {n} <span className="muted text-base">· question {i + 1} of {qs.length}</span>
      </h1>
      <div
        ref={ref}
        tabIndex={-1}
        className="card p-4 md:p-5 outline-none"
        data-testid="cq-question"
        onKeyDown={(e) => {
          const k = Number(e.key)
          if (k >= 1 && k <= q.optionsHtml.length && !checked) setSel(k - 1)
          if (e.key === 'Enter') checked ? i < qs.length - 1 && setI(i + 1) : check()
        }}
      >
        <span className="chip mb-2" style={{ color: 'var(--accent)' }}>
          ★ Verbatim from your quiz · {q.type === 'tf' ? 'True or False' : 'Multiple choice'}
        </span>
        <QuizHtml html={q.stemHtml} className="font-medium scroll-x" />
        <div className="grid gap-2 mt-3">
          {q.optionsHtml.map((o, k) => (
            <button
              key={k}
              type="button"
              className={`opt ${checked ? (k === q.correct ? 'ok' : k === sel ? 'bad' : '') : ''}`}
              aria-pressed={sel === k}
              onClick={() => !checked && setSel(k)}
            >
              <span className="opt-key">{k + 1}</span>
              <QuizHtml html={o} className="flex-1" />
            </button>
          ))}
        </div>
        {!checked ? (
          <button type="button" className="btn btn-primary mt-3" onClick={check} disabled={sel === null}>
            Check
          </button>
        ) : (
          <div className="mt-4 space-y-3" aria-live="polite">
            <p className={done[i] ? 'verdict-ok' : 'verdict-bad'}>{done[i] ? 'Correct.' : 'Not quite.'}</p>
            <div className="callout">
              <div className="text-xs font-bold uppercase tracking-wide muted mb-1">Professor's explanation</div>
              <QuizHtml html={q.feedbackHtml} />
            </div>
            {why && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wide muted mb-1">Why each option is right or wrong</div>
                <ol className="space-y-1 text-sm">
                  {why.map((w, k) => (
                    <li key={k}>
                      <strong>{k + 1}.</strong> <RichInline>{w}</RichInline>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {i < qs.length - 1 ? (
              <button type="button" className="btn btn-primary" onClick={() => setI(i + 1)}>
                Next question (Enter) →
              </button>
            ) : (
              <p className="font-semibold">
                Finished: {done.filter(Boolean).length}/{qs.length} correct.{' '}
                <button type="button" className="btn btn-sm" onClick={() => (setDone([]), setI(0))}>
                  Retake
                </button>
              </p>
            )}
          </div>
        )}
      </div>
      <nav className="flex flex-wrap gap-1.5" aria-label="Quiz questions">
        {qs.map((_, k) => (
          <button key={k} type="button" className={`btn btn-sm min-w-10 ${k === i ? 'btn-primary' : ''}`} onClick={() => setI(k)} aria-current={k === i}>
            {k + 1}
            {done[k] === true ? '✓' : done[k] === false ? '✗' : ''}
          </button>
        ))}
      </nav>
      {finished && <p className="muted text-sm">Misses went to your Mistake Log.</p>}
    </div>
  )
}
