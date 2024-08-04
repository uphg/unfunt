function mapToArray<K, V>(map: Map<K, V>): [K, V][] {
  return Array.from(map.entries())
}

export default mapToArray
