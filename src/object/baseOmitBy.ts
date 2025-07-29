import { Key } from '../internal/interfaces'
import { getSymbols } from '../internal/vanilla'

export function baseOmitBy(object: any, callback: (_value: unknown, _key: Key) => boolean) {
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
