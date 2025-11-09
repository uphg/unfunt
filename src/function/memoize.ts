import { QueueMap } from '../structure'

export type MemoizeResolver = (...args: any[]) => any

export interface MemoizeOptions {
  maxSize?: number
  resolver?: MemoizeResolver
}

/**
 * Memoizes a function with a cache size limit
 */
export function memoize<T extends MemoizeResolver>(
  func: T,
  options: MemoizeOptions = {}
): T {
  const { maxSize, resolver } = options
  const cache = new QueueMap<any, ReturnType<T>>()

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
