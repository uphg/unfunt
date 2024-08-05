function debounce<T extends Function>(
  func: T,
  wait: number,
  immediate = false,
) {
  let timerId: number | null,
    previous: number | null,
    context: unknown,
    result: unknown,
    args: unknown

  const later = function () {
    clearTimeout(timerId as number)
    const passed = Date.now() - (previous as number)

    if (wait > passed) {
      timerId = setTimeout(later, wait - passed)
    } else {
      timerId = null
      if (!immediate) result = func.apply(context, args)

      // 避免 func 函数递归调用 `debounced`。
      if (!timerId) args = context = null
    }
  }

  const debounced = function (..._args: any) {
    context = this
    args = _args
    previous = Date.now() // 函数执行时的时间

    if (!timerId) {
      timerId = setTimeout(later, wait)
      if (immediate) result = func.apply(context, args)
    }

    return result
  }

  debounced.cancel = function () {
    clearTimeout(timerId as number)
    timerId = args = context = null
  }

  return debounced
}

export default debounce
