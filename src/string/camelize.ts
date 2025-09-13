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
export function camelize(str: string) {
  return str.replace(/-\w/g, c => c.slice(1).toUpperCase())
}
