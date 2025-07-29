import { isFunction } from './isFunction'

export function isPromise<T>(obj: any): obj is Promise<T> {
  return !!obj && isFunction(obj?.then)
}
