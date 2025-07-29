import { describe, it, expect } from 'vitest'
import { mapEntries } from '../../src/object'

describe('mapEntries', () => {
  it('should map object key-value pairs to new object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = mapEntries(obj, (key, value) => [key.toString().toUpperCase(), (value as number) * 2])
    expect(result).toEqual({ A: 2, B: 4, C: 6 })
  })

  it('should handle mapping keys to different types', () => {
    const obj = { a: 1, b: 2 }
    const result = mapEntries(obj, (key, value) => [`key_${key}`, String(value)])
    expect(result).toEqual({ key_a: '1', key_b: '2' })
  })

  it('should handle empty object', () => {
    const result = mapEntries({}, (key, value) => [key, value])
    expect(result).toEqual({})
  })

  it('should transform values based on keys', () => {
    const obj = { name: 'john', age: 25, city: 'paris' }
    const result = mapEntries(obj, (key, value) => [
      key,
      key === 'name' ? String(value).toUpperCase() : value
    ])
    expect(result).toEqual({ name: 'JOHN', age: 25, city: 'paris' })
  })

  it('should handle numeric values', () => {
    const obj = { x: 10, y: 20, z: 30 }
    const result = mapEntries(obj, (key, value) => [`coord_${key}`, value / 10])
    expect(result).toEqual({ coord_x: 1, coord_y: 2, coord_z: 3 })
  })

  it('should handle boolean values', () => {
    const obj = { active: true, visible: false }
    const result = mapEntries(obj, (key, value) => [key, !value])
    expect(result).toEqual({ active: false, visible: true })
  })

  it('should handle null and undefined values', () => {
    const obj = { a: null, b: undefined, c: 'value' }
    const result = mapEntries(obj, (key, value) => [key, value ?? 'default'])
    expect(result).toEqual({ a: 'default', b: 'default', c: 'value' })
  })

  it('should handle array values', () => {
    const obj = { items: [1, 2, 3], tags: ['a', 'b'] }
    const result = mapEntries(obj, (key, value) => [key, value.length])
    expect(result).toEqual({ items: 3, tags: 2 })
  })

  it('should handle object values', () => {
    const obj = {
      user: { name: 'john', age: 25 },
      settings: { theme: 'dark' }
    }
    const result = mapEntries(obj, (key, value) => [key, Object.keys(value).length])
    expect(result).toEqual({ user: 2, settings: 1 })
  })

  it('should preserve key types when mapping', () => {
    const obj = { a: 1, b: 2 }
    const result = mapEntries(obj, (key, value) => [key, value])
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('should handle complex transformations', () => {
    const obj = { firstName: 'john', lastName: 'doe', age: 30 }
    const result = mapEntries(obj, (key, value) => {
      if (String(key).includes('Name')) {
        return [key.toString().toLowerCase(), String(value).toUpperCase()]
      }
      return [key, value]
    })
    expect(result).toEqual({ firstname: 'JOHN', lastname: 'DOE', age: 30 })
  })

  it('should handle single property object', () => {
    const obj = { only: 'value' }
    const result = mapEntries(obj, (key, value) => [`new_${key}`, `new_${value}`])
    expect(result).toEqual({ new_only: 'new_value' })
  })
})
