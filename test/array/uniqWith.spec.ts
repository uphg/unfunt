import { describe, it, expect } from 'vitest'
import { uniqWith } from '../../src/array'

describe('uniqWith', () => {
  it('should remove duplicates using comparator function', () => {
    const objects = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 2 }
    ]
    const result = uniqWith(objects, (a, b) => a.x === b.x && a.y === b.y)
    expect(result).toEqual([{ x: 1, y: 2 }, { x: 2, y: 1 }])
  })

  it('should preserve order of first occurrence', () => {
    const objects = [
      { name: 'john', age: 30 },
      { name: 'jane', age: 25 },
      { name: 'john', age: 35 },
      { name: 'bob', age: 30 }
    ]
    const result = uniqWith(objects, (a, b) => a.name === b.name)
    expect(result).toEqual([
      { name: 'john', age: 30 },
      { name: 'jane', age: 25 },
      { name: 'bob', age: 30 }
    ])
  })

  it('should handle primitive arrays with custom comparator', () => {
    const numbers = [1, 2, 1.0, 3, 2.0]
    const result = uniqWith(numbers, (a, b) => Math.floor(a) === Math.floor(b))
    expect(result).toEqual([1, 2, 3])
  })

  it('should handle empty array', () => {
    const result = uniqWith([], (a, b) => a === b)
    expect(result).toEqual([])
  })

  it('should handle single element array', () => {
    const result = uniqWith([{ x: 1 }], (a, b) => a.x === b.x)
    expect(result).toEqual([{ x: 1 }])
  })

  it('should handle array with no duplicates', () => {
    const objects = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 }
    ]
    const result = uniqWith(objects, (a, b) => a.x === b.x && a.y === b.y)
    expect(result).toEqual(objects)
  })

  it('should handle array with all duplicates', () => {
    const objects = [
      { x: 1, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 1 }
    ]
    const result = uniqWith(objects, (a, b) => a.x === b.x && a.y === b.y)
    expect(result).toEqual([{ x: 1, y: 1 }])
  })

  it('should return empty array for non-array input', () => {
    expect(uniqWith(null as any, (a, b) => a === b)).toEqual([])
    expect(uniqWith(undefined as any, (a, b) => a === b)).toEqual([])
    expect(uniqWith('string' as any, (a, b) => a === b)).toEqual([])
  })

  it('should handle complex object comparison', () => {
    const users = [
      { profile: { name: 'john', location: 'NY' } },
      { profile: { name: 'jane', location: 'CA' } },
      { profile: { name: 'john', location: 'TX' } },
      { profile: { name: 'john', location: 'NY' } }
    ]
    const result = uniqWith(users, (a, b) =>
      a.profile.name === b.profile.name && a.profile.location === b.profile.location
    )
    expect(result).toEqual([
      { profile: { name: 'john', location: 'NY' } },
      { profile: { name: 'jane', location: 'CA' } },
      { profile: { name: 'john', location: 'TX' } }
    ])
  })

  it('should handle string comparison with case insensitive', () => {
    const strings = ['Hello', 'world', 'HELLO', 'World', 'hello']
    const result = uniqWith(strings, (a, b) => a.toLowerCase() === b.toLowerCase())
    expect(result).toEqual(['Hello', 'world'])
  })

  it('should handle null and undefined values', () => {
    const data = [null, undefined, null, 1, undefined, 1]
    const result = uniqWith(data, (a, b) => a === b)
    expect(result).toEqual([null, undefined, 1])
  })

  it('should handle array with mixed data types', () => {
    const mixed = [
      { type: 'string', value: 'hello' },
      { type: 'number', value: 42 },
      { type: 'string', value: 'world' },
      { type: 'number', value: 42 }
    ]
    const result = uniqWith(mixed, (a, b) => a.type === b.type && a.value === b.value)
    expect(result).toEqual([
      { type: 'string', value: 'hello' },
      { type: 'number', value: 42 },
      { type: 'string', value: 'world' }
    ])
  })

  it('should handle comparator that always returns false', () => {
    const data = [1, 1, 2, 2, 3, 3]
    const result = uniqWith(data, () => false)
    expect(result).toEqual(data)
  })

  it('should handle comparator that always returns true', () => {
    const data = [1, 2, 3, 4, 5]
    const result = uniqWith(data, () => true)
    expect(result).toEqual([1])
  })

  it('should handle date objects', () => {
    const dates = [
      new Date('2023-01-01'),
      new Date('2023-01-02'),
      new Date('2023-01-01'),
      new Date('2023-01-03')
    ]
    const result = uniqWith(dates, (a, b) => a.getTime() === b.getTime())
    expect(result.length).toBe(3)
    expect(result[0]).toEqual(new Date('2023-01-01'))
    expect(result[1]).toEqual(new Date('2023-01-02'))
    expect(result[2]).toEqual(new Date('2023-01-03'))
  })
})
