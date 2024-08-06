import baseFlat from './internal/baseFlat'
import type { FlatCallback } from './types'

function flatMapDeep<T, U>(array: T[], callback: FlatCallback<T, U>) {
  return baseFlat<T, U>(array, callback, true)
}

export default flatMapDeep
