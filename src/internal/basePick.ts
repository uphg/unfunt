import hasOwn from '../hasOwn'
import basePickBy from './basePickBy'
import type { Key } from './interfaces'

function basePick(obj: unknown, keys: Key[]) {
  return basePickBy(obj, keys, (_value, key) => hasOwn(obj, key))
}

export default basePick
