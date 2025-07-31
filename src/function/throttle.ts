interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}

interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>
  cancel(): void
}

/**
 * Creates a throttled function that only invokes the provided function at most once per specified wait period.
 * @param func The function to throttle
 * @param wait The number of milliseconds to throttle invocations to
 * @param options Options object with leading and trailing flags
 * @returns A new throttled function with a cancel method
 *
 * @example
 * const throttledFn = throttle(() => console.log('Hello'), 1000)
 * throttledFn() // Logs 'Hello' immediately
 * throttledFn() // Will not log until 1 second has passed
 * throttledFn.cancel() // Cancels the pending invocation
 */
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: ThrottleOptions
): ThrottledFunction<T> {
  const { leading = true, trailing = true } = options || {}

  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastCallTime: number = 0
  let lastInvokeTime: number = 0
  let lastArgs: Parameters<T> | undefined
  let lastThis: ThisParameterType<T> | undefined
  let result: ReturnType<T>

  function invokeFunc(time: number): ReturnType<T> {
    const args = lastArgs!
    const thisArg = lastThis!

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge(time: number): ReturnType<T> {
    lastInvokeTime = time
    timeoutId = setTimeout(timerExpired, wait)
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number): number {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return Math.min(timeWaiting, wait - timeSinceLastInvoke)
  }

  function shouldInvoke(time: number): boolean {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    return (
      lastCallTime === 0
      || timeSinceLastCall >= wait
      || timeSinceLastCall < 0
      || timeSinceLastInvoke >= wait
    )
  }

  function timerExpired(): void {
    const time = Date.now()
    if (shouldInvoke(time)) {
      trailingEdge(time)
    } else {
      timeoutId = setTimeout(timerExpired, remainingWait(time))
    }
  }

  function trailingEdge(time: number): ReturnType<T> {
    timeoutId = null

    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel(): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    lastInvokeTime = 0
    lastArgs = undefined
    lastCallTime = 0
    lastThis = undefined
  }

  const throttled = function(this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timeoutId === null) {
        return leadingEdge(lastCallTime)
      }
      timeoutId = setTimeout(timerExpired, wait)
      return leading ? invokeFunc(lastCallTime) : result
    }
    if (timeoutId === null) {
      timeoutId = setTimeout(timerExpired, remainingWait(lastCallTime))
    }
    return result
  }

  throttled.cancel = cancel
  return throttled
}

export default throttle
