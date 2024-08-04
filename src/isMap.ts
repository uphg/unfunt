import isTag from './internal/isTag'

function isMap<K, V>(value: unknown): value is Map<K, V> {
  return isTag(value, 'Map')
}

export default isMap
