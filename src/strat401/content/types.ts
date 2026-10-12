import type { ReactNode } from 'react'

export type SessionId = 'S01' | 'S02' | 'S03' | 'S04' | 'S05' | 'S06' | 'S07' | 'S08' | 'S09' | 'S10' | 'S11'

/** Strings may carry inline citations [[Tag §n]] and **bold**. */
export type Txt = string

export interface MapItem { src: string }
export interface MapSession {
  id: SessionId
  title: string
  part: string
  keyQuestion: string
  keyQuestionSrc: string
  reading: { name: string; tag: string }
  case: { name: string; tag: string }
  slides: string | null
  framework: { name: string; summary: string; components: { name: string; what: string; src: string }[] }
  terms: { term: string; def: string; src: string }[]
  claims: { claim: string; src: string }[]
  failures: { name: string; what: string; src: string }[]
  caseFacts: { fact: string; why: string; src: string }[]
  strongAnalysis: string[]
  counter: { argument: string; response: string }
  courseMap: { text: string; src: string }
  slideExtras: { topic: string; detail: string; src: string }[]
  quant: { what: string; src: string }[]
  gaps: string[]
}

export interface McqOption { text: Txt; why: Txt }
export interface Mcq {
  id: string
  session: SessionId
  /** concept = definition/distinction; apply = new scenario; case = the session's case; quant = small calculation */
  kind: 'concept' | 'apply' | 'case' | 'quant'
  stem: Txt
  options: McqOption[]
  correct: number
  src: string
}

export interface ShortAnswer {
  id: string
  session: SessionId
  prompt: Txt
  model: Txt
  points: Txt[] // what a full-credit answer must contain
  src: string
}

export interface ColdCall {
  id: string
  level: 'Facts' | 'Analysis' | 'Judgment' | 'Action'
  q: Txt
  model: Txt
  weak: Txt
  whyWeak: Txt
}

export interface Pyramid {
  structure: 'deductive' | 'inductive' | 'combined'
  s: Txt
  c: Txt
  q: Txt
  a: Txt
  supports: { label: string; point: Txt; evidence: Txt[] }[]
  competing?: Txt
  memo: Txt
}

export interface RecallList {
  id: string
  title: string
  prompt: string
  items: { name: string; hint?: string }[]
  src: string
}

export interface SlideVariant {
  title: string
  brief: Txt
  slides: Txt
  differ: Txt
  guess: Txt
}

export interface ModuleDef {
  id: SessionId
  short: string // nav label
  framework: {
    oneLiner: Txt
    analogy: Txt
    intuition: Txt[]
    howToRun: Txt[] // the framework as a procedure you can run on any case
    recall: RecallList[]
    diagram?: () => ReactNode
    variants?: SlideVariant[]
    newScenarios: { prompt: Txt; answer: Txt }[] // apply-the-framework mini cases (fictional firms)
  }
  argument: { intro: Txt; propositions: Txt[] } // distilled claims (map claims are shown too)
  case: {
    protagonist: Txt
    decision: Txt
    timeline: { when: string; what: Txt }[]
    exhibits: () => ReactNode
  }
  tool: { title: string; intro: Txt; render: () => ReactNode }
  coldCalls: ColdCall[]
  devil: { argument: Txt; response: Txt; probes: Txt[] }
  pyramid: { prompt: Txt; model: Pyramid }
  checkIds: string[] // 8-10 ids from the bank for the module concept check
  bank: Mcq[]
  shorts: ShortAnswer[]
  written: { prompt: Txt; minutes: number; model: Txt; rubric: Txt[] }
  oral: { prompt: Txt; probes: Txt[] }
  summary: { answer: Txt; numbers: { label: string; value: string; src: string }[]; frameworkBullets: Txt[]; caseBullets: Txt[] }
  crossLinks402?: { topic: string; note: Txt; href?: string }[]
}
