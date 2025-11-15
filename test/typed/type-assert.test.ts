import * as _ from '../../src/index'
import {
  symbol, bigInt, error, stringObj, numberObj, booleanObj, date,
  asyncFunc, generatorFunc, regex, func, argsFn, mapObj,
  weakMapObj, setObj, weakSetObj, CustomError
} from '../_utils'
import { describe, it, expect } from 'vitest'

describe('type assert', () => {
  const baseTypes = [
    true, 1, -Infinity, NaN, 'a', bigInt, symbol, null, undefined
  ]
  const objTypes = [
    { a: 1 },
    [1, 2, 3],
    func,
    stringObj,
    numberObj,
    booleanObj,
    error,
    date,
    regex,
    mapObj,
    weakMapObj,
    setObj,
    weakSetObj,
    argsFn(),
    new ArrayBuffer(1),
    Object.create({ a: 1, b: 2 })
  ]

  const typesMap = {
    isBoolean: [
      [true, false],
      [...baseTypes.slice(1), ...objTypes]
    ],
    isNumber: [
      [0, 1],
      [...baseTypes.slice(0, 1), ...baseTypes.slice(4), ...objTypes]
    ],
    isString: [
      ['', 'hi'],
      [...baseTypes.slice(0, 4), ...baseTypes.slice(5), ...objTypes]
    ],
    isNil: [
      [null, undefined],
      [...baseTypes.slice(0, 5), ...objTypes]
    ],
    isObject: [
      objTypes,
      baseTypes
    ],
    isFunction: [
      [
        func,
        asyncFunc,
        generatorFunc,
        Math.round
      ],
      [...objTypes.slice(0, 2), ...objTypes.slice(3), ...baseTypes]
    ],
    isError: [
      [error, new CustomError('hi'), new EvalError(), new RangeError(), new ReferenceError(), new SyntaxError(), new TypeError()],
      [
        { name: 'error', message: 'hi' },
        ...objTypes.slice(0, 6), ...objTypes.slice(7),
        ...baseTypes,
        Error
      ]
    ],
    isDate: [
      [date],
      [...objTypes.slice(0, 7), ...objTypes.slice(8), ...baseTypes]
    ],
    isRegExp: [
      [regex],
      [...objTypes.slice(0, 8), ...objTypes.slice(9), ...baseTypes]
    ],
    isObjectLike: [
      [{ a: 1 }, [1, 2, 3]],
      [...baseTypes, func]
    ],
    isLength: [
      [1, 0],
      [...baseTypes.slice(0, 1), ...baseTypes.slice(2), -2, Number.MIN_VALUE, ...objTypes]
    ],
    isPlainObject: [
      [{}, new Object(), Object.create(null)],
      [...objTypes.slice(1), ...baseTypes]
    ],
    isArrayLike: [
      [[1, 2, 3], 'abc', new Uint8Array(8)],
      [func, mapObj, setObj, weakMapObj, weakSetObj, ...baseTypes.slice(0, 4), ...baseTypes.slice(5)]
    ],
    isEmpty: [
      [[], {}, '', new Set(), new Map()],
      [[1, 2, 3], { a: 1 }, 'abc', [0]]
    ],
    isPrimitive: [
      [true, 1, 'a', bigInt, symbol, null, undefined],
      [[], {}, func, mapObj, setObj, new Date()]
    ],
    isPromise: [
      [Promise.resolve(1), new Promise(() => {})],
      [func, [], {}, 1, 'a', ...baseTypes]
    ],
    isIterable: [
      [[1, 2, 3], 'abc', new Set(), new Map(), new Uint8Array(8)],
      [1, true, null, undefined, func]
    ]
  }

  Object.entries(typesMap).forEach(([name, item]) => {
    describe(name, () => {
      it('is a function', () => {
        expect(typeof _[name]).toBe('function')
      })

      it('values return `true`', () => {
        item[0].forEach((value) => {
          expect(_[name](value)).toBe(true)
        })
      })

      it('values return `false`', () => {
        item[1].forEach((value) => {
          expect(_[name](value)).toBe(false)
        })
      })
    })
  })
})
