import { describe, it, expect } from 'vitest'
import { castArray } from '../../src/array'

describe('castArray', () => {
  it('should wrap non-array values in array', () => {
    expect(castArray(1)).toEqual([1])
    expect(castArray('abc')).toEqual(['abc'])
    expect(castArray(true)).toEqual([true])
    expect(castArray(null)).toEqual([null])
    expect(castArray(undefined)).toEqual([undefined])
  })

  it('should return array as-is', () => {
    const arr = [1, 2, 3]
    expect(castArray(arr)).toBe(arr)
    expect(castArray([1, 2, 3])).toEqual([1, 2, 3])
    expect(castArray([])).toEqual([])
  })

  it('should handle objects', () => {
    const obj = { a: 1, b: 2 }
    expect(castArray(obj)).toEqual([obj])
    expect(castArray({})).toEqual([{}])
  })

  it('should handle functions', () => {
    const fn = () => 'test'
    expect(castArray(fn)).toEqual([fn])
  })

  it('should handle symbols', () => {
    const sym = Symbol('test')
    expect(castArray(sym)).toEqual([sym])
  })

  it('should handle dates', () => {
    const date = new Date()
    expect(castArray(date)).toEqual([date])
  })

  it('should handle nested arrays', () => {
    const nestedArray = [[1, 2], [3, 4]]
    expect(castArray(nestedArray)).toBe(nestedArray)
    expect(castArray(nestedArray)).toEqual([[1, 2], [3, 4]])
  })

  it('should preserve array type', () => {
    const readonlyArray = [1, 2, 3] as const
    const result = castArray(readonlyArray)
    expect(result).toBe(readonlyArray)
  })

  it('should handle array-like objects as non-arrays', () => {
    const nodeList = { 0: 'a', 1: 'b', length: 2 }
    expect(castArray(nodeList)).toEqual([nodeList])
  })

  it('should handle zero and negative numbers', () => {
    expect(castArray(0)).toEqual([0])
    expect(castArray(-1)).toEqual([-1])
    expect(castArray(-0)).toEqual([-0])
  })

  it('should handle NaN and Infinity', () => {
    expect(castArray(NaN)).toEqual([NaN])
    expect(castArray(Infinity)).toEqual([Infinity])
    expect(castArray(-Infinity)).toEqual([-Infinity])
  })
})
