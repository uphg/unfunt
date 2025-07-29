import { isTag } from '../internal/vanilla'

export function isMap(value: unknown) {
  return isTag(value, 'Map')
}
