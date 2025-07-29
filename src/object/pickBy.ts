import { isNil } from '../typed/isNil'
import { Key } from '../internal/interfaces'
import { getSymbols } from '../internal/vanilla'
import { basePickBy } from './basePickBy'

export function pickBy(obj: unknown, callback: (value: unknown, key: Key) => boolean) {
  if (isNil(obj)) return {}
  const props: Key[] = Object.keys(obj).concat(getSymbols(obj) as any)
  return basePickBy(obj, props, callback)
}
