import { describe, it, expect } from 'vitest'
import { omit } from '../src/object'

describe('omit', () => {
  it('should exclude specified keys from object', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const result = omit(obj, ['b', 'd'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should exclude single key from object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omit(obj, ['b'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should return empty object when all keys are excluded', () => {
    const obj = { a: 1, b: 2 }
    const result = omit(obj, ['a', 'b'])
    expect(result).toEqual({})
  })

  it('should return same object when no keys are excluded', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omit(obj, [])
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should handle non-existent keys', () => {
    const obj = { a: 1, b: 2 }
    const result = omit(obj, ['c', 'd'])
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('should handle mixed existing and non-existent keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omit(obj, ['b', 'x', 'y'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should return empty object for null input', () => {
    const result = omit(null, ['a', 'b'])
    expect(result).toEqual({})
  })

  it('should return empty object for undefined input', () => {
    const result = omit(undefined, ['a', 'b'])
    expect(result).toEqual({})
  })

  it('should handle symbol keys', () => {
    const sym1 = Symbol('test1')
    const sym2 = Symbol('test2')
    const obj = { a: 1, [sym1]: 'symbol1', [sym2]: 'symbol2' }
    const result = omit(obj, [sym1])
    expect(result).toEqual({ a: 1, [sym2]: 'symbol2' })
  })

  it('should handle objects with nested properties', () => {
    const obj = {
      a: 1,
      b: { nested: true },
      c: [1, 2, 3],
      d: 'string'
    }
    const result = omit(obj, ['b', 'c'])
    expect(result).toEqual({ a: 1, d: 'string' })
  })

  it('should not modify original object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const original = { ...obj }
    omit(obj, ['b'])
    expect(obj).toEqual(original)
  })
})
