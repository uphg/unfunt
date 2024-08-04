function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}

export default isBigInt
