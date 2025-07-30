import { isArray } from '../typed/isArray'

/**
 * Merge multiple arrays and remove duplicates based on iteratee function
 * @param arrays Arrays to merge
 * @param iteratee Function to generate unique identifier
 * @returns Deduplicated merged array
 *
 * @example
 * unionBy([2.1], [1.2, 2.3], Math.floor)
 * // => [2.1, 1.2]
 *
 * unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x')
 * // => [{ x: 1 }, { x: 2 }]
 */
export function unionBy<T>(
  ...args: [...T[][], ((item: T) => any) | keyof T]
): T[] {
  if (args.length === 0) return []

  const iteratee = args.pop() as ((item: T) => any) | keyof T
  const arrays = args as T[][]

  const seen = new Set()
  const result: T[] = []

  const getKey = typeof iteratee === 'function'
    ? iteratee
    : (item: T) => item[iteratee as keyof T]

  for (const array of arrays) {
    if (!isArray(array)) continue

    for (const item of array) {
      const key = getKey(item)
      if (!seen.has(key)) {
        seen.add(key)
        result.push(item)
      }
    }
  }

  return result
}
