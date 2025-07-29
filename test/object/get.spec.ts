import { describe, it, expect } from 'vitest'
import { get } from '../../src/object'

describe('get', () => {
  const testObject = {
    'a': {
      b: {
        c: 3,
        d: null
      }
    },
    'arr': [1, 2, { x: 'nested' }],
    'dot.key': 'dot value',
    '0': 'numeric key'
  }

  it('should get nested property using dot notation', () => {
    expect(get(testObject, 'a.b.c')).toBe(3)
    expect(get(testObject, 'a.b.d')).toBe(null)
  })

  it('should get nested property using array path', () => {
    expect(get(testObject, ['a', 'b', 'c'])).toBe(3)
    expect(get(testObject, ['a', 'b', 'd'])).toBe(null)
  })

  it('should get array elements', () => {
    expect(get(testObject, 'arr.0')).toBe(1)
    expect(get(testObject, 'arr.2.x')).toBe('nested')
  })

  it('should get array elements using array path', () => {
    expect(get(testObject, ['arr', 0])).toBe(1)
    expect(get(testObject, ['arr', 2, 'x'])).toBe('nested')
  })

  it('should return default value for non-existent paths', () => {
    expect(get(testObject, 'a.b.e', 'default')).toBe('default')
    expect(get(testObject, 'x.y.z', 42)).toBe(42)
  })

  it('should return undefined when no default value provided', () => {
    expect(get(testObject, 'a.b.e')).toBeUndefined()
    expect(get(testObject, 'nonexistent')).toBeUndefined()
  })

  it('should handle null and undefined objects', () => {
    expect(get(null, 'a.b.c', 'default')).toBe('default')
    expect(get(undefined, 'a.b.c', 'default')).toBe('default')
    expect(get(null, 'a.b.c')).toBeUndefined()
  })

  it('should handle empty paths', () => {
    expect(get(testObject, '', 'default')).toBe('default')
    expect(get(testObject, [])).toBe(testObject)
  })

  it('should handle root level properties', () => {
    expect(get(testObject, '0')).toBe('numeric key')
    expect(get({ simple: 'value' }, 'simple')).toBe('value')
  })

  it('should handle bracket notation in string paths', () => {
    expect(get(testObject, 'arr[0]')).toBe(1)
    expect(get(testObject, 'arr[2].x')).toBe('nested')
    expect(get(testObject, 'a[b][c]')).toBe(3)
  })

  it('should handle mixed bracket and dot notation', () => {
    expect(get(testObject, 'arr[2].x')).toBe('nested')
    expect(get(testObject, 'a.b[c]')).toBe(3)
  })

  it('should handle property names with dots', () => {
    expect(get(testObject, ['dot.key'])).toBe('dot value')
  })

  it('should handle numeric string paths', () => {
    const obj = { 123: 'numeric string key' }
    expect(get(obj, '123')).toBe('numeric string key')
    expect(get(obj, [123])).toBe('numeric string key')
  })

  it('should handle undefined values in path', () => {
    const obj = { a: { b: undefined } }
    expect(get(obj, 'a.b', 'default')).toBe('default')
    expect(get(obj, 'a.b')).toBeUndefined()
  })

  it('should handle path through null values', () => {
    const obj = { a: null }
    expect(get(obj, 'a.b.c', 'default')).toBe('default')
    expect(get(obj, 'a.b')).toBeUndefined()
  })

  it('should handle path through primitive values', () => {
    const obj = { a: 'string' }
    expect(get(obj, 'a.length')).toBe(6)
    expect(get(obj, 'a.charAt', 'default')).toBe('default')
  })

  it('should handle deeply nested paths', () => {
    const deep = {
      level1: {
        level2: {
          level3: {
            level4: {
              value: 'deep value'
            }
          }
        }
      }
    }
    expect(get(deep, 'level1.level2.level3.level4.value')).toBe('deep value')
    expect(get(deep, ['level1', 'level2', 'level3', 'level4', 'value'])).toBe('deep value')
  })

  it('should handle symbols in path', () => {
    const sym = Symbol('test')
    const obj = { [sym]: 'symbol value' }
    expect(get(obj, [sym])).toBe('symbol value')
  })

  it('should handle special characters in keys', () => {
    const obj = {
      'key with spaces': 'space value',
      'key-with-dashes': 'dash value',
      'key_with_underscores': 'underscore value'
    }
    expect(get(obj, ['key with spaces'])).toBe('space value')
    expect(get(obj, ['key-with-dashes'])).toBe('dash value')
    expect(get(obj, ['key_with_underscores'])).toBe('underscore value')
  })

  it('should handle function default values', () => {
    const defaultFn = () => 'function default'
    expect(get({}, 'nonexistent', defaultFn)).toBe(defaultFn)
  })

  it('should handle boolean and number objects', () => {
    expect(get(42, 'toString', 'default')).toBe('default')
    expect(get(true, 'valueOf', 'default')).toBe('default')
  })

  it('should handle array-like objects', () => {
    const arrayLike = { 0: 'first', 1: 'second', length: 2 }
    expect(get(arrayLike, '0')).toBe('first')
    expect(get(arrayLike, 'length')).toBe(2)
  })
})
