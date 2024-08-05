import hasOwn from './hasOwn'
import isArray from './isArray'

function each<T, K extends number>(
  array: T[],
  callback: (item: T, index: K, array: T[]) => void
): void

function each<T, K extends string | number | symbol>(
  object: Record<K, T>,
  callback: (item: T, key: K, object: Record<K, T>) => void
): void

function each<T, K extends string | number | symbol>(
  object: T[] | Record<K, T>,
  callback: Function,
) {
  if (isArray(object)) {
    let index = -1
    const length = object.length
    while (++index < length) {
      callback((object)[index], index, object)
    }
  } else {
    for (const key in object) {
      if (hasOwn(object, key)) {
        const item = (object)[key]
        callback(item, key, object)
      }
    }
  }
}

export default each
