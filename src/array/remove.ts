/**
 * Removes the first occurrence of an item from an array.
 * @param arr The array to modify
 * @param item The item to remove
 * @returns The modified array
 *
 * @example
 * remove([1, 2, 3, 2], 2)
 * // => [1, 3, 2]
 *
 * remove(['a', 'b', 'c'], 'b')
 * // => ['a', 'c']
 *
 * remove([true, false, true], false)
 * // => [true, true]
 */
export function remove<T>(arr: T[], item: T): T[] {
  const index = arr.indexOf(item)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}
