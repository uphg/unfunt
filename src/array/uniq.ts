/**
 * Create a deduplicated array copy using SameValueZero for equality comparison
 * @param array Array to deduplicate
 * @returns Deduplicated new array
 *
 * @example
 * uniq([2, 1, 2])
 * // => [2, 1]
 *
 * uniq([1, 2, 1, 3, 2])
 * // => [1, 2, 3]
 */
export function uniq<T>(array: T[]): T[] {
  if (!Array.isArray(array)) return []

  const seen = new Set<T>()
  const result: T[] = []

  for (const item of array) {
    if (!seen.has(item)) {
      seen.add(item)
      result.push(item)
    }
  }

  return result
}
