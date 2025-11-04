export class MapQueue<K, V> extends Map<K, V> {
  constructor(iterable?: Iterable<readonly [K, V]>) {
    super(iterable)
  }

  removeFirst() {
    if (this.size === 0) return
    const firstKey = this.keys().next().value!
    const value = this.get(firstKey)
    this.delete(firstKey)
    return value
  }

  getFirst() {
    if (this.size === 0) return
    return this.get(this.keys().next().value!)
  }

  isEmpty() {
    return this.size === 0
  }
}
