import { isArray } from '../typed/isArray'

/**
 * Recursively flattens array to specified depth
 * @param array The array to flatten
 * @param depth The maximum recursion depth, defaults to Infinity
 * @returns The flattened array
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
