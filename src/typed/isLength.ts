import { MAX_SAFE_INTEGER } from '../internal/common'
import { isNumber } from './isNumber'

export function isLength(value: unknown) {
  return isNumber(value) && (value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER)
}
