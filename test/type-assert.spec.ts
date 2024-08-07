import * as _ from '../src/index'
import { each, remain } from '../src/index'
import {
  CustomError,
  argsFn,
  asyncFunc,
  bigInt,
  booleanObj,
  date,
  error,
  func,
  generatorFunc,
  mapObj,
  numberObj,
  regex,
  setObj,
  stringObj,
  symbol,
  weakMapObj,
  weakSetObj,
} from './_utils'

describe('type assert', () => {
  const baseTypes = [
    true,
    1,
    -Infinity,
    Number.NaN,
    'a',
    bigInt,
    symbol,
    null,
    undefined,
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
    Object.create({ a: 1, b: 2 }),
    { 0: 'a', 1: 'b', 2: 'c', length: 3 },
  ]
  const typesMap = {
    isArray: [
      [objTypes[1]],
      [...remain(objTypes, 1, 1), ...baseTypes],
    ],
    isArrayBuffer: [
      [new ArrayBuffer(1)],
      [...remain(objTypes, 14, 1), ...baseTypes],
    ],
    isArrayLike: [
      [objTypes[1], objTypes[16], stringObj, 'a', argsFn()],
      [
        { a: 1 },
        func,
        numberObj,
        booleanObj,
        error,
        date,
        regex,
        mapObj,
        weakMapObj,
        setObj,
        weakSetObj,
        new ArrayBuffer(1),
        Object.create({ a: 1, b: 2 }),
        true,
        1,
        -Infinity,
        Number.NaN,
        bigInt,
        symbol,
        null,
        undefined,
      ],
    ],
    isBigInt: [
      [bigInt],
      [...remain(baseTypes, 5, 1), ...objTypes],
    ],
    isBoolean: [
      [true, false],
      [...remain(baseTypes, 0, 1), ...objTypes],
    ],
    isDate: [
      [date],
      [...remain(objTypes, 7, 1), ...baseTypes],
    ],
    isEmpty: [
      [0, 1, '', [], {}, new Set(), new Map(), -Infinity, Number.NaN, bigInt, symbol, null, undefined],
      ['a', new Set([1]), new Map([[1, 2]])],
    ],
    isError: [
      [error, new CustomError('hi'), new EvalError('hi'), new RangeError('hi'), new ReferenceError('hi'), new SyntaxError('hi'), new TypeError('hi')],
      [
        { name: 'error', message: 'hi' },
        ...remain(objTypes, 6, 1),
        ...baseTypes,
        Error,
      ],
    ],
    isFunction: [
      [
        func,
        asyncFunc,
        generatorFunc,
        Math.round,
      ],
      [...remain(objTypes, 2, 1), ...baseTypes],
    ],
    isLength: [
      [1, 0],
      [...remain(baseTypes, 1, 1), -2, Number.MIN_VALUE, ...objTypes],
    ],
    isMap: [
      [mapObj],
      [...remain(objTypes, 9, 1), ...baseTypes],
    ],
    isNil: [
      [null, undefined],
      [...remain(baseTypes, 7, 2), ...objTypes],
    ],
    isNumber: [
      [0, 1],
      [...remain(baseTypes, 1, 3), ...objTypes],
    ],
    isObject: [
      objTypes,
      baseTypes,
    ],
    isObjectLike: [
      [{ a: 1 }, [1, 2, 3]],
      [...baseTypes, func],
    ],
    isPlainObject: [
      [{}, new Object(), Object.create(null)],
      [...remain(remain(objTypes, 0, 1), 15, 1), ...baseTypes],
    ],
    isPrimitive: [
      baseTypes,
      objTypes,
    ],
    isPromise: [
      [Promise.resolve(1)],
      [baseTypes, ...objTypes],
    ],
    isRegExp: [
      [regex],
      [...remain(objTypes, 8, 1), ...baseTypes],
    ],
    isSet: [
      [setObj],
      [...remain(objTypes, 11, 1), ...baseTypes],
    ],
    isString: [
      ['', 'hi'],
      [...remain(baseTypes, 4, 1), ...objTypes],
    ],
    isSymbol: [
      [symbol],
      [...remain(baseTypes, 6, 1), ...objTypes],
    ],
  }

  each(typesMap, (item, name: string) => {
    describe(name, () => {
      it(`${name} is a function`, () => {
        expect((_ as any)[name]).toBeTypeOf('function')
      })

      describe('values return `true`', () => {
        each(item[0], (value, index) => {
          it(`[${index}]`, () => {
            expect((_ as any)[name](value)).toBeTruthy()
          })
        })
      })

      describe('values return `false`', () => {
        each(item[1], (value, index) => {
          it(`[${index}]`, () => {
            expect((_ as any)[name](value)).toBeFalsy()
          })
        })
      })
    })
  })
})
