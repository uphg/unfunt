import { isTag } from '../internal/vanilla'

export function isRegExp(value: unknown): value is RegExp {
  return isTag(value, 'RegExp')
}
