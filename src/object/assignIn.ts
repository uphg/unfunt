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

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = (source as any)[key]
        const targetValue = (target as any)[key]

        if (isObject(sourceValue) && isObject(targetValue) && !isArray(sourceValue) && !isArray(targetValue)) {
          ;(target as any)[key] = assignIn(targetValue, sourceValue)
        } else {
          ;(target as any)[key] = sourceValue
        }
      }
    }
  }

  return target
}
