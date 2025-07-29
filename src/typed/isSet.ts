import { isTag } from '../internal/vanilla'

export function isSet(value: unknown) {
  return isTag(value, 'Set')
}
