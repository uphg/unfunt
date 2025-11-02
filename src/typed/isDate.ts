import { isTypeString } from './isTypeString'

/**
 * Checks if a value is a Date object.
 * @param value The value to check
 * @returns True if the value is a Date, false otherwise
 *
 * @example
 * isDate(new Date())
 * // => true
 *
 * isDate('2023-01-01')
 * // => false
 */
export function isDate(value: unknown): value is Date {
  return isTypeString(value, 'Date')
}
