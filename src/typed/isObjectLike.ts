/**
 * Checks if a value is object-like (typeof value === 'object' && value !== null).
 * @param value The value to check
 * @returns True if the value is object-like, false otherwise
 *
 * @example
 * isObjectLike({})
 * // => true
 *
 * isObjectLike([1, 2, 3])
 * // => true
 *
 * isObjectLike(null)
 * // => false
 *
 * isObjectLike('hello')
 * // => false
 */
export function isObjectLike<T extends object>(value: unknown): value is T {
  return typeof value === 'object' && value !== null
}
