import { isObject } from '../typed/isObject'
import { isArray } from '../typed/isArray'

/**
 * 深度合并对象，类似于 Object.assign 但支持深度合并
 * @param target 目标对象
 * @param sources 源对象
 * @returns 合并后的对象
 *
 * @example
 * assignIn({ a: 1 }, { b: 2 }, { c: 3 })
 * // => { a: 1, b: 2, c: 3 }
 *
 * assignIn({ a: { x: 1 } }, { a: { y: 2 } })
 * // => { a: { x: 1, y: 2 } }
 */
export function assignIn(target: any, ...sources: any[]): any {
  if (!isObject(target)) return target

  for (const source of sources) {
    if (!isObject(source)) continue

    // 处理字符串键和 Symbol 键
    const allKeys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source)
    ]

    for (const key of allKeys) {
      const descriptor = Object.getOwnPropertyDescriptor(source, key)
      if (!descriptor || !descriptor.enumerable) continue

      const sourceValue = descriptor.value
      const targetValue = (target as any)[key]

      // 对于函数和对象，保持引用
      if (typeof sourceValue === 'function' || sourceValue instanceof Date) {
        Object.defineProperty(target, key, {
          value: sourceValue,
          writable: descriptor.writable,
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable
        })
        continue
      }

      // 对于 getter/setter，保持原样
      if (descriptor.get || descriptor.set) {
        Object.defineProperty(target, key, descriptor)
        continue
      }

      // 对于对象，进行深度合并
      if (isObject(sourceValue) && isObject(targetValue) && !isArray(sourceValue) && !isArray(targetValue)) {
        ;(target as any)[key] = assignIn(targetValue, sourceValue)
      } else {
        Object.defineProperty(target, key, {
          value: sourceValue,
          writable: descriptor.writable,
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable
        })
      }
    }
  }

  return target
}
