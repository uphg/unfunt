export function isIterable(value: unknown): value is Iterable<unknown> {
  if (value == null) return false
  if (typeof value === 'string') return true
  return typeof value === 'object' && Symbol.iterator in (value as object)
}
