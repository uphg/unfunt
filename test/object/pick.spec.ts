import { describe, it, expect } from 'vitest'
import { pick } from '../../src/object'

describe('pick', () => {
  it('should select specified keys from object', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const result = pick(obj, ['a', 'c'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should select single key from object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = pick(obj, ['b'])
    expect(result).toEqual({ b: 2 })
  })

  it('should return empty object when no keys are selected', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = pick(obj, [])
    expect(result).toEqual({})
  })

  it('should handle non-existent keys', () => {
    const obj = { a: 1, b: 2 }
    const result = pick(obj, ['c', 'd'])
    expect(result).toEqual({})
  })

  it('should handle mixed existing and non-existent keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = pick(obj, ['a', 'x', 'c', 'y'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should return empty object for null input', () => {
    const result = pick(null, ['a', 'b'])
    expect(result).toEqual({})
  })

  it('should return empty object for undefined input', () => {
    const result = pick(undefined, ['a', 'b'])
    expect(result).toEqual({})
  })

  it('should handle symbol keys', () => {
    const sym1 = Symbol('test1')
    const sym2 = Symbol('test2')
    const obj = { a: 1, [sym1]: 'symbol1', [sym2]: 'symbol2', b: 2 }
    const result = pick(obj, [sym1, 'a'])
    expect(result).toEqual({ a: 1, [sym1]: 'symbol1' })
  })

  it('should handle objects with various value types', () => {
    const obj = {
      str: 'hello',
      num: 42,
      bool: true,
      arr: [1, 2, 3],
      obj: { nested: true },
      func: () => 'test',
      nil: null,
      undef: undefined
    }
    const result = pick(obj, ['str', 'arr', 'nil'])
    expect(result).toEqual({
      str: 'hello',
      arr: [1, 2, 3],
      nil: null
    })
  })

  it('should not modify original object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const original = { ...obj }
    pick(obj, ['a', 'b'])
    expect(obj).toEqual(original)
  })

  it('should handle empty object', () => {
    const result = pick({}, ['a', 'b'])
    expect(result).toEqual({})
  })

  it('should handle property descriptors', () => {
    const obj = {}
    Object.defineProperty(obj, 'a', {
      value: 1,
      enumerable: true
    })
    Object.defineProperty(obj, 'b', {
      value: 2,
      enumerable: false
    })
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: true
    })

    const result = pick(obj, ['a', 'b', 'c'])
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })
})
