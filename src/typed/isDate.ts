import { isTag } from '../internal/vanilla'

export function isDate(value: unknown): value is Date {
  return isTag(value, 'Date')
}
