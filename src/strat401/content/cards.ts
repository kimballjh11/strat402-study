import { mapById, SESSIONS } from './map'
import type { SessionId } from './types'

export interface FlashCard { id: string; session: SessionId; kind: 'Term' | 'Framework' | 'Case fact'; front: string; back: string; src: string }

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)

/** Key terms, framework components and case facts from the content map become flashcards automatically. */
export function cardsFor(id: SessionId): FlashCard[] {
  const s = mapById[id]
  return [
    ...s.terms.map((t) => ({ id: `${id}-t-${slug(t.term)}`, session: id, kind: 'Term' as const, front: t.term, back: t.def, src: t.src })),
    ...s.framework.components.map((c) => ({ id: `${id}-f-${slug(c.name)}`, session: id, kind: 'Framework' as const, front: `${s.framework.name}: ${c.name}`, back: c.what, src: c.src })),
    ...s.caseFacts.map((f, i) => ({ id: `${id}-c-${i}`, session: id, kind: 'Case fact' as const, front: `${s.case.name.split(':')[0]} — why does this matter? “${f.fact.slice(0, 140)}${f.fact.length > 140 ? '…' : ''}”`, back: `${f.fact}\n\nWhy it matters: ${f.why}`, src: f.src })),
  ]
}
export const allCards = () => SESSIONS.flatMap((s) => cardsFor(s.id))
