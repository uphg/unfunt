import basePick from './internal/basePick'
import type { Key } from './internal/interfaces'
import isNil from './isNil'

function pick<T extends object>(object: T, includes: Key[]) {
  return isNil(object) ? {} : basePick(object, includes)
}

export default pick
