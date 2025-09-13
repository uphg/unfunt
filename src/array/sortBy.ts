/**
 * Sort array based on iteratee functions
 * @param array Array to sort
 * @param iteratees Iteratee functions or property names
 * @returns Sorted new array
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
  if (!Array.isArray(array) || array.length === 0) return []

  const getters = iteratees.map(iteratee =>
    typeof iteratee === 'function'
      ? iteratee
      : (item: T) => item[iteratee as keyof T]
  )

  return [...array].sort((a, b) => {
    for (const getter of getters) {
      const aVal = getter(a)
      const bVal = getter(b)

      // Handle undefined and null values, place them at the beginning
      if (aVal === undefined || aVal === null) {
        if (bVal === undefined || bVal === null) {
          // Both are undefined/null, maintain original order
          return 0
        }
        // a is undefined/null, b is normal value, a should come first
        return -1
      }
      if (bVal === undefined || bVal === null) {
        // b is undefined/null, a is normal value, b should come first
        return 1
      }

      if (aVal < bVal) return -1
      if (aVal > bVal) return 1
    }
    return 0
  })
}
