import isArguments from '../isArguments'
import type { RecursiveArray } from '../types'

// 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable
const spreadableSymbol = Symbol.isConcatSpreadable

// 判断该值是否可扁平化
function isFlattenable<T>(value: unknown): value is RecursiveArray<T> {
  return Array.isArray(value) || isArguments(value)
    || !!(value as any)?.[spreadableSymbol]
}

export default isFlattenable
