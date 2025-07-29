import { isTag } from '../internal/vanilla'
import { isPlainObject } from './isPlainObject'

interface ErrorLike { message: string, name: string }

export function isError(value: any): value is Error | DOMException | ErrorLike {
  return isTag(value, 'Error')
    || isTag(value, 'DOMException')
    || (
      typeof value?.message === 'string'
      && typeof value?.name === 'string'
      && !isPlainObject(value)
    )
}
