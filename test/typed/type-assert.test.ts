import * as _ from '../../src/index'
import { unslice } from '../../src/index'
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
      [...unslice(baseTypes, 0, 1), ...objTypes]
    ],
    isNumber: [
      [0, 1],
      [...unslice(baseTypes, 1, 3), ...objTypes]
    ],
    isString: [
      ['', 'hi'],
      [...unslice(baseTypes, 4, 1), ...objTypes]
    ],
    isBigInt: [
      [bigInt],
      [...unslice(baseTypes, 5, 1), ...objTypes]
    ],
    isSymbol: [
      [symbol],
      [...unslice(baseTypes, 6, 1), ...objTypes]
    ],
    isNil: [
      [null, undefined],
      [...unslice(baseTypes, 7, 2), ...objTypes]
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
      [...unslice(objTypes, 2, 1), ...baseTypes]
    ],
    isError: [
      [error, new CustomError('hi'), new EvalError(), new RangeError(), new ReferenceError(), new SyntaxError(), new TypeError()],
      [
        { name: 'error', message: 'hi' },
        ...unslice(objTypes, 6, 1),
        ...baseTypes,
        Error
      ]
    ],
    isDate: [
      [date],
      [...unslice(objTypes, 7, 1), ...baseTypes]
    ],
    isRegExp: [
      [regex],
      [...unslice(objTypes, 8, 1), ...baseTypes]
    ],
    isMap: [
      [mapObj],
      [...unslice(objTypes, 9, 1), ...baseTypes]
    ],
    isSet: [
      [setObj],
      [...unslice(objTypes, 11, 1), ...baseTypes]
    ],
    isObjectLike: [
      [{ a: 1 }, [1, 2, 3]],
      [...baseTypes, func]
    ],
    isLength: [
      [1, 0],
      [...unslice(baseTypes, 1, 1), -2, Number.MIN_VALUE, ...objTypes]
    ],
    isPlainObject: [
      [{}, new Object(), Object.create(null)],
      [...unslice(objTypes, 0, 1), ...baseTypes]
    ],
    isArrayLike: [
      [[1, 2, 3], 'abc', new Uint8Array(8)],
      [func, mapObj, setObj, weakMapObj, weakSetObj, ...unslice(baseTypes, 4, 1)]
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
