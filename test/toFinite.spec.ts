import { describe, it, expect } from 'vitest'
import { toFinite } from '../src/typed'

describe('toFinite', () => {
  it('should return the same number for finite numbers', () => {
    expect(toFinite(42)).toBe(42)
    expect(toFinite(-42)).toBe(-42)
    expect(toFinite(3.14)).toBe(3.14)
    expect(toFinite(0)).toBe(0)
  })

  it('should return 0 for falsy values', () => {
    expect(toFinite(null)).toBe(0)
    expect(toFinite(undefined)).toBe(0)
    expect(toFinite(false)).toBe(0)
    expect(toFinite('')).toBe(0)
  })

  it('should preserve 0 when input is 0', () => {
    expect(toFinite(0)).toBe(0)
    expect(toFinite(-0)).toBe(-0)
  })

  it('should convert Infinity to MAX_INTEGER', () => {
    const result = toFinite(Infinity)
    expect(result).toBe(1.7976931348623157e+308) // MAX_INTEGER value
    expect(Number.isFinite(result)).toBe(true)
  })

  it('should convert -Infinity to -MAX_INTEGER', () => {
    const result = toFinite(-Infinity)
    expect(result).toBe(-1.7976931348623157e+308) // -MAX_INTEGER value
    expect(Number.isFinite(result)).toBe(true)
  })

  it('should return 0 for NaN', () => {
    expect(toFinite(NaN)).toBe(0)
  })

  it('should convert string numbers to finite numbers', () => {
    expect(toFinite('42')).toBe(42)
    expect(toFinite('-42')).toBe(-42)
    expect(toFinite('3.14')).toBe(3.14)
    expect(toFinite('0')).toBe(0)
  })

  it('should return 0 for invalid string numbers', () => {
    expect(toFinite('abc')).toBe(0)
    expect(toFinite('hello')).toBe(0)
    expect(toFinite('42abc')).toBe(0)
  })

  it('should convert boolean values', () => {
    expect(toFinite(true)).toBe(1)
    expect(toFinite(false)).toBe(0)
  })

  it('should handle arrays', () => {
    expect(toFinite([])).toBe(0)
    expect(toFinite([42])).toBe(42)
    expect(toFinite(['42'])).toBe(42)
    expect(toFinite([1, 2])).toBe(0) // Multiple elements result in NaN -> 0
  })

  it('should handle objects with valueOf method', () => {
    const obj = { valueOf: () => 42 }
    expect(toFinite(obj)).toBe(42)

    const dateObj = new Date('2023-01-01')
    expect(toFinite(dateObj)).toBe(dateObj.getTime())
  })

  it('should return 0 for plain objects', () => {
    expect(toFinite({})).toBe(0)
    expect(toFinite({ a: 1 })).toBe(0)
  })

  it('should convert bigint to finite number', () => {
    expect(toFinite(BigInt(42))).toBe(42)
    expect(toFinite(BigInt(0))).toBe(0)
  })

  it('should return 0 for symbols', () => {
    expect(toFinite(Symbol('test'))).toBe(0)
  })

  it('should handle edge cases with whitespace strings', () => {
    expect(toFinite('  42  ')).toBe(42)
    expect(toFinite('   ')).toBe(0)
    expect(toFinite('\t\n')).toBe(0)
  })

  it('should handle very large finite numbers', () => {
    const largeNumber = 1e100
    expect(toFinite(largeNumber)).toBe(largeNumber)
    expect(Number.isFinite(toFinite(largeNumber))).toBe(true)
  })

  it('should handle very small finite numbers', () => {
    const smallNumber = 1e-100
    expect(toFinite(smallNumber)).toBe(smallNumber)
    expect(Number.isFinite(toFinite(smallNumber))).toBe(true)
  })
})
