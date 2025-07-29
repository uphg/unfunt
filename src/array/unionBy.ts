import { isArray } from '../typed/isArray'

/**
 * 根据迭代器函数合并多个数组并去重
 * @param arrays 要合并的数组
 * @param iteratee 用于生成唯一标识的函数
 * @returns 合并去重后的数组
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
