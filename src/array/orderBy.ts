import { isArray } from '../typed/isArray'

type SortOrder = 'asc' | 'desc'

/**
 * 根据多个条件对数组进行排序
 * @param array 要排序的数组
 * @param iteratees 迭代器函数或属性名数组
 * @param orders 排序方向数组，'asc' 或 'desc'
 * @returns 排序后的新数组
 *
 * @example
 * orderBy([{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }], ['name'], ['desc'])
 * // => [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }]
 *
 * orderBy([{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }], ['age', 'name'], ['asc', 'desc'])
 * // => [{ name: 'barney', age: 36 }, { name: 'fred', age: 48 }]
 */
export function orderBy<T>(
  array: T[],
  iteratees: (((item: T) => any) | keyof T)[],
  orders: SortOrder[] = []
): T[] {
  if (!isArray(array) || array.length === 0) return []

  const getters = iteratees.map(iteratee =>
    typeof iteratee === 'function'
      ? iteratee
      : (item: T) => item[iteratee as keyof T]
  )

  return [...array].sort((a, b) => {
    for (let i = 0; i < getters.length; i++) {
      const getter = getters[i]
      const order = orders[i] || 'asc'

      const aVal = getter(a)
      const bVal = getter(b)

      let result = 0
      if (aVal < bVal) result = -1
      else if (aVal > bVal) result = 1

      if (result !== 0) {
        return order === 'desc' ? -result : result
      }
    }
    return 0
  })
}
