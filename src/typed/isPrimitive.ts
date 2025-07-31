/**
 * Checks if a value is a primitive type (string, number, bigint, boolean, symbol, null, or undefined).
 * @param value The value to check
 * @returns True if the value is a primitive, false otherwise
 *
 * @example
 * isPrimitive('hello')
 * // => true
 *
 * isPrimitive(42)
 * // => true
 *
 * isPrimitive({})
 * // => false
 */
export function isPrimitive(value: unknown): value is string | number | bigint | boolean | symbol | null | undefined {
  const type = typeof value

  if (type === 'object') {
    return value === null
  }
  return type !== 'function'
}
