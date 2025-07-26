import { describe, it, expect } from 'vitest'
import { isPrimitive } from '../src/typed'

describe('isPrimitive', () => {
  it('should return true for string values', () => {
    expect(isPrimitive('')).toBe(true)
    expect(isPrimitive('hello')).toBe(true)
    expect(isPrimitive('world')).toBe(true)
    expect(isPrimitive('123')).toBe(true)
  })

  it('should return true for number values', () => {
    expect(isPrimitive(0)).toBe(true)
    expect(isPrimitive(42)).toBe(true)
    expect(isPrimitive(-42)).toBe(true)
    expect(isPrimitive(3.14)).toBe(true)
    expect(isPrimitive(Infinity)).toBe(true)
    expect(isPrimitive(-Infinity)).toBe(true)
    expect(isPrimitive(NaN)).toBe(true)
  })

  it('should return true for boolean values', () => {
    expect(isPrimitive(true)).toBe(true)
    expect(isPrimitive(false)).toBe(true)
  })

  it('should return true for bigint values', () => {
    expect(isPrimitive(BigInt(0))).toBe(true)
    expect(isPrimitive(BigInt(42))).toBe(true)
    expect(isPrimitive(BigInt(-42))).toBe(true)
    expect(isPrimitive(BigInt(Number.MAX_SAFE_INTEGER))).toBe(true)
  })

  it('should return true for symbol values', () => {
    expect(isPrimitive(Symbol())).toBe(true)
    expect(isPrimitive(Symbol('test'))).toBe(true)
    expect(isPrimitive(Symbol.for('global'))).toBe(true)
    expect(isPrimitive(Symbol.iterator)).toBe(true)
  })

  it('should return true for null', () => {
    expect(isPrimitive(null)).toBe(true)
  })

  it('should return true for undefined', () => {
    expect(isPrimitive(undefined)).toBe(true)
  })

  it('should return false for objects', () => {
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive({ a: 1 })).toBe(false)
    expect(isPrimitive(Object.create(null))).toBe(false)
  })

  it('should return false for arrays', () => {
    expect(isPrimitive([])).toBe(false)
    expect(isPrimitive([1, 2, 3])).toBe(false)
    expect(isPrimitive(['a', 'b', 'c'])).toBe(false)
  })

  it('should return false for functions', () => {
    expect(isPrimitive(() => {})).toBe(false)
    expect(isPrimitive(function() {})).toBe(false)
    expect(isPrimitive(function named() {})).toBe(false)
    expect(isPrimitive(async function() {})).toBe(false)
    expect(isPrimitive(function* () {})).toBe(false)
  })

  it('should return false for built-in objects', () => {
    expect(isPrimitive(new Date())).toBe(false)
    expect(isPrimitive(new RegExp(''))).toBe(false)
    expect(isPrimitive(/test/)).toBe(false)
    expect(isPrimitive(new Error())).toBe(false)
    expect(isPrimitive(new Map())).toBe(false)
    expect(isPrimitive(new Set())).toBe(false)
    expect(isPrimitive(new WeakMap())).toBe(false)
    expect(isPrimitive(new WeakSet())).toBe(false)
  })

  it('should return false for class instances', () => {
    class TestClass {}
    expect(isPrimitive(new TestClass())).toBe(false)
    expect(isPrimitive(TestClass)).toBe(false) // constructor function
  })

  it('should return false for promises', () => {
    expect(isPrimitive(Promise.resolve())).toBe(false)
    expect(isPrimitive(new Promise(() => {}))).toBe(false)
  })

  it('should return false for boxed primitive objects', () => {
    expect(isPrimitive(new String('hello'))).toBe(false)
    expect(isPrimitive(new Number(42))).toBe(false)
    expect(isPrimitive(new Boolean(true))).toBe(false)
  })

  it('should handle edge cases', () => {
    // Document and window are not available in Node.js environment
    // but we can test other edge cases
    expect(isPrimitive(Buffer.from('test'))).toBe(false) // Node.js Buffer
  })

  it('should work with object literals with valueOf/toString', () => {
    const objWithValueOf = {
      valueOf: () => 42
    }
    expect(isPrimitive(objWithValueOf)).toBe(false)

    const objWithToString = {
      toString: () => 'hello'
    }
    expect(isPrimitive(objWithToString)).toBe(false)
  })

  it('should handle prototype-less objects', () => {
    const prototypelessObj = Object.create(null)
    expect(isPrimitive(prototypelessObj)).toBe(false)
  })
})
