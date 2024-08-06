import baseFlat from './internal/baseFlat'
import type { RecursiveArray } from './types'

function flatDeep<T>(array: RecursiveArray<T>) {
  return array?.length ? baseFlat<T, T | RecursiveArray<T>>(array, item => item, true) : []
}

export default flatDeep
