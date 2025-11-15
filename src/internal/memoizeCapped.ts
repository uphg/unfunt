import { memoize } from '../function/memoize'
import type { MemoizeResolver } from '../function/memoize'

const maxSize = 500

export function memoizeCapped(func: MemoizeResolver): MemoizeResolver {
  return memoize(func, { maxSize })
}
