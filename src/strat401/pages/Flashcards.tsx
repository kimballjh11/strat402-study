import { useMemo, useState } from 'react'
import { Cite } from '../components/Cite'
import { allCards, type FlashCard } from '../content/cards'
import { SESSIONS } from '../content/map'
import { isoDay } from '../lib/format'
import { isDue, reviewCard, useP } from '../lib/store'

export function Flashcards() {
  const cardsState = useP((p) => p.cards)
  const [session, setSession] = useState<string>('all')
  const [kind, setKind] = useState<string>('all')
  const [flipped, setFlipped] = useState(false)
  const [i, setI] = useState(0)
  const today = isoDay()
  const deck = useMemo(
    () => allCards().filter((c) => (session === 'all' || c.session === session) && (kind === 'all' || c.kind === kind)),
    [session, kind],
  )
  const due = deck.filter((c) => isDue(cardsState[c.id], today))
  const card: FlashCard | undefined = due[i % Math.max(due.length, 1)]
  const answer = (knew: boolean) => {
    if (!card) return
    reviewCard(card.id, knew)
    setFlipped(false)
    setI((x) => x + (knew ? 0 : 1))
  }
  const boxes = [1, 2, 3, 4, 5].map((b) => deck.filter((c) => (cardsState[c.id]?.box ?? 0) === b).length)
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold">Flashcards</h1>
        <p className="muted text-sm">Leitner boxes: “Knew it” moves a card up a box (reviewed after 0, 1, 2, 4, 8 days); “Didn’t” sends it back to box 1.</p>
      </header>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm">
          Session
          <select value={session} onChange={(e) => (setSession(e.target.value), setI(0))}>
            <option value="all">All sessions</option>
            {SESSIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} · {s.framework.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Card type
          <select value={kind} onChange={(e) => (setKind(e.target.value), setI(0))}>
            <option value="all">Terms, framework parts and case facts</option>
            <option value="Term">Key terms</option>
            <option value="Framework">Framework components</option>
            <option value="Case fact">Case facts</option>
          </select>
        </label>
      </div>
      <p className="text-sm" role="status">
        {due.length} due of {deck.length} · boxes: {boxes.map((b, k) => `B${k + 1} ${b}`).join(' · ')} · new {deck.length - boxes.reduce((a, b) => a + b, 0)}
      </p>
      {card ? (
        <div className="card p-5 space-y-3 min-h-[14rem]" data-testid="flashcard">
          <div className="flex gap-2 text-xs">
            <span className="chip">{card.session}</span>
            <span className="chip">{card.kind}</span>
            <Cite tag={card.src} />
          </div>
          <p className="text-lg font-serif">{card.front}</p>
          {flipped ? (
            <>
              <p className="whitespace-pre-line">{card.back}</p>
              <div className="flex gap-2">
                <button type="button" className="btn btn-primary" onClick={() => answer(true)}>
                  ✓ Knew it
                </button>
                <button type="button" className="btn" onClick={() => answer(false)}>
                  ✗ Didn’t
                </button>
              </div>
            </>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => setFlipped(true)}>
              Show answer
            </button>
          )}
        </div>
      ) : (
        <p className="card p-5">Nothing due in this deck today. Change the filter or come back tomorrow.</p>
      )}
    </div>
  )
}
