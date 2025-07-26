import { _isFinite, _isNaN, MAX_SAFE_INTEGER, INFINITY, MAX_INTEGER, MAX_ARRAY_LENGTH } from './internal/common'
import { isTag } from './internal/vanilla'

interface ErrorLike { message: string, name: string }

const getProto = Object.getPrototypeOf

export function isArray(value: unknown): value is Array<unknown> {
  return isTag(value, 'Array')
}

export function isArrayLike(value: unknown): value is ArrayLike<unknown> | string {
  return (value !== void 0 && value !== null && typeof value !== 'function') && isLength((value as ArrayLike<unknown>).length)
}

export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false
}

export function isDate(value: unknown): value is Date {
  return isTag(value, 'Date')
}

export function isEmpty<T extends unknown>(value: T) {
  if (isNil(value) || isBoolean(value)) return true

  if (
    isArray(value)
    || isString(value)
    || (
      isArrayLike(value)
      && typeof (value as any).splice === 'function'
    )
  ) {
    return !value.length
  }

  if (isMap(value) || isSet(value)) return !(value as (Set<unknown> & Map<unknown, unknown>)).size

  return Object.keys(value as object).length === 0
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

export function isInteger(value: unknown): value is number {
  return isNumber(value) && value % 1 === 0
}

export function isSet(value: unknown) {
  return isTag(value, 'Set')
}

export function isMap(value: unknown) {
  return isTag(value, 'Map')
}

export function isError(value: any): value is Error | DOMException | ErrorLike {
  return isTag(value, 'Error')
    || isTag(value, 'DOMException')
    || (
      typeof value?.message === 'string'
      && typeof value?.name === 'string'
      && !isPlainObject(value)
    )
}

export function isFinite(value: unknown) {
  return isNumber(value) && _isFinite(value) && !_isNaN(value)
}

export function isLength(value: unknown) {
  return isNumber(value) && (value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER)
}

export function isNaN(value: unknown): value is number {
  return isNumber(value) && _isNaN(value as number)
}

export function isNil(value: unknown): value is undefined | null {
  return value === void 0 || value === null
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isObject(value: unknown): value is object {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

export function isObjectLike<T extends object>(value: unknown): value is T {
  return typeof value === 'object' && value !== null
}

export function isPlainObject<T extends object>(value: unknown): value is T {
  if (!isObjectLike(value) || !isTag(value, 'Object')) {
    return false
  }
  if (getProto(value) === null) {
    return true
  }

  return getProto(value) === Object.prototype
}

export function isPrimitive(value: unknown): value is string | number | bigint | boolean | symbol | null | undefined {
  const type = typeof value

  if (type === 'object') {
    return value === null
  }
  return type !== 'function'
}

export function isPromise<T>(obj: any): obj is Promise<T> {
  return !!obj && isFunction(obj?.then)
}

export function isRegExp(value: unknown): value is RegExp {
  return isTag(value, 'RegExp')
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}

export function isIterable(value: unknown): value is Iterable<unknown> {
  if (value == null) return false
  if (typeof value === 'string') return true
  return typeof value === 'object' && Symbol.iterator in (value as object)
}

export function toArray<T>(value: T): T extends readonly unknown[] ? T : T[]
export function toArray(value: unknown): unknown[]
export function toArray(value: unknown): unknown[] {
  if (isNil(value)) return []
  if (isArray(value)) return value
  if (isString(value)) return Array.from(value)
  if (isIterable(value)) {
    return Array.from(value)
  }
  return [value]
}

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
