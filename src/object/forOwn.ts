/**
 * Iterates over own enumerable string keyed properties of an object and invokes
 * `iteratee` for each property. The iteratee is invoked with three arguments:
 * (value, key, object). Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @param object - The object to iterate over.
 * @param iteratee - The function invoked per iteration.
 * @example
 *
 * forOwn({ 'a': 1, 'b': 2 }, (value, key) => {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
export function forOwn<T extends Record<string, any>>(
  object: T | null | undefined,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => boolean | void
): T | null | undefined {
  if (object == null) {
    return object
  }

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const result = iteratee(object[key], key as keyof T, object)
      if (result === false) {
        break
      }
    }
  }

  return object
}
