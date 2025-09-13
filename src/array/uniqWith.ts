/**
 * Create a deduplicated array copy based on comparison function
 * @param array Array to deduplicate
 * @param comparator Comparison function, returns true if two elements are equal
 * @returns Deduplicated new array
 *
 * @example
 * uniqWith([{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 2 }], (a, b) => a.x === b.x && a.y === b.y)
 * // => [{ x: 1, y: 2 }, { x: 2, y: 1 }]
 */
export function uniqWith<T>(
  array: T[],
  comparator: (a: T, b: T) => boolean
): T[] {
  if (!Array.isArray(array)) return []

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
