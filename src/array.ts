import { isLength } from './typed'

/**
 * 根据给定参数分割数组，返回分割后的剩下的部分
 * @example
 *
 * remain([1, 2, 3, 4, 5], 2)
 * // => [1, 2]
 *
 * remain([1, 2, 3, 4, 5], 2, 1)
 * => [1, 2, 4, 5]
 */
export function remain<T>(array: T[], start: number, deleteCount?: number) {
  if (!isLength(start)) return []

  deleteCount = deleteCount ?? array.length - 1
  const newArray = []
  let index = -1

  while (++index < array.length) {
    if (index >= start && index < start + deleteCount) continue
    newArray.push(array[index])
  }

  return newArray
}
