import { describe, it, expect } from 'vitest'
import { toLength } from '../src/typed'

describe('toLength', () => {
  it('should return 0 for undefined or no parameter', () => {
    expect(toLength()).toBe(0)
    expect(toLength(undefined)).toBe(0)
  })

  it('should return valid length for positive integers', () => {
    expect(toLength(5)).toBe(5)
    expect(toLength(10)).toBe(10)
    expect(toLength(100)).toBe(100)
  })

  it('should return 0 for negative numbers', () => {
    expect(toLength(-1)).toBe(0)
    expect(toLength(-10)).toBe(0)
    expect(toLength(-3.14)).toBe(0)
  })

  it('should truncate decimal numbers to integers', () => {
    expect(toLength(3.14)).toBe(3)
    expect(toLength(3.9)).toBe(3)
    expect(toLength(10.7)).toBe(10)
  })

  it('should return 0 for falsy values', () => {
    expect(toLength(null)).toBe(0)
    expect(toLength(false)).toBe(0)
    expect(toLength('')).toBe(0)
    expect(toLength(0)).toBe(0)
  })

  it('should convert string numbers to valid lengths', () => {
    expect(toLength('5')).toBe(5)
    expect(toLength('10')).toBe(10)
    expect(toLength('3.14')).toBe(3)
    expect(toLength('0')).toBe(0)
  })

  it('should return 0 for invalid string numbers', () => {
    expect(toLength('abc')).toBe(0)
    expect(toLength('hello')).toBe(0)
    expect(toLength('42abc')).toBe(0)
  })

  it('should convert boolean values', () => {
    expect(toLength(true)).toBe(1)
    expect(toLength(false)).toBe(0)
  })

  it('should handle arrays', () => {
    expect(toLength([])).toBe(0)
    expect(toLength([5])).toBe(5)
    expect(toLength(['5'])).toBe(5)
    expect(toLength([3.14])).toBe(3)
    expect(toLength([1, 2])).toBe(0) // Multiple elements result in NaN -> 0
  })

  it('should return MAX_ARRAY_LENGTH for values exceeding the limit', () => {
    const MAX_ARRAY_LENGTH = 4294967295
    expect(toLength(Infinity)).toBe(MAX_ARRAY_LENGTH)
    expect(toLength(Number.MAX_SAFE_INTEGER)).toBe(MAX_ARRAY_LENGTH)
    expect(toLength(1e20)).toBe(MAX_ARRAY_LENGTH)
  })

  it('should return 0 for -Infinity', () => {
    expect(toLength(-Infinity)).toBe(0)
  })

  it('should return 0 for NaN', () => {
    expect(toLength(NaN)).toBe(0)
  })

  it('should handle objects with valueOf method', () => {
    const obj = { valueOf: () => 42.7 }
    expect(toLength(obj)).toBe(42)

    const dateObj = new Date('2023-01-01')
    const expectedValue = Math.max(0, Math.min(4294967295, Math.trunc(dateObj.getTime())))
    expect(toLength(dateObj)).toBe(expectedValue)
  })

  it('should return 0 for plain objects', () => {
    expect(toLength({})).toBe(0)
    expect(toLength({ a: 1 })).toBe(0)
  })

  it('should convert bigint to valid length', () => {
    expect(toLength(BigInt(42))).toBe(42)
    expect(toLength(BigInt(0))).toBe(0)
    expect(toLength(BigInt(-5))).toBe(0)
  })

  it('should return 0 for symbols', () => {
    expect(toLength(Symbol('test'))).toBe(0)
  })

  it('should handle edge cases with whitespace strings', () => {
    expect(toLength('  42.7  ')).toBe(42)
    expect(toLength('   ')).toBe(0)
    expect(toLength('\t\n')).toBe(0)
  })

  it('should handle values at MAX_ARRAY_LENGTH boundary', () => {
    const MAX_ARRAY_LENGTH = 4294967295
    expect(toLength(MAX_ARRAY_LENGTH)).toBe(MAX_ARRAY_LENGTH)
    expect(toLength(MAX_ARRAY_LENGTH - 1)).toBe(MAX_ARRAY_LENGTH - 1)
    expect(toLength(MAX_ARRAY_LENGTH + 1)).toBe(MAX_ARRAY_LENGTH)
  })

  it('should handle very small positive numbers', () => {
    expect(toLength(0.1)).toBe(0)
    expect(toLength(0.9)).toBe(0)
    expect(toLength(1.1)).toBe(1)
  })

  it('should handle negative decimal values', () => {
    expect(toLength(-0.5)).toBe(0)
    expect(toLength(-1.5)).toBe(0)
    expect(toLength(-10.7)).toBe(0)
  })
})
