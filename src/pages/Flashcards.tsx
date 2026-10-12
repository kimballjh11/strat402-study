import { useEffect, useMemo, useState } from 'react'
import { sessions } from '../content'
import { flashcards } from '../content/flashcards'
import { Cite, GeneralBadge } from '../components/Cite'
import { Rich } from '../components/Rich'
import { isoDay } from '../lib/format'
import { isDue, nextCard } from '../lib/srs'
import { setProgress, useProgress } from '../lib/store'

type Deck = 'due' | 'all' | 'starred'

/** Leitner spaced repetition over every term and formula. Space flips, 1 = missed, 2 = knew it. */
export function Flashcards() {
  const cards = useProgress((p) => p.cards)
  const starred = useProgress((p) => p.starred)
  const [deck, setDeck] = useState<Deck>('due')
  const [session, setSession] = useState('all')
  const [flipped, setFlipped] = useState(false)
  const [recall, setRecall] = useState('')
  const [i, setI] = useState(0)
  const today = isoDay()

  const list = useMemo(() => {
    const base = flashcards.filter((c) => session === 'all' || c.session === session)
    const l = deck === 'due' ? base.filter((c) => isDue(cards[c.id], today)) : deck === 'starred' ? base.filter((c) => starred.includes(c.id)) : base
    // starred cards first, then lower boxes
    return [...l].sort((a, b) => Number(starred.includes(b.id)) - Number(starred.includes(a.id)) || (cards[a.id]?.box ?? 0) - (cards[b.id]?.box ?? 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, session, starred])

  const card = list[i % Math.max(1, list.length)]
  const grade = (knew: boolean) => {
    if (!card) return
    setProgress((p) => ({ ...p, cards: { ...p.cards, [card.id]: nextCard(p.cards[card.id], knew) } }))
    setFlipped(false)
    setRecall('')
    setI((x) => x + 1)
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return
      if (e.key === ' ') {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (flipped && e.key === '1') grade(false)
      else if (flipped && e.key === '2') grade(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const dueCount = flashcards.filter((c) => isDue(cards[c.id], today)).length
  const boxes = [1, 2, 3, 4, 5].map((b) => flashcards.filter((c) => (cards[c.id]?.box ?? 0) === b).length)

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-semibold">Flashcards</h1>
        <p className="muted">
          {flashcards.length} cards from every key term and formula · {dueCount} due today · Leitner boxes 1–5: {boxes.join(' / ')}
        </p>
      </header>
      <div className="flex flex-wrap gap-2 items-center">
        {(['due', 'all', 'starred'] as Deck[]).map((d) => (
          <button
            key={d}
            type="button"
            className={`btn btn-sm ${deck === d ? 'btn-primary' : ''}`}
            aria-pressed={deck === d}
            onClick={() => {
              setDeck(d)
              setI(0)
              setFlipped(false)
            }}
          >
            {d === 'due' ? 'Due today' : d === 'all' ? 'All cards' : '★ Starred'}
          </button>
        ))}
        <label className="sr-only" htmlFor="fc-session">
          Session
        </label>
        <select
          id="fc-session"
          value={session}
          onChange={(e) => {
            setSession(e.target.value)
            setI(0)
          }}
        >
          <option value="all">All sessions</option>
          {sessions
            .filter((s) => flashcards.some((c) => c.session === s.id))
            .map((s) => (
              <option key={s.id} value={s.id}>
                {s.num}. {s.title}
              </option>
            ))}
        </select>
      </div>
      {!card ? (
        <div className="card p-6 text-center">
          <p className="text-lg font-semibold">Nothing due here. 🎉</p>
          <p className="muted">Switch to “All cards” to keep going, or come back tomorrow.</p>
        </div>
      ) : (
        <div className="space-y-3" data-testid="flashcard">
          <div className="text-sm muted flex gap-2 items-center flex-wrap">
            Card {(i % list.length) + 1} of {list.length} · Box {cards[card.id]?.box ?? 'new'} · Session {card.session.slice(1).replace(/^0/, '')}
            {card.general && <GeneralBadge />}
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              aria-pressed={starred.includes(card.id)}
              onClick={() => setProgress((p) => ({ ...p, starred: starred.includes(card.id) ? p.starred.filter((x) => x !== card.id) : [...p.starred, card.id] }))}
            >
              {starred.includes(card.id) ? '★' : '☆'} Star
            </button>
          </div>
          <button type="button" className="card w-full min-h-56 p-6 text-left" onClick={() => setFlipped((f) => !f)} aria-label={flipped ? 'Card back. Press to flip to front.' : 'Card front. Press to flip.'}>
            <div className="text-xs uppercase tracking-wide muted mb-2">{flipped ? 'Answer' : card.kind === 'formula' ? 'Formula recall' : 'Term'}</div>
            <Rich className="text-lg">{flipped ? card.back : card.front}</Rich>
          </button>
          {!flipped && card.kind === 'formula' && (
            <div>
              <label className="text-sm font-medium" htmlFor="fc-recall">
                Write it from memory first (optional), then flip:
              </label>
              <textarea id="fc-recall" rows={2} className="w-full mt-1" value={recall} onChange={(e) => setRecall(e.target.value)} placeholder="e.g. OPE = (dQ/dP)(P/Q)" />
            </div>
          )}
          {flipped && recall && (
            <p className="text-sm">
              <span className="muted">You wrote:</span> {recall}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {!flipped ? (
              <button type="button" className="btn btn-primary" onClick={() => setFlipped(true)}>
                Flip (Space)
              </button>
            ) : (
              <>
                <button type="button" className="btn" onClick={() => grade(false)}>
                  1 · Didn't know it
                </button>
                <button type="button" className="btn btn-primary" onClick={() => grade(true)}>
                  2 · Knew it
                </button>
              </>
            )}
          </div>
          <p className="text-xs muted">
            Source: <Cite tag={card.src} />
          </p>
        </div>
      )}
    </div>
  )
}
