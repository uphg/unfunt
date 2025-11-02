/**
 * Creates a cached version of a string function.
 * @private
 * @param fn The string function to cache
 * @returns The cached function
 */
export function cacheStringFunction<T extends (str: string) => string>(fn: T): T {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as T
}
