/**
 * Checks if a value is a function.
 * @param value The value to check
 * @returns True if the value is a function, false otherwise
 *
 * @example
 * isFunction(() => {})
 * // => true
 *
 * isFunction('hello')
 * // => false
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}
