import { memoizeCapped } from '../internal/memoizeCapped'

const hyphenateRE = /\B([A-Z])/g

/**
 * Converts a camelCase string to hyphenated (kebab-case).
 * Uses caching for better performance with repeated calls.
 * @private
 * @param str The camelCase string to convert
 * @returns The hyphenated string
 *
 * @example
 * hyphenate('fooBar')
 * // => 'foo-bar'
 *
 * hyphenate('fooBarBaz')
 * // => 'foo-bar-baz'
 */
export const hyphenate: (str: string) => string = memoizeCapped(
  (str: string) => str.replace(hyphenateRE, '-$1').toLowerCase()
)
