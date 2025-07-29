import { isNil } from './isNil'
import { isBoolean } from './isBoolean'
import { isArray } from './isArray'
import { isString } from './isString'
import { isArrayLike } from './isArrayLike'
import { isMap } from './isMap'
import { isSet } from './isSet'

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
