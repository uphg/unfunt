import { describe, it, expect, beforeEach, vi } from 'vitest'
import { debounce } from '../../src/function'

// Use vitest fake timers
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

    // Rapid multiple calls
    debouncedIncrease()
    debouncedIncrease()
    debouncedIncrease()

    // Check immediately, should not have executed yet
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

  it('immediate call when immediate is true', () => {
    let counts = 0
    const fn = vi.fn(() => counts += 1)
    const debouncedFn = debounce(fn, 64, true)

    // First call should execute immediately when immediate = true
    expect(debouncedFn()).toBe(1)
    expect(debouncedFn()).toBe(1)
    expect(fn.mock.calls.length).toBe(1)
  })

  it('can clear when using immediate call', () => {
    let counts = 0
    const fn = vi.fn(() => counts += 1)
    const debouncedFn = debounce(fn, 64, true)

    expect(debouncedFn()).toBe(1)
    debouncedFn.cancel()
    expect(debouncedFn()).toBe(2)
    expect(fn.mock.calls.length).toBe(2)
  })

  it('immediate call + recursive call', () => {
    let counts = 0
    const fn = vi.fn(() => {
      counts += 1
      if (counts < 10) debouncedFn()
    })

    const debouncedFn = debounce(fn, 32, true)
    debouncedFn()
    expect(counts).toBe(1)
  })

  it('debounced function can be called with context', async() => {
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
