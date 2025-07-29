import { isNil } from '../typed/isNil'

/**
 * 根据路径获取对象属性值
 * @param object 要查询的对象
 * @param path 属性路径，可以是字符串或数组
 * @param defaultValue 默认值
 * @returns 属性值或默认值
 *
 * @example
 * get({ a: { b: { c: 3 } } }, 'a.b.c')
 * // => 3
 *
 * get({ a: { b: { c: 3 } } }, ['a', 'b', 'c'])
 * // => 3
 *
 * get({ a: { b: { c: 3 } } }, 'a.b.d', 'default')
 * // => 'default'
 */
export function get<T = any>(
  object: any,
  path: string | (string | number)[],
  defaultValue?: T
): T {
  if (isNil(object)) return defaultValue as T

  const keys = Array.isArray(path)
    ? path
    : path.toString().split(/[.[\]]+/).filter(Boolean)

  let result = object

  for (const key of keys) {
    if (isNil(result) || !(key in result)) {
      return defaultValue as T
    }
    result = result[key]
  }

  return result === undefined ? defaultValue as T : result
}
