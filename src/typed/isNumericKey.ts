const reStringKey = /^[+-]?(\d*\.\d+|\d+\.\d*|\d+)$/
/**
 * 判断是否为对象数字 key（包含浮点数）
 * @param key 要判断的 key
 * @returns 是否为数字形式的 key
 *
 * @example
 * isNumericKey('0') // true
 * isNumericKey('1.5') // true
 * isNumericKey('-123') // true
 * isNumericKey('abc') // false
 * isNumericKey(0) // true
 * isNumericKey(1.5) // true
 */
export function isNumericKey(key: any): boolean {
  if (typeof key === 'number') {
    return true
  }

  if (typeof key === 'string') {
    return reStringKey.test(key)
  }

  return false
}
