import { MAX_ARRAY_LENGTH } from '../internal/common'
import { toInteger } from './toInteger'

/**
 * Converts a value to a valid array length (0 to MAX_ARRAY_LENGTH).
 * Values less than 0 are converted to 0, values greater than MAX_ARRAY_LENGTH are converted to MAX_ARRAY_LENGTH.
 * @param value The value to convert to array length
 * @returns A valid array length between 0 and MAX_ARRAY_LENGTH
 *
 * @example
 * toLength(3.2)
 * // => 3
 *
 * toLength(-1)
 * // => 0
 *
 * toLength(Infinity)
 * // => 4294967295
 */
export function toLength(value: unknown = 0) {
  if (!value) {
    return 0
  }
  value = toInteger(value)
  if (value as number < 0) {
    return 0
  }
  if (value as number > MAX_ARRAY_LENGTH) {
    return MAX_ARRAY_LENGTH
  }
  return value as number
}
