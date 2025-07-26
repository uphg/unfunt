import { describe, it, expect } from 'vitest'
import { omitBy } from '../src/object'

describe('omitBy', () => {
  it('should exclude properties based on callback function', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const result = omitBy(obj, value => value > 2)
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('should exclude properties based on key callback', () => {
    const obj = { a: 1, b: 2, c: 3, foo: 4 }
    const result = omitBy(obj, (value, key) => key.startsWith('f'))
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should exclude all properties when callback always returns true', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omitBy(obj, () => true)
    expect(result).toEqual({})
  })

  it('should keep all properties when callback always returns false', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omitBy(obj, () => false)
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should handle mixed value types', () => {
    const obj = {
      str: 'hello',
      num: 42,
      bool: true,
      arr: [1, 2, 3],
      obj: { nested: true }
    }
    const result = omitBy(obj, value => typeof value === 'string' || typeof value === 'boolean')
    expect(result).toEqual({
      num: 42,
      arr: [1, 2, 3],
      obj: { nested: true }
    })
  })

  it('should return empty object for null input', () => {
    const result = omitBy(null, () => true)
    expect(result).toEqual({})
  })

  it('should return empty object for undefined input', () => {
    const result = omitBy(undefined, () => true)
    expect(result).toEqual({})
  })

  it('should handle empty object', () => {
    const result = omitBy({}, () => true)
    expect(result).toEqual({})
  })

  it('should handle symbol properties', () => {
    const sym1 = Symbol('test1')
    const sym2 = Symbol('test2')
    const obj = {
      a: 1,
      [sym1]: 'symbol1',
      [sym2]: 'symbol2',
      b: 2
    }
    const result = omitBy(obj, value => typeof value === 'string')
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('should work with different callback return types', () => {
    const obj = { a: 1, b: 0, c: '', d: null, e: undefined, f: false }

    // Truthy/falsy evaluation
    const result = omitBy(obj, value => !value)
    expect(result).toEqual({ a: 1 })
  })

  it('should not modify original object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const original = { ...obj }
    omitBy(obj, value => value > 1)
    expect(obj).toEqual(original)
  })

  it('should handle callback with both value and key parameters', () => {
    const obj = {
      user_name: 'john',
      user_age: 25,
      admin_role: 'admin',
      temp_data: 'temporary'
    }
    const result = omitBy(obj, (value, key) =>
      key.startsWith('user_') || key.startsWith('temp_')
    )
    expect(result).toEqual({ admin_role: 'admin' })
  })
})
