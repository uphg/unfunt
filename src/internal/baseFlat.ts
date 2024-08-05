import type { FlatCallback, RecursiveArray } from '../types'
import isFlattenable from './isFlattenable'
import baseFlatDeep from './baseFlatDeep'

function baseFlat<T, U>(array: RecursiveArray<T>, callback: FlatCallback<T, U>, isDeep = false) {
  const length = array?.length || 0
  const result: U[] | RecursiveArray<U> = []
  let index = -1

  while (++index < length) {
    const item = callback(array[index], index, array)
    if (isFlattenable(item)) {
      isDeep
        ? (result as U[]).push(...baseFlatDeep(item as RecursiveArray<U>))
        : (result as RecursiveArray<U>).push(...(item as RecursiveArray<U>))
    } else {
      (result as U[]).push(item)
    }
  }
  return result
}

export default baseFlat
