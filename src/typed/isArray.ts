import { isTag } from '../internal/vanilla'

export function isArray(value: unknown): value is Array<unknown> {
  return isTag(value, 'Array')
}
