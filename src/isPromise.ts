import isFunction from './isFunction'

function isPromise<T>(obj: any): obj is Promise<T> {
  return !!obj && isFunction(obj?.then)
}

export default isPromise
