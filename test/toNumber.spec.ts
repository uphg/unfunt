import { describe, it, expect } from 'vitest'
import { toNumber } from '../src/typed'

describe('toNumber', () => {
  it('should return the same number if value is already a number', () => {
    expect(toNumber(42)).toBe(42)
    expect(toNumber(0)).toBe(0)
    expect(toNumber(-42)).toBe(-42)
    expect(toNumber(3.14)).toBe(3.14)
    expect(toNumber(NaN)).toBeNaN()
    expect(toNumber(Infinity)).toBe(Infinity)
  })

  it('should convert string numbers to numbers', () => {
    expect(toNumber('42')).toBe(42)
    expect(toNumber('0')).toBe(0)
    expect(toNumber('-42')).toBe(-42)
    expect(toNumber('3.14')).toBe(3.14)
    expect(toNumber('  42  ')).toBe(42)
    expect(toNumber('')).toBe(0)
    expect(toNumber('   ')).toBe(0)
  })

  it('should return NaN for invalid string numbers', () => {
    expect(toNumber('abc')).toBeNaN()
    expect(toNumber('42abc')).toBeNaN()
    expect(toNumber('hello')).toBeNaN()
  })

  it('should convert booleans to numbers', () => {
    expect(toNumber(true)).toBe(1)
    expect(toNumber(false)).toBe(0)
  })

  it('should convert null and undefined to 0', () => {
    expect(toNumber(null)).toBe(0)
    expect(toNumber(undefined)).toBe(0)
  })

  it('should convert bigint to number', () => {
    expect(toNumber(BigInt(42))).toBe(42)
    expect(toNumber(BigInt(0))).toBe(0)
  })

  it('should return NaN for symbols', () => {
    expect(toNumber(Symbol('test'))).toBeNaN()
  })

  it('should handle objects with valueOf method', () => {
    const obj = { valueOf: () => 42 }
    expect(toNumber(obj)).toBe(42)

    const dateObj = new Date('2023-01-01')
    expect(toNumber(dateObj)).toBe(dateObj.getTime())
  })

  it('should return NaN for plain objects and handle arrays specially', () => {
    expect(toNumber({})).toBeNaN()
    expect(toNumber({ a: 1 })).toBeNaN()

    // Arrays have special Number conversion rules
    expect(toNumber([])).toBe(0)
    expect(toNumber([42])).toBe(42)
    expect(toNumber(['42'])).toBe(42)
    expect(toNumber([1, 2])).toBeNaN()
  })

  it('should handle functions', () => {
    expect(toNumber(() => {})).toBeNaN()
  })
})
