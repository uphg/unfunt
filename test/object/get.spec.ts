import { describe, it, expect } from 'vitest'
import { get } from '../../src/object'

describe('get', () => {
  const testObject = {
    'a': {
      b: {
        c: 3,
        d: null,
        e: undefined
      }
    },
    'arr': [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 }
    ],
    'dot.key': 'dot value',
    '': 'empty key',
    '0': 'number key'
  }

  it('should get value using dot notation', () => {
    expect(get(testObject, 'a.b.c')).toBe(3)
    expect(get(testObject, 'a.b.d')).toBe(null)
    expect(get(testObject, 'a.b.e')).toBe(undefined)
  })

  it('should get value using bracket notation', () => {
    expect(get(testObject, 'arr[0].name')).toBe('John')
    expect(get(testObject, 'arr[1].age')).toBe(25)
  })

  it('should get value using array path', () => {
    expect(get(testObject, ['a', 'b', 'c'])).toBe(3)
    expect(get(testObject, ['arr', 0, 'name'])).toBe('John')
    expect(get(testObject, ['arr', 1, 'age'])).toBe(25)
  })

  it('should return default value for non-existent paths', () => {
    expect(get(testObject, 'a.b.x', 'default')).toBe('default')
    expect(get(testObject, 'nonexistent.path', 42)).toBe(42)
    expect(get(testObject, 'arr[5].name', 'not found')).toBe('not found')
  })

  it('should return undefined for non-existent paths without default', () => {
    expect(get(testObject, 'a.b.x')).toBe(undefined)
    expect(get(testObject, 'nonexistent.path')).toBe(undefined)
    expect(get(testObject, 'arr[5].name')).toBe(undefined)
  })

  it('should handle special property names', () => {
    expect(get(testObject, 'dot.key')).toBe('dot value')
    expect(get(testObject, '')).toBe('empty key')
    expect(get(testObject, '0')).toBe('number key')
  })

  it('should handle empty/null/undefined objects', () => {
    expect(get(null, 'a.b.c', 'default')).toBe('default')
    expect(get(undefined, 'a.b.c', 'default')).toBe('default')
    expect(get({}, 'a.b.c', 'default')).toBe('default')
  })

  it('should handle invalid paths', () => {
    expect(get(testObject, null as any, 'default')).toBe('default')
    expect(get(testObject, undefined as any, 'default')).toBe('default')
    expect(get(testObject, '', 'default')).toBe('empty key') // empty string is valid path
  })

  it('should handle primitive values as objects', () => {
    expect(get('string', 'length')).toBe(6)
    expect(get(123, 'toString')).toBe(Number.prototype.toString)
  })

  it('should handle complex nested structures', () => {
    const complex = {
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
        ]
      }
    }

    expect(get(complex, 'data.users[0].profile.settings.theme')).toBe('dark')
    expect(get(complex, ['data', 'users', 0, 'profile', 'settings', 'notifications'])).toBe(true)
  })

  it('should handle mixed bracket and dot notation', () => {
    const mixed = {
      'a.b': {
        c: [{ d: 'value' }]
      }
    }

    expect(get(mixed, 'a.b.c[0].d')).toBe('value')
  })

  it('should handle arrays with gaps', () => {
    const sparseArray = []
    sparseArray[5] = 'sparse'
    const obj = { arr: sparseArray }

    expect(get(obj, 'arr[5]')).toBe('sparse')
    expect(get(obj, 'arr[0]', 'default')).toBe('default')
  })

  it('should return the object itself for empty path', () => {
    expect(get(testObject, [])).toBe(testObject)
  })

  it('should handle function properties', () => {
    const objWithFunc = {
      fn: () => 'function result',
      nested: {
        method: function() { return 'method result' }
      }
    }

    expect(typeof get(objWithFunc, 'fn')).toBe('function')
    expect(typeof get(objWithFunc, 'nested.method')).toBe('function')
  })

  it('should handle symbol keys in path array', () => {
    const sym = Symbol('test')
    const objWithSymbol = {
      [sym]: 'symbol value'
    }

    expect(get(objWithSymbol, [sym])).toBe('symbol value')
  })

  it('should handle prototype chain', () => {
    function Parent() {}
    Parent.prototype.parentProp = 'parent value'

    function Child() {}
    Child.prototype = Object.create(Parent.prototype)
    Child.prototype.childProp = 'child value'

    const instance = new Child()

    expect(get(instance, 'childProp')).toBe('child value')
    expect(get(instance, 'parentProp')).toBe('parent value')
  })
})
