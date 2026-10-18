import type { SessionModule } from '../types'

const r = String.raw

export const s05: SessionModule = {
  id: 'S05',
  num: '5',
  title: 'Math & Excel Review',
  spine: 'value',
  minutes: 45,
  ready: true,
  takeaway: r`You need exactly one calculus tool: the **power rule** (\(x^a \to a x^{a-1}\)). It does two jobs. **Optimize:** set the derivative to 0 and solve. **Isolate effects:** a partial derivative holds everything else constant.`,
  why: r`“Do I need to have taken calculus? **You do not.** The math you will actually use: derivatives (calculating one, and reading what it tells you), optimization (finding a maximum or minimum), and marginal thinking.” [[S01 slides p.26]]

Every calculation later in the course is this session in disguise:

- Revenue-maximizing price (S07): \(dR/dP = 0\).
- Marginal cost (S06): \(dC/dQ\).
- Elasticity (S08): uses \(\partial Q/\partial P\).
- Regression coefficients (S09) *are* partial derivatives.
- Profit max (S10): \(MR = MC\).

Learn the recipe once and the rest of the course gets much easier. [[Math Review p.1]]

> Excel skills (scatterplot, axes, trendline, Solver) are covered step by step in the **Excel Lab**. The exam is in the Testing Center, so it's not certain Excel will be available. Learn to do everything by hand, and to *read* Excel output. [[S05 slides p.11]]`,
  intuition: r`A **function** is a machine: put in a price, get out revenue. [[Math Review p.1]]

The **slope** is how steep the machine's graph is: rise over run. A straight line has the same slope everywhere (\(y = 2x + 3\): every step right climbs 2). A curve's slope keeps changing. Climbing \(y = x^2 + 3\) gets steeper the further right you go. [[S05 slides pp.15-18]]

The **derivative** is a slope-finder: a second function that tells you the curve's slope at any point. The slope of the tangent line there. [[S05 slides pp.19-20]]

Why care? At the **top of a hill (max) or bottom of a valley (min), the ground is flat: slope = 0.** So to find the best price or the cheapest quantity, find where the derivative is zero. That's the whole optimization trick. [[Math Review p.7]]

**Partial derivatives** handle machines with several dials (price, rival's price, advertising, income). Turn one dial and hold the others still, and you see that dial's effect alone. [[Math Review p.10]]`,
  los: [
    { id: 'S05-LO1', text: 'Know and understand the following mathematical concepts: function, slope, derivative, power rule, partial derivative', src: 'Canvas Session 5 module; S05 slides p.10' },
    { id: 'S05-LO2', text: 'Know and understand how to use calculus to optimize managerial decisions', src: 'Canvas Session 5 module; S05 slides p.10' },
    { id: 'S05-LO3', text: 'Know and understand how to do the following in Excel: create a scatterplot; adjust the horizontal and vertical axes to fit the range of the data; add a title and label the x- and y-axes; add a trendline to a plot; use Solver to optimize managerial decisions', src: 'Canvas Session 5 module (Watch: Essential Excel Skills); S05 slides p.11' },
  ],
  terms: [
    { id: 's05-t-function', term: 'Function', def: 'A quantitative formula that defines the relationship between a set of inputs and outputs, e.g., R(P) = 100P − 2P².', src: 'Math Review p.1; S05 slides p.13' },
    { id: 's05-t-slope', term: 'Slope', def: r`Rise over run, \(\Delta y/\Delta x\). For \(y = mx + b\), \(m\) is the slope and \(b\) the intercept. Constant for a line; depends on x for a curve.`, src: 'Math Review p.3; S05 slides pp.15-18' },
    { id: 's05-t-deriv', term: 'Derivative', def: r`A function that evaluates the instantaneous rate of change of the original function: the slope (\(dy/dx\)) at any x. For a line it equals the slope; for a curve it is the slope of the tangent line at that point.`, src: 'Math Review p.5; S05 slides pp.19-20' },
    { id: 's05-t-power', term: 'Power rule', def: r`For \(y = x^a\), \(\dfrac{dy}{dx} = a\,x^{a-1}\). Bring the exponent down, subtract 1; constants vanish.`, src: 'Math Review p.5; S05 slides p.27' },
    { id: 's05-t-partial', term: 'Partial derivative', def: r`The derivative of a multivariate function with respect to one variable, holding the others constant; written \(\partial y/\partial x\). Used to isolate the effect of specific variables.`, src: 'Math Review p.10; S05 slides p.43' },
    { id: 's05-t-optimize', term: 'Three-step optimization', def: '1) Find the derivative of the original function. 2) Set the derivative equal to 0. 3) Solve for the variable.', src: 'Math Review p.7; S05 slides p.35' },
    { id: 's05-t-why', term: 'Two reasons to use calculus in business', def: '(1) To optimize common managerial decisions. (2) To isolate the effects of specific variables.', src: 'Math Review p.1; S05 slides p.12' },
  ],
  mathIntro: r`Everything here is from the professor's own 10-page **Math Review**. [[Math Review p.1]]`,
  formulas: [
    { id: 's05-f-line', name: 'Line', latex: r`y = mx + b`, vars: [[r`m`, 'slope (rise over run)'], [r`b`, 'intercept']], words: 'Slope is the coefficient on x.', src: 'S05 slides p.15' },
    { id: 's05-f-power', name: 'Power rule', latex: r`y = x^a \;\Rightarrow\; \frac{dy}{dx} = a\,x^{a-1}`, vars: [[r`a`, 'exponent (any number, including negative or fractional)']], words: 'Bring the exponent down; subtract one from it.', src: 'S05 slides p.27' },
    { id: 's05-f-opt', name: 'Optimization', latex: r`f'(x) = 0 \;\Rightarrow\; x^*`, vars: [[r`f'(x)`, 'the derivative']], words: 'At a maximum or minimum the slope is zero.', src: 'Math Review p.7' },
    { id: 's05-f-partial', name: 'Partial derivative', latex: r`\frac{\partial Q}{\partial P} \text{ (hold all other variables constant)}`, vars: [[r`\partial`, '“partial”: one variable at a time']], words: 'The effect of a one-unit change in one input, all else equal.', src: 'Math Review p.10' },
  ],
  examples: [
    {
      id: 's05-ex-table',
      title: 'Derivative as a slope-finder: y = x² + 3',
      setup: r`Fill in the slope at x = 0, 1, 2, 3. [[Math Review p.6]]`,
      steps: [
        { ask: 'Power rule on x² + 3?', show: r`\(\dfrac{dy}{dx} = 2x^{2-1} = 2x\); the 3 has no x, so it drops out. [[Math Review p.5]]` },
        { ask: 'Slopes at x = 0, 1, 2, 3?', show: 'dy/dx = 0, 2, 4, 6. (y = 3, 4, 7, 12.) The slide table shows 11 at x = 3; that’s a typo, since 3² + 3 = 12. [[S05 slides pp.29-30]]' },
      ],
      takeaway: 'The derivative tells you the slope anywhere without drawing tangent lines.',
      src: 'Math Review pp.5-6',
    },
    {
      id: 's05-ex-practice',
      title: 'Practice from the slides: y = −5x³ + 4x + 1',
      setup: r`Find \(dy/dx\). [[S05 slides p.31]]`,
      steps: [
        { ask: 'Term by term.', show: r`\(3(-5)x^{3-1} + 1(4)x^{1-1} + 0 = -15x^2 + 4\). [[S05 slides p.32]]` },
      ],
      takeaway: 'Constants vanish; x by itself becomes its coefficient.',
      src: 'S05 slides pp.31-32',
    },
    {
      id: 's05-ex-rev',
      title: 'Revenue-maximizing price: R(P) = 100P − 2P²',
      setup: r`Revenue is an upside-down parabola that is zero at P = 0 and P = 50. Where is the top? [[Math Review p.1]]`,
      steps: [
        { ask: 'Step 1: derivative.', show: r`\(\dfrac{dR}{dP} = 100 - 4P\)` },
        { ask: 'Step 2: set to zero.', show: r`\(100 - 4P = 0\)` },
        { ask: 'Step 3: solve.', show: r`\(P^* = 25\); revenue = 100(25) − 2(625) = 1,250. [[Math Review p.8]]` },
      ],
      takeaway: 'Three steps, any function.',
      src: 'Math Review pp.7-8; S05 slides pp.33-37',
    },
    {
      id: 's05-ex-atc',
      title: 'Cost-minimizing quantity: ATC(Q) = 2Q² − 100Q + 1,400',
      setup: r`The graph shows a minimum somewhere between 20 and 30. Find it exactly. [[Math Review p.2]]`,
      steps: [
        { ask: 'Derivative?', show: r`\(\dfrac{dATC}{dQ} = 4Q - 100\)` },
        { ask: 'Set to zero and solve.', show: r`\(4Q - 100 = 0\) → \(Q^* = 25\). [[S05 slides p.40]]` },
      ],
      takeaway: 'Same recipe for a minimum: the valley floor is flat too.',
      src: 'Math Review pp.8-9',
    },
    {
      id: 's05-ex-sundance',
      title: 'Optional practice: Sundance season passes',
      setup: r`\(Q_x = 6{,}000 - 12P_x\). What price maximizes revenue? [[S05 Optional Practice p.2]]`,
      steps: [
        { ask: 'Write revenue as a function of price.', show: r`\(R = P\cdot Q = 6{,}000P - 12P^2\)` },
        { ask: 'Differentiate, set to zero, solve.', show: r`\(6{,}000 - 24P = 0\) → **P = $250**. [[S05 Optional Practice p.4]]` },
      ],
      takeaway: 'When you’re given demand, first build R = P·Q.',
      src: 'S05 Optional Practice pp.2, 4',
    },
    {
      id: 's05-ex-iphone',
      title: 'Isolating effects: the iPhone demand function',
      setup: r`\(Q_{IP} = 1{,}000 - 4P_{IP} + 2P_{SG} + 100A_{IP} + 500I^2\). [[Math Review p.9]]`,
      steps: [
        { ask: 'Partial derivatives with respect to each input?', show: r`\(\partial Q/\partial P_{IP} = -4\), \(\partial Q/\partial P_{SG} = 2\), \(\partial Q/\partial A_{IP} = 100\), \(\partial Q/\partial I = 1{,}000I\). [[S05 slides p.45]]` },
        { ask: 'Apple raises price $1, all else equal?', show: '4 fewer iPhones. [[Math Review p.10]]' },
        { ask: 'Samsung raises the Galaxy price $10?', show: '2 × 10 = **20 more** iPhones (substitute). [[Math Review p.10]]' },
      ],
      takeaway: 'This is exactly what a regression coefficient is (S09).',
      src: 'Math Review pp.9-10',
    },
  ],
  widgets: [
    {
      id: 'tangent-slider',
      title: 'Tangent-line slider',
      intro: 'Slide along the curve. The red tangent line’s slope is the derivative at that point. Find where it goes flat.',
      questions: [],
      numeric: [{ id: 's05-w1', label: 'On R(P) = 100P − 2P², what is the slope at P = 10?', part: { type: 'num', label: 'dR/dP at 10', answer: 60, tol: 0.001 }, hint: '100 − 4(10).', src: 'Math Review p.7' }],
    },
    {
      id: 'power-drill',
      title: 'Endless power-rule drill',
      intro: 'Pick the right derivative. Keys 1–4 answer, Enter for the next one. The wrong answers are the common slips: forgetting to multiply, forgetting to subtract 1, keeping the constant.',
      questions: [],
    },
    {
      id: 'find-max',
      title: 'Find the max (or min)',
      intro: 'Set the derivative to zero and solve. The graph shows whether you landed on the peak or valley. Start with the professor’s R(P) = 100P − 2P², then generate new functions.',
      questions: [],
    },
  ],
  checkIds: ['s05-c-why', 's05-c-deriv', 's05-c-power', 's05-c-steps', 's05-c-partial-def', 's05-c-revmax'],
  applyGenerators: ['s05-derivative', 's05-optimize', 's05-partial', 's05-algebra'],
  traps: [
    { title: 'Forgetting to subtract 1', body: r`\(5x^2 \to 10x\), not \(10x^2\).`, src: 'S05 slides p.27' },
    { title: 'Keeping the constant', body: 'The derivative of a constant is 0: y = x² + 3 → 2x.', src: 'Math Review p.5' },
    { title: 'Expand before differentiating', body: r`\(y = (60 - 5x)x = 60x - 5x^2\) → \(60 - 10x\). [[S05 Optional Practice p.3]]`, src: 'S05 Optional Practice' },
    { title: 'Negative exponents', body: r`\(350x^{-0.5}\) → \(-175x^{-1.5}\): bring −0.5 down and go *down* to −1.5.`, src: 'S05 Optional Practice p.3' },
    { title: 'Setting the function (not the derivative) to zero', body: 'R = 0 at P = 0 and P = 50 (the ends), but the max is where dR/dP = 0 (P = 25).', src: 'Math Review p.1' },
    { title: 'Partials: treating other variables as variables', body: r`In \(\partial/\partial x\) of \(10x - 2x^2 - 2xz\), z is a constant: the answer is \(10 - 4x - 2z\).`, src: 'S05 Optional Practice p.3' },
  ],
  feynman: [
    {
      id: 's05-fey-1',
      prompt: 'Explain to a friend why setting the derivative equal to zero finds the revenue-maximizing price.',
      model: 'The derivative tells you the slope of the revenue curve at each price. When the slope is positive, raising the price still adds revenue. When it’s negative, raising the price loses revenue. At the very top the curve is flat, with slope exactly zero. So the price where the derivative equals zero is the peak: for R = 100P − 2P², that’s 100 − 4P = 0, so P = 25.',
      rubric: ['Derivative = slope', 'Positive slope → keep going; negative → went too far', 'Flat (zero slope) at the top', 'Worked the example'],
    },
    {
      id: 's05-fey-2',
      prompt: 'What does a partial derivative tell a manager, in plain English?',
      model: 'When an outcome like demand depends on several things at once (our price, a rival’s price, advertising, income), a partial derivative tells you how much the outcome changes when you move just one of them and hold the others steady. For the iPhone function, ∂Q/∂P_SG = 2 means each $1 Samsung adds to its price brings Apple 2 more sales, all else equal.',
      rubric: ['Multiple inputs', 'Change one, hold others constant', 'Interpreted the number with units', 'Linked to a business example'],
    },
  ],
  deeper: [
    { title: 'Max or min? The second derivative', kind: 'derivation', body: r`[[GEN]] If \(f''(x) < 0\) at the critical point, it's a maximum (the curve bends down: \(R = 100P - 2P^2\), \(R'' = -4\)). If \(f''(x) > 0\), it's a minimum (\(ATC'' = 4\)). The course just reads it off the shape: \(-P^2\) opens down, \(+Q^2\) opens up.` },
    { title: 'Where calculus shows up later', kind: 'textbook', body: 'MC = dC/dQ (S06). Revenue max dR/dP = 0 (S07). OPE = (∂Q/∂P)(P/Q) (S08). Regression coefficients = partial effects (S09). MR = dR/dQ and MR = MC (S10). Two-part fees, block prices, and peak-load MR = MC (S11).' },
    { title: 'In a case interview', kind: 'case-interview', body: 'You won’t differentiate in a case, but you will reason at the margin: “What does one more store / one more salesperson / a $1 price increase add vs. cost?” That’s the derivative in words. Quick check: if a profit curve is concave, the best point is where the marginal gain hits zero.' },
  ],
  summary: r`**Function:** inputs → outputs. **Slope:** Δy/Δx (constant for lines, varies for curves). **Derivative:** slope at any x (tangent line). [[Math Review pp.1-5]]

- **Power rule:** \(x^a \to a x^{a-1}\); constants → 0 (\(-5x^3 + 4x + 1 \to -15x^2 + 4\)). [[S05 slides pp.27-32]]
- **Optimize in 3 steps:** derivative → set = 0 → solve. \(R = 100P - 2P^2\) → P* = 25. \(ATC = 2Q^2 - 100Q + 1{,}400\) → Q* = 25. Sundance → $250. [[Math Review pp.7-9]]
- **Partial derivative:** one variable, others constant. iPhone: −4 per $1 own price; +2 per $1 Galaxy price (+$10 → +20). [[Math Review p.10]]
- **Two reasons for calculus:** optimize decisions; isolate effects. [[S05 slides p.12]]
- **Excel:** scatterplot, axes, title/labels, trendline, Solver → see the Excel Lab. [[S05 slides p.11]]`,
}
