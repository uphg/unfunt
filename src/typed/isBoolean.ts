/**
 * Checks if a value is a boolean.
 * @param value The value to check
 * @returns True if the value is a boolean, false otherwise
 *
 * @example
 * isBoolean(true)
 * // => true
 *
 * isBoolean(false)
 * // => true
 *
 * isBoolean('true')
 * // => false
 */
export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false
}
