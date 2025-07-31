/**
 * Checks if a value is an object (including arrays and functions, but excluding null).
 * @param value The value to check
 * @returns True if the value is an object, false otherwise
 *
 * @example
 * isObject({})
 * // => true
 *
 * isObject(null)
 * // => false
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(() => {})
 * // => true
 */
export function isObject(value: unknown): value is object {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}
