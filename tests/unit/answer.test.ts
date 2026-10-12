import { describe, expect, it } from 'vitest'
import { checkNumeric, parseNumber } from '../../src/lib/answer'

describe('answer parsing', () => {
  it.each([
    ['0.25', 0.25],
    ['25%', 25],
    ['$25', 25],
    ['1,631.47', 1631.47],
    ['-2', -2],
    ['−2.0', -2],
    ['-$1.50', -1.5],
    ['(2.5)', -2.5],
    ['  1.2e3 ', 1200],
  ])('%s → %d', (s, v) => expect(parseNumber(s)?.value).toBeCloseTo(v))
  it('rejects junk', () => {
    expect(parseNumber('abc')).toBeNull()
    expect(parseNumber('')).toBeNull()
    expect(parseNumber('1,2,3x')).toBeNull()
  })
  it('percent answers accept 25%, 25 and 0.25', () => {
    for (const s of ['25%', '25', '0.25']) expect(checkNumeric(s, { answer: 0.25, kind: 'percent' })).toBe(true)
    expect(checkNumeric('2.5%', { answer: 0.25, kind: 'percent' })).toBe(false)
  })
  it('±1% default tolerance', () => {
    expect(checkNumeric('1640', { answer: 1631.47 })).toBe(true)
    expect(checkNumeric('1660', { answer: 1631.47 })).toBe(false)
    expect(checkNumeric('-0.73', { answer: -0.7285 })).toBe(true)
  })
})
