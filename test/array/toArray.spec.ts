import { describe, it, expect } from 'vitest'
import { toArray } from '../../src/array'

describe('toArray', () => {
  it('should return empty array for null and undefined', () => {
    expect(toArray(null)).toEqual([])
    expect(toArray(undefined)).toEqual([])
  })

  it('should return the same array if input is already an array', () => {
    const arr = [1, 2, 3]
    expect(toArray(arr)).toBe(arr)
  })

  it('should convert string to array of characters', () => {
    expect(toArray('hello')).toEqual(['h', 'e', 'l', 'l', 'o'])
    expect(toArray('')).toEqual([])
  })

  it('should convert iterable to array', () => {
    const set = new Set([1, 2, 3])
    expect(toArray(set)).toEqual([1, 2, 3])

    const map = new Map([['a', 1], ['b', 2]])
    expect(toArray(map)).toEqual([['a', 1], ['b', 2]])
  })

  it('should wrap non-iterable values in array', () => {
    expect(toArray(42)).toEqual([42])
    expect(toArray(true)).toEqual([true])
    expect(toArray({})).toEqual([{}])
  })
})
