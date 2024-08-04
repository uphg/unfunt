import isArguments from './isArguments'
import isArray from './isArray'
import isArrayLike from './isArrayLike'
import isBoolean from './isBoolean'
import isMap from './isMap'
import isNil from './isNil'
import isSet from './isSet'
import isString from './isString'

/**
 * Checks if `value` is empty.
 */
function isEmpty(value: unknown) {
  if (isNil(value) || isBoolean(value)) return true

  if (
    isArray(value)
    || isString(value)
    || isArguments(value)
    || (
      isArrayLike(value)
      && typeof (value as any).splice === 'function'
    )
  ) {
    return !value.length
  }

  if (isMap(value) || isSet(value)) return !value.size

  return Object.keys(value as object).length === 0
}

export default isEmpty
