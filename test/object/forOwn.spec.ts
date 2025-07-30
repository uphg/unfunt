import { describe, it, expect, vi } from 'vitest'
import { forOwn } from '../../src/object'

describe('forOwn', () => {
  it('should iterate over own enumerable properties', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const iteratee = vi.fn()

    forOwn(obj, iteratee)

    expect(iteratee).toHaveBeenCalledTimes(3)
    expect(iteratee).toHaveBeenCalledWith(1, 'a', obj)
    expect(iteratee).toHaveBeenCalledWith(2, 'b', obj)
    expect(iteratee).toHaveBeenCalledWith(3, 'c', obj)
  })

  it('should break early when iteratee returns false', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const iteratee = vi.fn((value, key) => {
      if (key === 'c') return false
      return true
    })

    forOwn(obj, iteratee)

    expect(iteratee).toHaveBeenCalledTimes(3)
    expect(iteratee).toHaveBeenCalledWith(1, 'a', obj)
    expect(iteratee).toHaveBeenCalledWith(2, 'b', obj)
    expect(iteratee).toHaveBeenCalledWith(3, 'c', obj)
    expect(iteratee).not.toHaveBeenCalledWith(4, 'd', obj)
  })

  it('should continue when iteratee returns undefined', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const iteratee = vi.fn(() => undefined)

    forOwn(obj, iteratee)

    expect(iteratee).toHaveBeenCalledTimes(3)
  })

  it('should continue when iteratee returns truthy values', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const iteratee = vi.fn(() => 'continue')

    forOwn(obj, iteratee)

    expect(iteratee).toHaveBeenCalledTimes(3)
  })

  it('should break early when iteratee returns exactly false', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const iteratee = vi.fn((value, key) => {
      if (key === 'b') return false
      return null // falsy but not false
    })

    forOwn(obj, iteratee)

    expect(iteratee).toHaveBeenCalledTimes(2)
    expect(iteratee).toHaveBeenCalledWith(1, 'a', obj)
    expect(iteratee).toHaveBeenCalledWith(2, 'b', obj)
    expect(iteratee).not.toHaveBeenCalledWith(3, 'c', obj)
  })

  it('should handle null and undefined objects', () => {
    const iteratee = vi.fn()

    expect(forOwn(null, iteratee)).toBe(null)
    expect(forOwn(undefined, iteratee)).toBe(undefined)
    expect(iteratee).not.toHaveBeenCalled()
  })

  it('should handle empty object', () => {
    const iteratee = vi.fn()
    const obj = {}

    const result = forOwn(obj, iteratee)

    expect(iteratee).not.toHaveBeenCalled()
    expect(result).toBe(obj)
  })

  it('should only iterate over own properties, not inherited ones', () => {
    function Parent() {
      this.inherited = 'parent'
    }
    Parent.prototype.prototypeProperty = 'inherited'

    function Child() {
      Parent.call(this)
      this.own = 'child'
    }
    Child.prototype = Object.create(Parent.prototype)

    const obj = new Child()
    const iteratee = vi.fn()

    forOwn(obj, iteratee)

    expect(iteratee).toHaveBeenCalledTimes(2)
    expect(iteratee).toHaveBeenCalledWith('parent', 'inherited', obj)
    expect(iteratee).toHaveBeenCalledWith('child', 'own', obj)
    expect(iteratee).not.toHaveBeenCalledWith('inherited', 'prototypeProperty', obj)
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
    const iteratee = vi.fn()

    forOwn(obj, iteratee)

    expect(iteratee).toHaveBeenCalledTimes(7)
    expect(iteratee).toHaveBeenCalledWith('hello', 'str', obj)
    expect(iteratee).toHaveBeenCalledWith(42, 'num', obj)
    expect(iteratee).toHaveBeenCalledWith(true, 'bool', obj)
    expect(iteratee).toHaveBeenCalledWith([1, 2, 3], 'arr', obj)
    expect(iteratee).toHaveBeenCalledWith({ nested: true }, 'obj', obj)
    expect(iteratee).toHaveBeenCalledWith(null, 'nil', obj)
    expect(iteratee).toHaveBeenCalledWith(undefined, 'undef', obj)
  })

  it('should return the original object', () => {
    const obj = { a: 1, b: 2 }
    const iteratee = vi.fn()

    const result = forOwn(obj, iteratee)

    expect(result).toBe(obj)
  })

  it('should allow mutation inside iteratee', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const results: number[] = []

    forOwn(obj, (value) => {
      results.push(value * 2)
    })

    expect(results).toEqual([2, 4, 6])
  })

  it('should work with array objects', () => {
    const arr = ['a', 'b', 'c']
    const iteratee = vi.fn()

    forOwn(arr, iteratee)

    expect(iteratee).toHaveBeenCalledTimes(3)
    expect(iteratee).toHaveBeenCalledWith('a', '0', arr)
    expect(iteratee).toHaveBeenCalledWith('b', '1', arr)
    expect(iteratee).toHaveBeenCalledWith('c', '2', arr)
  })

  it('should handle symbols as values but not as keys', () => {
    const sym = Symbol('test')
    const obj = { a: sym, b: 'normal' }
    const iteratee = vi.fn()

    forOwn(obj, iteratee)

    expect(iteratee).toHaveBeenCalledTimes(2)
    expect(iteratee).toHaveBeenCalledWith(sym, 'a', obj)
    expect(iteratee).toHaveBeenCalledWith('normal', 'b', obj)
  })
})
