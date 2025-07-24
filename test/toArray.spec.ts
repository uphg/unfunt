import { describe, it, expect } from 'vitest'
import { toArray } from '../src/typed'

describe('toArray', () => {
  it('should return empty array for null and undefined', () => {
    expect(toArray(null)).toEqual([])
    expect(toArray(undefined)).toEqual([])
  })

  it('should return the same array if value is already an array', () => {
    const arr = [1, 2, 3]
    expect(toArray(arr)).toBe(arr)
    expect(toArray([])).toEqual([])
  })

  it('should convert strings to character arrays', () => {
    expect(toArray('hello')).toEqual(['h', 'e', 'l', 'l', 'o'])
    expect(toArray('')).toEqual([])
    expect(toArray('a')).toEqual(['a'])
  })

  it('should convert iterables to arrays', () => {
    expect(toArray(new Set([1, 2, 3]))).toEqual([1, 2, 3])
    expect(toArray(new Map([['a', 1], ['b', 2]]))).toEqual([['a', 1], ['b', 2]])
  })

  it('should wrap primitive values in arrays', () => {
    expect(toArray(42)).toEqual([42])
    expect(toArray(true)).toEqual([true])
    expect(toArray(false)).toEqual([false])
    const sym = Symbol('test')
    expect(toArray(sym)).toEqual([sym])
  })

  it('should wrap objects in arrays', () => {
    const obj = { a: 1 }
    expect(toArray(obj)).toEqual([obj])
  })

  it('should handle functions', () => {
    const fn = () => {}
    expect(toArray(fn)).toEqual([fn])
  })
})
