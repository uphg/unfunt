import { memoize } from '../function'
import { MemoizeResolver } from '../function/memoize'

const maxSize = 500

export function memoizeCapped(func: MemoizeResolver): MemoizeResolver {
  return memoize(func, { maxSize })
}
