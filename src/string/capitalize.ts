/**
 * Converts the first character of string to upper case and the remaining to lower case
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
export function capitalize(str: string): string {
  if (!str) return ''

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
