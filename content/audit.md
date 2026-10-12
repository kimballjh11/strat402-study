# Fidelity audit

**Method.** I wasn’t allowed subagents, so the audit runs as a separate, reproducible pass (`tests/unit/audit.test.ts`).

1. Collect every claim on the site that carries a citation to a source the site can read (slide page text, workbook dumps, quiz pages, Math Review, practice problems, HSIA case).
2. Pick 40 at random with a fixed seed (402).
3. Extract every number in each claim and check it against the text of the exact page or cell range cited.
4. Review every flagged claim by hand, including the rasterized slide images, since many numbers exist only in charts.

**Population:** 247 citable numeric claims. **Sample:** 40.

**Results.** 23 verified automatically. 17 flagged: none were factual errors. One real cross-source discrepancy (HSIA case vs. workbook) was already handled, and four citations were tightened.

| # | Source cited | Claim (excerpt) | Auto check | Verdict |
| --- | --- | --- | --- | --- |
| 1 | S01 slides p.33 | …Correct. STRAT 401 gives conceptual foundations; 402 adds analytical underpinnings and quantitative rigor. | ✔ found | ✅ Numbers found in the cited source. |
| 2 | S08 slides p.25 | …\(OPE = -3{,}728\times\dfrac{1}{5{,}117} = -0.73\) → inelastic. | ✔ found | ✅ Numbers found in the cited source. |
| 3 | CQ4 Q1-Q2 | …- Signs: +Py substitute, −Py complement; +I normal, −I inferior (CQ4: +5 → substitute; −0.2 → inferior). | ✔ found | ✅ Numbers found in the cited source. |
| 4 | S09 slides p.16 | …Ten observations of quantity and price (e.g., 180 TVs at $475; 720 at $375). Run Q on P. | ✔ found | ✅ Numbers found in the cited source. |
| 5 | S04 slides pp.26-28 | …ffers enormously by industry: Internet software earned 33% ROIC in 2015–2024 while technology hardware lost 9%. The Five Forces explain why. | ✔ found | ✅ Numbers found in the cited source. |
| 6 | S07 slides p.28 | …\(Q = -3{,}728P + 8{,}845\). | ✔ found | ✅ Numbers found in the cited source. |
| 7 | S07 slides p.27 | …Rentals per kiosk: 2011-1/2/3 at $1.00 → 5,169, 5,012, 5,172; 2012-2/3/4 at $1.20 → 4,655, 4,160, 4,301. Fit a line. | ✔ found | ✅ Numbers found in the cited source. |
| 8 | S09 slides p.24 | …A $1 increase in price leads to a 2.60-TV decrease in quantity demanded. | missing: 2.60 | ✅ Verified. 2.60 is on S09 p.25 (output table); p.24 has the interpretation phrasing. **Fixed:** cite → pp.24-25. |
| 9 | S05 slides p.45 | …al Q/\partial P_{IP} = -4\), \(\partial Q/\partial P_{SG} = 2\), \(\partial Q/\partial A_{IP} = 100\), \(\partial Q/\partial I = 1{,}000I\). | ✔ found | ✅ Numbers found in the cited source. |
| 10 | S10 slides p.46 | …Not in the short run if price covers average variable cost: operate now, exit in the long run (the $40 scenario). | ✔ found | ✅ Numbers found in the cited source. |
| 11 | CQ3 Q3-Q4 | …\(AVC = 148/400 = \$0.37\); \(MC = 0.000006Q^2 - 0.001Q + 0.25 = 0.96 - 0.40 + 0.25 = \$0.81\). | missing: 0.000006, 0.001, 0.96, 0.40 | ✅ Verified in the CQ3 Q4 feedback (0.000006Q² − 0.001Q + 0.25; 0.96 − 0.40 + 0.25 = $0.81). Auto-check read only Q3. |
| 12 | S09 slides p.23 | …Intercept 1,631.47, Price −2.60 → \(Q_{TV} = 1{,}631.47 - 2.60P_{TV}\). | ✔ found | ✅ Numbers found in the cited source. |
| 13 | Math Review p.10 | …- **Partial derivative:** one variable, others constant. iPhone: −4 per $1 own price; +2 per $1 Galaxy price (+$10 → +20). | ✔ found | ✅ Numbers found in the cited source. |
| 14 | S03 workbook, Solution!B18, B69 | …ht, and about 75% of its routes have no nonstop competition. The more concentrated, smaller airports fit a strategy of avoiding competition. | ✔ found | ✅ Numbers found in the cited source. |
| 15 | S01 slides p.36 | …- **Four questions:** Markets to Pursue (S2–4) → Unique Value to Offer (S5–12) → Resources & Capabilities → Sustaining Advantage. | missing: -12 | ✅ False positive: “−12” comes from the session range “S5–12”. |
| 16 | Math Review p.10 | …ient answers a “holding everything else constant” question. That's the superpower: it is a partial derivative from S05, estimated from data. | missing: 2.60 | ✅ Verified. 2.60 is from S09 slides p.25, not the Math Review. **Fixed:** added [[S09 slides p.25]] next to the quote. |
| 17 | S05 Optional Practice p.4 | …Correct. \(R = 6{,}000P - 12P^2\) → \(6{,}000 - 24P = 0\). | ✔ found | ✅ Numbers found in the cited source. |
| 18 | S09 slides p.14 | …9.3M start + 13.9M growth + 3.7M season − 3.6M price (6 × 596K) = 23.4M predicted vs. 21.7M actual. | missing: 9.3, 13.9, 3.7, 3.6, 596, 23.4, 21.7 | ✅ Verified against the slide image (waterfall chart, S09 p.14): 9.3M, +13.9M, +3.7M, −3.6M (6 × 596K), 23.4M vs 21.7M. |
| 19 | CQ5 Q4 | …Correct. 200 extra miles × 0.007 = 1.4 cents per mile (the longer Seattle flight is cheaper per mile). | ✔ found | ✅ Numbers found in the cited source. |
| 20 | S10 slides p.19 | …\(MR = 10 - 2Q\) — same intercept as demand, twice the slope. | ✔ found | ✅ Numbers found in the cited source. |
| 21 | S05 Optional Practice p.4 | …\(6{,}000 - 24P = 0\) → **P = $250**. | ✔ found | ✅ Numbers found in the cited source. |
| 22 | CQ4 Q10 | …Correct. \(\%\Delta Q = (23.8-25)/25 = -4.8\%\); \(\%\Delta P = 60\%\); \(OPE = -0.08\) → inelastic. | ✔ found | ✅ Numbers found in the cited source. |
| 23 | S05 Optional Practice p.2 | …\(Q_x = 6{,}000 - 12P_x\). What price maximizes revenue? | ✔ found | ✅ Numbers found in the cited source. |
| 24 | CQ5 Q7 | …For a price maker, find Q* where MR = MC, then go **up to the demand curve** for price. CQ5 offered $60 (MC at 15) and $40 as traps. | ✔ found | ✅ Numbers found in the cited source. |
| 25 | CQ3 Q1 | …Correct. FC = 16 (the constant); AFC = 16/400 = $0.04. | ✔ found | ✅ Numbers found in the cited source. |
| 26 | S07 slides p.30 | …Correct. \(dR/dP = 8{,}845 - 7{,}456P = 0\) → \(P \approx 1.19\). | missing: 456, 1.19 | ✅ Derived: the slide gives Q = −3,728P + 8,845 and the steps; 8,845 / 7,456 = 1.186. Matches your Differentiation Advantage hand calculation ($1.1864). |
| 27 | S06 workbook, Solution!A112-A153 | …rvice rooms. Post-case: the rival (iBahn) had a quality differentiator and scope economies, so Guest-Tek risked a price war it couldn’t win. | ✔ found | ✅ Numbers found in the cited source. |
| 28 | CQ4 Q4 | …Correct. Choke price $1.50; Q = 10,000 at $1.00; CS = ½ × 10,000 × $0.50 = $2,500. | ✔ found | ✅ Numbers found in the cited source. |
| 29 | CQ3 Q1-Q2 | …\(AFC = 16/400 = \$0.04\); \(VC = 128 - 80 + 100 = \$148\). | missing: 128, 80, 100, 148 | ✅ Verified in the CQ3 Q2 feedback (128 − 80 + 100 = $148). Auto-check read only Q1. |
| 30 | S06 Video Slides pp.26-30 | …he LRAC traces the lowest ATC available at each Q when you can pick K. It slopes down (economies of scale), then may turn up (diseconomies). | missing: 0.55, 140, 0.30, 220 | ✅ Verified against the slide image (S06 Video p.26: K=1 minimum ≈ $0.55 near Q≈140; K=2 minimum ≈ $0.31 near Q≈220). The site says “≈ $0.30”: acceptable reading of the chart. |
| 31 | HSIA Wars case p.1 | …00s, rooms installed 83,209 → 520,201. In early 2007 Guest-Tek offered hotels HSIA for **$0.10 per room per day**. iBahn was earning ~$0.65. | missing: 83209 | ⚠️ Real discrepancy between sources: the HSIA case lists 2004-Q3 rooms as 83,900 (VC 3,572); the S06 workbook uses 83,209 (VC 3,843.906). The site follows the workbook. **Fixed:** the text now states both. |
| 32 | S06 Video Slides p.21 | …\(MC = 0.00006Q^2 - 0.01Q + 0.8\) → \(0.6 - 1 + 0.8 = \$0.4\). | missing: 0.00006, 0.01, 0.8, 0.6, 0.4 | ✅ Verified against the slide image (S06 Video p.21: MC(100) = 0.6 − 1 + 0.8 = $0.40). |
| 33 | S06 Video Slides p.16 | …\(C = 8 + 50 = \$58\). (The video slide prints “8 + 58 = $58,” a typo; it’s 8 + 50.) | ✔ found | ✅ Numbers found in the cited source. |
| 34 | S07 slides p.16 | …istorical data (Redbox)**. Every later pricing tool needs one: elasticity (S08), regression (S09), profit max (S10), advanced pricing (S11). | missing: 08, 09, 10, 11 | ✅ False positive: “08–11” are session numbers. |
| 35 | S03 slides p.9 | …C4 = 94% again; HHI = 2,706. | ✔ found | ✅ Numbers found in the cited source. |
| 36 | S10 slides p.7 | …Midterm 1 runs Mon Oct 19 – Fri Oct 23 with a late fee starting Friday: a small peak-load lever of its own. | ✔ found | ✅ Numbers found in the cited source. |
| 37 | CQ4 Q7 | …\(R = 30{,}000P - 20{,}000P^2\); \(dR/dP = 30{,}000 - 40{,}000P = 0\) → **$0.75** (Q = 15,000, R = $11,250). | missing: 15000, 11250 | ✅ $0.75 is from CQ4 Q7; Q = 15,000 and R = $11,250 are from the S08 workbook comment B61. **Fixed:** added that citation. |
| 38 | S06 workbook | …(ATC = AQ^b\), doubling × \(2^b\). Guest-Tek \(414.6\,R^{-0.5705}\) (−33%/doubling); Redbox \(656.06\,R^{-0.476}\) (−28%; works in reverse). | missing: 656.06, -0.476 | ✅ Verified: Redbox 656.06R^−0.476 is on S07 slides p.6 (cited in the same line); Guest-Tek 414.6 from the S06 workbook. |
| 39 | S10 slides p.47 | …Same cost \(C(Q) = 125 + 4Q^2\). You are a monopolist with inverse demand \(P = 100 - Q\). | ✔ found | ✅ Numbers found in the cited source. |
| 40 | S06 workbook, Solution!E83 | …\(2^{-0.5705} - 1 = -32.7\%\). | missing: -32.7 | ✅ Rounding: the workbook E83 = −0.32661…, shown as −32.7%. |

