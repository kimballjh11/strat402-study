import { useState } from 'react'
import { cqQuestions, generatorById, mcqById, mcqs, sessionById, type CqQuestion } from '../content'
import { McqCard } from '../components/McqCard'
import { ProblemCard } from '../components/ProblemCard'
import { QuizHtml } from '../components/Rich'
import { newSeed } from '../lib/rng'
import { setProgress, useProgress, type MistakeRecord } from '../lib/store'

export function Mistakes() {
  const all = useProgress((p) => p.mistakes)
  const [showResolved, setShowResolved] = useState(false)
  const list = all.filter((m) => showResolved || !m.resolved)
  const open = all.filter((m) => !m.resolved).length
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-semibold">Mistake Log</h1>
        <p className="muted">
          Every question you miss lands here with its concept. “Retry similar” gives you a fresh version. Get it right and it's marked resolved. {open} open.
        </p>
        <label className="text-sm flex gap-2 items-center mt-2">
          <input type="checkbox" className="size-4" checked={showResolved} onChange={(e) => setShowResolved(e.target.checked)} /> Show resolved
        </label>
      </header>
      {list.length === 0 ? (
        <p className="card p-5 muted">No mistakes logged{showResolved ? '' : ' (open)'}. Go practice something hard.</p>
      ) : (
        <ul className="space-y-3">
          {list.map((m) => (
            <MistakeItem key={m.key} m={m} />
          ))}
        </ul>
      )}
    </div>
  )
}

function MistakeItem({ m }: { m: MistakeRecord }) {
  const [retry, setRetry] = useState<number | null>(null)
  const concept = m.kind === 'gen' ? generatorById[m.qid]?.skill : m.los.join(', ')
  return (
    <li className="card p-4" data-testid="mistake">
      <div className="flex flex-wrap gap-2 items-center text-sm">
        <span className="chip">{sessionById[m.session as keyof typeof sessionById]?.title ?? m.session}</span>
        {m.los.map((lo) => (
          <span key={lo} className="chip">
            {lo}
          </span>
        ))}
        {m.resolved && <span className="chip verdict-ok">resolved</span>}
        <span className="muted ml-auto">{new Date(m.at).toLocaleDateString()}</span>
      </div>
      <p className="mt-2">{m.summary}</p>
      {concept && <p className="text-sm muted">Concept: {concept}</p>}
      <div className="flex gap-2 mt-2">
        <button type="button" className="btn btn-sm btn-primary" onClick={() => setRetry(newSeed())}>
          Retry similar ↻
        </button>
        <button type="button" className="btn btn-sm btn-ghost" onClick={() => setProgress((p) => ({ ...p, mistakes: p.mistakes.map((x) => (x.key === m.key ? { ...x, resolved: !x.resolved } : x)) }))}>
          {m.resolved ? 'Reopen' : 'Mark resolved'}
        </button>
      </div>
      {retry !== null && <div className="mt-3">{renderRetry(m, retry)}</div>}
    </li>
  )
}

function renderRetry(m: MistakeRecord, seed: number) {
  if (m.kind === 'gen' && generatorById[m.qid]) return <ProblemCard gen={generatorById[m.qid]} seed={seed} />
  if (m.kind === 'mcq' && mcqById[m.qid]) {
    // the same question reshuffled, or a sibling testing the same LO
    const siblings = mcqs.filter((q) => q.id !== m.qid && q.los.some((l) => m.los.includes(l)))
    const q = siblings.length && seed % 2 ? siblings[seed % siblings.length] : mcqById[m.qid]
    return <McqCard q={q} shuffleSeed={seed} />
  }
  if (m.kind === 'cq') {
    const variants = mcqs.filter((q) => q.origin === 'cq-variant' && q.los.some((l) => m.los.includes(l)))
    if (variants.length) return <McqCard q={variants[seed % variants.length]} shuffleSeed={seed} />
    const q = cqQuestions.find((x) => x.id === m.qid)
    return q ? <CqReveal q={q} /> : null
  }
  return <p className="muted">That question is no longer in the bank.</p>
}

function CqReveal({ q }: { q: CqQuestion }) {
  return (
    <div className="card p-4">
      <QuizHtml html={q.stemHtml} />
      <p className="mt-2 font-semibold">
        Answer: <QuizHtml html={q.optionsHtml[q.correct]} className="inline-block" />
      </p>
      <div className="callout">
        <QuizHtml html={q.feedbackHtml} />
      </div>
      <a className="underline text-sm" href={`#/quizzes?q=${q.quiz}`}>
        Retake CQ{q.quiz}
      </a>
    </div>
  )
}
