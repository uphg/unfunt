import { isNil } from '../typed/isNil'
import { Key } from '../internal/interfaces'
import { basePickBy } from './basePickBy'

export function pick(object: unknown, includes: Key[]) {
  return isNil(object) ? {} : basePick(object, includes)
}

function basePick(obj: unknown, keys: Key[]) {
  return basePickBy(obj, keys, (_value, key) => Object.hasOwn(obj as object, key))
}
