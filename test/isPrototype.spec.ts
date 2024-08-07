import { each } from '../src'
import isPrototype from '../src/internal/isPrototype'

describe('isPrototype', () => {
  it('is a function', () => {
    expect(typeof isPrototype).toBe('function')
  })

  it('values return `true`', () => {
    const Fn = function () {
      this.a = 1
    }
    Fn.prototype.b = 2
    const truthys = [
      Fn.prototype,
      Object.prototype,
      Function.prototype,
      Boolean.prototype,
      Symbol.prototype,
      Number.prototype,
      BigInt.prototype,
      Date.prototype,
      Error.prototype,
      EvalError.prototype,
      RangeError.prototype,
      ReferenceError.prototype,
      SyntaxError.prototype,
      TypeError.prototype,
      URIError.prototype,
      String.prototype,
      RegExp.prototype,
      Array.prototype,
      Int8Array.prototype,
      Uint8Array.prototype,
      Uint8ClampedArray.prototype,
      Int16Array.prototype,
      Uint16Array.prototype,
      Int32Array.prototype,
      Uint32Array.prototype,
      Float32Array.prototype,
      Float64Array.prototype,
      BigInt64Array.prototype,
      BigUint64Array.prototype,
      Map.prototype,
      Set.prototype,
      WeakMap.prototype,
      WeakSet.prototype,
      ArrayBuffer.prototype,
      SharedArrayBuffer.prototype,
      DataView.prototype,
      Promise.prototype,
    ]
    each(truthys, (item) => {
      expect(isPrototype(item)).toBeTruthy()
    })
  })
  it('values return `false`', () => {
    const falsys = [
      false,
      true,
      null,
      void 0,
      -Infinity,
      1,
      Number.NaN,
      'a',
      BigInt(9007199254740991),
      Symbol('a'),
    ]
    each(falsys, (item) => {
      expect(isPrototype(item)).toBeFalsy()
    })
  })
})
