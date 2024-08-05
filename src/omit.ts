import baseOmit from './internal/baseOmit'
import isNil from './isNil'
import type { Key } from './internal/interfaces'

function omit<T extends object>(object: T, excludes: Key[]) {
  return isNil(object) ? {} : baseOmit(object, excludes)
}

export default omit
