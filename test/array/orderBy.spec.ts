import { describe, it, expect } from 'vitest'
import { orderBy } from '../../src/array'

describe('orderBy', () => {
  const users = [
    { name: 'fred', age: 48 },
    { name: 'barney', age: 36 },
    { name: 'fred', age: 30 },
    { name: 'barney', age: 40 }
  ]

  it('should sort by single property ascending', () => {
    const result = orderBy(users, ['age'], ['asc'])
    expect(result).toEqual([
      { name: 'fred', age: 30 },
      { name: 'barney', age: 36 },
      { name: 'barney', age: 40 },
      { name: 'fred', age: 48 }
    ])
  })

  it('should sort by single property descending', () => {
    const result = orderBy(users, ['age'], ['desc'])
    expect(result).toEqual([
      { name: 'fred', age: 48 },
      { name: 'barney', age: 40 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 30 }
    ])
  })

  it('should sort by multiple properties', () => {
    const result = orderBy(users, ['name', 'age'], ['asc', 'desc'])
    expect(result).toEqual([
      { name: 'barney', age: 40 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 48 },
      { name: 'fred', age: 30 }
    ])
  })

  it('should default to ascending when order not specified', () => {
    const result = orderBy(users, ['age'])
    expect(result).toEqual([
      { name: 'fred', age: 30 },
      { name: 'barney', age: 36 },
      { name: 'barney', age: 40 },
      { name: 'fred', age: 48 }
    ])
  })

  it('should handle function iterators', () => {
    const result = orderBy(users, [u => u.age], ['desc'])
    expect(result).toEqual([
      { name: 'fred', age: 48 },
      { name: 'barney', age: 40 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 30 }
    ])
  })

  it('should handle mixed iterators (property and function)', () => {
    const result = orderBy(users, ['name', u => u.age], ['asc', 'desc'])
    expect(result).toEqual([
      { name: 'barney', age: 40 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 48 },
      { name: 'fred', age: 30 }
    ])
  })

  it('should return empty array for empty input', () => {
    expect(orderBy([], ['name'])).toEqual([])
  })

  it('should return empty array for non-array input', () => {
    expect(orderBy(null as any, ['name'])).toEqual([])
    expect(orderBy(undefined as any, ['name'])).toEqual([])
    expect(orderBy('string' as any, ['name'])).toEqual([])
  })

  it('should handle single element array', () => {
    const singleUser = [{ name: 'john', age: 25 }]
    expect(orderBy(singleUser, ['age'])).toEqual(singleUser)
  })

  it('should not modify original array', () => {
    const original = [...users]
    orderBy(users, ['age'], ['desc'])
    expect(users).toEqual(original)
  })

  it('should handle string values', () => {
    const strings = ['zebra', 'apple', 'banana']
    const objects = strings.map(s => ({ value: s }))
    const result = orderBy(objects, ['value'], ['asc'])
    expect(result).toEqual([
      { value: 'apple' },
      { value: 'banana' },
      { value: 'zebra' }
    ])
  })

  it('should handle undefined and null values', () => {
    const data = [
      { name: 'john', value: null },
      { name: 'jane', value: 10 },
      { name: 'bob', value: undefined },
      { name: 'alice', value: 5 }
    ]
    const result = orderBy(data, ['value'], ['asc'])
    expect(result[result.length - 2].value).toBe(5)
    expect(result[result.length - 1].value).toBe(10)
  })

  it('should handle nested object properties', () => {
    const nested = [
      { user: { info: { age: 30 } } },
      { user: { info: { age: 25 } } },
      { user: { info: { age: 35 } } }
    ]
    const result = orderBy(nested, [item => item.user.info.age], ['asc'])
    expect(result[0].user.info.age).toBe(25)
    expect(result[1].user.info.age).toBe(30)
    expect(result[2].user.info.age).toBe(35)
  })
})
