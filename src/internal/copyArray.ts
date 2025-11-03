/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
export function copyArray<T>(source: T[], array: T[] = []): T[] {
  if (array.length === 0) {
    return Array.from(source)
  }

  if (array.length < source.length) {
    array.length = source.length
  }

  for (let i = 0; i < source.length; i++) {
    array[i] = source[i]
  }

  return array
}
