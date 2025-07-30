import { isObject } from '../typed/isObject'
import { toPath } from './toPath'

type PropertyPath = string | readonly (string | number)[]

/**
 * 设置对象路径上的值
 * @param object 要修改的对象
 * @param path 属性路径
 * @param value 要设置的值
 * @returns 原对象
 *
 * @example
 * const object = { a: [{ b: { c: 3 } }] }
 *
 * set(object, 'a[0].b.c', 4)
 * console.log(object.a[0].b.c)
 * // => 4
 *
 * set(object, ['x', '0', 'y', 'z'], 5)
 * console.log(object.x[0].y.z)
 * // => 5
 */
export function set<T extends Record<string, any>>(
  object: T,
  path: PropertyPath,
  value: any
): T {
  if (!isObject(object) || path == null) {
    return object
  }

  const pathArray = Array.isArray(path) ? [...path] : toPath(path as string)
  let current: any = object

  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i]
    const nextKey = pathArray[i + 1]

    if (!isObject(current[key])) {
      // 根据下一个key的类型决定创建对象还是数组
      current[key] = typeof nextKey === 'number' || /^\d+$/.test(String(nextKey)) ? [] : {}
    }

    current = current[key]
  }

  // 设置最终值
  const lastKey = pathArray[pathArray.length - 1]
  current[lastKey] = value

  return object
}
