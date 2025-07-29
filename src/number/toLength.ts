import { MAX_ARRAY_LENGTH } from '../internal/common'
import { toInteger } from './toInteger'

export function toLength(value: unknown = 0) {
  if (!value) {
    return 0
  }
  value = toInteger(value)
  if (value as number < 0) {
    return 0
  }
  if (value as number > MAX_ARRAY_LENGTH) {
    return MAX_ARRAY_LENGTH
  }
  return value as number
}
