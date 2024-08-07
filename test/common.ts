export const stringObj = new String('a')
export const numberObj = new Number(0)
export const booleanObj = new Boolean(true)

export const emptyMap = new Map()
export const emptySet = new Set()
export const emptyWeakMap = new WeakMap()
export const emptyWeakSet = new WeakSet()


export const symbol = Symbol('a')
export const bigInt = BigInt(9007199254740991)
export const error = new Error('error')
export const date = new Date()
export const regex = /a/
export const args = toArgs([1, 2, 3])
export const strictArgs = (function () {
  'use strict'
  return arguments
}(1, 2, 3))
export function func() {}
export async function asyncFunc() {}
export const generatorFunc = function * foo() {}
export function argsFn() {
  // eslint-disable-next-line prefer-rest-params
  return arguments
}

export function toArgs(array) {
  return (function () { return arguments }.apply(undefined, array)) as IArguments
}


export const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
export const arrayBuffer = new ArrayBuffer(0)

export const arrayProto = Array.prototype