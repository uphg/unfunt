import { isTag } from '../internal/vanilla'
import { isObjectLike } from './isObjectLike'

const getProto = Object.getPrototypeOf

export function isPlainObject<T extends object>(value: unknown): value is T {
  if (!isObjectLike(value) || !isTag(value, 'Object')) {
    return false
  }
  if (getProto(value) === null) {
    return true
  }

  return getProto(value) === Object.prototype
}
