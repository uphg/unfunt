import isNil from './isNil'
import type { Key } from './internal/interfaces'
import baseOmitBy from './internal/baseOmitBy'

function omit<T extends object>(object: T, excludes: Key[]) {
  return isNil(object) ? {} : baseOmitBy(object, (_value, key) => excludes.includes(key))
}

export default omit
