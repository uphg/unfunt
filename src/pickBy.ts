import basePickBy from './internal/basePickBy'
import type { Key } from './internal/interfaces'
import isNil from './isNil'

function pickBy<T extends object>(obj: T, callback: (value: unknown, key: Key) => boolean) {
  if (isNil(obj)) return {}
  const props: Key[] = Object.keys(obj)
  return basePickBy(obj, props, callback)
}

export default pickBy
