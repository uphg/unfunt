import { describe, it, expect } from 'vitest'
import { unionBy } from '../../src/array'

describe('unionBy', () => {
  it('should merge arrays and remove duplicates by function', () => {
    const result = unionBy([2.1], [1.2, 2.3], Math.floor)
    expect(result).toEqual([2.1, 1.2])
  })

  it('should merge arrays and remove duplicates by property', () => {
    const result = unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x')
    expect(result).toEqual([{ x: 1 }, { x: 2 }])
  })

  it('should handle multiple arrays', () => {
    const result = unionBy([{ id: 1 }], [{ id: 2 }], [{ id: 1 }, { id: 3 }], 'id')
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
  })

  it('should preserve order of first occurrence', () => {
    const result = unionBy([{ x: 1 }, { x: 2 }], [{ x: 3 }, { x: 1 }], [{ x: 2 }, { x: 4 }], 'x')
    expect(result).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }])
  })

  it('should handle empty arrays', () => {
    expect(unionBy([], [], 'x')).toEqual([])
    expect(unionBy([{ x: 1 }], [], 'x')).toEqual([{ x: 1 }])
    expect(unionBy([], [{ x: 1 }], 'x')).toEqual([{ x: 1 }])
  })

  it('should handle no arrays', () => {
    expect(unionBy('x' as any)).toEqual([])
  })

  it('should handle function iteratee with primitives', () => {
    const result = unionBy([1, 2], [2, 3], [3, 4], x => x)
    expect(result).toEqual([1, 2, 3, 4])
  })

  it('should handle function iteratee with objects', () => {
    const users1 = [{ name: 'john', age: 30 }]
    const users2 = [{ name: 'jane', age: 25 }, { name: 'john', age: 35 }]
    const result = unionBy(users1, users2, u => u.name)
    expect(result).toEqual([
      { name: 'john', age: 30 },
      { name: 'jane', age: 25 }
    ])
  })

  it('should handle nested property access', () => {
    const data1 = [{ user: { id: 1 } }]
    const data2 = [{ user: { id: 2 } }, { user: { id: 1 } }]
    const result = unionBy(data1, data2, item => item.user.id)
    expect(result).toEqual([
      { user: { id: 1 } },
      { user: { id: 2 } }
    ])
  })

  it('should handle non-array inputs gracefully', () => {
    const result = unionBy([{ x: 1 }], null as any, undefined as any, [{ x: 2 }], 'x')
    expect(result).toEqual([{ x: 1 }, { x: 2 }])
  })

  it('should handle different data types', () => {
    const result = unionBy([1], ['1'], [true], [1], x => String(x))
    expect(result).toEqual([1, true])
  })

  it('should handle undefined and null values', () => {
    const data1 = [{ value: null }]
    const data2 = [{ value: undefined }, { value: null }]
    const result = unionBy(data1, data2, 'value')
    expect(result).toEqual([{ value: null }, { value: undefined }])
  })

  it('should handle arrays with mixed data types', () => {
    const arr1 = [{ type: 'string', value: 'hello' }]
    const arr2 = [{ type: 'number', value: 42 }, { type: 'string', value: 'world' }]
    const result = unionBy(arr1, arr2, 'type')
    expect(result).toEqual([
      { type: 'string', value: 'hello' },
      { type: 'number', value: 42 }
    ])
  })

  it('should handle single array', () => {
    const result = unionBy([{ x: 1 }, { x: 2 }, { x: 1 }], 'x')
    expect(result).toEqual([{ x: 1 }, { x: 2 }])
  })

  it('should handle boolean property values', () => {
    const arr1 = [{ active: true, id: 1 }]
    const arr2 = [{ active: false, id: 2 }, { active: true, id: 3 }]
    const result = unionBy(arr1, arr2, 'active')
    expect(result).toEqual([
      { active: true, id: 1 },
      { active: false, id: 2 }
    ])
  })
})
