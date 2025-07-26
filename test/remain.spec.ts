import { describe, it, expect } from 'vitest'
import { remain } from '../src/array'

describe('remain', () => {
  it('should return remaining elements after removing from start position', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = remain(arr, 2)
    expect(result).toEqual([1, 2])
  })

  it('should remove specified count from start position', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = remain(arr, 1, 2)
    expect(result).toEqual([1, 4, 5])
  })

  it('should handle start position 0', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = remain(arr, 0, 2)
    expect(result).toEqual([3, 4, 5])
  })

  it('should handle single element removal', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = remain(arr, 2, 1)
    expect(result).toEqual([1, 2, 4, 5])
  })

  it('should return empty array when start is not a valid length', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(remain(arr, -1)).toEqual([])
    expect(remain(arr, 1.5)).toEqual([])
    expect(remain(arr, NaN)).toEqual([])
  })

  it('should handle start position beyond array length', () => {
    const arr = [1, 2, 3]
    const result = remain(arr, 5, 1)
    expect(result).toEqual([1, 2, 3])
  })

  it('should handle deleteCount larger than remaining elements', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = remain(arr, 2, 10)
    expect(result).toEqual([1, 2])
  })

  it('should handle deleteCount of 0', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = remain(arr, 2, 0)
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('should use default deleteCount when not specified', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = remain(arr, 2)
    // default deleteCount should be array.length - 1, removing from position 2 to end
    expect(result).toEqual([1, 2])
  })

  it('should handle empty array', () => {
    const result = remain([], 0, 1)
    expect(result).toEqual([])
  })

  it('should handle single element array', () => {
    const arr = [42]
    expect(remain(arr, 0, 1)).toEqual([])
    expect(remain(arr, 0, 0)).toEqual([42])
    expect(remain(arr, 1, 1)).toEqual([42])
  })

  it('should not modify original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const original = [...arr]
    remain(arr, 2, 1)
    expect(arr).toEqual(original)
  })

  it('should work with different data types', () => {
    const arr = ['a', 'b', 'c', 'd', 'e']
    const result = remain(arr, 1, 2)
    expect(result).toEqual(['a', 'd', 'e'])
  })

  it('should handle mixed data types', () => {
    const arr = [1, 'hello', true, null, undefined]
    const result = remain(arr, 2, 1)
    expect(result).toEqual([1, 'hello', null, undefined])
  })
})
