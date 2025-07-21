import { isNil } from './typed'
import { Key, ObjectLike } from './internal/interfaces'
import { getSymbols } from './internal/vanilla'

export function omit(object: any, excludes: Key[]) {
  return isNil(object) ? {} : baseOmit(object, excludes)
}

export function omitBy(object: unknown, callback: (_value: unknown, _key: Key) => boolean) {
  return isNil(object) ? {} : baseOmitBy(object, callback)
}

export function pick(object: unknown, includes: Key[]) {
  return isNil(object) ? {} : basePick(object, includes)
}

export function pickBy(obj: unknown, callback: (_value: unknown, _key: Key) => boolean) {
  if (isNil(obj)) return {}
  const props: Key[] = Object.keys(obj).concat(getSymbols(obj) as any)
  return basePickBy(obj, props, callback)
}

export function mapEntries<T extends object, K, V>(
  obj: T,
  mapper: (_key: keyof T, _value: T[keyof T]) => [K, V]
): Record<string, V> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) =>
      mapper(key as keyof T, value as T[keyof T])
    )
  ) as Record<string, V>
}

export function forEachEntry<T extends object>(
  obj: T,
  callback: (_key: keyof T, _value: T[keyof T]) => boolean | void
): void {
  for (const [key, value] of Object.entries(obj)) {
    const shouldContinue = callback(key as keyof T, value as T[keyof T])
    if (shouldContinue === false) break
  }
}

function baseOmit(object: any, excludes: Key[]) {
  return baseOmitBy(object, (_value, key) => excludes.indexOf(key) !== -1)
}

function baseOmitBy(object: any, callback: (_value: unknown, _key: Key) => boolean) {
  const props: Key[] = Object.keys(object).concat(getSymbols(object) as any)
  let index = -1
  const length = props.length
  const result: { [k: Key]: unknown } = {}
  while (++index < length) {
    const key = props[index]
    const value = object[key]
    if (!callback(value, key)) {
      result[key] = value
    }
  }
  return result
}

function basePick(obj: unknown, keys: Key[]) {
  return basePickBy(obj, keys, (_value, key) => Object.hasOwn(obj, key))
}

function basePickBy(object: any, keys: Key[], callback: (_value: unknown, _key: Key) => boolean) {
  let index = -1
  const length = keys.length
  const result: ObjectLike = {}
  while (++index < length) {
    const key = keys[index]
    const value = object[key]
    if (callback(value, key)) {
      result[key] = value
    }
  }
  return result
}
