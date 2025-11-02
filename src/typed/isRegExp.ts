import { isTypeString } from './isTypeString'

/**
 * Checks if a value is a regular expression.
 * @param value The value to check
 * @returns True if the value is a RegExp, false otherwise
 *
 * @example
 * isRegExp(/foo/)
 * // => true
 *
 * isRegExp('foo')
 * // => false
 */
export function isRegExp(value: unknown): value is RegExp {
  return isTypeString(value, 'RegExp')
}
