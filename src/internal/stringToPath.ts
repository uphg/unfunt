import { memoize } from '../function/memoize'

const maxSize = 500

/**
 * Used to match property names within property paths.
 */
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g

/**
 * Used to match backslashes in property paths.
 */
const reEscapeChar = /\\(\\)?/g

/**
 * Converts `string` to a property path array.
 * @param string The string to convert.
 * @returns Returns the property path array.
 */
export const stringToPath = memoize((string: string): (string | number)[] => {
  const result: (string | number)[] = []

  // Handle leading dot (e.g., '.a.b')
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('')
  }

  string.replace(rePropName, (match: string, number?: string, quote?: string, subString?: string) => {
    let key: string | number = match

    if (quote) {
      // Handle quoted strings: ["a.b"] or ['a.b']
      key = subString!.replace(reEscapeChar, '$1')
    } else if (number) {
      // Handle numbers: [0] or [-1] or [1.5]
      key = parseFloat(number)
    }

    result.push(key)
    return match
  })

  return result
}, { maxSize })
