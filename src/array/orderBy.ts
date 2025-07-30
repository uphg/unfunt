import { isArray } from '../typed/isArray'

type SortOrder = 'asc' | 'desc'

/**
 * Sorts an array by multiple criteria
 * @param array The array to sort
 * @param iteratees Array of iterator functions or property names
 * @param orders Array of sort directions, 'asc' or 'desc'
 * @returns A new sorted array
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

      // Handle undefined and null values, put them at the end
      if (aVal === undefined || aVal === null) {
        if (bVal === undefined || bVal === null) {
          // Both are undefined/null, maintain original order
          return 0
        }
        // a is undefined/null, b is normal value, a should be placed after
        return order === 'desc' ? 1 : -1
      }
      if (bVal === undefined || bVal === null) {
        // b is undefined/null, a is normal value, b should be placed after
        return order === 'desc' ? -1 : 1
      }

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
