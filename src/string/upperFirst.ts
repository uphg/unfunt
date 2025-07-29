/**
 * 将字符串的首字母转换为大写
 * @param str 要转换的字符串
 * @returns 转换后的字符串
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
