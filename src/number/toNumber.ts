import { isArray } from '../typed/isArray'

/**
 * Converts a value to a number. Handles various input types including strings, booleans, arrays, and objects.
 * @param value The value to convert to a number
 * @returns The converted number or NaN if conversion is not possible
 *
 * @example
 * toNumber('123')
 * // => 123
 *
 * toNumber(true)
 * // => 1
 *
 * toNumber([42])
 * // => 42
 *
 * toNumber('hello')
 * // => NaN
 */
export function toNumber(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (trimmed === '') return 0
    const num = Number(trimmed)
    return Number.isNaN(num) ? NaN : num
  }
  if (typeof value === 'boolean') return value ? 1 : 0
  if (value == null) return 0
  if (typeof value === 'bigint') return Number(value)
  if (typeof value === 'symbol') return NaN
  if (typeof value === 'object') {
    if (isArray(value)) {
      // Handle arrays: [] -> 0, [42] -> 42, [1,2] -> NaN
      if (value.length === 0) return 0
      if (value.length === 1) return toNumber(value[0])
      return NaN
    }
    const primitive = value.valueOf ? value.valueOf() : value
    if (primitive !== value) return toNumber(primitive)
    return NaN
  }
  return Number(value)
}
