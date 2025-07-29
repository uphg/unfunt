import { describe, it, expect } from 'vitest'
import { uniq } from '../../src/array'

describe('uniq', () => {
  it('should remove duplicates from array', () => {
    expect(uniq([2, 1, 2])).toEqual([2, 1])
    expect(uniq([1, 2, 1, 3, 2])).toEqual([1, 2, 3])
  })

  it('should preserve order of first occurrence', () => {
    expect(uniq([3, 1, 2, 1, 3])).toEqual([3, 1, 2])
    expect(uniq([5, 4, 3, 2, 1, 2, 3, 4, 5])).toEqual([5, 4, 3, 2, 1])
  })

  it('should handle empty array', () => {
    expect(uniq([])).toEqual([])
  })

  it('should handle array with single element', () => {
    expect(uniq([1])).toEqual([1])
    expect(uniq(['a'])).toEqual(['a'])
  })

  it('should handle array with no duplicates', () => {
    expect(uniq([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
    expect(uniq(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
  })

  it('should handle different data types', () => {
    expect(uniq(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c'])
    expect(uniq([true, false, true, false])).toEqual([true, false])
  })

  it('should handle mixed data types', () => {
    expect(uniq([1, '1', 1, '1', 2])).toEqual([1, '1', 2])
    expect(uniq([null, undefined, null, 0, undefined])).toEqual([null, undefined, 0])
  })

  it('should handle objects (reference equality)', () => {
    const obj1 = { a: 1 }
    const obj2 = { a: 1 }
    const obj3 = obj1
    expect(uniq([obj1, obj2, obj3])).toEqual([obj1, obj2])
  })

  it('should handle NaN values correctly', () => {
    expect(uniq([NaN, 1, NaN, 2])).toEqual([NaN, 1, 2])
  })

  it('should return empty array for non-array input', () => {
    expect(uniq(null as any)).toEqual([])
    expect(uniq(undefined as any)).toEqual([])
    expect(uniq('string' as any)).toEqual([])
    expect(uniq(123 as any)).toEqual([])
  })

  it('should handle array with all identical elements', () => {
    expect(uniq([1, 1, 1, 1])).toEqual([1])
    expect(uniq(['a', 'a', 'a'])).toEqual(['a'])
  })

  it('should handle large arrays efficiently', () => {
    const largeArray = Array(1000).fill(0).map((_, i) => i % 100)
    const result = uniq(largeArray)
    expect(result.length).toBe(100)
    expect(result).toEqual(Array(100).fill(0).map((_, i) => i))
  })
})
