import { isTag } from '../internal/vanilla'

/**
 * Checks if a value is a Set.
 * @param value The value to check
 * @returns True if the value is a Set, false otherwise
 *
 * @example
 * isSet(new Set([1, 2, 3]))
 * // => true
 *
 * isSet([1, 2, 3])
 * // => false
 */
export function isSet(value: unknown) {
  return isTag(value, 'Set')
}
