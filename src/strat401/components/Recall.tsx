import { useState } from 'react'
import type { RecallList } from '../content/types'
import { setRecall, useP, NONE_OBJ } from '../lib/store'
import { Cite } from './Cite'

/** Active recall: write the framework's parts from memory, then reveal and mark what you got. */
export function RecallDrill({ list }: { list: RecallList }) {
  const got = useP((p) => p.recall[list.id] ?? NONE_OBJ)
  const [draft, setDraft] = useState('')
  const [shown, setShown] = useState(false)
  const n = list.items.filter((it) => got[it.name]).length
  return (
    <div className="card p-4 space-y-3" data-testid={`recall-${list.id}`}>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-semibold">🧠 {list.title}</h3>
        <Cite tag={list.src} />
        {shown && <span className="chip">{n}/{list.items.length} recalled</span>}
      </div>
      <p className="text-sm muted">{list.prompt}</p>
      <label className="block">
        <span className="sr-only">Your recall attempt</span>
        <textarea className="w-full" rows={3} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type what you remember, then reveal…" />
      </label>
      {!shown ? (
        <button type="button" className="btn btn-primary" onClick={() => setShown(true)}>
          Reveal and self-mark
        </button>
      ) : (
        <ol className="space-y-1.5">
          {list.items.map((it, i) => (
            <li key={it.name} className="flex items-start gap-2">
              <span className="chip">{i + 1}</span>
              <span className="flex-1">
                <strong>{it.name}</strong>
                {it.hint && <span className="muted text-sm"> — {it.hint}</span>}
              </span>
              <button
                type="button"
                className="btn btn-sm"
                aria-pressed={!!got[it.name]}
                onClick={() => setRecall(list.id, it.name, !got[it.name])}
                style={got[it.name] ? { borderColor: 'var(--ok)', color: 'var(--ok)' } : undefined}
              >
                {got[it.name] ? '✓ Got it' : 'Mark got it'}
              </button>
            </li>
          ))}
        </ol>
      )}
      {shown && (
        <button type="button" className="btn btn-sm" onClick={() => (setShown(false), setDraft(''))}>
          Try again from blank
        </button>
      )}
    </div>
  )
}
