/**
 * Converts the first character of string to upper case
 * @param str The string to convert
 * @returns The converted string
 *
 * @example
 * upperFirst('fred')
 * // => 'Fred'
 *
 * upperFirst('FRED')
 * // => 'FRED'
 */
export function upperFirst(str: string): string {
  if (!str) return ''

  return str.charAt(0).toUpperCase() + str.slice(1)
}
