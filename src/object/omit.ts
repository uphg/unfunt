import { isNil } from '../typed/isNil'
import { Key } from '../internal/interfaces'
import { baseOmitBy } from './baseOmitBy'

export function omit(object: any, excludes: Key[]) {
  return isNil(object) ? {} : baseOmit(object, excludes)
}

function baseOmit(object: any, excludes: Key[]) {
  return baseOmitBy(object, (_value, key) => excludes.indexOf(key) !== -1)
}
