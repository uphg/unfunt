import { _isFinite, _isNaN } from './internal/common'

function isFinite(value: unknown) {
  return typeof value === 'number' && _isFinite(value) && !_isNaN(value)
}

export default Number.isFinite || isFinite
