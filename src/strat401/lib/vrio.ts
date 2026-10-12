/** VRIO as a sequential gate. The first "no" fixes the verdict [VRIO §3, §5]. */
export type YN = 'Y' | 'N' | ''
export type Verdict = 'Competitive disadvantage' | 'Competitive parity' | 'Temporary competitive advantage' | 'Unexploited competitive advantage' | 'Sustained competitive advantage'

/** The brief's table (Barney 1995), also the Canvas S6 flowchart. */
export function verdict(v: YN, r: YN, i: YN, o: YN): Verdict | null {
  if (v === 'N') return 'Competitive disadvantage'
  if (v !== 'Y') return null
  if (r === 'N') return 'Competitive parity'
  if (r !== 'Y') return null
  if (i === 'N') return 'Temporary competitive advantage'
  if (i !== 'Y') return null
  if (o === 'N') return 'Unexploited competitive advantage'
  if (o !== 'Y') return null
  return 'Sustained competitive advantage'
}

/** The S6 slides' older table: failure / parity / competitive advantage / durable competitive advantage / sustained. */
export function slideVerdict(v: YN, r: YN, i: YN, o: YN): string | null {
  if (v === 'N') return 'Competitive failure'
  if (r === 'N') return 'Competitive parity'
  if (i === 'N') return 'Competitive advantage'
  if (o === 'N') return 'Durable competitive advantage'
  if (v === 'Y' && r === 'Y' && i === 'Y' && o === 'Y') return 'Sustained competitive advantage'
  return null
}

/** Which tests are still open (gated by earlier answers). */
export const openTests = (a: YN[]) => {
  const out = [true, false, false, false]
  for (let k = 1; k < 4; k++) out[k] = out[k - 1] && a[k - 1] === 'Y'
  return out
}
