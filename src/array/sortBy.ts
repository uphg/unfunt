import { isArray } from '../typed/isArray'

/**
 * 根据迭代器函数对数组进行排序
 * @param array 要排序的数组
 * @param iteratees 迭代器函数或属性名
 * @returns 排序后的新数组
 *
 * @example
 * sortBy([{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }], 'age')
 * // => [{ name: 'barney', age: 36 }, { name: 'fred', age: 48 }]
 *
 * sortBy([{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }], o => o.name)
 * // => [{ name: 'barney', age: 36 }, { name: 'fred', age: 48 }]
 */
export function sortBy<T>(
  array: T[],
  ...iteratees: (((item: T) => any) | keyof T)[]
): T[] {
  if (!isArray(array) || array.length === 0) return []

  const getters = iteratees.map(iteratee =>
    typeof iteratee === 'function'
      ? iteratee
      : (item: T) => item[iteratee as keyof T]
  )

  return [...array].sort((a, b) => {
    for (const getter of getters) {
      const aVal = getter(a)
      const bVal = getter(b)

      // 处理 undefined 和 null 值，将它们排在最前面
      if (aVal === undefined || aVal === null) {
        if (bVal === undefined || bVal === null) {
          // 两者都是 undefined/null，保持原顺序
          return 0
        }
        // a 是 undefined/null，b 是正常值，a 应该排在前面
        return -1
      }
      if (bVal === undefined || bVal === null) {
        // b 是 undefined/null，a 是正常值，b 应该排在前面
        return 1
      }

      if (aVal < bVal) return -1
      if (aVal > bVal) return 1
    }
    return 0
  })
}
