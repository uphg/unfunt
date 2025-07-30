/**
 * 将字符串路径转换为路径数组
 * @param path 字符串路径
 * @returns 路径数组
 */
export function toPath(path: string): (string | number)[] {
  if (typeof path !== 'string') {
    return []
  }

  const result: (string | number)[] = []

  // 处理形如 'a.b.c' 或 'a[0].b[1].c' 的路径
  path.replace(/[^.[\]]+|\[(?:([^"'][^[]*))\]/g, (match, expression) => {
    const key = expression || match
    // 尝试转换为数字，如果是纯数字字符串
    const numKey = Number(key)
    result.push(isNaN(numKey) ? key : numKey)
    return match
  })

  return result
}
