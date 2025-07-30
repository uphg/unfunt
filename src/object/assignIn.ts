import { isObject } from '../typed/isObject'
import { isArray } from '../typed/isArray'

/**
 * Deep merge objects, similar to Object.assign but supports deep merging
 * @param target The target object
 * @param sources The source objects
 * @returns The merged object
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

    // Handle string keys and Symbol keys
    const allKeys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source)
    ]

    for (const key of allKeys) {
      const descriptor = Object.getOwnPropertyDescriptor(source, key)
      if (!descriptor || !descriptor.enumerable) continue

      const sourceValue = descriptor.value
      const targetValue = (target as any)[key]

      // For functions and objects, maintain reference
      if (typeof sourceValue === 'function' || sourceValue instanceof Date) {
        Object.defineProperty(target, key, {
          value: sourceValue,
          writable: descriptor.writable,
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable
        })
        continue
      }

      // For getter/setter, keep as is
      if (descriptor.get || descriptor.set) {
        Object.defineProperty(target, key, descriptor)
        continue
      }

      // For objects, perform deep merge
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
