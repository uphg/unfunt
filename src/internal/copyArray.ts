function copyArray<T>(source: ArrayLike<T>, array: T[] = []): T[] {
  return Array.from(source, (item, index) => array[index] = item)
}

export default copyArray
