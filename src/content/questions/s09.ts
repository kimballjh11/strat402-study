import type { Mcq } from '../types'

const r = String.raw
const L1 = 'S09-LO1'
const L2 = 'S09-LO2'
const L3 = 'S09-LO3'
const S = 'S09' as const

const airline = `| | Coefficients | Standard Error | t Stat | P-value |
| --- | --- | --- | --- | --- |
| Intercept | 24.179 | 1.188 | 20.345 | 0.000 |
| Income (1,000s of $) | −0.020 | 0.017 | −1.144 | 0.257 |
| # of Fortune 500 Companies | 0.014 | 0.013 | 1.060 | 0.293 |
| # of Departures (1,000s) | 0.052 | 0.009 | 5.784 | 0.000 |
| # of Passengers (100,000s) | −0.027 | 0.005 | −5.762 | 0.000 |
| Pricing Power (HHI) | 0.000 | 0.000 | 0.496 | 0.622 |
| Average Flight Distance (miles) | −0.007 | 0.001 | −9.062 | 0.000 |`
const airlineIntro = r`The WSJ article *The Most Expensive Airports to Fly To*: dependent variable = cost of a flight in cents per mile; 75 airports; Multiple R 0.850, R Square 0.722, Adjusted R Square 0.697, Standard Error 1.480.

${airline}

`
const tv = `| | Coefficients | Standard Error | t Stat | P-value |
| --- | --- | --- | --- | --- |
| Intercept | 1631.47 | 243.97 | 6.69 | 0.0002 |
| Price | −2.60 | 0.53 | −4.89 | 0.0012 |`

