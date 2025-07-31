import { isFunction } from './isFunction'

/**
 * Checks if a value is a Promise (or Promise-like object).
 * @param obj The value to check
 * @returns True if the value is a Promise, false otherwise
 *
 * @example
 * isPromise(Promise.resolve(42))
 * // => true
 *
 * isPromise({ then: () => {} })
 * // => true
 *
 * isPromise(42)
 * // => false
 */
export function isPromise<T>(obj: any): obj is Promise<T> {
  return !!obj && isFunction(obj?.then)
}
