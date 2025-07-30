import { isObject } from '../typed/isObject'
import { toPath } from './toPath'

type PropertyPath = string | readonly (string | number)[]

/**
 * Sets the value at path of object
 * @param object The object to modify
 * @param path The property path
 * @param value The value to set
 * @returns The original object
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
      // Decide whether to create object or array based on next key type
      current[key] = typeof nextKey === 'number' || /^\d+$/.test(String(nextKey)) ? [] : {}
    }

    current = current[key]
  }

  // Set the final value
  const lastKey = pathArray[pathArray.length - 1]
  current[lastKey] = value

  return object
}
