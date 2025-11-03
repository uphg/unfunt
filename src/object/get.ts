import { isNil } from '../typed'
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
export function get<T>(object: any, path: PropertyPath, defaultValue: T): T
export function get<T = any>(object: any, path: PropertyPath): T | undefined
export function get<T = any>(
  object: any,
  path: PropertyPath,
  defaultValue?: T
): T | undefined {
  if (!isObject(object) || isNil(path)) {
    return defaultValue
  }

  if (path === '') {
    return (object as T)[''] ?? defaultValue
  }

  const pathArray = Array.isArray(path) ? path : toPath(path as string)

  let result: any = object

  for (let i = 0; i < pathArray.length; i++) {
    const key = pathArray[i]
    if (isNil(result) || !isObject(result)) {
      return defaultValue
    }
    result = (result as Record<string | number, any>)[key]
  }

  return result === undefined ? defaultValue : result
}
