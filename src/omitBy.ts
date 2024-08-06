import baseOmitBy from './internal/baseOmitBy'
import type { Key } from './internal/interfaces'
import isNil from './isNil'

function omitBy<T extends object>(object: T, callback: (value: unknown, key: Key) => boolean) {
  return isNil(object) ? {} : baseOmitBy(object, callback)
}

export default omitBy
