import toNumber from './toNumber'
import { INFINITY, MAX_INTEGER } from './internal/common'

// 转有限数字
function toFinite(value: unknown) {
  if (!value) {
    return value === 0 ? value : 0
  }

  value = toNumber(value)

  if (value === INFINITY || value === -INFINITY) {
    const sign = (value > 0 ? 1 : -1)
    return sign * MAX_INTEGER
  }

  return (value !== value ? 0 : value) as number
}

export default toFinite
