import { describe, it, expect } from 'vitest'
import { isPromise } from '../../src/typed'

describe('isPromise', () => {
  it('should return true for native Promise instances', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise(Promise.reject().catch(() => {}))).toBe(true)
    expect(isPromise(new Promise(() => {}))).toBe(true)
  })

  it('should return true for thenable objects', () => {
    const thenable = {
      then: () => {}
    }
    expect(isPromise(thenable)).toBe(true)

    const thenableWithFunction = {
      then: function() {}
    }
    expect(isPromise(thenableWithFunction)).toBe(true)

    const thenableWithArrowFunction = {
      then: () => Promise.resolve()
    }
    expect(isPromise(thenableWithArrowFunction)).toBe(true)
  })

  it('should return false for non-thenable objects', () => {
    const notThenable = {
      then: 'not a function'
    }
    expect(isPromise(notThenable)).toBe(false)

    const emptyObject = {}
    expect(isPromise(emptyObject)).toBe(false)

    const objectWithOtherProps = {
      catch: () => {},
      finally: () => {}
    }
    expect(isPromise(objectWithOtherProps)).toBe(false)
  })

  it('should return false for primitive values', () => {
    expect(isPromise(null)).toBe(false)
    expect(isPromise(undefined)).toBe(false)
    expect(isPromise(true)).toBe(false)
    expect(isPromise(false)).toBe(false)
    expect(isPromise(42)).toBe(false)
    expect(isPromise('string')).toBe(false)
    expect(isPromise(Symbol('test'))).toBe(false)
    expect(isPromise(BigInt(42))).toBe(false)
  })

  it('should return false for arrays', () => {
    expect(isPromise([])).toBe(false)
    expect(isPromise([1, 2, 3])).toBe(false)
    expect(isPromise(['then'])).toBe(false)
  })

  it('should return false for functions', () => {
    expect(isPromise(() => {})).toBe(false)
    expect(isPromise(function() {})).toBe(false)
    expect(isPromise(function then() {})).toBe(false)
  })

  it('should return false for classes and constructors', () => {
    class TestClass {}
    expect(isPromise(TestClass)).toBe(false)
    expect(isPromise(new TestClass())).toBe(false)
    expect(isPromise(Date)).toBe(false)
    expect(isPromise(new Date())).toBe(false)
  })

  it('should handle objects with null/undefined then property', () => {
    const objWithNullThen = {
      then: null
    }
    expect(isPromise(objWithNullThen)).toBe(false)

    const objWithUndefinedThen = {
      then: undefined
    }
    expect(isPromise(objWithUndefinedThen)).toBe(false)
  })

  it('should handle objects with getter for then', () => {
    const objWithGetter = {
      get then() {
        return () => {}
      }
    }
    expect(isPromise(objWithGetter)).toBe(true)

    const objWithNonFunctionGetter = {
      get then() {
        return 'not a function'
      }
    }
    expect(isPromise(objWithNonFunctionGetter)).toBe(false)
  })

  it('should work with async function results', async() => {
    async function asyncFn() {
      return 42
    }
    const result = asyncFn()
    expect(isPromise(result)).toBe(true)
    await result // Clean up the promise
  })

  it('should handle third-party promise libraries', () => {
    // Simulate a third-party promise-like object
    class CustomPromise {
      then(_onFulfilled: any, _onRejected?: any) {
        return new CustomPromise()
      }
    }

    expect(isPromise(new CustomPromise())).toBe(true)
  })

  it('should handle objects with thenable interface only', () => {
    // Objects that only have then method but are not Promise instances
    const thenableOnly = {
      then: function(resolve: any, _reject: any) {
        resolve(42)
      }
    }
    expect(isPromise(thenableOnly)).toBe(true)
  })

  it('should handle edge case with proxy objects', () => {
    // Test with proxy that has then method
    if (typeof Proxy !== 'undefined') {
      const proxy = new Proxy({}, {
        get(_target, prop) {
          if (prop === 'then') return () => {}
          return undefined
        }
      })
      expect(isPromise(proxy)).toBe(true)
    }
  })

  it('should handle edge cases with falsy objects', () => {
    // Objects that evaluate to falsy in boolean context but still have properties
    const objWithValueOf = {
      valueOf: () => false,
      then: () => {}
    }
    expect(isPromise(objWithValueOf)).toBe(true)
  })

  it('should handle objects with then property that throws', () => {
    const objWithThrowingThen = {
      get then() {
        throw new Error('Access error')
      }
    }

    // The function should handle errors gracefully
    expect(() => isPromise(objWithThrowingThen)).toThrow()
  })
})