export const s09Mcqs: Mcq[] = [
  // ───────── CQ5 Q1–Q5 verbatim ─────────
  {
    id: 's09-cq5-q1', session: S, los: [L3], origin: 'cq', src: 'CQ5 Q1', screen: 'examples',
    stem: airlineIntro + 'All else equal, how would the cost of a flight out of Salt Lake City change if the number of passengers who departed from the airport increased by 100,000?',
    options: [
      { text: 'The cost would increase by 0.027 cents per mile.', why: 'The coefficient on passengers is negative, so cost falls.' },
      { text: 'The cost would increase by 2.7 cents per mile.', why: 'Wrong sign and wrong units (100,000 passengers is ONE unit of this variable).' },
      { text: 'The cost would decrease by 0.027 cents per mile.', why: 'Correct. Passengers are measured in 100,000s, so +100,000 = +1 unit × (−0.027). [[CQ5 Q1]]' },
      { text: 'The cost would decrease by 2.7 cents per mile.', why: 'Right direction, but it multiplies by 100 — 100,000 passengers is one unit, not 100.' },
    ],
    correct: 2,
  },
  {
    id: 's09-cq5-q2', session: S, los: [L1, L3], origin: 'cq', src: 'CQ5 Q2', screen: 'terms',
    stem: airlineIntro + 'How much of the variation in the cost of a flight is explained by the regression model?',
    options: [
      { text: '85.0%', why: 'That is Multiple R (the square root of R²).' },
      { text: '72.2%', why: 'Correct. R Square = 0.722 is the share of the variation in Y explained by the x’s together. [[CQ5 Q2]]' },
      { text: '69.7%', why: 'That is adjusted R², which penalizes the number of variables.' },
      { text: '1.5%', why: 'That is the standard error of the regression (1.480).' },
    ],
    correct: 1,
  },
  {
    id: 's09-cq5-q3', session: S, los: [L1, L3], origin: 'cq', src: 'CQ5 Q3', screen: 'terms',
    stem: airlineIntro + 'Of the economic factors listed below, which would you consider to be a statistically significant predictor of the cost of a flight?',
    options: [
      { text: '# of Departures', why: 'Correct. t = 5.784 (|t| > 2) and p = 0.000 (< 0.05). [[CQ5 Q3]]' },
      { text: '# of Fortune 500 Companies', why: 'p = 0.293 > 0.05 and t = 1.06 < 2: not significant.' },
      { text: 'Pricing Power', why: 'p = 0.622: not significant.' },
      { text: 'All of the above', why: 'Only departures is significant among these.' },
    ],
    correct: 0,
  },
  {
    id: 's09-cq5-q4', session: S, los: [L3], origin: 'cq', src: 'CQ5 Q4', screen: 'examples',
    stem: airlineIntro + 'A flight from Salt Lake City to Phoenix is approximately 500 miles, while a flight from Salt Lake City to Seattle is 700 miles. Assuming all other factors are equal, what would you expect the difference between these two flights to be in terms of cost per mile?',
    options: [
      { text: '1.4 cents per mile', why: 'Correct. 200 extra miles × 0.007 = 1.4 cents per mile (the longer Seattle flight is cheaper per mile). [[CQ5 Q4]]' },
      { text: '3.5 cents per mile', why: 'That is only the Phoenix effect (500 × 0.007).' },
      { text: '4.9 cents per mile', why: 'That is only the Seattle effect (700 × 0.007).' },
      { text: '8.4 cents per mile', why: 'That adds the two effects instead of differencing them.' },
    ],
    correct: 0,
  },
  {
    id: 's09-cq5-q5', session: S, los: [L3], origin: 'cq', src: 'CQ5 Q5', screen: 'examples',
    stem: airlineIntro + 'Salt Lake City International Airport recently expanded the number of gates, increasing the number of departing flights by 17,000 flights per year. Assuming all other factors are equal, how would you expect the cost of a flight to change based on this expansion?',
    options: [
      { text: 'Prices would be expected to increase by 0.88 cents per mile.', why: 'Correct. Departures are in 1,000s → +17 units × 0.052 = +0.884. [[CQ5 Q5]]' },
      { text: 'Prices would be expected to decrease by 0.88 cents per mile.', why: 'The departures coefficient is positive (+0.052).' },
      { text: 'Prices would be expected to increase by 0.46 cents per mile.', why: 'That uses the passengers coefficient (17 × 0.027).' },
      { text: 'Prices would be expected to decrease by 0.46 cents per mile.', why: 'Wrong variable — that is passengers, not departures.' },
    ],
    correct: 0,
  },
  // ───────── Variants ─────────
  {
    id: 's09-v-passengers', session: S, los: [L3], origin: 'cq-variant', src: 'Variant of CQ5 Q1', screen: 'examples',
    stem: 'Same airline regression. If an airport adds 500,000 passengers, all else equal, the cost per mile changes by about…',
    options: [
      { text: '−0.135 cents per mile', why: 'Correct. 500,000 passengers = 5 units (100,000s) × −0.027 = −0.135.' },
      { text: '−13,500 cents per mile', why: 'Multiplied by the raw 500,000 instead of 5 units.' },
      { text: '+0.135 cents per mile', why: 'The coefficient is negative.' },
      { text: '−0.027 cents per mile', why: 'That is for 100,000 passengers (1 unit).' },
    ],
    correct: 0,
  },
  {
    id: 's09-v-r2', session: S, los: [L1], origin: 'cq-variant', src: 'Variant of CQ5 Q2 (S09 workbook Redstone)', screen: 'terms',
    stem: 'Redstone Residential’s regression has Multiple R 0.890, R Square 0.792, Adjusted R Square 0.687. How much of the variation in units rented is explained?',
    options: [
      { text: '79.2%', why: 'Correct — R Square. [[S09 workbook, Solution!B19]]' },
      { text: '89.0%', why: 'That is Multiple R.' },
      { text: '68.7%', why: 'That is adjusted R².' },
      { text: 'Cannot tell without the F-stat', why: 'R² answers it directly.' },
    ],
    correct: 0,
  },
  {
    id: 's09-v-sig', session: S, los: [L1, L3], origin: 'cq-variant', src: 'Variant of CQ5 Q3 (S09 workbook Redstone)', screen: 'terms',
    stem: 'Redstone Residential: Price t = −2.41 (p = 0.053); Advertising t = 0.85 (p = 0.430); Distance t = −4.61 (p = 0.004). Which is significant at the 5% level?',
    options: [
      { text: 'Distance only (price is borderline: |t| > 2 but p = 0.053, significant only at 10%)', why: 'Correct — the solution’s answer; with only 10 observations the |t| > 2 rule of thumb is too generous. [[S09 workbook, Solution!A43]]' },
      { text: 'Price and distance', why: 'Price’s p-value (0.053) is just above 0.05.' },
      { text: 'All three', why: 'Advertising (p = 0.43) is clearly not significant.' },
      { text: 'Advertising only', why: 'Advertising has the weakest evidence.' },
    ],
    correct: 0,
  },
  {
    id: 's09-v-distance', session: S, los: [L3], origin: 'cq-variant', src: 'Variant of CQ5 Q4', screen: 'examples',
    stem: 'Same airline regression. A 1,200-mile flight vs. a 900-mile flight: difference in expected cost per mile?',
    options: [
      { text: '2.1 cents per mile (the 1,200-mile flight is cheaper per mile)', why: 'Correct. 300 miles × 0.007 = 2.1.' },
      { text: '8.4 cents per mile', why: 'That is only 1,200 × 0.007.' },
      { text: '14.7 cents per mile', why: 'That adds both effects.' },
      { text: '2.1 cents per mile (the 1,200-mile flight is more expensive per mile)', why: 'The distance coefficient is negative: longer flights cost less per mile.' },
    ],
    correct: 0,
  },
  {
    id: 's09-v-departures', session: S, los: [L3], origin: 'cq-variant', src: 'Variant of CQ5 Q5', screen: 'examples',
    stem: 'Same airline regression. An airport loses 8,000 departing flights per year. Expected change in cost per mile?',
    options: [
      { text: 'Decrease of about 0.42 cents per mile', why: 'Correct. −8 units (1,000s) × 0.052 = −0.416.' },
      { text: 'Increase of about 0.42 cents per mile', why: 'Departures fell, and the coefficient is positive → cost falls.' },
      { text: 'Decrease of about 416 cents per mile', why: 'Used 8,000 instead of 8 units.' },
      { text: 'Decrease of about 0.22 cents per mile', why: 'That uses the passengers coefficient.' },
    ],
    correct: 0,
  },
  // ───────── Course-sourced conceptual ─────────
  {
    id: 's09-c-ols', session: S, los: [L1], origin: 'course', src: 'S09 slides p.20', screen: 'terms',
    stem: 'What is Ordinary Least Squares (OLS) regression?',
    options: [
      { text: 'The line that minimizes the sum of squared deviations between the line and the actual data points', why: 'Correct. [[S09 slides p.20]]' },
      { text: 'The line through the two most extreme data points', why: 'OLS uses every point.' },
      { text: 'The line that maximizes R² by adding variables', why: 'OLS picks a and b for given variables; it doesn’t choose variables.' },
      { text: 'The line with zero intercept', why: 'OLS estimates the intercept a.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-objective', session: S, los: [L1], origin: 'course', src: 'S09 slides p.20', screen: 'terms',
    stem: 'What is the primary objective in running an OLS regression?',
    options: [
      { text: 'To estimate the parameters that define the true relationship between Y and the X(s)', why: 'Correct. [[S09 slides p.20]]' },
      { text: 'To prove that X causes Y', why: 'Regression estimates relationships; causation needs more (holding other factors constant helps).' },
      { text: 'To make R² equal to 1', why: 'A perfect fit is not the goal.' },
      { text: 'To compute averages of each variable', why: 'That is descriptive statistics.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-coef', session: S, los: [L1, L3], origin: 'course', src: 'S09 slides p.24', screen: 'terms',
    stem: 'How does the professor say to interpret a slope regression coefficient?',
    options: [
      { text: '“A one-unit increase in x leads to a (magnitude of coefficient) increase/decrease (sign of coefficient) in y”', why: 'Correct. [[S09 slides p.24]]' },
      { text: 'As the percentage change in y for a 1% change in x', why: 'That is an elasticity (only true for log-log models).' },
      { text: 'As the probability that x matters', why: 'That is closer to (a misreading of) a p-value.' },
      { text: 'As the share of y explained by x', why: 'That is R².' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-tv-fn', session: S, los: [L3], origin: 'course', src: 'S09 slides pp.22-25', screen: 'examples',
    stem: 'Pittsburgh TV demand output:\n\n' + tv + '\n\nWhat is the estimated demand function?',
    options: [
      { text: r`\(Q_{TV} = 1{,}631.47 - 2.60P_{TV}\)`, why: 'Correct. [[S09 slides p.23]]' },
      { text: r`\(P_{TV} = 1{,}631.47 - 2.60Q_{TV}\)`, why: 'Quantity is the dependent variable (Y), so Q is on the left.' },
      { text: r`\(Q_{TV} = 243.97 - 0.53P_{TV}\)`, why: 'Those are the standard errors.' },
      { text: r`\(Q_{TV} = 6.69 - 4.89P_{TV}\)`, why: 'Those are t-stats.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-tv-interp', session: S, los: [L3], origin: 'course', src: 'S09 slides pp.24-25', screen: 'examples',
    stem: 'For Q = 1,631.47 − 2.60P (Pittsburgh TVs), interpret −2.60.',
    options: [
      { text: 'A $1 increase in price leads to a 2.60-TV decrease in quantity demanded', why: 'Correct — one unit of x (a dollar), magnitude 2.60, sign negative.' },
      { text: 'A 1% increase in price leads to a 2.60% decrease in quantity', why: 'That is an elasticity interpretation; the coefficient is in units, not %.' },
      { text: 'Price explains 2.60% of quantity', why: 'That is not what coefficients measure.' },
      { text: 'Each additional TV lowers price by $2.60', why: 'Q is the dependent variable; the coefficient is ∂Q/∂P.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-forecast', session: S, los: [L3], origin: 'course', src: 'S09 slides p.23', screen: 'examples',
    stem: 'Using Q = 1,631.47 − 2.60P, forecast TVs demanded at a price of $500.',
    options: [
      { text: '331.47', why: 'Correct. 1,631.47 − 2.60(500) = 1,631.47 − 1,300 = 331.47.' },
      { text: '1,300', why: 'That is only the price term.' },
      { text: '2,931.47', why: 'Added instead of subtracting the price effect.' },
      { text: '−1,298', why: 'Sign/arithmetic slip.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-se', session: S, los: [L1], origin: 'course', src: 'S09 slides p.26', screen: 'terms',
    stem: 'What does a smaller standard error on a coefficient tell you?',
    options: [
      { text: 'The estimate is more precise (less noisy)', why: 'Correct. The standard error is the standard deviation of the parameter estimate. [[S09 slides p.26]]' },
      { text: 'The coefficient is smaller', why: 'Size of coefficient and its precision are different things.' },
      { text: 'The model explains more variation', why: 'That is R².' },
      { text: 'The variable is unimportant', why: 'Small SE usually makes a variable *more* likely to be significant.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-t', session: S, los: [L1], origin: 'course', src: 'S09 slides p.29', screen: 'terms',
    stem: 'A t-statistic is…',
    options: [
      { text: 'the coefficient divided by its standard error; |t| > 2 generally means statistically significant', why: 'Correct. TV price: −2.60/0.53 ≈ −4.89. [[S09 slides p.29]]' },
      { text: 'the standard error divided by the coefficient', why: 'Upside down.' },
      { text: 'R² times the number of observations', why: 'No.' },
      { text: 'the probability the coefficient is zero', why: 'That describes the p-value (in the professor’s wording).' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-p', session: S, los: [L1], origin: 'course', src: 'S09 slides p.31', screen: 'terms',
    stem: 'By convention, a regression coefficient is considered statistically significant when…',
    options: [
      { text: 'its p-value is less than 0.05', why: 'Correct. [[S09 slides p.31]]' },
      { text: 'its p-value is greater than 0.95', why: 'Small p-values indicate significance.' },
      { text: 'its coefficient is larger than 1', why: 'Magnitude depends on units, not significance.' },
      { text: 'R² is above 0.5', why: 'R² is about overall fit, not each coefficient.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-r2def', session: S, los: [L1], origin: 'course', src: 'S09 slides p.33', screen: 'terms',
    stem: 'R-squared (the coefficient of determination) is…',
    options: [
      { text: 'explained variation ÷ total variation, from 0 (poor fit) to 1 (perfect fit)', why: 'Correct. TVs: 301,470.89 / 402,222.50 ≈ 0.75. [[S09 slides p.33]]' },
      { text: 'the slope of the regression line', why: 'That is the coefficient.' },
      { text: 'always 1 minus the p-value', why: 'No relationship like that.' },
      { text: 'the correlation between two x variables', why: 'No.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-why', session: S, los: [L3], origin: 'course', src: 'S09 slides p.9', screen: 'why',
    stem: 'Why does the professor bring back the airline table (Cincinnati most expensive, LA cheapest)?',
    options: [
      { text: 'To ask how you isolate the effect of one variable when the outcome is influenced by many factors — the job of multiple regression', why: 'Correct. [[S09 slides p.9]]' },
      { text: 'To compute HHI for each airport', why: 'HHI is one column, but the question is about isolating effects.' },
      { text: 'To show that income alone explains fares', why: 'In the regression, income isn’t even significant (CQ5).' },
      { text: 'To estimate a demand curve for flights', why: 'The dependent variable is cost per mile, not quantity.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-netflix', session: S, los: [L3], origin: 'course', src: 'S09 slides pp.12-14', screen: 'examples',
    stem: 'Netflix Revisited: raw data imply about −855K subscribers per $1, but after removing growth and season the effect is about −596K per $1. Why the difference?',
    options: [
      { text: 'The raw slope mixes the price effect with growth over time and seasonality; regression isolates the price effect', why: 'Correct — “the gap is the price effect: ~596K fewer subscribers per $1.” [[S09 slides pp.12-13]]' },
      { text: 'Subscribers were measured in different units', why: 'Same units.' },
      { text: 'The regression made an arithmetic error', why: 'The point is that controls change the estimate.' },
      { text: 'Price changes have no effect after controls', why: '−596K per $1 is a large effect.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-waterfall', session: S, los: [L3], origin: 'course', src: 'S09 slides p.14', screen: 'examples',
    stem: 'The professor’s waterfall: 9.3M starting level + 13.9M growth + 3.7M season − 3.6M price ($10 → $16) = 23.4M predicted vs. 21.7M actual (2011 Q4). Where does −3.6M come from?',
    options: [
      { text: '6 × 596K: the $6 price increase times the per-dollar price effect', why: 'Correct. [[S09 slides p.14]]' },
      { text: 'The 800K reported loss × 4.5', why: 'Not how it was built.' },
      { text: '60% × 6M', why: 'No.' },
      { text: 'Seasonality', why: 'Season is the +3.7M bar.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-redstone-rent', session: S, los: [L3], origin: 'course', src: 'S09 workbook, Solution!A49', screen: 'examples',
    stem: 'Redstone: Q = 135.15 − 0.14P + 0.54A − 5.78D. If RR raises rent at one complex by $100, holding advertising and distance constant, units rented…',
    options: [
      { text: 'fall by about 14', why: 'Correct. −0.143 × 100 = −14.3. [[S09 workbook, Solution!A49]]' },
      { text: 'fall by about 0.14', why: 'That is for a $1 increase.' },
      { text: 'fall by about 578', why: 'Wrong coefficient (distance) and scale.' },
      { text: 'rise by about 14', why: 'The rent coefficient is negative.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-redstone-rev', session: S, los: [L3], origin: 'course', src: 'S09 workbook, Solution!A57', screen: 'examples',
    stem: 'At an average complex (P = $420, Q = 53.1), Redstone’s OPE = −0.143 × 420/53.1 = −1.13. If RR raises rents at an average complex, total revenue…',
    options: [
      { text: 'falls, because demand is elastic', why: 'Correct. OPE < −1 → elastic → fewer units AND lower revenue. [[S09 workbook, Solution!A57]]' },
      { text: 'rises, because demand is elastic', why: 'Elastic demand means price increases lower revenue.' },
      { text: 'rises, because demand is inelastic', why: '−1.13 is elastic.' },
      { text: 'is unchanged', why: 'Only at OPE = −1.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-excel', session: S, los: [L2], origin: 'course', src: 'S08 module: Regression in Excel Demonstration; S09 workbook', screen: 'deeper',
    stem: 'In Excel, how do you produce the SUMMARY OUTPUT table used in class?',
    options: [
      { text: 'Data → Data Analysis (Analysis ToolPak) → Regression, with Y range and X range selected', why: 'Correct — see the Excel Lab for Windows/Mac steps.' },
      { text: 'Insert → Chart → Trendline only', why: 'A trendline gives the equation and R² for one X, not the full output table.' },
      { text: '=AVERAGE() on each column', why: 'That gives means, not a regression.' },
      { text: 'Solver with no constraints', why: 'Solver optimizes; the ToolPak runs regressions.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-dynamic', session: S, los: [L3], origin: 'course', src: 'S09 slides p.4', screen: 'deeper',
    stem: '“Demand curves are dynamic”: Redbox’s 2014 demand sits to the left of its 2011 demand. What explains the shift?',
    options: [
      { text: 'Better substitutes (streaming) reduced demand at every price — a shift, not a movement along the curve', why: 'Correct. A non-price factor changed (S07: price of/availability of substitutes). [[S09 slides p.4]]' },
      { text: 'Redbox raised its price, moving along the curve', why: 'A price change moves you along a curve; it doesn’t move the whole curve.' },
      { text: 'Rentals per kiosk are measured differently', why: 'Same measure both years.' },
      { text: 'Income fell sharply between 2011 and 2014', why: 'Not the professor’s story.' },
    ],
    correct: 0,
  },
  {
    id: 's09-c-provo', session: S, los: [L3], origin: 'course', src: 'S10 slides pp.10-11', screen: 'deeper',
    stem: 'Provo Peaks Root Beer: Income coefficient 7.804 (income in $000/capita; Y = cases). Interpret.',
    options: [
      { text: 'A $1,000 increase in per-capita income raises cases sold by about 7.8 → root beer is a normal good', why: 'Correct — one unit = $1,000; positive sign = normal good. [[S10 slides p.11]]' },
      { text: 'A $1 increase in income raises cases by 7.8', why: 'Income is in $000s.' },
      { text: 'Root beer is inferior', why: 'Positive coefficient → normal.' },
      { text: 'Income explains 7.8% of sales', why: 'That’s not what a coefficient means (R² = 12.2% for the whole model).' },
    ],
    correct: 0,
  },
]
