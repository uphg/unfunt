import { isTypeString } from './isTypeString'
import { isObjectLike } from './isObjectLike'

const getProto = Object.getPrototypeOf

/**
 * Checks if a value is a plain object (created by Object constructor or {}).
 * @param value The value to check
 * @returns True if the value is a plain object, false otherwise
 *
 * @example
 * isPlainObject({})
 * // => true
 *
 * isPlainObject(new Object())
 * // => true
 *
 * isPlainObject([])
 * // => false
 *
 * isPlainObject(new Date())
 * // => false
 */
export function isPlainObject<T extends object>(value: unknown): value is T {
  if (!isObjectLike(value) || !isTypeString(value, 'Object')) {
    return false
  }
  if (getProto(value) === null) {
    return true
  }

  return getProto(value) === Object.prototype
}
