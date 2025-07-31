/**
 * Checks if a value is a BigInt.
 * @param value The value to check
 * @returns True if the value is a BigInt, false otherwise
 *
 * @example
 * isBigInt(BigInt(42))
 * // => true
 *
 * isBigInt(42)
 * // => false
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}
