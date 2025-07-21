import isNumber from "./isNumber"

function isInteger(value: unknown): value is number {
  return isNumber(value) && value % 1 === 0
}

export default Number.isInteger ?? isInteger
