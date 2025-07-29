export function isPrimitive(value: unknown): value is string | number | bigint | boolean | symbol | null | undefined {
  const type = typeof value

  if (type === 'object') {
    return value === null
  }
  return type !== 'function'
}
