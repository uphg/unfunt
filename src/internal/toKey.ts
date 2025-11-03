/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
export function toKey(value: unknown): string | symbol {
  if (typeof value === 'string' || typeof value === 'symbol') {
    return value
  }

  const result = `${value}`

  return Object.is(value, -0) ? '-0' : result
}
