import { _isFinite, _isNaN } from './internal/common'
import isNumber from './isNumber'

function isFinite(value: unknown) {
  return isNumber(value) && _isFinite(value) && !_isNaN(value)
}

export default Number.isFinite || isFinite
