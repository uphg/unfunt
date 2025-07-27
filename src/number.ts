import { _isFinite, _isNaN, INFINITY, MAX_INTEGER, MAX_ARRAY_LENGTH } from './internal/common'
import { isArray } from './typed'

export function toNumber(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (trimmed === '') return 0
    const num = Number(trimmed)
    return Number.isNaN(num) ? NaN : num
  }
  if (typeof value === 'boolean') return value ? 1 : 0
  if (value == null) return 0
  if (typeof value === 'bigint') return Number(value)
  if (typeof value === 'symbol') return NaN
  if (typeof value === 'object') {
    if (isArray(value)) {
      // Handle arrays: [] -> 0, [42] -> 42, [1,2] -> NaN
      if (value.length === 0) return 0
      if (value.length === 1) return toNumber(value[0])
      return NaN
    }
    const primitive = value.valueOf ? value.valueOf() : value
    if (primitive !== value) return toNumber(primitive)
    return NaN
  }
  return Number(value)
}

export function toFinite(value: unknown): number {
  if (!value) {
    return value === 0 ? value : 0
  }

  value = toNumber(value)

  if (value === INFINITY || value === -INFINITY) {
    const sign = (value > 0 ? 1 : -1)
    return sign * MAX_INTEGER
  }

  return (value === value ? value : 0) as number
}

export function toInteger(value: unknown) {
  const result = toFinite(value)
  const remainder = result % 1

  return remainder ? result - remainder : result
}

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
