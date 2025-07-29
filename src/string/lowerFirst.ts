/**
 * 将字符串的首字母转换为小写
 * @param str 要转换的字符串
 * @returns 转换后的字符串
 *
 * @example
 * lowerFirst('Fred')
 * // => 'fred'
 *
 * lowerFirst('FRED')
 * // => 'fRED'
 */
export function lowerFirst(str: string): string {
  if (!str) return ''

  return str.charAt(0).toLowerCase() + str.slice(1)
}
