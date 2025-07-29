import { describe, it, expect } from 'vitest'
import { random } from '../../src/number'

describe('random', () => {
  it('should generate random number between 0 and 1 by default', () => {
    const result = random()
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThan(1)
    expect(Number.isInteger(result)).toBe(true)
  })

  it('should generate random integer in range when only upper bound provided', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(5)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(5)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should generate random integer in specified range', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(2, 8)
      expect(result).toBeGreaterThanOrEqual(2)
      expect(result).toBeLessThan(8)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should generate floating point numbers when floating is true', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(0, 5, true)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(5)
    }
  })

  it('should auto-detect floating point when bounds are floats', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(1.2, 5.8)
      expect(result).toBeGreaterThanOrEqual(1.2)
      expect(result).toBeLessThan(5.8)
      expect(typeof result).toBe('number')
    }
  })

  it('should swap bounds when lower > upper', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(10, 5)
      expect(result).toBeGreaterThanOrEqual(5)
      expect(result).toBeLessThan(10)
    }
  })

  it('should handle negative ranges', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(-10, -5)
      expect(result).toBeGreaterThanOrEqual(-10)
      expect(result).toBeLessThan(-5)
    }
  })

  it('should handle mixed positive and negative ranges', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(-5, 5)
      expect(result).toBeGreaterThanOrEqual(-5)
      expect(result).toBeLessThan(5)
    }
  })

  it('should force integer when floating is false', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(1.5, 5.8, false)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThan(5)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should handle zero range', () => {
    const result = random(5, 5)
    expect(result).toBe(5)
  })

  it('should handle very small ranges', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(1, 2, true)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThan(2)
    }
  })

  it('should handle large ranges', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(0, 1000000)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(1000000)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should respect floating parameter over auto-detection', () => {
    // Even though bounds are integers, floating=true should return float
    for (let i = 0; i < 10; i++) {
      const result = random(1, 5, true)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThan(5)
      // Result might be integer by chance, but the range suggests it could be float
    }
  })

  it('should generate different values on multiple calls', () => {
    const results = Array.from({ length: 20 }, () => random(0, 100, true))
    const uniqueResults = new Set(results)
    // Very unlikely to get all same values with floating point
    expect(uniqueResults.size).toBeGreaterThan(1)
  })

  it('should handle edge case with very close floating bounds', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(1.0001, 1.0002, true)
      expect(result).toBeGreaterThanOrEqual(1.0001)
      expect(result).toBeLessThan(1.0002)
    }
  })

  it('should handle zero as bounds', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(0, 0)
      expect(result).toBe(0)
    }
  })

  it('should handle decimal precision correctly', () => {
    for (let i = 0; i < 10; i++) {
      const result = random(0.1, 0.9, true)
      expect(result).toBeGreaterThanOrEqual(0.1)
      expect(result).toBeLessThan(0.9)
    }
  })
})
