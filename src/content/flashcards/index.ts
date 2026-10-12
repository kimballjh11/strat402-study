import { sessions } from '../index'
import type { SessionId } from '../types'

export interface Flashcard {
  id: string
  session: SessionId
  kind: 'term' | 'formula'
  front: string // Rich
  back: string // Rich
  src: string
  general?: boolean
}

/** Every key term and formula becomes a card automatically; formulas are "recall" cards. */
export const flashcards: Flashcard[] = sessions.flatMap((s) => [
  ...s.terms.map<Flashcard>((t) => ({
    id: `card-${t.id}`,
    session: s.id,
    kind: 'term',
    front: `**${t.term}**`,
    back: `${t.def} [[${t.src}]]`,
    src: t.src,
    general: t.general,
  })),
  ...s.formulas.map<Flashcard>((f) => ({
    id: `card-${f.id}`,
    session: s.id,
    kind: 'formula',
    front: `Write the formula: **${f.name}**`,
    back: String.raw`\[${f.latex}\]` + `\n\n${f.words} [[${f.src}]]`,
    src: f.src,
    general: f.general,
  })),
])
