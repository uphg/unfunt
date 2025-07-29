/**
 * 将字符串的首字母转换为大写，其余字母转换为小写
 * @param str 要转换的字符串
 * @returns 转换后的字符串
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
