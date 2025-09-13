/**
 * Gets the global this object in a cross-platform way.
 * @returns The global this object
 *
 * @example
 * const globalObj = getGlobalThis()
 * // Returns globalThis, self, window, global, or {} depending on environment
 */
export function getGlobalThis(): any {
  return (
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
            ? global
            : {}
  )
}
