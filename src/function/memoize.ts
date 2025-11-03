interface MemoizeOptions {
  maxSize?: number
  resolver?: (...args: any[]) => any
}

/**
 * Memoizes a function with a cache size limit
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  options: MemoizeOptions = {}
): T {
  const { maxSize, resolver } = options
  const cache = new Map<any, ReturnType<T>>()
  const keys: any[] = []

  const memoized = function(this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver.apply(this, args) : JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = func.apply(this, args)
    cache.set(key, result)

    if (maxSize) {
      keys.push(key)
      // 如果设置了缓存大小限制且超过限制，移除最旧的缓存项
      keys.length > maxSize && cache.delete(keys.shift()!)
    }

    return result
  }

  return memoized as T
}
