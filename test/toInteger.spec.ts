import { describe, it, expect } from 'vitest'
import { toInteger } from '../src/number'

describe('toInteger', () => {
  it('should return the same number for integers', () => {
    expect(toInteger(42)).toBe(42)
    expect(toInteger(-42)).toBe(-42)
    expect(toInteger(0)).toBe(0)
  })

  it('should truncate decimal numbers', () => {
    expect(toInteger(3.14)).toBe(3)
    expect(toInteger(-3.14)).toBe(-3)
    expect(toInteger(3.9)).toBe(3)
    expect(toInteger(-3.9)).toBe(-3)
    expect(toInteger(0.9)).toBe(0)
    expect(toInteger(-0.9)).toBe(0)
  })

  it('should convert string numbers to integers', () => {
    expect(toInteger('42')).toBe(42)
    expect(toInteger('-42')).toBe(-42)
    expect(toInteger('3.14')).toBe(3)
    expect(toInteger('0')).toBe(0)
  })

  it('should return 0 for falsy values', () => {
    expect(toInteger(null)).toBe(0)
    expect(toInteger(undefined)).toBe(0)
    expect(toInteger(false)).toBe(0)
    expect(toInteger('')).toBe(0)
  })

  it('should preserve 0 when input is 0', () => {
    expect(toInteger(0)).toBe(0)
    expect(toInteger(-0)).toBe(-0)
  })

  it('should convert Infinity to MAX_INTEGER', () => {
    const result = toInteger(Infinity)
    expect(result).toBe(1.7976931348623157e+308) // MAX_INTEGER value
    expect(Number.isFinite(result)).toBe(true)
  })

  it('should convert -Infinity to -MAX_INTEGER', () => {
    const result = toInteger(-Infinity)
    expect(result).toBe(-1.7976931348623157e+308) // -MAX_INTEGER value
    expect(Number.isFinite(result)).toBe(true)
  })

  it('should return 0 for NaN', () => {
    expect(toInteger(NaN)).toBe(0)
  })

  it('should return 0 for invalid string numbers', () => {
    expect(toInteger('abc')).toBe(0)
    expect(toInteger('hello')).toBe(0)
    expect(toInteger('42abc')).toBe(0)
  })

  it('should convert boolean values', () => {
    expect(toInteger(true)).toBe(1)
    expect(toInteger(false)).toBe(0)
  })

  it('should handle arrays', () => {
    expect(toInteger([])).toBe(0)
    expect(toInteger([42])).toBe(42)
    expect(toInteger(['42'])).toBe(42)
    expect(toInteger([3.14])).toBe(3)
    expect(toInteger([1, 2])).toBe(0) // Multiple elements result in NaN -> 0
  })

  it('should handle objects with valueOf method', () => {
    const obj = { valueOf: () => 42.7 }
    expect(toInteger(obj)).toBe(42)

    const dateObj = new Date('2023-01-01')
    expect(toInteger(dateObj)).toBe(Math.trunc(dateObj.getTime()))
  })

  it('should return 0 for plain objects', () => {
    expect(toInteger({})).toBe(0)
    expect(toInteger({ a: 1 })).toBe(0)
  })

  it('should convert bigint to integer', () => {
    expect(toInteger(BigInt(42))).toBe(42)
    expect(toInteger(BigInt(0))).toBe(0)
  })

  it('should return 0 for symbols', () => {
    expect(toInteger(Symbol('test'))).toBe(0)
  })

  it('should handle edge cases with whitespace strings', () => {
    expect(toInteger('  42.7  ')).toBe(42)
    expect(toInteger('   ')).toBe(0)
    expect(toInteger('\t\n')).toBe(0)
  })

  it('should handle very large finite numbers', () => {
    const largeNumber = 1e100
    expect(toInteger(largeNumber)).toBe(largeNumber)
    expect(Number.isFinite(toInteger(largeNumber))).toBe(true)
  })

  it('should handle very small finite numbers', () => {
    const smallNumber = 0.000001
    expect(toInteger(smallNumber)).toBe(0)
  })

  it('should handle negative zero', () => {
    expect(toInteger(-0.5)).toBe(0)
    expect(toInteger(-0)).toBe(-0)
    expect(Object.is(toInteger(-0), -0)).toBe(true)
  })

  it('should handle decimal values close to integers', () => {
    expect(toInteger(2.9999999999999996)).toBe(2)
    expect(toInteger(-2.9999999999999996)).toBe(-2)
  })
})
