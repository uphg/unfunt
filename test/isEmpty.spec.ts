import { describe, it, expect } from 'vitest'
import { isEmpty } from '../src/typed'

describe('isEmpty', () => {
  it('should return true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })

  it('should return true for boolean values', () => {
    expect(isEmpty(true)).toBe(true)
    expect(isEmpty(false)).toBe(true)
  })

  it('should return true for empty arrays', () => {
    expect(isEmpty([])).toBe(true)
  })

  it('should return false for non-empty arrays', () => {
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty([1, 2, 3])).toBe(false)
    expect(isEmpty(['a'])).toBe(false)
  })

  it('should return true for empty strings', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('should return false for non-empty strings', () => {
    expect(isEmpty('a')).toBe(false)
    expect(isEmpty('hello')).toBe(false)
    expect(isEmpty(' ')).toBe(false)
  })

  it('should return true for empty array-like objects', () => {
    const arrayLike = { length: 0, splice: () => {} }
    expect(isEmpty(arrayLike)).toBe(true)
  })

  it('should return false for non-empty array-like objects', () => {
    const arrayLike = { 0: 'a', length: 1, splice: () => {} }
    expect(isEmpty(arrayLike)).toBe(false)
  })

  it('should return true for empty Map', () => {
    expect(isEmpty(new Map())).toBe(true)
  })

  it('should return false for non-empty Map', () => {
    const map = new Map()
    map.set('key', 'value')
    expect(isEmpty(map)).toBe(false)
  })

  it('should return true for empty Set', () => {
    expect(isEmpty(new Set())).toBe(true)
  })

  it('should return false for non-empty Set', () => {
    const set = new Set()
    set.add('value')
    expect(isEmpty(set)).toBe(false)
  })

  it('should return true for empty objects', () => {
    expect(isEmpty({})).toBe(true)
    expect(isEmpty(Object.create(null))).toBe(true)
  })

  it('should return false for non-empty objects', () => {
    expect(isEmpty({ a: 1 })).toBe(false)
    expect(isEmpty({ length: 0 })).toBe(false)
  })

  it('should handle objects with symbol properties', () => {
    const sym = Symbol('test')
    // Symbol properties are not enumerable by Object.keys(), so isEmpty returns true
    expect(isEmpty({ [sym]: 'value' })).toBe(true)
  })

  it('should handle functions', () => {
    // Functions are objects but have no enumerable properties, so isEmpty returns true
    expect(isEmpty(() => {})).toBe(true)
    expect(isEmpty(function() {})).toBe(true)
  })

  it('should handle numbers', () => {
    // Numbers are objects but have no enumerable properties, so isEmpty returns true
    expect(isEmpty(0)).toBe(true)
    expect(isEmpty(42)).toBe(true)
    expect(isEmpty(NaN)).toBe(true)
  })

  it('should handle dates', () => {
    // Dates are objects but have no enumerable properties, so isEmpty returns true
    expect(isEmpty(new Date())).toBe(true)
  })

  it('should handle regular expressions', () => {
    // RegExp are objects but have no enumerable properties, so isEmpty returns true
    expect(isEmpty(/test/)).toBe(true)
  })

  it('should handle nested empty structures', () => {
    expect(isEmpty({ arr: [] })).toBe(false) // object has a property, so not empty
    expect(isEmpty([{}])).toBe(false) // array has an element, so not empty
  })

  it('should handle arguments object', () => {
    function testArgs() {
      expect(isEmpty(arguments)).toBe(arguments.length === 0)
    }
    testArgs()
    testArgs(1, 2, 3)
  })
})
