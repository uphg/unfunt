import { INFINITY, MAX_INTEGER } from '../internal/common'

/**
 * Converts a value to a finite number. Converts Infinity and -Infinity to the maximum safe integer value.
 * @param value The value to convert to a finite number
 * @returns A finite number
 *
 * @example
 * toFinite(3.2)
 * // => 3.2
 *
 * toFinite(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toFinite('3.2')
 * // => 3.2
 */
export function toFinite(value: unknown): number {
  if (!value) {
    return value === 0 ? value : 0
  }

  value = Number(value)

  if (value === INFINITY || value === -INFINITY) {
    const sign = (value > 0 ? 1 : -1)
    return sign * MAX_INTEGER
  }

  return (value === value ? value : 0) as number
}
