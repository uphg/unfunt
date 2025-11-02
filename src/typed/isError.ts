import { isTypeString } from './isTypeString'
import { isPlainObject } from './isPlainObject'

interface ErrorLike { message: string, name: string }

/**
 * Checks if a value is an Error object or error-like object.
 * @param value The value to check
 * @returns True if the value is an Error or error-like, false otherwise
 *
 * @example
 * isError(new Error('test'))
 * // => true
 *
 * isError({ message: 'test', name: 'TestError' })
 * // => true
 *
 * isError('test')
 * // => false
 */
export function isError(value: any): value is Error | DOMException | ErrorLike {
  return isTypeString(value, 'Error')
    || isTypeString(value, 'DOMException')
    || (
      typeof value?.message === 'string'
      && typeof value?.name === 'string'
      && !isPlainObject(value)
    )
}
