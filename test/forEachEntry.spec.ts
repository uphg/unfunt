import { describe, it, expect, vi } from 'vitest'
import { forEachEntry } from '../src/object'

describe('forEachEntry', () => {
  it('should iterate over all object entries', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const callback = vi.fn()

    forEachEntry(obj, callback)

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith('a', 1)
    expect(callback).toHaveBeenCalledWith('b', 2)
    expect(callback).toHaveBeenCalledWith('c', 3)
  })

  it('should break early when callback returns false', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const callback = vi.fn((key, _value) => {
      if (key === 'c') return false
      return true
    })

    forEachEntry(obj, callback)

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith('a', 1)
    expect(callback).toHaveBeenCalledWith('b', 2)
    expect(callback).toHaveBeenCalledWith('c', 3)
    expect(callback).not.toHaveBeenCalledWith('d', 4)
  })

  it('should continue when callback returns undefined', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const callback = vi.fn(() => undefined)

    forEachEntry(obj, callback)

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should continue when callback returns truthy values', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const callback = vi.fn(() => 'continue')

    forEachEntry(obj, callback)

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should break early when callback returns exactly false', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const callback = vi.fn((key) => {
      if (key === 'b') return false
      return null // falsy but not false
    })

    forEachEntry(obj, callback)

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith('a', 1)
    expect(callback).toHaveBeenCalledWith('b', 2)
    expect(callback).not.toHaveBeenCalledWith('c', 3)
  })

  it('should handle empty object', () => {
    const callback = vi.fn()

    forEachEntry({}, callback)

    expect(callback).not.toHaveBeenCalled()
  })

  it('should handle single property object', () => {
    const obj = { only: 'value' }
    const callback = vi.fn()

    forEachEntry(obj, callback)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('only', 'value')
  })

  it('should handle objects with various value types', () => {
    const obj = {
      str: 'hello',
      num: 42,
      bool: true,
      arr: [1, 2, 3],
      obj: { nested: true },
      nil: null,
      undef: undefined
    }
    const callback = vi.fn()

    forEachEntry(obj, callback)

    expect(callback).toHaveBeenCalledTimes(7)
    expect(callback).toHaveBeenCalledWith('str', 'hello')
    expect(callback).toHaveBeenCalledWith('num', 42)
    expect(callback).toHaveBeenCalledWith('bool', true)
    expect(callback).toHaveBeenCalledWith('arr', [1, 2, 3])
    expect(callback).toHaveBeenCalledWith('obj', { nested: true })
    expect(callback).toHaveBeenCalledWith('nil', null)
    expect(callback).toHaveBeenCalledWith('undef', undefined)
  })

  it('should allow mutation of values inside callback', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const results: number[] = []

    forEachEntry(obj, (key, value) => {
      results.push(value * 2)
    })

    expect(results).toEqual([2, 4, 6])
  })

  it('should handle callback that modifies the original object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const callback = vi.fn((key, _value) => {
      if (key === 'a') {
        obj.d = 4 // Add new property during iteration
      }
    })

    forEachEntry(obj, callback)

    // Should only iterate over original properties
    expect(callback).toHaveBeenCalledTimes(3)
    expect(obj.d).toBe(4)
  })

  it('should provide correct this context when needed', () => {
    const obj = { a: 1, b: 2 }
    const results: string[] = []

    forEachEntry(obj, function(key, value) {
      // Using regular function to test 'this' context if needed
      results.push(`${key}:${value}`)
    })

    expect(results).toEqual(['a:1', 'b:2'])
  })

  it('should return undefined', () => {
    const obj = { a: 1 }
    const result = forEachEntry(obj, () => {})

    expect(result).toBeUndefined()
  })
})
