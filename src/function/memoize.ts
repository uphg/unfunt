import { MapQueue } from '../structure'

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
  const cache = new MapQueue<any, ReturnType<T>>()

  const memoized = function(this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver.apply(this, args) : JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = func.apply(this, args)
    cache.set(key, result)

    if (maxSize) {
      // 如果设置了缓存大小限制且超过限制，移除最旧的缓存项
      cache.size > maxSize && cache.removeFirst()
    }

    return result
  }

  return memoized as T
}
