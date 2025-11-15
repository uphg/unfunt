import { Key } from '../internal/interfaces'
import { hasOwn } from '../object/hasOwn'

export function baseOmitBy(obj: any, callback: (_value: unknown, _key: Key) => boolean) {
  const result: { [k: Key]: unknown } = {}
  for (const key in obj) {
    if (hasOwn(obj, key)) {
      const value = obj[key]
      if (callback(value, key)) continue
      result[key] = value
    }
  }
  return result
}
