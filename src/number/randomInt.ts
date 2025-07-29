/**
 * 生成指定范围内的随机整数
 * @param lower 下界，默认为 0
 * @param upper 上界，默认为 1
 * @returns 随机整数
 *
 * @example
 * randomInt(0, 5)
 * // => 0 到 5 之间的整数
 *
 * randomInt(5)
 * // => 0 到 5 之间的整数
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
