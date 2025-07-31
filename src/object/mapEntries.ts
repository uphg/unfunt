/**
 * Creates a new object by mapping each key-value pair of the source object using the provided mapper function.
 * @param obj The source object to map entries from
 * @param mapper Function that transforms each key-value pair into a new [key, value] tuple
 * @returns A new object with the mapped entries
 *
 * @example
 * mapEntries({ a: 1, b: 2 }, (key, value) => [key.toUpperCase(), value * 2])
 * // => { A: 2, B: 4 }
 *
 * mapEntries({ x: 'hello', y: 'world' }, (key, value) => [`${key}_len`, value.length])
 * // => { x_len: 5, y_len: 5 }
 */
export function mapEntries<T extends object, K, V>(
  obj: T,
  mapper: (key: keyof T, value: T[keyof T]) => [K, V]
): Record<string, V> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) =>
      mapper(key as keyof T, value as T[keyof T])
    )
  ) as Record<string, V>
}
