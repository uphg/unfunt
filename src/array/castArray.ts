/**
 * Converts value to an array, wrapping it in an array if it's not already one
 * @param value The value to convert
 * @returns Array
 *
 * @example
 * castArray(1)
 * // => [1]
 *
 * castArray({ a: 1 })
 * // => [{ a: 1 }]
 *
 * castArray('abc')
 * // => ['abc']
 *
 * castArray([1, 2, 3])
 * // => [1, 2, 3]
 */
export function castArray<T>(value: T): T extends readonly unknown[] ? T : T[] {
  return (Array.isArray(value) ? value : [value]) as T extends readonly unknown[] ? T : T[]
}
