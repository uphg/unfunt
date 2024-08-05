/**
 * Checks if `value` is classified as a `String` primitive or object.
 */
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export default isString
