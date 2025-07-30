/**
 * Converts a string path to a path array
 * @param path The string path
 * @returns The path array
 */
export function toPath(path: string): (string | number)[] {
  if (typeof path !== 'string') {
    return []
  }

  const result: (string | number)[] = []

  // Handle paths like 'a.b.c' or 'a[0].b[1].c'
  path.replace(/[^.[\]]+|\[(?:([^"'][^[]*))\]/g, (match, expression) => {
    const key = expression || match
    // Try to convert to number if it's a pure numeric string
    const numKey = Number(key)
    result.push(isNaN(numKey) ? key : numKey)
    return match
  })

  return result
}
