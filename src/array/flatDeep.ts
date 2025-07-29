import { isArray } from '../typed/isArray'

/**
 * 递归地将数组扁平化到指定深度
 * @param array 要扁平化的数组
 * @param depth 扁平化深度，默认为 Infinity
 * @returns 扁平化后的数组
 *
 * @example
 * flatDeep([1, [2, [3, [4]], 5]])
 * // => [1, 2, 3, 4, 5]
 *
 * flatDeep([1, [2, [3, [4]], 5]], 2)
 * // => [1, 2, 3, [4], 5]
 */
export function flatDeep<T>(array: T[], depth: number = Infinity): T[] {
  if (!isArray(array)) return []

  const result: T[] = []

  for (const item of array) {
    if (isArray(item) && depth > 0) {
      result.push(...flatDeep(item as T[], depth - 1))
    } else {
      result.push(item)
    }
  }

  return result
}
