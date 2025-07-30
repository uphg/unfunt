import { isObject } from '../typed/isObject'
import { toPath } from './toPath'

type PropertyPath = string | readonly (string | number)[]

/**
 * Gets the value at path of object
 * @param object The object to query
 * @param path The property path
 * @param defaultValue The default value
 * @returns The resolved value or default value
 *
 * @example
 * const object = { a: [{ b: { c: 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */
export function get<T = any>(
  object: any,
  path: PropertyPath,
  defaultValue?: T
): T {
  if (!isObject(object) || path == null) {
    return defaultValue as T
  }

  const pathArray = Array.isArray(path) ? path : toPath(path as string)
  let result = object

  for (let i = 0; i < pathArray.length; i++) {
    const key = pathArray[i]
    if (result == null || !isObject(result)) {
      return defaultValue as T
    }
    result = result[key as keyof typeof result]
  }

  return result === undefined ? (defaultValue as T) : result
}
