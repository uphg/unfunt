import { _isFinite, _isNaN, MAX_SAFE_INTEGER } from './internal/common'
import { isTag } from './internal/vanilla'

interface ErrorLike { message: string, name: string }

const getProto = Object.getPrototypeOf

export function isArray(value: unknown): value is Array<unknown> {
  return isTag(value, 'Array')
}

export function isArrayLike(value: unknown): value is ArrayLike<unknown> | string {
  return value !== void 0 && value !== null && typeof value !== 'function' && isLength((value as ArrayLike<unknown>).length)
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
  return isNumber(value) && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER
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
