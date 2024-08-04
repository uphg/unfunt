import isTag from './internal/isTag'

function isWeakSet<T extends object>(value: unknown): value is WeakSet<T> {
  return isTag(value, 'WeakSet')
}

export default isWeakSet
