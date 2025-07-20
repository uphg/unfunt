import basePickBy from './internal/basePickBy'
import getSymbols from './internal/getSymobls'
import { Key } from './internal/interfaces'
import isNil from './isNil'

function pickBy(obj: unknown, callback: (_value: unknown, _key: Key) => boolean) {
  if (isNil(obj)) return {}
  const props: Key[] = Object.keys(obj).concat(getSymbols(obj) as any)
  return basePickBy(obj, props, callback)
}

export default pickBy
