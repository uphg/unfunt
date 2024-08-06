import baseFlatDeep from './internal/baseFlatDeep'
import type { ListOfRecursiveArraysOrValues } from './types'

function flatDeep<T>(array: ListOfRecursiveArraysOrValues<T>) {
  if (!array.length) return []
  return baseFlatDeep(array)
}

export default flatDeep
