import { memoizeCapped } from '../internal/memoizeCapped'

/**
 * Converts the first character of string to lower case
 * @param str The string to convert
 * @returns The converted string
 *
 * @example
 * lowerFirst('Fred')
 * // => 'fred'
 *
 * lowerFirst('FRED')
 * // => 'fRED'
 */
export const lowerFirst = memoizeCapped((str: string): string => {
  if (!str) return ''

  return str.charAt(0).toLowerCase() + str.slice(1)
})
