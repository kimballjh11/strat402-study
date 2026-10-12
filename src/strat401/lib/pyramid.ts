/** Structure checks for a Minto pyramid. Heuristic by design: they flag, the student judges. */
export interface PyramidInput {
  structure: 'deductive' | 'inductive' | 'combined'
  s: string
  c: string
  q: string
  a: string
  supports: { point: string; evidence: string }[]
  sowhat: string
  competing: string
}
export interface Check { id: string; ok: boolean | null; label: string; tip: string }

const STOP = new Set('the a an and or of to in on for with by is are be will should would can could must it its this that as at from we our their they than more less not no into over under has have had because so which who what how'.split(' '))
export const words = (s: string) => (s.toLowerCase().match(/[a-z0-9%$]+/g) ?? []).filter((w) => !STOP.has(w) && w.length > 2)
export function jaccard(a: string, b: string) {
  const A = new Set(words(a)), B = new Set(words(b))
  if (!A.size || !B.size) return 0
  let n = 0
  A.forEach((w) => B.has(w) && n++)
  return n / (A.size + B.size - n)
}
/** Count sentences, ignoring decimals (3.5), abbreviations like U.S. and e.g. */
export function sentenceCount(s: string) {
  const t = s.trim().replace(/\b(?:[A-Z]\.){2,}/g, 'X').replace(/\b(e\.g|i\.e|vs|etc)\./gi, '$1').replace(/(\d)\.(\d)/g, '$1$2')
  if (!t) return 0
  return t.split(/[.!?]+(?:\s+|$)/).filter((x) => x.trim().length > 0).length
}
const VERBS = /\b(should|must|will|would|can|is|are|was|has|have|needs?|requires?|decline|accept|reject|build|enter|stay|expand|cut|keep|hold|move|license|sell|buy|invest|exit|raise|lower|adopt|deepen|defend|focus|abandon|launch|pursue|re-?base|shift|stop|continue|create|use|make|win|beat|grow)\b/i
const VAGUE_Q = /^\s*what should (we|they|[a-z]+) do\??\s*$/i
const TENSION = /\b(but|however|yet|now|fell|fallen|falling|declin|drop|threat|pressure|risk|lost|losing|shrink|slow|squeez|disrupt|activist|entrant|rival|competitor|cannot|can't|no longer|stalled|eroding)/i

export function checkPyramid(p: PyramidInput): Check[] {
  const sup = p.supports.filter((x) => x.point.trim())
  const out: Check[] = []
  const filled = (x: string) => x.trim().length > 0
  out.push({ id: 'scqa', ok: [p.s, p.c, p.q, p.a].every(filled), label: 'All four SCQA parts written', tip: 'Situation, Complication, Question and Answer each need their own passage.' })
  out.push({ id: 'one', ok: filled(p.a) ? sentenceCount(p.a) === 1 : null, label: 'Answer is ONE sentence', tip: 'The Answer must be a single complete, declarative, falsifiable sentence (Minto §2).' })
  out.push({ id: 'decl', ok: filled(p.a) ? !p.a.trim().endsWith('?') && VERBS.test(p.a) && words(p.a).length >= 5 : null, label: 'Answer is a thought, not a topic', tip: '“The pricing decision” is a topic; “Tessera should adopt hybrid usage pricing” is a thought (Minto Asg §6).' })
  out.push({ id: 'because', ok: filled(p.a) ? /\bbecause\b|\bsince\b|\bso that\b/i.test(p.a) : null, label: 'Answer carries its reason (“because…”)', tip: 'The Answer Key’s model answers name the governing reason inside the Answer.' })
  const qMarks = (p.q.match(/\?/g) ?? []).length
  out.push({ id: 'qone', ok: filled(p.q) ? qMarks <= 1 && !/\bif so\b/i.test(p.q) : null, label: 'Question is singular', tip: 'One sharp question. Two-part questions (“…? If so, …?”) split the pyramid (Minto Asg rubric: “sharp and singular”).' })
  out.push({ id: 'qsharp', ok: filled(p.q) ? !VAGUE_Q.test(p.q) : null, label: 'Question is sharp, not “What should we do?”', tip: 'A vague question produces a vague analysis (Minto §2).' })
  out.push({ id: 'tension', ok: filled(p.c) ? TENSION.test(p.c) : null, label: 'Complication creates tension', tip: 'If Situation and Complication could both be true with no problem to solve, it isn’t the real Complication.' })
  out.push({ id: 'answerQ', ok: filled(p.a) && filled(p.q) ? jaccard(p.a, p.q) > 0.08 : null, label: 'Answer responds to the Question', tip: 'The Answer should share the Question’s key terms — it is the hinge of the hourglass.' })
  if (p.structure === 'inductive' || p.structure === 'combined') {
    out.push({ id: 'count', ok: sup.length >= 2 && sup.length <= 5, label: '2–5 supports (3 is typical)', tip: 'Readers hold only a few ideas at once.' })
    let worst = 0
    for (let i = 0; i < sup.length; i++) for (let j = i + 1; j < sup.length; j++) worst = Math.max(worst, jaccard(sup[i].point, sup[j].point))
    out.push({ id: 'me', ok: sup.length >= 2 ? worst < 0.35 : null, label: 'Supports don’t overlap (mutually exclusive)', tip: 'Two supports sharing most of their words are probably one point said twice (“unprofitable / loses money / negative margins”).' })
    out.push({ id: 'sowhat', ok: filled(p.sowhat), label: 'Summarizing “so what” written', tip: 'Name the one kind of claim all supports are (e.g., “forms of value a break-up would destroy”).' })
  }
  if (p.structure === 'deductive' || p.structure === 'combined') {
    const [maj, min, th] = [p.supports[0]?.point ?? '', p.supports[1]?.point ?? '', p.supports[2]?.point ?? '']
    out.push({ id: 'chain', ok: [maj, min, th].every(filled), label: 'Major premise → minor premise → therefore', tip: 'Deduction: a statement about the world, a statement about this situation, and what the two force.' })
    out.push({ id: 'link', ok: filled(min) && filled(maj) ? jaccard(maj, min) > 0.05 : null, label: 'Minor premise comments on the major', tip: 'In deduction the second point comments on the first (S2 slides 10).' })
    out.push({ id: 'therefore', ok: filled(th) && filled(p.a) ? jaccard(th, p.a) > 0.1 : null, label: '“Therefore” restates the Answer', tip: 'If the conclusion of the chain is not your Answer, the argument is broken.' })
  }
  const ev = sup.filter((x) => x.evidence.trim())
  out.push({ id: 'evidence', ok: sup.length ? ev.length === sup.length : null, label: 'Evidence under every support', tip: 'At least one level of concrete support — data, mechanism, precedent — beneath each premise or reason.' })
  out.push({ id: 'numbers', ok: ev.length ? ev.some((x) => /\d/.test(x.evidence)) : null, label: 'Some evidence is a number that tests the claim', tip: 'Figures should test the argument, not decorate it (Minto Asg §6).' })
  out.push({ id: 'compete', ok: filled(p.competing), label: 'Strongest competing answer stated and dismantled', tip: 'Beat the best alternative on its own terms — not a straw man.' })
  return out
}

export const RUBRIC = [
  { id: 'scqa', label: 'SCQA quality', max: 20, look: 'Situation uncontested; Complication creates real tension; Question sharp and singular; Answer one declarative, falsifiable sentence.' },
  { id: 'logic', label: 'Logical validity', max: 20, look: 'Deductive chains follow; inductive groups are genuinely parallel; structure fits the problem.' },
  { id: 'mece', label: 'MECE groupings', max: 15, look: 'No overlaps, no obvious gaps; every item the same logical type.' },
  { id: 'sowhat', label: '“So what” / synthesis', max: 15, look: 'Every group rolls up into the thought above; the Answer is the inevitable summary.' },
  { id: 'evidence', label: 'Evidence', max: 10, look: 'Concrete support beneath each premise; figures test the argument.' },
  { id: 'compete', label: 'Competing answer', max: 10, look: 'Strongest alternative stated fairly and dismantled on its own terms.' },
  { id: 'memo', label: 'Reasoning & writing', max: 10, look: 'You can justify the structural choice; prose is clear and labeled.' },
] as const
