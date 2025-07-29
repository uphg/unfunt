import { isArray } from '../typed/isArray'

/**
 * 将值转换为数组，如果不是数组则包装在数组中
 * @param value 要转换的值
 * @returns 数组
 *
 * @example
 * castArray(1)
 * // => [1]
 *
 * castArray({ a: 1 })
 * // => [{ a: 1 }]
 *
 * castArray('abc')
 * // => ['abc']
 *
 * castArray([1, 2, 3])
 * // => [1, 2, 3]
 */
export function castArray<T>(value: T): T extends readonly unknown[] ? T : T[] {
  return (isArray(value) ? value : [value]) as T extends readonly unknown[] ? T : T[]
}
