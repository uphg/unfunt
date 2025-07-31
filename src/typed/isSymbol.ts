/**
 * Checks if a value is a symbol.
 * @param value The value to check
 * @returns True if the value is a symbol, false otherwise
 *
 * @example
 * isSymbol(Symbol('foo'))
 * // => true
 *
 * isSymbol('foo')
 * // => false
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}
