import { Key, ObjectLike } from '../internal/interfaces'

export function basePickBy(obj: any, keys: Key[], callback: (_value: unknown, _key: Key) => boolean) {
  const result: ObjectLike = {}
  for (const key of keys) {
    const value = obj[key]
    if (callback(value, key)) {
      result[key] = value
    }
  }
  return result
}
