import { _isFinite, _isNaN } from '../internal/common'
import { isNumber } from './isNumber'

export function isFinite(value: unknown) {
  return isNumber(value) && _isFinite(value) && !_isNaN(value)
}
