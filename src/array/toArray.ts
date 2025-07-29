import { isArray } from '../typed/isArray'
import { isIterable } from '../typed/isIterable'
import { isNil } from '../typed/isNil'
import { isString } from '../typed/isString'

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
