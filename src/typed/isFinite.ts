import { _isFinite, _isNaN } from '../internal/common'
import { isNumber } from './isNumber'

/**
 * Checks if a value is a finite number. More reliable than the global isFinite function.
 * @param value The value to check
 * @returns True if the value is a finite number, false otherwise
 *
 * @example
 * isFinite(3.14)
 * // => true
 *
 * isFinite(Infinity)
 * // => false
 *
 * isFinite('3.14')
 * // => false
 */
export function isFinite(value: unknown) {
  return isNumber(value) && _isFinite(value) && !_isNaN(value)
}
