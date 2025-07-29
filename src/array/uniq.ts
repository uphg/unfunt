import { isArray } from '../typed/isArray'

/**
 * 创建一个去重后的数组副本，使用 SameValueZero 进行等值比较
 * @param array 要去重的数组
 * @returns 去重后的新数组
 *
 * @example
 * uniq([2, 1, 2])
 * // => [2, 1]
 *
 * uniq([1, 2, 1, 3, 2])
 * // => [1, 2, 3]
 */
export function uniq<T>(array: T[]): T[] {
  if (!isArray(array)) return []

  const seen = new Set<T>()
  const result: T[] = []

  for (const item of array) {
    if (!seen.has(item)) {
      seen.add(item)
      result.push(item)
    }
  }

  return result
}
