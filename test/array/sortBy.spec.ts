import { describe, it, expect } from 'vitest'
import { sortBy } from '../../src/array'

describe('sortBy', () => {
  const users = [
    { name: 'fred', age: 48 },
    { name: 'barney', age: 36 },
    { name: 'fred', age: 30 },
    { name: 'barney', age: 40 }
  ]

  it('should sort by single property', () => {
    const result = sortBy(users, 'age')
    expect(result).toEqual([
      { name: 'fred', age: 30 },
      { name: 'barney', age: 36 },
      { name: 'barney', age: 40 },
      { name: 'fred', age: 48 }
    ])
  })

  it('should sort by single function', () => {
    const result = sortBy(users, u => u.age)
    expect(result).toEqual([
      { name: 'fred', age: 30 },
      { name: 'barney', age: 36 },
      { name: 'barney', age: 40 },
      { name: 'fred', age: 48 }
    ])
  })

  it('should sort by multiple properties', () => {
    const result = sortBy(users, 'name', 'age')
    expect(result).toEqual([
      { name: 'barney', age: 36 },
      { name: 'barney', age: 40 },
      { name: 'fred', age: 30 },
      { name: 'fred', age: 48 }
    ])
  })

  it('should sort by mixed iterators (property and function)', () => {
    const result = sortBy(users, 'name', u => u.age)
    expect(result).toEqual([
      { name: 'barney', age: 36 },
      { name: 'barney', age: 40 },
      { name: 'fred', age: 30 },
      { name: 'fred', age: 48 }
    ])
  })

  it('should return empty array for empty input', () => {
    expect(sortBy([], 'name')).toEqual([])
  })

  it('should return empty array for non-array input', () => {
    expect(sortBy(null as any, 'name')).toEqual([])
    expect(sortBy(undefined as any, 'name')).toEqual([])
    expect(sortBy('string' as any, 'name')).toEqual([])
  })

  it('should handle single element array', () => {
    const singleUser = [{ name: 'john', age: 25 }]
    expect(sortBy(singleUser, 'age')).toEqual(singleUser)
  })

  it('should not modify original array', () => {
    const original = [...users]
    sortBy(users, 'age')
    expect(users).toEqual(original)
  })

  it('should sort strings', () => {
    const strings = ['zebra', 'apple', 'banana']
    const objects = strings.map(s => ({ value: s }))
    const result = sortBy(objects, 'value')
    expect(result).toEqual([
      { value: 'apple' },
      { value: 'banana' },
      { value: 'zebra' }
    ])
  })

  it('should handle primitive arrays', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6]
    const result = sortBy(numbers, x => x)
    expect(result).toEqual([1, 1, 2, 3, 4, 5, 6, 9])
  })

  it('should handle undefined and null values', () => {
    const data = [
      { name: 'john', value: null },
      { name: 'jane', value: 10 },
      { name: 'bob', value: undefined },
      { name: 'alice', value: 5 }
    ]
    const result = sortBy(data, 'value')
    expect(result[result.length - 2].value).toBe(5)
    expect(result[result.length - 1].value).toBe(10)
  })

  it('should handle nested object properties', () => {
    const nested = [
      { user: { info: { age: 30 } } },
      { user: { info: { age: 25 } } },
      { user: { info: { age: 35 } } }
    ]
    const result = sortBy(nested, item => item.user.info.age)
    expect(result[0].user.info.age).toBe(25)
    expect(result[1].user.info.age).toBe(30)
    expect(result[2].user.info.age).toBe(35)
  })

  it('should handle boolean values', () => {
    const data = [
      { name: 'a', active: true },
      { name: 'b', active: false },
      { name: 'c', active: true },
      { name: 'd', active: false }
    ]
    const result = sortBy(data, 'active')
    expect(result.slice(0, 2).every(item => !item.active)).toBe(true)
    expect(result.slice(2, 4).every(item => item.active)).toBe(true)
  })

  it('should handle date values', () => {
    const dates = [
      { date: new Date('2023-01-01') },
      { date: new Date('2022-01-01') },
      { date: new Date('2024-01-01') }
    ]
    const result = sortBy(dates, 'date')
    expect(result[0].date.getFullYear()).toBe(2022)
    expect(result[1].date.getFullYear()).toBe(2023)
    expect(result[2].date.getFullYear()).toBe(2024)
  })
})
