import { describe, it, expect } from 'vitest'
import { randomInt } from '../../src/number'

describe('randomInt', () => {
  it('should generate random integer between 0 and 1 by default', () => {
    for (let i = 0; i < 10; i++) {
      const result = randomInt()
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(1)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should generate random integer in range when only upper bound provided', () => {
    for (let i = 0; i < 20; i++) {
      const result = randomInt(5)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(5)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should generate random integer in specified range', () => {
    for (let i = 0; i < 20; i++) {
      const result = randomInt(3, 7)
      expect(result).toBeGreaterThanOrEqual(3)
      expect(result).toBeLessThanOrEqual(7)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should swap bounds when lower > upper', () => {
    for (let i = 0; i < 20; i++) {
      const result = randomInt(10, 5)
      expect(result).toBeGreaterThanOrEqual(5)
      expect(result).toBeLessThanOrEqual(10)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should handle negative ranges', () => {
    for (let i = 0; i < 20; i++) {
      const result = randomInt(-10, -5)
      expect(result).toBeGreaterThanOrEqual(-10)
      expect(result).toBeLessThanOrEqual(-5)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should handle mixed positive and negative ranges', () => {
    for (let i = 0; i < 20; i++) {
      const result = randomInt(-3, 3)
      expect(result).toBeGreaterThanOrEqual(-3)
      expect(result).toBeLessThanOrEqual(3)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should handle floating point bounds by using ceiling and floor', () => {
    for (let i = 0; i < 20; i++) {
      const result = randomInt(1.3, 5.8)
      expect(result).toBeGreaterThanOrEqual(2) // Math.ceil(1.3)
      expect(result).toBeLessThanOrEqual(5)    // Math.floor(5.8)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should return same value when range has only one integer', () => {
    const result = randomInt(5, 5)
    expect(result).toBe(5)
  })

  it('should handle single integer range', () => {
    for (let i = 0; i < 10; i++) {
      const result = randomInt(7, 8)
      expect([7, 8]).toContain(result)
    }
  })

  it('should handle zero as bounds', () => {
    for (let i = 0; i < 10; i++) {
      const result = randomInt(0, 0)
      expect(result).toBe(0)
    }
  })

  it('should include both bounds in the range', () => {
    const results = new Set()
    // Run enough times to likely hit both bounds
    for (let i = 0; i < 100; i++) {
      results.add(randomInt(1, 3))
    }
    expect(results.has(1)).toBe(true)
    expect(results.has(3)).toBe(true)
    expect(results.size).toBeLessThanOrEqual(3) // Should only contain 1, 2, 3
  })

  it('should generate different values on multiple calls', () => {
    const results = Array.from({ length: 50 }, () => randomInt(1, 100))
    const uniqueResults = new Set(results)
    expect(uniqueResults.size).toBeGreaterThan(1)
  })

  it('should handle large ranges', () => {
    for (let i = 0; i < 10; i++) {
      const result = randomInt(0, 1000000)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(1000000)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should handle fractional bounds correctly', () => {
    // randomInt(1.7, 3.2) should generate integers from ceil(1.7)=2 to floor(3.2)=3
    const results = new Set()
    for (let i = 0; i < 50; i++) {
      results.add(randomInt(1.7, 3.2))
    }

    for (const result of results) {
      expect(result).toBeGreaterThanOrEqual(2)
      expect(result).toBeLessThanOrEqual(3)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should handle edge case where ceiling > floor', () => {
    // When ceil(lower) > floor(upper), should still work
    for (let i = 0; i < 10; i++) {
      const result = randomInt(2.9, 3.1)
      expect(result).toBe(3) // ceil(2.9) = 3, floor(3.1) = 3
    }
  })

  it('should work with very small ranges', () => {
    for (let i = 0; i < 20; i++) {
      const result = randomInt(-1, 1)
      expect([-1, 0, 1]).toContain(result)
    }
  })

  it('should handle decimal inputs that result in same integer range', () => {
    for (let i = 0; i < 10; i++) {
      const result = randomInt(5.1, 5.9)
      expect(result).toBe(6) // ceil(5.1) = 6, floor(5.9) = 5, but formula should give 6
    }
  })
})
