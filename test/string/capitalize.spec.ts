import { describe, it, expect } from 'vitest'
import { capitalize } from '../../src/string'

describe('capitalize', () => {
  it('should capitalize first letter and lowercase the rest', () => {
    expect(capitalize('fred')).toBe('Fred')
    expect(capitalize('FRED')).toBe('Fred')
    expect(capitalize('fRED')).toBe('Fred')
  })

  it('should handle single character strings', () => {
    expect(capitalize('a')).toBe('A')
    expect(capitalize('A')).toBe('A')
    expect(capitalize('z')).toBe('Z')
  })

  it('should return empty string for empty input', () => {
    expect(capitalize('')).toBe('')
  })

  it('should handle strings starting with numbers', () => {
    expect(capitalize('123abc')).toBe('123abc')
    expect(capitalize('1fred')).toBe('1fred')
  })

  it('should handle strings starting with special characters', () => {
    expect(capitalize('!hello')).toBe('!hello')
    expect(capitalize('@world')).toBe('@world')
    expect(capitalize('#test')).toBe('#test')
  })

  it('should handle strings with spaces', () => {
    expect(capitalize('hello world')).toBe('Hello world')
    expect(capitalize('HELLO WORLD')).toBe('Hello world')
    expect(capitalize('hELLO wORLD')).toBe('Hello world')
  })

  it('should handle strings starting with whitespace', () => {
    expect(capitalize(' hello')).toBe(' hello')
    expect(capitalize('\thello')).toBe('\thello')
    expect(capitalize('\nhello')).toBe('\nhello')
  })

  it('should handle already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello')
    expect(capitalize('World')).toBe('World')
  })

  it('should handle mixed case strings', () => {
    expect(capitalize('hElLo WoRlD')).toBe('Hello world')
    expect(capitalize('jAvAsCrIpT')).toBe('Javascript')
  })

  it('should handle strings with numbers and letters', () => {
    expect(capitalize('test123TEST')).toBe('Test123test')
    expect(capitalize('HTML5CSS3')).toBe('Html5css3')
  })

  it('should handle unicode characters', () => {
    expect(capitalize('café')).toBe('Café')
    expect(capitalize('naïve')).toBe('Naïve')
    expect(capitalize('résumé')).toBe('Résumé')
  })

  it('should handle strings with emojis', () => {
    expect(capitalize('😀hello')).toBe('😀hello')
    expect(capitalize('hello😀WORLD')).toBe('Hello😀world')
  })

  it('should handle very long strings', () => {
    const longString = 'a'.repeat(1000) + 'B'.repeat(1000)
    const expected = `A${'a'.repeat(999)}${'b'.repeat(1000)}`
    expect(capitalize(longString)).toBe(expected)
  })

  it('should handle strings with only uppercase letters', () => {
    expect(capitalize('ABC')).toBe('Abc')
    expect(capitalize('HELLO')).toBe('Hello')
  })

  it('should handle strings with only lowercase letters', () => {
    expect(capitalize('abc')).toBe('Abc')
    expect(capitalize('hello')).toBe('Hello')
  })

  it('should handle strings with punctuation', () => {
    expect(capitalize('hello, world!')).toBe('Hello, world!')
    expect(capitalize('test.case')).toBe('Test.case')
    expect(capitalize("don't")).toBe("Don't")
  })

  it('should handle non-english characters', () => {
    expect(capitalize('привет')).toBe('Привет')
    expect(capitalize('你好')).toBe('你好')
    expect(capitalize('こんにちは')).toBe('こんにちは')
  })
})
