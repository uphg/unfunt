/**
 * Iterates over each key-value pair in an object and executes a callback function.
 * The iteration can be stopped early by returning false from the callback.
 * @param obj The object to iterate over
 * @param callback Function called for each key-value pair, return false to stop iteration
 * @returns void
 *
 * @example
 * forEachEntry({ a: 1, b: 2 }, (key, value) => {
 *   console.log(`${key}: ${value}`)
 * })
 * // Logs: 'a: 1', 'b: 2'
 *
 * forEachEntry({ a: 1, b: 2, c: 3 }, (key, value) => {
 *   if (value === 2) return false
 *   console.log(key)
 * })
 * // Logs: 'a'
 */
export function forEachEntry<T extends object>(
  obj: T,
  callback: (key: keyof T, value: T[keyof T]) => boolean | void
): void {
  for (const [key, value] of Object.entries(obj)) {
    const shouldContinue = callback(key as keyof T, value as T[keyof T])
    if (shouldContinue === false) break
  }
}
