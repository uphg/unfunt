import type { RecursiveArray } from '../types'
import isFlattenable from './isFlattenable'

function baseFlatDeep<T>(array: RecursiveArray<T>) {
  const result: T[] = []
  const stack = [array]

  while (stack.length) {
    const temp = stack.shift()!
    let index = -1
    while (++index < temp.length) {
      const item = temp[index]
      isFlattenable(item)
        ? stack.push(item)
        : result.push(item)
    }
  }

  return result
}

export default baseFlatDeep