## Issues found and fixed during the build (outside the sample)

- **C4 convention bug (fixed).** My first C4 function sorted the “remaining share” bucket into the top four and gave 97% for telecom 2013. The professor’s convention (slides p.7, Allegiant workbook) sums only the four largest *named* firms (94%), and treats “other” as one firm only in HHI. The code was fixed, a golden test was added, and it is now an S03 trap.
- **S04 Solution topic.** TASK.md assumed the S04 solution was Home Depot. It is actually the Storage & Warehouse Leasing (self-storage) Industry Analysis assignment. The site uses it as such; Home Depot is only the in-class industry-definition example.
- **Slide typos** (flagged on the site, not reproduced): S06 video p.16 prints “8 + 58 = $58” (should be 8 + 50); S05 slides p.30 shows y = 11 at x = 3 (should be 12).
- **Redbox demand line.** A refit of the six slide points gives 8,846 − 3,728.3P. The slide’s rounded label (8,845 − 3,728P) is used throughout.
- **Excel Solver tolerance.** The workbook’s Solver answer (55.223285) differs from the exact calculus optimum (55.223285486…) in the 7th decimal place. The golden test compares to 5 decimals.

## Standing guarantees

- **Golden tests** (`tests/unit/golden.test.ts`) recompute every professor number the spec lists from the raw data: telecom C4/HHI; R = 100P − 2P²; the S10 cost-function scenarios; MR; Whole Foods/Kroger/Safeway DuPont; all six Allegiant HHIs; Guest-Tek fits, CPRPD, target volume, doubling and MC; Dr Pepper OPE table; the Pittsburgh TV and Redstone regression outputs (to 6 decimals); Five Forces scores; Redbox and Netflix scale fits; Squatty Potty.
- **Content tests:** verbatim CQ questions keep the professor’s correct answer; every MCQ option has an explanation; every reference resolves; every math snippet compiles.
- **Generator tests:** 500 seeds per generator, checking defining conditions such as revenue max at OPE = −1 and the TR test agreeing with the actual revenue change.
