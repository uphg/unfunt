import { isLength } from './isLength'

/**
 * Checks if a value is array-like (has a valid length property and is not a function).
 * @param value The value to check
 * @returns True if the value is array-like, false otherwise
 *
 * @example
 * isArrayLike([1, 2, 3])
 * // => true
 *
 * isArrayLike('hello')
 * // => true
 *
 * isArrayLike({ length: 3 })
 * // => true
 *
 * isArrayLike(() => {})
 * // => false
 */
export function isArrayLike(value: unknown): value is ArrayLike<unknown> | string {
  return (value !== void 0 && value !== null && typeof value !== 'function') && isLength((value as ArrayLike<unknown>).length)
}
