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

      if (aVal < bVal) return -1
      if (aVal > bVal) return 1
    }
    return 0
  })
}
