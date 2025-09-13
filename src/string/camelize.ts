import { cacheStringFunction } from '../internal'

const camelizeRE = /-\w/g

/**
 * Converts a hyphenated string to camelCase.
 * Uses caching for better performance with repeated calls.
 * @private
 * @param str The hyphenated string to convert
 * @returns The camelCase string
 *
 * @example
 * camelize('foo-bar')
 * // => 'fooBar'
 *
 * camelize('foo-bar-baz')
 * // => 'fooBarBaz'
 */
export const camelize: (str: string) => string = cacheStringFunction(
  (str: string): string => {
    return str.replace(camelizeRE, c => c.slice(1).toUpperCase())
  }
)
