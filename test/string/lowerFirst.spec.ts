import { describe, it, expect } from 'vitest'
import { lowerFirst } from '../../src/string'

describe('lowerFirst', () => {
  it('should lowercase first letter only', () => {
    expect(lowerFirst('Fred')).toBe('fred')
    expect(lowerFirst('FRED')).toBe('fRED')
    expect(lowerFirst('Hello')).toBe('hello')
  })

  it('should handle single character strings', () => {
    expect(lowerFirst('A')).toBe('a')
    expect(lowerFirst('a')).toBe('a')
    expect(lowerFirst('Z')).toBe('z')
  })

  it('should return empty string for empty input', () => {
    expect(lowerFirst('')).toBe('')
  })

  it('should handle strings starting with numbers', () => {
    expect(lowerFirst('123ABC')).toBe('123ABC')
    expect(lowerFirst('1Fred')).toBe('1Fred')
  })

  it('should handle strings starting with special characters', () => {
    expect(lowerFirst('!Hello')).toBe('!Hello')
    expect(lowerFirst('@World')).toBe('@World')
    expect(lowerFirst('#Test')).toBe('#Test')
  })

  it('should handle strings with spaces', () => {
    expect(lowerFirst('Hello World')).toBe('hello World')
    expect(lowerFirst('TEST CASE')).toBe('tEST CASE')
  })

  it('should handle strings starting with whitespace', () => {
    expect(lowerFirst(' Hello')).toBe(' Hello')
    expect(lowerFirst('\tHello')).toBe('\tHello')
    expect(lowerFirst('\nHello')).toBe('\nHello')
  })

  it('should handle already lowercase strings', () => {
    expect(lowerFirst('hello')).toBe('hello')
    expect(lowerFirst('world')).toBe('world')
  })

  it('should preserve case of remaining characters', () => {
    expect(lowerFirst('HeLLo WoRLd')).toBe('heLLo WoRLd')
    expect(lowerFirst('JavaScript')).toBe('javaScript')
    expect(lowerFirst('HTML')).toBe('hTML')
  })

  it('should handle mixed case strings', () => {
    expect(lowerFirst('CamelCase')).toBe('camelCase')
    expect(lowerFirst('PascalCase')).toBe('pascalCase')
  })

  it('should handle strings with numbers', () => {
    expect(lowerFirst('Test123TEST')).toBe('test123TEST')
    expect(lowerFirst('HTML5CSS3')).toBe('hTML5CSS3')
  })

  it('should handle unicode characters', () => {
    expect(lowerFirst('Café')).toBe('café')
    expect(lowerFirst('Naïve')).toBe('naïve')
    expect(lowerFirst('Résumé')).toBe('résumé')
  })

  it('should handle strings with emojis', () => {
    expect(lowerFirst('😀Hello')).toBe('😀Hello')
    expect(lowerFirst('Hello😀WORLD')).toBe('hello😀WORLD')
  })

  it('should handle very long strings', () => {
    const longString = `A${'b'.repeat(999)}${'C'.repeat(1000)}`
    const expected = `a${'b'.repeat(999)}${'C'.repeat(1000)}`
    expect(lowerFirst(longString)).toBe(expected)
  })

  it('should handle strings with only uppercase letters', () => {
    expect(lowerFirst('ABC')).toBe('aBC')
    expect(lowerFirst('HELLO')).toBe('hELLO')
  })

  it('should handle strings with only lowercase letters', () => {
    expect(lowerFirst('abc')).toBe('abc')
    expect(lowerFirst('hello')).toBe('hello')
  })

  it('should handle strings with punctuation', () => {
    expect(lowerFirst('Hello, World!')).toBe('hello, World!')
    expect(lowerFirst('Test.Case')).toBe('test.Case')
    expect(lowerFirst("Don't")).toBe("don't")
  })

  it('should handle non-english characters', () => {
    expect(lowerFirst('Привет')).toBe('привет')
    expect(lowerFirst('Ñoño')).toBe('ñoño')
  })

  it('should handle abbreviations', () => {
    expect(lowerFirst('API')).toBe('aPI')
    expect(lowerFirst('HTTP')).toBe('hTTP')
    expect(lowerFirst('URL')).toBe('uRL')
  })

  it('should handle compound words', () => {
    expect(lowerFirst('JavaScript')).toBe('javaScript')
    expect(lowerFirst('TypeScript')).toBe('typeScript')
    expect(lowerFirst('CoffeeScript')).toBe('coffeeScript')
  })

  it('should handle strings starting with accented characters', () => {
    expect(lowerFirst('École')).toBe('école')
    expect(lowerFirst('Über')).toBe('über')
    expect(lowerFirst('Ångström')).toBe('ångström')
  })
})
