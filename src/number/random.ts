/**
 * 生成指定范围内的随机数
 * @param lower 下界，默认为 0
 * @param upper 上界，默认为 1
 * @param floating 是否返回浮点数，默认为 false
 * @returns 随机数
 *
 * @example
 * random(0, 5)
 * // => 0 到 5 之间的整数
 *
 * random(5)
 * // => 0 到 5 之间的整数
 *
 * random(0, 5, true)
 * // => 0 到 5 之间的浮点数
 *
 * random(1.2, 5.2)
 * // => 1.2 到 5.2 之间的浮点数
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
