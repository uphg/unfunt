import { isNil } from './isNil'
import { isString } from './isString'

/**
 * Checks if a value is iterable (can be used with for...of or spread operator).
 * @param value The value to check
 * @returns True if the value is iterable, false otherwise
 *
 * @example
 * isIterable([1, 2, 3])
 * // => true
 *
 * isIterable('hello')
 * // => true
 *
 * isIterable(123)
 * // => false
 */
export function isIterable(value: unknown): value is Iterable<unknown> {
  if (isNil(value)) return false
  if (isString(value)) return true
  return typeof value === 'object' && Symbol.iterator in (value as object)
}
