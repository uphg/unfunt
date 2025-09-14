import { hasOwn } from './hasOwn'

export function cloneDeep<T>(source: T): T {
  if (source === null || typeof source !== 'object') {
    return source
  }

  if (Array.isArray(source)) {
    return source.map(item => cloneDeep(item)) as T
  }

  const cloned = {} as Record<string, unknown>
  for (const key in source) {
    if (hasOwn(source, key)) {
      cloned[key] = cloneDeep(source[key])
    }
  }

  return cloned as T
}
