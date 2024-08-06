import isArray from '../isArray'
import type { ListOfRecursiveArraysOrValues } from '../types'

function baseFlatDeep<T>(array: ListOfRecursiveArraysOrValues<T>) {
  const result: T[] = []
  const stack = [array]

  while (stack.length) {
    const temp = stack.shift()!
    let index = -1
    while (++index < temp.length) {
      const item = temp[index]
      isArray(item)
        ? stack.push(item)
        : result.push(item)
    }
  }

  return result
}

export default baseFlatDeep
