import { describe, it, expect, beforeEach, vi } from 'vitest'
import { throttle } from '../../src/function'

// 使用vitest的定时器
vi.useFakeTimers()

describe('throttle', () => {
  beforeEach(() => {
    vi.clearAllTimers()
  })

  it('is a function', () => {
    expect(typeof throttle).toBe('function')
  })

  it('Throttling', async() => {
    let counts = 0
    const fn = () => counts += 1
    const throttFn = throttle(fn, 32)

    throttFn(); throttFn()
    expect(counts).toBe(1)

    await vi.advanceTimersByTimeAsync(64)
    expect(counts).toBe(2)
  })

  it('arguments', async() => {
    let value = null
    const fn = (val: any) => { value = val }
    const throttledFn = throttle(fn, 32)

    throttledFn(1)
    throttledFn(2)
    expect(value).toBe(1)

    await vi.advanceTimersByTimeAsync(64)
    expect(value).toBe(2)
  })

  it('节流调用1次', async() => {
    const fn = vi.fn(() => 5)
    const throttledFn = throttle(fn, 32)

    const result = throttledFn()
    await vi.advanceTimersByTimeAsync(64)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(result).toBe(5)
  })

  it('节流调用2次', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32)
    throttledFn(); throttledFn()
    await vi.advanceTimersByTimeAsync(64)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('节流调用3次', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32)
    throttledFn(); throttledFn(); throttledFn()
    await vi.advanceTimersByTimeAsync(64)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('多次节流', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32)
    throttledFn(); throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(32)
    expect(fn).toHaveBeenCalledTimes(2)
    throttledFn()
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('return 也会多次节流', async() => {
    let counts = 0
    const fn = () => counts += 1
    const throttledFn = throttle(fn, 100)

    const results: number[] = []
    results.push(throttledFn())
    results.push(throttledFn())

    await vi.advanceTimersByTimeAsync(100)
    results.push(throttledFn())

    expect(results[0]).toBe(1)
    expect(results[1]).toBe(1)
    expect(results[2]).toBe(3)
  })

  it('多次后触发延时调用', async() => {
    let counts = 0
    const fn = () => { counts += 1 }
    const throttledFn = throttle(fn, 32)

    // 模拟快速调用
    for (let i = 0; i < 100; i++) {
      throttledFn()
    }

    const lastCount = counts
    expect(lastCount).toBeGreaterThan(0)

    await vi.advanceTimersByTimeAsync(96)
    expect(counts).toBeGreaterThan(lastCount)
  })

  it('当 leading 设置为 false 时不会触发首次调用', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32, { leading: false })

    throttledFn()
    throttledFn()
    await vi.advanceTimersByTimeAsync(64)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('当 leading: false 时多次节流都不会触发首次调用', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100, { leading: false })

    throttledFn()
    throttledFn()
    await vi.advanceTimersByTimeAsync(100)
    expect(fn).toHaveBeenCalledTimes(1) // 第一次触发

    throttledFn()
    throttledFn() // 立即调用，重置计时器
    await vi.advanceTimersByTimeAsync(50)
    expect(fn).toHaveBeenCalledTimes(1) // 仍然是1次，因为50ms < 100ms

    await vi.advanceTimersByTimeAsync(50)
    expect(fn).toHaveBeenCalledTimes(2) // 现在才是2次（从最后一次调用后100ms）
  })

  it('更多的 leading: false 测试', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100, { leading: false })

    // 模拟快速调用
    for (let i = 0; i < 10; i++) {
      throttledFn()
      await vi.advanceTimersByTimeAsync(36)
    }

    expect(fn).toHaveBeenCalledTimes(3)
    await vi.advanceTimersByTimeAsync(200)
    expect(fn).toHaveBeenCalledTimes(4)
  })

  it('当 trailing 设置为 false 时，throttle 不会触发最后一次延时调用', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 60, { trailing: false })

    throttledFn(); throttledFn(); throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(90)
    expect(fn).toHaveBeenCalledTimes(1)
    throttledFn(); throttledFn()
    expect(fn).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(90)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('系统时间被修改时 throttle 函数会继续运行', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    // 使用spy替换Date方法
    const dateNowSpy = vi.spyOn(Date, 'now').mockReturnValue(1000000)
    const dateGetTimeSpy = vi.spyOn(Date.prototype, 'getTime').mockReturnValue(1000000)

    throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)

    // 修改时间
    dateNowSpy.mockReturnValue(2000000)
    dateGetTimeSpy.mockReturnValue(2000000)

    await vi.advanceTimersByTimeAsync(200)
    throttledFn()
    expect(fn).toHaveBeenCalledTimes(2)

    // 恢复原始函数
    dateNowSpy.mockRestore()
    dateGetTimeSpy.mockRestore()
  })

  it('系统时间不可访问时 throttle 函数会继续运行', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    // 使用spy替换Date方法返回null
    const dateNowSpy = vi.spyOn(Date, 'now').mockReturnValue(0)
    const dateGetTimeSpy = vi.spyOn(Date.prototype, 'getTime').mockReturnValue(0)
    const dateValueOfSpy = vi.spyOn(Date.prototype, 'valueOf').mockReturnValue(0)

    throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(100)
    throttledFn()
    expect(fn).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(100)
    throttledFn()
    expect(fn).toHaveBeenCalledTimes(3)

    // 恢复原始函数
    dateNowSpy.mockRestore()
    dateGetTimeSpy.mockRestore()
    dateValueOfSpy.mockRestore()
  })

  it('节流后可以自调用', async() => {
    let values: any[] = []
    const fn = vi.fn(function(...args) {
      values = values.concat([this, ...args])
    })

    const throttledFn = throttle(fn, 32)

    throttledFn.call('a1', 'a2')
    expect(values).toEqual(['a1', 'a2'])

    await vi.advanceTimersByTimeAsync(32)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('可以取消节流', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32)
    throttledFn()
    throttledFn.cancel()
    throttledFn()
    expect(fn).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(32)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('leading: false 时取消延时调用', async() => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 32, { leading: false })
    throttledFn()
    throttledFn.cancel()

    await vi.advanceTimersByTimeAsync(64)
    expect(fn).toHaveBeenCalledTimes(0)
  })
})
