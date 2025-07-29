import { _isNaN } from '../internal/common'
import { isNumber } from './isNumber'

export function isNaN(value: unknown): value is number {
  return isNumber(value) && _isNaN(value as number)
}
