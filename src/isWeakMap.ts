import isTag from './internal/isTag'

function isWeakMap<K extends object, V>(value: unknown): value is WeakMap<K, V> {
  return isTag(value, 'WeakMap')
}

export default isWeakMap
