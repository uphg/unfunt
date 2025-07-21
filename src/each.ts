import { isArrayLike } from './typed'
import type { Key } from './internal/interfaces'

function each<T>(
  object: T[] | Record<Key, T>,
  callback: (_item: T, _index: number | string, _object: T[] | Record<Key, T>) => void
) {
  if (isArrayLike(object)) {
    let index = -1
    const length = object.length
    while (++index < length) {
      callback((object as T[])[index], index, object)
    }
  }
  else {
    let index = -1
    const propNames = Object.keys(object)
    const length = propNames.length
    while (++index < length) {
      const key = propNames[index]
      callback((object as Record<Key, T>)[key], key, object)
    }
  }
}

export default each
