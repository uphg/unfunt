import baseOmitBy from './internal/baseOmitBy'
import { Key } from './internal/interfaces'
import isNil from './isNil'

function omitBy(object: unknown, callback: (_value: unknown, _key: Key) => boolean) {
  return isNil(object) ? {} : baseOmitBy(object, callback)
}

export default omitBy
