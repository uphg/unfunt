import flatDeep from './flatDeep'
import hasOwn from './hasOwn'
import isNil from './isNil'
import type { Many } from './types'

function pick<T extends object, U extends keyof T>(
  obj: T,
  ...includes: Array<Many<U>>
): Pick<T, U> {
  const result: any = {}
  if (isNil(obj)) return result
  let index = -1
  const keys = flatDeep(includes)
  const length = keys.length

  while (++index < length) {
    const key = keys[index]
    const value = obj[key]
    if (hasOwn(obj, key)) {
      result[key] = value
    }
  }
  return result
}

export default pick
