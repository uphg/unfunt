function isNil(value: unknown): value is undefined | null {
  return value === void 0 || value === null
}

export default isNil
