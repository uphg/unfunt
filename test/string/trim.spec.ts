import { describe, it, expect } from 'vitest'
import { trim } from '../../src/string'

describe('trim', () => {
  it('should remove leading and trailing whitespace', () => {
    expect(trim('  hello  ')).toBe('hello')
    expect(trim('\t\nhello\t\n')).toBe('hello')
    expect(trim('   hello world   ')).toBe('hello world')
  })

  it('should handle strings with no whitespace', () => {
    expect(trim('hello')).toBe('hello')
    expect(trim('hello world')).toBe('hello world')
  })

  it('should handle empty strings', () => {
    expect(trim('')).toBe('')
    expect(trim('   ')).toBe('')
    expect(trim('\t\n')).toBe('')
  })

  it('should handle strings with only leading whitespace', () => {
    expect(trim('  hello')).toBe('hello')
    expect(trim('\t\nhello')).toBe('hello')
  })

  it('should handle strings with only trailing whitespace', () => {
    expect(trim('hello  ')).toBe('hello')
    expect(trim('hello\t\n')).toBe('hello')
  })

  it('should handle strings with whitespace in the middle', () => {
    expect(trim('  hello world  ')).toBe('hello world')
    expect(trim('\t\nhello\tworld\t\n')).toBe('hello\tworld')
  })

  it('should handle undefined input', () => {
    expect(trim(undefined)).toBeUndefined()
  })

  it('should handle null input', () => {
    expect(trim(null as any)).toBeUndefined()
  })

  it('should handle various whitespace characters', () => {
    expect(trim(' \t\n\r\f\v hello \t\n\r\f\v ')).toBe('hello')
  })

  it('should handle unicode whitespace', () => {
    expect(trim('\u00A0hello\u00A0')).toBe('hello')
    expect(trim('\u2000hello\u2000')).toBe('hello')
  })

  it('should handle single character strings', () => {
    expect(trim('a')).toBe('a')
    expect(trim(' a ')).toBe('a')
    expect(trim(' ')).toBe('')
  })

  it('should handle strings with multiple consecutive whitespace', () => {
    expect(trim('    hello    ')).toBe('hello')
    expect(trim('\t\t\thello\t\t\t')).toBe('hello')
  })

  it('should handle mixed whitespace types', () => {
    expect(trim(' \t hello \n ')).toBe('hello')
    expect(trim('\r\n\t hello world \t\r\n')).toBe('hello world')
  })
})
