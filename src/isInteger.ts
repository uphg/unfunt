function isInteger(value: unknown): value is number {
  return typeof value === 'number' && value % 1 === 0
}

export default Number.isInteger ?? isInteger
