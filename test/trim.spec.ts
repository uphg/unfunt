import { describe, it, expect } from 'vitest'
import { trim } from '../src/string'

describe('trim', () => {
  it('should remove leading and trailing whitespace', () => {
    expect(trim('  hello  ')).toBe('hello')
    expect(trim('\t\nworld\t\n')).toBe('world')
    expect(trim('   test   ')).toBe('test')
  })

  it('should handle empty string', () => {
    expect(trim('')).toBe('')
    expect(trim('   ')).toBe('')
    expect(trim('\t\n\r')).toBe('')
  })

  it('should return undefined for undefined input', () => {
    expect(trim(undefined)).toBe(undefined)
    expect(trim()).toBe(undefined)
  })

  it('should not affect strings without leading/trailing whitespace', () => {
    expect(trim('hello')).toBe('hello')
    expect(trim('world')).toBe('world')
    expect(trim('test')).toBe('test')
  })

  it('should handle strings with only leading whitespace', () => {
    expect(trim('  hello')).toBe('hello')
    expect(trim('\t\nhello')).toBe('hello')
    expect(trim('   test')).toBe('test')
  })

  it('should handle strings with only trailing whitespace', () => {
    expect(trim('hello  ')).toBe('hello')
    expect(trim('hello\t\n')).toBe('hello')
    expect(trim('test   ')).toBe('test')
  })

  it('should preserve internal whitespace', () => {
    expect(trim('  hello world  ')).toBe('hello world')
    expect(trim('\thello\tworld\t')).toBe('hello\tworld')
    expect(trim('  a b c  ')).toBe('a b c')
  })

  it('should handle various types of whitespace', () => {
    expect(trim(' \t\n\r\f\v hello \t\n\r\f\v ')).toBe('hello')
  })

  it('should handle single character strings', () => {
    expect(trim(' a ')).toBe('a')
    expect(trim('\tb\t')).toBe('b')
    expect(trim(' ')).toBe('')
  })

  it('should handle unicode whitespace characters', () => {
    // Note: The current implementation uses \s which should handle most unicode whitespace
    expect(trim('\u00A0hello\u00A0')).toBe('hello') // non-breaking space
    expect(trim('\u2000hello\u2000')).toBe('hello') // en quad
    expect(trim('\u3000hello\u3000')).toBe('hello') // ideographic space
  })

  it('should handle multiple consecutive whitespace characters', () => {
    expect(trim('    hello    ')).toBe('hello')
    expect(trim('\t\t\ttest\t\t\t')).toBe('test')
    expect(trim('\n\n\nworld\n\n\n')).toBe('world')
  })

  it('should handle mixed whitespace characters', () => {
    expect(trim(' \t\n hello \n\t ')).toBe('hello')
    expect(trim('\r\n\t  test  \t\n\r')).toBe('test')
  })

  it('should return empty string for strings with only whitespace', () => {
    expect(trim('     ')).toBe('')
    expect(trim('\t\t\t')).toBe('')
    expect(trim('\n\n\n')).toBe('')
    expect(trim(' \t\n\r ')).toBe('')
  })
})
