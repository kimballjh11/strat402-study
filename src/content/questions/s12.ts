import type { Mcq } from '../types'

const L1 = 'S12-LO1'
const L2 = 'S12-LO2'
const L3 = 'S12-LO3'
const L4 = 'S12-LO4'
const L5 = 'S12-LO5'
const S = 'S12' as const
const SRC = 'Group Project Instructions page'
const tf = (id: string, los: string[], stem: string, isTrue: boolean, why: string, screen: Mcq['screen'] = 'terms'): Mcq => ({
  id,
  session: S,
  los,
  origin: 'course',
  src: SRC,
  screen,
  stem: `True or false: ${stem}`,
  options: [
    { text: 'True', why: isTrue ? `Correct. ${why} [[${SRC}]]` : `False. ${why}` },
    { text: 'False', why: isTrue ? `It’s true. ${why}` : `Correct. ${why} [[${SRC}]]` },
  ],
  correct: isTrue ? 0 : 1,
})

// The Session 12 reading quiz is ten true/false questions on the Group Project Instructions, so this bank drills that format.
export const s12Mcqs: Mcq[] = [
  tf('s12-tf-cp1', [L1], 'Checkpoint 1 (“Breaking Bread”) requires the group to eat together and spend at least 60 minutes getting to know each other, with each member sharing a five-minute story about a transformative experience.', true, 'Each member then submits a short response: where you met, what you ate, your story, and the connections you made.'),
  tf('s12-tf-cp2', [L1], 'Checkpoint 2 asks for at least 10 possible businesses or organizations, each with a primary contact, their position, and your relationship with that contact.', true, 'Plus “projects that stood out” and your top three ideas (problem, analysis type, data source), in a 2–3 page document.'),
  tf('s12-tf-cp2-who', [L1], 'For Checkpoint 2, every group member must upload the same document separately.', false, 'One member uploads the document for the whole group; you may resubmit until the due date.'),
  tf('s12-tf-cp3', [L1, L2], 'At Checkpoint 3 the group pitches its top three ideas to Prova, then submits the Prova output and a one-page proposal for the chosen idea.', true, 'The proposal states the managerial question, the type of analysis, and the data needed.'),
  tf('s12-tf-cp4', [L1], 'Checkpoint 4 is only the slide deck; data and spreadsheets are not submitted.', false, 'Checkpoint 4 = deck, data, analysis (spreadsheets, code, etc.) and supporting files. Every number in the deck must trace back to a file you turned in.'),
  tf('s12-tf-dates', [L1], 'Checkpoint 2 is due Saturday, October 17.', true, 'Group meets Wed Oct 14; due Sat Oct 17. (CP1 due Sep 12; CP3 Nov 3; CP4 Dec 5.)'),
  tf('s12-tf-prova', [L2], 'Prova, an AI evaluator, both gives feedback on your project ideas (Checkpoint 3) and evaluates your final presentation by asking follow-up questions.', true, 'Any group member may be asked about any part of the analysis.'),
  tf('s12-tf-prova-room', [L2], 'Final presentations to Prova take place in a reserved room with a camera and are recorded.', true, 'Planned for the last two class days (Dec 7 and Dec 9).'),
  tf('s12-tf-points', [L3], 'The 100 project points are: Prova assessment 50, analysis 40, Checkpoints 1–4 (2 points each) 8, showcase attendance 2.', true, 'The project is 15% of the final grade.'),
  tf('s12-tf-analysis', [L3], 'The analysis portion (40 points) is evaluated by Professor Lewis with input from Prova.', true, 'Deck, data, and supporting files.'),
  tf('s12-tf-part', [L3], 'Your group project grade equals your participation score multiplied by the project score.', true, 'Participation score = actual % of workload shared ÷ ideal % (100% ÷ group size).'),
  tf('s12-tf-part-zero', [L3], 'If your group members say, on average, you did nothing, you still receive the group’s project score.', false, 'Your participation score would be 0, so your group project grade would be zero.'),
  tf('s12-tf-ideal', [L3], 'In a group of five, the ideal share of the workload for each member is 20%.', true, '100% ÷ 5 = 20%.'),
  tf('s12-tf-showcase', [L4], 'All students are expected to attend the Final Project Showcase, even if their group isn’t invited to present.', true, 'Planned for Mon Dec 14, 11:00 a.m.–2:00 p.m., both sections together.'),
  tf('s12-tf-conflict', [L4], 'To be excused from the showcase for a conflict, you must notify the professor by the Checkpoint 2 due date.', true, 'Otherwise you forfeit the 2 showcase attendance points.'),
  tf('s12-tf-invite', [L4], 'Groups invited to the showcase receive extra credit.', false, 'Being invited is an honor, not an additional grade; no extra credit is attached. Invitations are based on Prova scores.'),
  tf('s12-tf-scope', [L5], 'The instructions advise choosing a broad topic so you have plenty to analyze.', false, '“Keep the scope narrow. It is much better to explore a focused question rigorously.”'),
  tf('s12-tf-tool', [L5], 'You should pick an analysis method first and then look for a problem to apply it to.', false, '“Focus on the problem, not the tool.”'),
  tf('s12-tf-data', [L5], 'The single best predictor of getting the data you need is choosing contacts you already have good relationships with.', true, 'Family and friends are more likely to share data than a business down the street. Start early.'),
  tf('s12-tf-deck', [L1, L5], 'The deck should be structured as: company background, the managerial problem, method/analysis/results (the bulk), and recommendations/conclusions.', true, 'A strong presentation identifies the situation, complication and question, and the analysis follows directly.'),
  tf('s12-tf-weight', [L3], 'The group project counts for 15% of your final grade.', true, 'Scored out of 100 points.'),
  tf('s12-tf-checkpoints-graded', [L3], 'Each checkpoint is graded separately in Canvas.', false, 'Checkpoints aren’t graded individually in Canvas; they fold into your single group project score, posted after the showcase.'),
]
