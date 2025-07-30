import { isLength } from '../typed/isLength'

/**
 * Splits an array based on given parameters and returns the remaining parts after splitting
 * @example
 *
 * unslice([1, 2, 3, 4, 5], 2)
 * // => [1, 2]
 *
 * unslice([1, 2, 3, 4, 5], 2, 1)
 * => [1, 2, 4, 5]
 */
export function unslice<T>(array: T[], start: number, deleteCount?: number) {
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
