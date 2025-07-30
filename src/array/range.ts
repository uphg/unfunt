/**
 * Generates a numeric range array
 * @param start The start value
 * @param end The end value (exclusive)
 * @param step The step size, defaults to 1
 * @returns A numeric range array
 *
 * @example
 * range(4)
 * // => [0, 1, 2, 3]
 *
 * range(1, 5)
 * // => [1, 2, 3, 4]
 *
 * range(0, 20, 5)
 * // => [0, 5, 10, 15]
 *
 * range(0, -4, -1)
 * // => [0, -1, -2, -3]
 */
export function range(start: number, end?: number, step: number = 1): number[] {
  if (end === undefined) {
    end = start
    start = 0
  }

  if (step === 0) return []

  const result: number[] = []
  const isDescending = step < 0

  if (isDescending) {
    for (let i = start; i > end; i += step) {
      result.push(i)
    }
  } else {
    for (let i = start; i < end; i += step) {
      result.push(i)
    }
  }

  return result
}
