import { isNil } from '../typed/isNil'
import { Key } from '../internal/interfaces'
import { baseOmitBy } from './baseOmitBy'

export function omitBy(object: unknown, callback: (value: unknown, key: Key) => boolean) {
  return isNil(object) ? {} : baseOmitBy(object, callback)
}
