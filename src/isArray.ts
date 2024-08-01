import isTag from './internal/isTag'

function isArray<T extends unknown>(value: Array<T>): value is Array<T> {
  return isTag(value, 'Array')
}

export default Array.isArray ?? isArray
