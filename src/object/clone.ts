export function clone<T>(source: T): T {
  if (source === null || typeof source !== 'object') {
    return source
  }

  if (Array.isArray(source)) {
    return [...source] as T
  }

  return { ...source } as T
}
