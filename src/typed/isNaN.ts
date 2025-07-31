import { _isNaN } from '../internal/common'
import { isNumber } from './isNumber'

/**
 * Checks if a value is NaN (Not a Number). More reliable than the global isNaN function.
 * @param value The value to check
 * @returns True if the value is NaN, false otherwise
 *
 * @example
 * isNaN(NaN)
 * // => true
 *
 * isNaN(123)
 * // => false
 *
 * isNaN('hello')
 * // => false
 */
export function isNaN(value: unknown): value is number {
  return isNumber(value) && _isNaN(value as number)
}
