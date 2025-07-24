import { describe, it, expect, beforeEach, vi } from 'vitest'
import { debounce } from '../src/index'

// 使用vitest的定时器
vi.useFakeTimers()

describe('debounce', () => {
  beforeEach(() => {
    vi.clearAllTimers()
  })

  it('is a function', () => {
    expect(typeof debounce).toBe('function')
  })

  it('debounce', () => {
    let counts = 0
    const increase = () => counts += 1
    const debouncedIncrease = debounce(increase, 100)

    // 快速多次调用
    debouncedIncrease()
    debouncedIncrease()
    debouncedIncrease()

    // 立即检查，应该还没有执行
    expect(counts).toBe(0)
  })

  it('debounce clear', async() => {
    let counts = 0
    const increase = () => counts += 1

    const debouncedIncrease = debounce(increase, 32)

    debouncedIncrease()
    debouncedIncrease.cancel()

    await vi.advanceTimersByTimeAsync(96)
    expect(counts).toBe(0)
  })

  it('immediate 为 true 时立即调用', () => {
    let counts = 0
    const fn = vi.fn(() => counts += 1)
    const debouncedFn = debounce(fn, 64, true)

    // immediate = true 时第一次调用应该立即执行
    expect(debouncedFn()).toBe(1)
    expect(debouncedFn()).toBe(1)
    expect(fn.mock.calls.length).toBe(1)
  })

  it('使用 immediate 立即调用时可清除', () => {
    let counts = 0
    const fn = vi.fn(() => counts += 1)
    const debouncedFn = debounce(fn, 64, true)

    expect(debouncedFn()).toBe(1)
    debouncedFn.cancel()
    expect(debouncedFn()).toBe(2)
    expect(fn.mock.calls.length).toBe(2)
  })

  it('立即调用 + 递归调用', () => {
    let counts = 0
    const fn = vi.fn(() => {
      counts += 1
      if (counts < 10) debouncedFn()
    })

    const debouncedFn = debounce(fn, 32, true)
    debouncedFn()
    expect(counts).toBe(1)
  })

  it('防抖后可以自调用', async() => {
    let values: any[] = []
    const fn = vi.fn(function(...args) {
      values = values.concat([this, ...args])
    })

    const debouncedFn = debounce(fn, 32)
    debouncedFn.call('a1', 'a2')

    expect(values).toEqual([])
    await vi.advanceTimersByTimeAsync(50)
    expect(values).toEqual(['a1', 'a2'])
  })
})
