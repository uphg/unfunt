import { isTag } from '../internal/vanilla'

/**
 * Checks if a value is an array.
 * @param value The value to check
 * @returns True if the value is an array, false otherwise
 *
 * @example
 * isArray([1, 2, 3])
 * // => true
 *
 * isArray('hello')
 * // => false
 */
export function isArray(value: unknown): value is Array<unknown> {
  return isTag(value, 'Array')
}
