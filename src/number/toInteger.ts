import { toFinite } from './toFinite'

/**
 * Converts a value to an integer by removing the decimal part.
 * @param value The value to convert to an integer
 * @returns The integer value
 *
 * @example
 * toInteger(3.2)
 * // => 3
 *
 * toInteger(-3.7)
 * // => -3
 *
 * toInteger('4.9')
 * // => 4
 */
export function toInteger(value: unknown) {
  const result = toFinite(value)
  const remainder = result % 1

  return remainder ? result - remainder : result
}
