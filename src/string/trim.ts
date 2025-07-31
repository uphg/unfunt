/**
 * Removes whitespace from both ends of a string. Handles undefined/null safely.
 * @param value The string to trim
 * @returns The trimmed string or undefined if input is undefined
 *
 * @example
 * trim('  hello  ')
 * // => 'hello'
 *
 * trim('hello')
 * // => 'hello'
 *
 * trim(undefined)
 * // => undefined
 */
export function trim(value?: string): string | undefined {
  return value?.replace(/^\s+|\s+$/g, '')
}
