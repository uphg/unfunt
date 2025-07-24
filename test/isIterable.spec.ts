import { describe, it, expect } from 'vitest'
import { isIterable } from '../src/typed'

describe('isIterable', () => {
  it('should return true for arrays', () => {
    expect(isIterable([])).toBe(true)
    expect(isIterable([1, 2, 3])).toBe(true)
  })

  it('should return true for strings', () => {
    expect(isIterable('')).toBe(true)
    expect(isIterable('hello')).toBe(true)
  })

  it('should return true for Set and Map', () => {
    expect(isIterable(new Set())).toBe(true)
    expect(isIterable(new Set([1, 2, 3]))).toBe(true)
    expect(isIterable(new Map())).toBe(true)
    expect(isIterable(new Map([['a', 1]]))).toBe(true)
  })

  it('should return true for generator objects', () => {
    function* generator() {
      yield 1
      yield 2
    }
    expect(isIterable(generator())).toBe(true)
  })

  it('should return true for custom iterable objects', () => {
    const customIterable = {
      * [Symbol.iterator]() {
        yield 1
        yield 2
        yield 3
      }
    }
    expect(isIterable(customIterable)).toBe(true)
  })

  it('should return false for null and undefined', () => {
    expect(isIterable(null)).toBe(false)
    expect(isIterable(undefined)).toBe(false)
  })

  it('should return false for primitive values (except strings)', () => {
    expect(isIterable(42)).toBe(false)
    expect(isIterable(true)).toBe(false)
    expect(isIterable(false)).toBe(false)
    expect(isIterable(Symbol('test'))).toBe(false)
    expect(isIterable(BigInt(42))).toBe(false)
  })

  it('should return false for plain objects', () => {
    expect(isIterable({})).toBe(false)
    expect(isIterable({ a: 1 })).toBe(false)
  })

  it('should return false for functions', () => {
    expect(isIterable(() => {})).toBe(false)
    expect(isIterable(function() {})).toBe(false)
  })
})
