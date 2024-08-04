import isTag from './internal/isTag'

/**
 * Checks if `value` is classified as a `Date` object.
 */
function isDate(value: unknown): value is Date {
  return isTag(value, 'Date')
}

export default isDate
