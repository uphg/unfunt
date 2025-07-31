import { isNumber } from './isNumber'

/**
 * Checks if a value is an integer.
 * @param value The value to check
 * @returns True if the value is an integer, false otherwise
 *
 * @example
 * isInteger(3)
 * // => true
 *
 * isInteger(3.14)
 * // => false
 *
 * isInteger('3')
 * // => false
 */
export function isInteger(value: unknown): value is number {
  return isNumber(value) && value % 1 === 0
}
