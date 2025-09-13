import { cacheStringFunction } from '../internal'

/**
 * Converts first character of string to upper case and the rest to lower case.
 * Uses caching for better performance with repeated calls.
 * @param str The string to convert
 * @returns The converted string
 *
 * @example
 * capitalize('FRED')
 * // => 'Fred'
 *
 * capitalize('fRED')
 * // => 'Fred'
 */
export const capitalize: <T extends string>(str: T) => Capitalize<T>
  = cacheStringFunction(<T extends string>(str: T) => {
    return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>
  })
