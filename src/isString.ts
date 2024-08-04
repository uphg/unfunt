/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @since 0.1.0
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * isString('abc')
 * // => true
 *
 * isString(1)
 * // => false
 */
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export default isString
