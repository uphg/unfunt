import { isNil } from './isNil'
import { isBoolean } from './isBoolean'
import { isArray } from './isArray'
import { isString } from './isString'
import { isArrayLike } from './isArrayLike'
import { isMap } from './isMap'
import { isSet } from './isSet'

/**
 * Checks if a value is empty. Works with arrays, strings, objects, maps, sets, and other collections.
 * @param value The value to check
 * @returns True if the value is empty, false otherwise
 *
 * @example
 * isEmpty([])
 * // => true
 *
 * isEmpty('')
 * // => true
 *
 * isEmpty({})
 * // => true
 *
 * isEmpty([1, 2, 3])
 * // => false
 */
export function isEmpty<T extends unknown>(value: T) {
  if (isNil(value) || isBoolean(value)) return true

  if (
    isArray(value)
    || isString(value)
    || (
      isArrayLike(value)
      && typeof (value as any).splice === 'function'
    )
  ) {
    return !value.length
  }

  if (isMap(value) || isSet(value)) return !(value as (Set<unknown> & Map<unknown, unknown>)).size

  return Object.keys(value as object).length === 0
}
