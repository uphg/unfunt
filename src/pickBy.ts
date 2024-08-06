import hasOwn from './hasOwn'
import isNil from './isNil'
import type { Dictionary } from './types'

function pickBy<T, S extends T>(
  obj: Dictionary<T>,
  callback: (item: T, key?: string) => boolean,
): Dictionary<S> {
  const result: Dictionary<S> | {} = {}
  if (isNil(obj)) return result
  for (const key in obj) {
    if (hasOwn(obj, key) && callback(obj[key], key)) {
      (result as any)[key] = obj[key]
    }
  }
  return result
}

export default pickBy
