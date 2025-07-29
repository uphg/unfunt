import { describe, it, expect } from 'vitest'
import { pickBy } from '../../src/object'

describe('pickBy', () => {
  it('should select properties based on callback function', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const result = pickBy(obj, value => value > 2)
    expect(result).toEqual({ c: 3, d: 4 })
  })

  it('should select properties based on key callback', () => {
    const obj = { a: 1, b: 2, foo: 3, bar: 4 }
    const result = pickBy(obj, (value, key) => key.startsWith('f'))
    expect(result).toEqual({ foo: 3 })
  })

  it('should select all properties when callback always returns true', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = pickBy(obj, () => true)
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should return empty object when callback always returns false', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = pickBy(obj, () => false)
    expect(result).toEqual({})
  })

  it('should handle mixed value types', () => {
    const obj = {
      str: 'hello',
      num: 42,
      bool: true,
      arr: [1, 2, 3],
      obj: { nested: true }
    }
    const result = pickBy(obj, value => typeof value === 'string' || typeof value === 'number')
    expect(result).toEqual({
      str: 'hello',
      num: 42
    })
  })

  it('should return empty object for null input', () => {
    const result = pickBy(null, () => true)
    expect(result).toEqual({})
  })

  it('should return empty object for undefined input', () => {
    const result = pickBy(undefined, () => true)
    expect(result).toEqual({})
  })

  it('should handle empty object', () => {
    const result = pickBy({}, () => true)
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
    const result = pickBy(obj, value => typeof value === 'string')
    expect(result).toEqual({
      [sym1]: 'symbol1',
      [sym2]: 'symbol2'
    })
  })

  it('should work with different callback return types', () => {
    const obj = { a: 1, b: 0, c: '', d: null, e: undefined, f: false, g: 'test' }

    // Truthy/falsy evaluation
    const result = pickBy(obj, value => value)
    expect(result).toEqual({ a: 1, g: 'test' })
  })

  it('should not modify original object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const original = { ...obj }
    pickBy(obj, value => value > 1)
    expect(obj).toEqual(original)
  })

  it('should handle callback with both value and key parameters', () => {
    const obj = {
      user_name: 'john',
      user_age: 25,
      admin_role: 'admin',
      temp_data: 'temporary'
    }
    const result = pickBy(obj, (value, key) =>
      key.startsWith('user_') || key === 'admin_role'
    )
    expect(result).toEqual({
      user_name: 'john',
      user_age: 25,
      admin_role: 'admin'
    })
  })

  it('should handle objects with various property types', () => {
    const func = () => 'test'
    const obj = {
      str: 'hello',
      num: 42,
      bool: true,
      arr: [1, 2, 3],
      obj: { nested: true },
      func: func,
      nil: null,
      undef: undefined
    }
    const result = pickBy(obj, value => value != null)
    expect(result).toEqual({
      str: 'hello',
      num: 42,
      bool: true,
      arr: [1, 2, 3],
      obj: { nested: true },
      func: func
    })
  })
})
