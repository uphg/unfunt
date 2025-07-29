import { describe, it, expect } from 'vitest'
import { assignIn } from '../../src/object'

describe('assignIn', () => {
  it('should merge objects at root level', () => {
    const result = assignIn({ a: 1 }, { b: 2 }, { c: 3 })
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should deeply merge nested objects', () => {
    const result = assignIn({ a: { x: 1 } }, { a: { y: 2 } })
    expect(result).toEqual({ a: { x: 1, y: 2 } })
  })

  it('should modify target object in place', () => {
    const target = { a: 1 }
    const result = assignIn(target, { b: 2 })
    expect(target).toBe(result)
    expect(target).toEqual({ a: 1, b: 2 })
  })

  it('should overwrite primitive values', () => {
    const result = assignIn({ a: 1, b: 2 }, { a: 3, c: 4 })
    expect(result).toEqual({ a: 3, b: 2, c: 4 })
  })

  it('should handle nested object merging with multiple levels', () => {
    const target = {
      a: {
        b: { x: 1 },
        c: 2
      },
      d: 3
    }
    const source = {
      a: {
        b: { y: 2 },
        e: 4
      },
      f: 5
    }
    const result = assignIn(target, source)
    expect(result).toEqual({
      a: {
        b: { x: 1, y: 2 },
        c: 2,
        e: 4
      },
      d: 3,
      f: 5
    })
  })

  it('should overwrite arrays instead of merging', () => {
    const result = assignIn({ arr: [1, 2] }, { arr: [3, 4] })
    expect(result).toEqual({ arr: [3, 4] })
  })

  it('should handle multiple source objects', () => {
    const result = assignIn(
      { a: { x: 1 } },
      { a: { y: 2 } },
      { a: { z: 3 } },
      { b: 4 }
    )
    expect(result).toEqual({
      a: { x: 1, y: 2, z: 3 },
      b: 4
    })
  })

  it('should return target when target is not an object', () => {
    expect(assignIn(null, { a: 1 })).toBe(null)
    expect(assignIn(undefined, { a: 1 })).toBe(undefined)
    expect(assignIn(42, { a: 1 })).toBe(42)
    expect(assignIn('string', { a: 1 })).toBe('string')
  })

  it('should skip non-object sources', () => {
    const target = { a: 1 }
    const result = assignIn(target, null, undefined, 'string', 42, { b: 2 })
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('should handle empty source objects', () => {
    const result = assignIn({ a: 1 }, {}, { b: 2 })
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('should handle nested null and undefined values', () => {
    const result = assignIn(
      { a: { x: 1 } },
      { a: { y: null } },
      { a: { z: undefined } }
    )
    expect(result).toEqual({
      a: { x: 1, y: null, z: undefined }
    })
  })

  it('should handle functions and dates', () => {
    const fn = () => 'test'
    const date = new Date('2023-01-01')
    const result = assignIn(
      { func: () => 'old' },
      { func: fn, date: date }
    )
    expect(result.func).toBe(fn)
    expect(result.date).toBe(date)
  })

  it('should handle symbols as keys', () => {
    const sym = Symbol('test')
    const source = { [sym]: 'symbol value' }
    const result = assignIn({ a: 1 }, source)
    expect(result[sym]).toBe('symbol value')
    expect(result.a).toBe(1)
  })

  it('should handle inherited properties', () => {
    const proto = { inherited: 'value' }
    const source = Object.create(proto)
    source.own = 'own value'
    const result = assignIn({ a: 1 }, source)
    expect(result).toEqual({ a: 1, own: 'own value' })
    expect(result.inherited).toBeUndefined()
  })

  it('should handle nested object replacement when source is not object', () => {
    const result = assignIn(
      { a: { x: 1, y: 2 } },
      { a: 'string' }
    )
    expect(result).toEqual({ a: 'string' })
  })

  it('should handle boolean and number values', () => {
    const result = assignIn(
      { bool: false, num: 0 },
      { bool: true, num: 42, str: 'hello' }
    )
    expect(result).toEqual({ bool: true, num: 42, str: 'hello' })
  })

  it('should preserve getters and setters', () => {
    const source = {
      get computed() { return 'computed value' },
      set data(value) { this._data = value }
    }
    const result = assignIn({ a: 1 }, source)
    expect(result.computed).toBe('computed value')
    expect(typeof Object.getOwnPropertyDescriptor(result, 'data')?.set).toBe('function')
  })
})
