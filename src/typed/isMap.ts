import { isTypeString } from '../internal/isTypeString'

/**
 * Checks if a value is a Map.
 * @param value The value to check
 * @returns True if the value is a Map, false otherwise
 *
 * @example
 * isMap(new Map([['a', 1], ['b', 2]]))
 * // => true
 *
 * isMap({ a: 1, b: 2 })
 * // => false
 */
export function isMap(value: unknown) {
  return isTypeString(value, 'Map')
}
