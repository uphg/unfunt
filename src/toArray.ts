import isArrayLike from './isArrayLike'
import isString from './isString'
import stringToArray from './internal/stringToArray'
import copyArray from './internal/copyArray'
import getObjectTag from './internal/getObjectTag'
import mapToArray from './internal/mapToArray'
import setToArray from './internal/setToArray'

const mapTag = '[object Map]'
const setTag = '[object Set]'

/** 内置值引用 */
const symIterator = Symbol.iterator

function toArray<T>(value: any): T[] {
  if (!value) return []
  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value as string) : copyArray(value as any[])
  }

  if (symIterator && value[symIterator]) {
    return Array.from(value[symIterator]())
  }

  const tag = getObjectTag(value)
  const func = tag === mapTag ? mapToArray : (tag === setTag ? setToArray : Object.values)

  return (func as any)(value)
}

export default toArray
