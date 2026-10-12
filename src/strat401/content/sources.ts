/** Where every source tag points in Kimball's STRAT 401 materials. */
const DOCS: [RegExp, string][] = [
  [/^Porter/, "Porter's Generic Strategy Framework (white paper) — Canvas › Session 1 › Read"],
  [/^Southwest/, 'Southwest Airlines: Fixing the Revenue Problem (case) — Canvas › Session 1 › Prepare'],
  [/^Minto Key/, 'Minto Answer Key (grader key, posted for students) — Canvas › Session 2'],
  [/^Minto Asg/, 'Minto Framework Assignment §4–6 (scenarios, rubric, common pitfalls) — Canvas › Session 2'],
  [/^Minto/, "Strategic Reasoning with Barbara Minto's Pyramid Principle (reading) — Canvas › Session 2 › Read"],
  [/^PEST/, 'The PEST Framework: Risk in the Environment (white paper v2) — Canvas › Session 3 › Read'],
  [/^Botswana/, 'Botswana: Building the Foundations of a Diamond Economy (case) — Canvas › Session 3 › Prepare'],
  [/^5F/, 'Where the Profit Goes (Five Forces Brief) — Canvas › Session 4 › Read'],
  [/^Cola/, 'The US Carbonated Drink Wars in 2026 (Cola Wars case) — Canvas › Session 4 › Prepare'],
  [/^HHI/, 'Measuring Market Concentration (HHI C4 Brief) — Canvas › Session 5 › Read'],
  [/^Cracking/, 'Cracking Well-Guarded Markets, Redux — Canvas › Session 5 › Prepare'],
  [/^VRIO Asg/, 'VRIO Assignment: Diagnosing a Firm’s Competitive Position — Canvas › Session 6'],
  [/^VRIO/, 'The Resource-Based View: VRIO or VRIN (brief) — Canvas › Session 6 › Read'],
  [/^VC/, 'The Value Chain (brief) — Canvas › Session 7 › Read'],
  [/^Aldi/, 'Aldi: Focused Discounter or Broad Cost Leader? (case) — Canvas › Session 7 › Prepare'],
  [/^Scale/, 'Economies of Scale: scale, learning, and experience (brief) — Canvas › Session 8 › Read'],
  [/^Netflix/, 'Netflix: Riding the Scale Curve (case) — Canvas › Session 8 › Prepare'],
  [/^Diff/, 'Differentiation (brief) — Canvas › Session 9 › Read'],
  [/^Chipotle/, 'Chipotle: Out-Cooking the Competition (case) — Canvas › Session 9 › Prepare'],
  [/^More/, 'A More Company: Valuation or Value Creation (case) — Canvas › Session 10 › Prepare'],
  [/^Costco/, "Costco vs Sam's Club (case) — Canvas › Session 11 › Prepare"],
  [/^Canvas/, 'Canvas module page (Key Question and instructions)'],
  [/^my-work/, 'Your own submitted work — used only to spot weak spots, never as a model answer'],
  [/^Site/, 'This site’s own construction or application of the course frameworks (not a quote from the materials)'],
]

const DECK: Record<string, string> = {
  S1: 'Session 1 Generic Business Strategies.pptx',
  S2: 'Session 2 Structured Problem Solving.pptx',
  S3: 'Session 3 Industry Analysis I PEST.pptx',
  S6: 'Session 6 RBV.pptx',
  S7: 'Session 7 Cost Advantage I.pptx (“Structural Cost Advantage”)',
  S8: 'Session 8 Cost Advantage II.pptx (“Cost Advantage”)',
  S9: 'Session 9 Differentiation I.pptx',
}

export function describeSource(tag: string): string {
  const t = tag.trim()
  const m = t.match(/^(S\d+) slides? ([\d\-–, +a-z]+)/i)
  if (m) return `Slides: ${DECK[m[1].toUpperCase()] ?? m[1] + ' deck'} — slide ${m[2]}${/notes/i.test(t) ? ' (speaker notes)' : ''}`
  for (const [re, d] of DOCS) if (re.test(t)) return d + (/Ex\.\d|Fig\.\d|§|App\./.test(t) ? ` — ${t.replace(/^\S+\s?/, '')}` : '')
  return 'STRAT 401 course materials'
}
