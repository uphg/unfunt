import { isNumber } from './isNumber'

export function isInteger(value: unknown): value is number {
  return isNumber(value) && value % 1 === 0
}
