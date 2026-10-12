import type { Mcq } from '../types'

const r = String.raw
const L1 = 'S05-LO1'
const L2 = 'S05-LO2'
const L3 = 'S05-LO3'
const S = 'S05' as const

export const s05Mcqs: Mcq[] = [
  {
    id: 's05-c-why', session: S, los: [L2], origin: 'course', src: 'Math Review p.1; S05 slides p.12', screen: 'why',
    stem: 'According to the professor, what are the two primary reasons we use calculus in business?',
    options: [
      { text: 'To optimize common managerial decisions and to isolate the effects of specific variables', why: 'Correct. [[S05 slides p.12]]' },
      { text: 'To compute averages and to draw charts', why: 'Not the two reasons.' },
      { text: 'To forecast stock prices and interest rates', why: 'Not the course’s reasons.' },
      { text: 'To compute HHI and C4', why: 'Those are sums, no calculus needed.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-function', session: S, los: [L1], origin: 'course', src: 'Math Review p.1', screen: 'terms',
    stem: 'A function is…',
    options: [
      { text: 'a quantitative formula that defines the relationship between a set of inputs and outputs', why: 'Correct. [[Math Review p.1]]' },
      { text: 'any graph with a straight line', why: 'Functions can be curves.' },
      { text: 'the slope of a line', why: 'Slope is a property of a function.' },
      { text: 'an Excel formula only', why: 'Excel formulas implement functions, but the concept is broader.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-slope', session: S, los: [L1], origin: 'course', src: 'S05 slides pp.15-17', screen: 'terms',
    stem: r`For \(y = 2x + 3\), what is the slope and what does it mean?`,
    options: [
      { text: 'm = 2: for every one-unit increase in x, y increases by 2, everywhere on the line', why: 'Correct — rise over run = 2/1; constant along a straight line. [[S05 slides p.17]]' },
      { text: 'm = 3', why: '3 is the intercept b.' },
      { text: 'm = 5', why: 'No.' },
      { text: 'It depends on x', why: 'Only for curves; a line has constant slope.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-slope-curve', session: S, los: [L1], origin: 'course', src: 'S05 slides p.18', screen: 'terms',
    stem: r`What is the slope of \(y = x^2 + 3\)?`,
    options: [
      { text: 'It depends on which point you are at (the value of x)', why: 'Correct — the slope of a curve changes; the derivative 2x gives it at any x. [[S05 slides p.18]]' },
      { text: '2', why: 'That is the slope only at x = 1.' },
      { text: '3', why: 'That is the y-intercept.' },
      { text: '0', why: 'Only at x = 0.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-deriv', session: S, los: [L1], origin: 'course', src: 'S05 slides pp.19-20; Math Review p.5', screen: 'terms',
    stem: 'The derivative is…',
    options: [
      { text: 'a function that gives the instantaneous rate of change (the slope of the tangent line) of the original function at any x', why: 'Correct. [[S05 slides p.19]]' },
      { text: 'the area under a curve', why: 'That is an integral (used for consumer surplus), not a derivative.' },
      { text: 'the average of a function', why: 'No.' },
      { text: 'the y-intercept', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-line-deriv', session: S, los: [L1], origin: 'course', src: 'S05 slides p.20', screen: 'terms',
    stem: 'When the original function is a straight line, the derivative…',
    options: [
      { text: 'equals the slope everywhere (a constant)', why: 'Correct. [[S05 slides p.20]]' },
      { text: 'is zero everywhere', why: 'Only for a horizontal line (y = 3).' },
      { text: 'changes with x', why: 'Only for curves.' },
      { text: 'does not exist', why: 'It exists and equals the slope.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-power', session: S, los: [L1], origin: 'course', src: 'S05 slides p.27', screen: 'math',
    stem: r`The power rule says that for \(y = x^a\), \(\dfrac{dy}{dx} =\)…`,
    options: [
      { text: r`\(a\,x^{a-1}\)`, why: 'Correct. Bring the exponent down; subtract 1. [[S05 slides p.27]]' },
      { text: r`\(x^{a+1}/(a+1)\)`, why: 'That is integration.' },
      { text: r`\(a\,x^{a}\)`, why: 'Forgot to subtract 1 from the exponent.' },
      { text: r`\((a-1)x^{a}\)`, why: 'Wrong placement.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-practice-deriv', session: S, los: [L1], origin: 'course', src: 'S05 slides pp.31-32', screen: 'math',
    stem: r`What is the derivative of \(y = -5x^3 + 4x + 1\)?`,
    options: [
      { text: r`\(-15x^2 + 4\)`, why: 'Correct. [[S05 slides p.32]]' },
      { text: r`\(-15x^2 + 4x + 1\)`, why: 'Must differentiate every term; the constant drops.' },
      { text: r`\(-5x^2 + 4\)`, why: 'Forgot to multiply by the exponent 3.' },
      { text: r`\(-15x^3 + 4\)`, why: 'Forgot to reduce the exponent.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-pp-1', session: S, los: [L1], origin: 'course', src: 'S05 Optional Practice pp.1, 3', screen: 'math',
    stem: r`Find \(dy/dx\) for \(y = (60 - 5x)x\).`,
    options: [
      { text: r`\(60 - 10x\)`, why: r`Correct. Expand: \(60x - 5x^2\) → \(60 - 10x\). [[S05 Optional Practice p.3]]` },
      { text: r`\(-5\)`, why: 'Must multiply out first.' },
      { text: r`\(60 - 5x\)`, why: 'That is the original bracket.' },
      { text: r`\(60x - 10x^2\)`, why: 'Not differentiated.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-pp-2', session: S, los: [L1], origin: 'course', src: 'S05 Optional Practice pp.1, 3', screen: 'math',
    stem: r`Find \(dy/dx\) for \(y = 350x^{-0.5}\).`,
    options: [
      { text: r`\(-175x^{-1.5}\)`, why: 'Correct. Bring −0.5 down; −0.5 − 1 = −1.5. [[S05 Optional Practice p.3]]' },
      { text: r`\(-175x^{-0.5}\)`, why: 'Forgot to subtract 1 from the exponent.' },
      { text: r`\(175x^{0.5}\)`, why: 'Sign and exponent errors.' },
      { text: r`\(350x^{-1.5}\)`, why: 'Forgot to multiply by −0.5.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-pp-3', session: S, los: [L1], origin: 'course', src: 'S05 Optional Practice pp.1, 3', screen: 'math',
    stem: r`Find \(\partial y/\partial x\) for \(y = 10x - 2x^2 - 2xz\).`,
    options: [
      { text: r`\(10 - 4x - 2z\)`, why: 'Correct — treat z as a constant. [[S05 Optional Practice p.3]]' },
      { text: r`\(10 - 4x\)`, why: 'The −2xz term contains x; its partial is −2z.' },
      { text: r`\(-2x\)`, why: 'That is ∂y/∂z.' },
      { text: r`\(10 - 2x - 2z\)`, why: 'Derivative of −2x² is −4x.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-pp-4', session: S, los: [L1], origin: 'course', src: 'S05 Optional Practice pp.1, 3', screen: 'math',
    stem: r`Find \(\partial y/\partial x\) for \(y = 5{,}000 - 2z + 5x^2\).`,
    options: [
      { text: r`\(10x\)`, why: 'Correct. [[S05 Optional Practice p.3]]' },
      { text: r`\(-2\)`, why: 'That is ∂y/∂z.' },
      { text: r`\(10x - 2\)`, why: 'The z term is a constant with respect to x.' },
      { text: r`\(5x\)`, why: 'Forgot the exponent 2.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-steps', session: S, los: [L2], origin: 'course', src: 'Math Review p.7; S05 slides p.35', screen: 'math',
    stem: 'What are the three steps to solve any optimization problem in this course?',
    options: [
      { text: '1) Find the derivative of the original function, 2) set it equal to 0, 3) solve for the variable', why: 'Correct. [[S05 slides p.35]]' },
      { text: '1) Graph it, 2) guess, 3) check', why: 'That is trial-and-error, the slow method the professor contrasts with calculus.' },
      { text: '1) Integrate, 2) set equal to 1, 3) solve', why: 'No.' },
      { text: '1) Set the function equal to 0, 2) solve, 3) differentiate', why: 'Setting the function (not its derivative) to zero finds roots, not the optimum.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-whyzero', session: S, los: [L2], origin: 'course', src: 'Math Review p.7', screen: 'intuition',
    stem: 'Why do we set the derivative equal to zero to find a maximum or minimum?',
    options: [
      { text: 'Because the slope (instantaneous rate of change) of a function is zero at its maximum or minimum', why: 'Correct — the top of the revenue hill is flat. [[Math Review p.7]]' },
      { text: 'Because revenue is zero at the optimum', why: 'Revenue is at its peak, not zero.' },
      { text: 'Because the function crosses the x-axis there', why: 'That finds roots (e.g., P = 0 and P = 50), not the peak.' },
      { text: 'It’s a convention with no reason', why: 'There is a reason: flat slope at the top/bottom.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-revmax', session: S, los: [L2], origin: 'course', src: 'Math Review pp.7-8; S05 slides p.36', screen: 'examples',
    stem: r`If \(R(P) = 100P - 2P^2\), the revenue-maximizing price is…`,
    options: [
      { text: '$25', why: r`Correct. \(dR/dP = 100 - 4P = 0\) → \(P^* = 25\). [[S05 slides p.36]]` },
      { text: '$50', why: 'That is where revenue falls back to zero.' },
      { text: '$100', why: 'Not a stationary point.' },
      { text: '$12.50', why: 'Divided by 8.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-costmin', session: S, los: [L2], origin: 'course', src: 'Math Review pp.8-9; S05 slides p.40', screen: 'examples',
    stem: r`If \(ATC(Q) = 2Q^2 - 100Q + 1{,}400\), the cost-minimizing quantity is…`,
    options: [
      { text: '25', why: r`Correct. \(4Q - 100 = 0\) → \(Q^* = 25\). [[S05 slides p.40]]` },
      { text: '50', why: 'Forgot the 2 from differentiating Q².' },
      { text: '1,400', why: 'That is the intercept.' },
      { text: '20', why: 'The slide graph shows the minimum between 20 and 30; calculus gives exactly 25.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-sundance', session: S, los: [L2], origin: 'course', src: 'S05 Optional Practice pp.2, 4', screen: 'examples',
    stem: r`Sundance season passes: \(Q_x = 6{,}000 - 12P_x\). Revenue-maximizing price?`,
    options: [
      { text: '$250', why: r`Correct. \(R = 6{,}000P - 12P^2\) → \(6{,}000 - 24P = 0\). [[S05 Optional Practice p.4]]` },
      { text: '$500', why: 'That is the choke price.' },
      { text: '$3,000', why: 'That is quantity at $250.' },
      { text: '$125', why: 'Arithmetic slip.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-partial-def', session: S, los: [L1], origin: 'course', src: 'S05 slides p.43; Math Review p.10', screen: 'terms',
    stem: 'A partial derivative of a multivariate function is…',
    options: [
      { text: 'its derivative with respect to one variable, holding the others constant', why: 'Correct — it isolates the effect of one variable. [[S05 slides p.43]]' },
      { text: 'the derivative with respect to all variables at once', why: 'One at a time.' },
      { text: 'half of a regular derivative', why: 'No.' },
      { text: 'only defined for straight lines', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-iphone', session: S, los: [L1, L2], origin: 'course', src: 'Math Review p.10; S05 slides p.45', screen: 'examples',
    stem: r`\(Q_{IP} = 1{,}000 - 4P_{IP} + 2P_{SG} + 100A_{IP} + 500I^2\). Samsung raises the Galaxy price by $10, all else constant. iPhone demand changes by…`,
    options: [
      { text: '+20 units', why: r`Correct. \(\partial Q/\partial P_{SG} = 2\) → 2 × 10 = 20. [[Math Review p.10]]` },
      { text: '−40 units', why: 'That uses the iPhone’s own-price coefficient (−4).' },
      { text: '+2 units', why: 'That is per $1; the change is $10.' },
      { text: '+1,000 units', why: 'That is ∂Q/∂I evaluated at I = 1.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-iphone-own', session: S, los: [L1], origin: 'course', src: 'Math Review p.10', screen: 'examples',
    stem: r`Same iPhone function. Interpret \(\partial Q_{IP}/\partial P_{IP} = -4\).`,
    options: [
      { text: 'Every $1 increase in the iPhone’s price lowers quantity demanded by 4 units, holding everything else constant', why: 'Correct. [[Math Review p.10]]' },
      { text: 'Every 1% price increase lowers demand 4%', why: 'That would be an elasticity of −4.' },
      { text: 'Demand is 4 units at any price', why: 'No.' },
      { text: 'Advertising lowers demand by 4', why: 'Advertising’s coefficient is +100.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-income-partial', session: S, los: [L1], origin: 'course', src: 'S05 slides p.45', screen: 'math',
    stem: r`For \(Q = 1{,}000 - 4P + 2P_{SG} + 100A + 500I^2\), what is \(\partial Q/\partial I\)?`,
    options: [
      { text: r`\(1{,}000I\)`, why: 'Correct — power rule on 500I². [[S05 slides p.45]]' },
      { text: '500', why: 'Forgot the exponent.' },
      { text: r`\(500I\)`, why: 'Forgot to multiply by 2.' },
      { text: '0', why: 'Income appears in the function.' },
    ],
    correct: 0,
  },
  {
    id: 's05-c-calcvs', session: S, los: [L2], origin: 'course', src: 'Math Review p.7', screen: 'intuition',
    stem: 'Besides calculus, what two other ways does the Math Review mention for finding a revenue-maximizing price — and why is calculus better?',
    options: [
      { text: 'Trial-and-error plugging in prices, or graphing and eyeballing; calculus gets the precise answer in three steps even for complex functions', why: 'Correct. [[Math Review p.7]]' },
      { text: 'Regression and Solver; calculus is free', why: 'Not the comparison in the reading (though Solver is the Excel version).' },
      { text: 'Asking customers and asking competitors', why: 'Those are demand estimation, not optimization.' },
      { text: 'There are no other ways', why: 'The reading lists two.' },
    ],
    correct: 0,
  },
  {
    id: 's05-x-scatter', session: S, los: [L3], origin: 'course', src: 'S05 slides p.11; Essential Excel Skills workbook', screen: 'deeper',
    stem: 'Which Excel skills does the S05 learning objective list?',
    options: [
      { text: 'Create a scatterplot; adjust axes to fit the data; add a title and axis labels; add a trendline; use Solver to optimize decisions', why: 'Correct. [[S05 slides p.11]]' },
      { text: 'Pivot tables and VLOOKUP only', why: 'Not the listed skills.' },
      { text: 'Macros and VBA', why: 'No.' },
      { text: 'Conditional formatting', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's05-x-trendline', session: S, los: [L3], origin: 'course', src: 'S06 workbook step 1 hint; S05 slides p.13', screen: 'deeper',
    stem: 'In the Guest-Tek and Cost Advantage spreadsheets, what kind of Excel trendline does the professor suggest for cost curves?',
    options: [
      { text: 'A power function (other functions may lead you astray in this cost range)', why: 'Correct. [[S06 workbook, Solution!B12]]' },
      { text: 'A moving average', why: 'Not for cost curves.' },
      { text: 'Linear only', why: 'The hint specifically says power.' },
      { text: 'No trendline — just read the points', why: 'You need the fitted equation for later steps.' },
    ],
    correct: 0,
  },
  {
    id: 's05-x-solver', session: S, los: [L3], origin: 'course', src: 'S06 workbook, Solution!B70-D76; your Differentiation Advantage, Part 1 step 7', screen: 'deeper',
    stem: 'Guest-Tek: “how many rooms are needed for $0.15 CPRPD?” The solution solves it with both Solver and algebra. What does Solver do here?',
    options: [
      { text: 'Changes the rooms cell until the scale-curve formula equals $0.15 (or, in other uses, maximizes revenue by changing price)', why: 'Correct — Solver finds the input that hits a target or optimizes an objective. [[S06 workbook, Solution!C75]]' },
      { text: 'Runs a regression', why: 'That is the Analysis ToolPak.' },
      { text: 'Draws the scatterplot', why: 'That is Insert → Chart.' },
      { text: 'Checks spelling', why: 'No.' },
    ],
    correct: 0,
  },
]
