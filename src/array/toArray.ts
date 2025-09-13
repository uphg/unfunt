import { isIterable } from '../typed/isIterable'
import { isNil } from '../typed/isNil'
import { isString } from '../typed/isString'

/**
 * Converts a value to an array. If the value is already an array, it returns the array.
 * If the value is null/undefined, returns an empty array. If the value is iterable, converts it to an array.
 * @param value The value to convert to an array
 * @returns An array representation of the input value
 *
 * @example
 * toArray([1, 2, 3])
 * // => [1, 2, 3]
 *
 * toArray('hello')
 * // => ['h', 'e', 'l', 'l', 'o']
 *
 * toArray(null)
 * // => []
 *
 * toArray(42)
 * // => [42]
 */
export function toArray<T>(value: T): T extends readonly unknown[] ? T : T[]
export function toArray(value: unknown): unknown[]
export function toArray(value: unknown): unknown[] {
  if (isNil(value)) return []
  if (Array.isArray(value)) return value
  if (isString(value)) return Array.from(value)
  if (isIterable(value)) {
    return Array.from(value)
  }
  return [value]
}
