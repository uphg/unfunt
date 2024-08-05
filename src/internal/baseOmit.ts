import baseOmitBy from './baseOmitBy'
import type { Key } from './interfaces'

function baseOmit(object: any, excludes: Key[]) {
  return baseOmitBy(object, (_value, key) => excludes.includes(key))
}

export default baseOmit
