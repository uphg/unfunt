import { ObjectToString } from './common'

export function isTypeString(value: unknown, type: string) {
  return ObjectToString.call(value) === `[object ${type}]`
}
