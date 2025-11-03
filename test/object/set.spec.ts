import { describe, it, expect } from 'vitest'
import { set } from '../../src/object'

describe('set', () => {
  it('should set value using dot notation', () => {
    const object = {}
    set(object, 'a.b.c', 3)
    expect(object).toEqual({ a: { b: { c: 3 } } })
  })

  it('should set value using bracket notation', () => {
    const object = {}
    set(object, 'a[0].b', 'value')
    expect(object).toEqual({ a: [{ b: 'value' }] })
  })

  it('should set value using array path', () => {
    const object = {}
    set(object, ['a', 'b', 'c'], 42)
    expect(object).toEqual({ a: { b: { c: 42 } } })
  })

  it('should set value in existing object', () => {
    const object = { a: { b: { c: 1 } } }
    set(object, 'a.b.c', 2)
    expect(object.a.b.c).toBe(2)
  })

  it('should create missing intermediate objects', () => {
    const object = { a: {} }
    set(object, 'a.b.c.d', 'deep')
    expect(object).toEqual({ a: { b: { c: { d: 'deep' } } } })
  })

  it('should create missing intermediate arrays', () => {
    const object = {}
    set(object, 'a[0][1].b', 'nested')
    expect(object).toEqual({ a: [[, { b: 'nested' }]] })
  })

  it('should handle mixed object and array paths', () => {
    const object = {}
    set(object, 'users[0].profile.name', 'John')
    set(object, 'users[0].profile.age', 30)
    set(object, 'users[1].profile.name', 'Jane')

    expect(object).toEqual({
      users: [
        { profile: { name: 'John', age: 30 } },
        { profile: { name: 'Jane' } }
      ]
    })
  })

  it('should overwrite existing values', () => {
    const object = { a: { b: 'old' } }
    set(object, 'a.b', 'new')
    expect(object.a.b).toBe('new')
  })

  it('should handle empty string keys', () => {
    const object = {}
    set(object, '', 'empty key value')
    expect(object['']).toBe('empty key value')
  })

  it('should handle numeric string keys', () => {
    const object = {}
    set(object, '0', 'zero')
    set(object, '1.5', 'one point five')
    expect(object['0']).toBe('zero')
    expect(object['1.5']).toBe('one point five')
  })

  it('should return the original object', () => {
    const object = {}
    const result = set(object, 'a.b', 'value')
    expect(result).toBe(object)
  })

  it('should handle null and undefined gracefully', () => {
    expect(set(null as any, 'a.b', 'value')).toBe(null)
    expect(set(undefined as any, 'a.b', 'value')).toBe(undefined)
  })

  it('should handle invalid paths gracefully', () => {
    const object = { existing: 'value' }
    expect(set(object, null as any, 'value')).toBe(object)
    expect(set(object, undefined as any, 'value')).toBe(object)
    expect(object.existing).toBe('value') // should not modify
  })

  it('should handle complex nested structures', () => {
    const object = {}
    set(object, 'data.users[0].profile.settings.theme', 'dark')
    set(object, 'data.users[0].profile.settings.notifications', true)
    set(object, 'data.meta.version', '1.0.0')

    expect(object).toEqual({
      data: {
        users: [
          {
            profile: {
              settings: {
                theme: 'dark',
                notifications: true
              }
            }
          }
        ],
        meta: {
          version: '1.0.0'
        }
      }
    })
  })

  it('should handle setting values in arrays', () => {
    const object = { arr: [1, 2, 3] }
    set(object, 'arr[1]', 'modified')
    set(object, 'arr[5]', 'extended')

    expect(object.arr[1]).toBe('modified')
    expect(object.arr[5]).toBe('extended')
    expect(object.arr.length).toBe(6)
  })

  it('should convert non-objects to objects when necessary', () => {
    const object = { a: 'string' }
    set(object, 'a.b.c', 'value')
    expect(object.a).toEqual({ b: { c: 'value' } })
  })

  it('should handle special property names with dots', () => {
    const object = {}
    set(object, ['key.with.dots'], 'value')
    expect(object['key.with.dots']).toBe('value')
  })

  it('should handle symbol keys in array paths', () => {
    const object: any = {}
    const sym = Symbol('test')
    set(object, [sym as any, 'nested'], 'symbol value')
    expect(object[sym].nested).toBe('symbol value')
  })

  it('should handle function values', () => {
    const object: any = {}
    const fn = () => 'test'
    set(object, 'a.fn', fn)
    expect(object.a.fn).toBe(fn)
    expect(typeof object.a.fn).toBe('function')
  })

  it('should preserve existing properties when setting new ones', () => {
    const object = {
      existing: {
        prop1: 'value1',
        prop2: 'value2'
      }
    }

    set(object, 'existing.prop3', 'value3')
    set(object, 'new.prop', 'new value')

    expect(object).toEqual({
      existing: {
        prop1: 'value1',
        prop2: 'value2',
        prop3: 'value3'
      },
      new: {
        prop: 'new value'
      }
    })
  })

  it('should handle deep array structures', () => {
    const object: any = {}
    set(object, 'matrix[0][1][2]', 'deep array value')

    expect(object.matrix[0][1][2]).toBe('deep array value')
    expect(Array.isArray(object.matrix)).toBe(true)
    expect(Array.isArray(object.matrix[0])).toBe(true)
    expect(Array.isArray(object.matrix[0][1])).toBe(true)
  })

  it('should handle setting undefined and null values', () => {
    const object: any = {}
    set(object, 'a.b', undefined)
    set(object, 'a.c', null)

    expect(object.a.b).toBe(undefined)
    expect(object.a.c).toBe(null)
    expect('b' in object.a).toBe(true)
    expect('c' in object.a).toBe(true)
  })
})
