import { describe, it, expect } from 'vitest'
import { upperFirst } from '../../src/string'

describe('upperFirst', () => {
  it('should uppercase first letter only', () => {
    expect(upperFirst('fred')).toBe('Fred')
    expect(upperFirst('hello')).toBe('Hello')
    expect(upperFirst('world')).toBe('World')
  })

  it('should preserve case of remaining characters', () => {
    expect(upperFirst('FRED')).toBe('FRED')
    expect(upperFirst('hELLo WoRLd')).toBe('HELLo WoRLd')
    expect(upperFirst('javaScript')).toBe('JavaScript')
  })

  it('should handle single character strings', () => {
    expect(upperFirst('a')).toBe('A')
    expect(upperFirst('A')).toBe('A')
    expect(upperFirst('z')).toBe('Z')
  })

  it('should return empty string for empty input', () => {
    expect(upperFirst('')).toBe('')
  })

  it('should handle strings starting with numbers', () => {
    expect(upperFirst('123abc')).toBe('123abc')
    expect(upperFirst('1fred')).toBe('1fred')
  })

  it('should handle strings starting with special characters', () => {
    expect(upperFirst('!hello')).toBe('!hello')
    expect(upperFirst('@world')).toBe('@world')
    expect(upperFirst('#test')).toBe('#test')
  })

  it('should handle strings with spaces', () => {
    expect(upperFirst('hello world')).toBe('Hello world')
    expect(upperFirst('test case')).toBe('Test case')
  })

  it('should handle strings starting with whitespace', () => {
    expect(upperFirst(' hello')).toBe(' hello')
    expect(upperFirst('\thello')).toBe('\thello')
    expect(upperFirst('\nhello')).toBe('\nhello')
  })

  it('should handle already uppercase strings', () => {
    expect(upperFirst('Hello')).toBe('Hello')
    expect(upperFirst('World')).toBe('World')
  })

  it('should handle mixed case strings', () => {
    expect(upperFirst('camelCase')).toBe('CamelCase')
    expect(upperFirst('pascalCase')).toBe('PascalCase')
  })

  it('should handle strings with numbers', () => {
    expect(upperFirst('test123TEST')).toBe('Test123TEST')
    expect(upperFirst('html5CSS3')).toBe('Html5CSS3')
  })

  it('should handle unicode characters', () => {
    expect(upperFirst('café')).toBe('Café')
    expect(upperFirst('naïve')).toBe('Naïve')
    expect(upperFirst('résumé')).toBe('Résumé')
  })

  it('should handle strings with emojis', () => {
    expect(upperFirst('😀hello')).toBe('😀hello')
    expect(upperFirst('hello😀world')).toBe('Hello😀world')
  })

  it('should handle very long strings', () => {
    const longString = `a${'B'.repeat(999)}${'c'.repeat(1000)}`
    const expected = `A${'B'.repeat(999)}${'c'.repeat(1000)}`
    expect(upperFirst(longString)).toBe(expected)
  })

  it('should handle strings with only uppercase letters', () => {
    expect(upperFirst('ABC')).toBe('ABC')
    expect(upperFirst('HELLO')).toBe('HELLO')
  })

  it('should handle strings with only lowercase letters', () => {
    expect(upperFirst('abc')).toBe('Abc')
    expect(upperFirst('hello')).toBe('Hello')
  })

  it('should handle strings with punctuation', () => {
    expect(upperFirst('hello, world!')).toBe('Hello, world!')
    expect(upperFirst('test.case')).toBe('Test.case')
    expect(upperFirst("don't")).toBe("Don't")
  })

  it('should handle non-english characters', () => {
    expect(upperFirst('привет')).toBe('Привет')
    expect(upperFirst('ñoño')).toBe('Ñoño')
  })

  it('should handle abbreviations', () => {
    expect(upperFirst('api')).toBe('Api')
    expect(upperFirst('http')).toBe('Http')
    expect(upperFirst('url')).toBe('Url')
  })

  it('should handle compound words', () => {
    expect(upperFirst('javaScript')).toBe('JavaScript')
    expect(upperFirst('typeScript')).toBe('TypeScript')
    expect(upperFirst('coffeeScript')).toBe('CoffeeScript')
  })

  it('should handle strings starting with accented characters', () => {
    expect(upperFirst('école')).toBe('École')
    expect(upperFirst('über')).toBe('Über')
    expect(upperFirst('ångström')).toBe('Ångström')
  })

  it('should handle strings with mixed punctuation', () => {
    expect(upperFirst('hello-world')).toBe('Hello-world')
    expect(upperFirst('test_case')).toBe('Test_case')
    expect(upperFirst('file.name.ext')).toBe('File.name.ext')
  })

  it('should handle edge cases with control characters', () => {
    expect(upperFirst('\r\nhello')).toBe('\r\nhello')
    expect(upperFirst('\u0000hello')).toBe('\u0000hello')
  })

  it('should handle strings with numbers at the beginning followed by letters', () => {
    expect(upperFirst('2pac')).toBe('2pac')
    expect(upperFirst('3d')).toBe('3d')
    expect(upperFirst('404error')).toBe('404error')
  })
})
