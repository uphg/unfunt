import { describe, it, expect } from 'vitest'
import { range } from '../../src/array'

describe('range', () => {
  it('should generate range from 0 to n when only one argument provided', () => {
    expect(range(4)).toEqual([0, 1, 2, 3])
    expect(range(0)).toEqual([])
    expect(range(1)).toEqual([0])
  })

  it('should generate range from start to end', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4])
    expect(range(3, 7)).toEqual([3, 4, 5, 6])
    expect(range(0, 3)).toEqual([0, 1, 2])
  })

  it('should generate range with custom step', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8])
    expect(range(1, 10, 3)).toEqual([1, 4, 7])
    expect(range(0, 20, 5)).toEqual([0, 5, 10, 15])
  })

  it('should generate descending range with negative step', () => {
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3])
    expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1])
    expect(range(10, 0, -2)).toEqual([10, 8, 6, 4, 2])
  })

  it('should return empty array when step is 0', () => {
    expect(range(0, 5, 0)).toEqual([])
    expect(range(5, 10, 0)).toEqual([])
  })

  it('should return empty array when start equals end', () => {
    expect(range(5, 5)).toEqual([])
    expect(range(0, 0)).toEqual([])
    expect(range(-5, -5)).toEqual([])
  })

  it('should handle negative numbers', () => {
    expect(range(-3, 1)).toEqual([-3, -2, -1, 0])
    expect(range(-5, -2)).toEqual([-5, -4, -3])
  })

  it('should handle decimal step', () => {
    expect(range(0, 1, 0.2)).toEqual([0, 0.2, 0.4, 0.6000000000000001, 0.8])
    expect(range(1, 2, 0.5)).toEqual([1, 1.5])
  })

  it('should return empty array when step direction is wrong', () => {
    expect(range(0, 5, -1)).toEqual([])
    expect(range(5, 0, 1)).toEqual([])
  })

  it('should handle large ranges efficiently', () => {
    const result = range(0, 1000, 100)
    expect(result).toEqual([0, 100, 200, 300, 400, 500, 600, 700, 800, 900])
    expect(result.length).toBe(10)
  })
})
