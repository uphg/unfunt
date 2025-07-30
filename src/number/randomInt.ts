/**
 * Generates a random integer within the specified range
 * @param lower The lower bound, defaults to 0
 * @param upper The upper bound, defaults to 1
 * @returns A random integer
 *
 * @example
 * randomInt(0, 5)
 * // => Integer between 0 and 5
 *
 * randomInt(5)
 * // => Integer between 0 and 5
 */
export function randomInt(lower: number = 0, upper: number = 1): number {
  if (upper === undefined) {
    upper = lower
    lower = 0
  }

  if (lower > upper) {
    [lower, upper] = [upper, lower]
  }

  return Math.floor(Math.random() * (Math.floor(upper) - Math.ceil(lower) + 1)) + Math.ceil(lower)
}
