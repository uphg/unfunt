/**
 * Generates a random number within the specified range
 * @param lower The lower bound, defaults to 0
 * @param upper The upper bound, defaults to 1
 * @param floating Whether to return a floating point number, defaults to false
 * @returns A random number
 *
 * @example
 * random(0, 5)
 * // => Integer between 0 and 5
 *
 * random(5)
 * // => Integer between 0 and 5
 *
 * random(0, 5, true)
 * // => Floating point number between 0 and 5
 *
 * random(1.2, 5.2)
 * // => Floating point number between 1.2 and 5.2
 */
export function random(lower: number = 0, upper: number = 1, floating?: boolean): number {
  if (upper === undefined) {
    upper = lower
    lower = 0
  }

  if (lower > upper) {
    [lower, upper] = [upper, lower]
  }

  const isFloating = floating !== undefined
    ? floating
    : (lower % 1 !== 0 || upper % 1 !== 0)

  if (isFloating) {
    return Math.random() * (upper - lower) + lower
  } else {
    // For integers, generate in [Math.ceil(lower), Math.floor(upper))
    const lowerInt = Math.ceil(lower)
    const upperInt = Math.floor(upper)
    return Math.floor(Math.random() * (upperInt - lowerInt) + lowerInt)
  }
}
