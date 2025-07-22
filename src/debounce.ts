import { _now } from './internal/common'

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
) {
  let timerId: ReturnType<typeof setTimeout> | null = null,
    previous: number | null = null,
    context: ThisParameterType<T> | undefined,
    result: ReturnType<T> | undefined,
    args: Parameters<T>

  const later = function(this: unknown) {
    if (timerId) clearTimeout(timerId)
    const passed = _now() - (previous as number)

    if (wait > passed) {
      timerId = setTimeout(later, wait - passed)
    }
    else {
      timerId = null
      if (!immediate && context) {
        result = func.apply(context, args)
      }

      // 避免 func 函数递归调用 `debounced`。
      if (!timerId) {
        args = null as any
        context = undefined
      }
    }
  }

  const debounced = function(this: ThisParameterType<T>, ..._args: Parameters<T>): ReturnType<T> | undefined {
    context = this
    args = _args
    previous = _now() // 函数执行时的时间

    if (!timerId) {
      timerId = setTimeout(later, wait)
      if (immediate) {
        result = func.apply(context, args)
      }
    }

    return result
  }

  debounced.cancel = function() {
    if (timerId) clearTimeout(timerId)
    timerId = null
    args = null as any
    context = undefined
  }

  return debounced
}

export default debounce
