import { isArray } from '../typed/isArray'

/**
 * 根据比较函数创建一个去重后的数组副本
 * @param array 要去重的数组
 * @param comparator 比较函数，返回 true 表示两个元素相等
 * @returns 去重后的新数组
 *
 * @example
 * uniqWith([{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 2 }], (a, b) => a.x === b.x && a.y === b.y)
 * // => [{ x: 1, y: 2 }, { x: 2, y: 1 }]
 */
export function uniqWith<T>(
  array: T[],
  comparator: (a: T, b: T) => boolean
): T[] {
  if (!isArray(array)) return []

  const result: T[] = []

  for (const item of array) {
    let isDuplicate = false

    for (const existing of result) {
      if (comparator(item, existing)) {
        isDuplicate = true
        break
      }
    }

    if (!isDuplicate) {
      result.push(item)
    }
  }

  return result
}
