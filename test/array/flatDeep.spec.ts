import { describe, it, expect } from 'vitest'
import { flatDeep } from '../../src/array'

describe('flatDeep', () => {
  it('should flatten nested arrays completely by default', () => {
    expect(flatDeep([1, [2, [3, [4]], 5]])).toEqual([1, 2, 3, 4, 5])
    expect(flatDeep([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('should flatten to specified depth', () => {
    expect(flatDeep([1, [2, [3, [4]], 5]], 1)).toEqual([1, 2, [3, [4]], 5])
    expect(flatDeep([1, [2, [3, [4]], 5]], 2)).toEqual([1, 2, 3, [4], 5])
    expect(flatDeep([1, [2, [3, [4]], 5]], 3)).toEqual([1, 2, 3, 4, 5])
  })

  it('should handle depth of 0', () => {
    expect(flatDeep([1, [2, 3]], 0)).toEqual([1, [2, 3]])
    expect(flatDeep([1, [2, [3]]], 0)).toEqual([1, [2, [3]]])
  })

  it('should handle empty arrays', () => {
    expect(flatDeep([])).toEqual([])
    expect(flatDeep([[], []])).toEqual([])
    expect(flatDeep([1, [], 2])).toEqual([1, 2])
  })

  it('should handle arrays with no nesting', () => {
    expect(flatDeep([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
    expect(flatDeep(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
  })

  it('should handle mixed data types', () => {
    expect(flatDeep([1, ['a', [true, null]], undefined])).toEqual([1, 'a', true, null, undefined])
    expect(flatDeep([{ a: 1 }, [{ b: 2 }, [{ c: 3 }]]])).toEqual([{ a: 1 }, { b: 2 }, { c: 3 }])
  })

  it('should return empty array for non-array input', () => {
    expect(flatDeep(null as any)).toEqual([])
    expect(flatDeep(undefined as any)).toEqual([])
    expect(flatDeep('string' as any)).toEqual([])
    expect(flatDeep(123 as any)).toEqual([])
  })

  it('should handle deeply nested arrays', () => {
    const deepArray = [1, [2, [3, [4, [5, [6]]]]]]
    expect(flatDeep(deepArray)).toEqual([1, 2, 3, 4, 5, 6])
    expect(flatDeep(deepArray, 3)).toEqual([1, 2, 3, 4, [5, [6]]])
  })

  it('should handle arrays with undefined and null elements', () => {
    expect(flatDeep([1, [null, [undefined, 2]]])).toEqual([1, null, undefined, 2])
    expect(flatDeep([undefined, [null]])).toEqual([undefined, null])
  })

  it('should handle sparse arrays', () => {
    // eslint-disable-next-line no-sparse-arrays
    const sparseArray = [1, , [2, , 3]]
    expect(flatDeep(sparseArray)).toEqual([1, undefined, 2, undefined, 3])
  })

  it('should handle array-like nested structures', () => {
    expect(flatDeep([1, [2, 3], 4])).toEqual([1, 2, 3, 4])
    expect(flatDeep([[1], [2], [3]])).toEqual([1, 2, 3])
  })

  it('should handle negative depth gracefully', () => {
    expect(flatDeep([1, [2, 3]], -1)).toEqual([1, [2, 3]])
    expect(flatDeep([1, [2, [3]]], -5)).toEqual([1, [2, [3]]])
  })
})
