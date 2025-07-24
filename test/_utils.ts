// 测试工具函数和常量
export const symbol = Symbol('test')
export const bigInt = BigInt(123)
export const error = new Error('test error')
export const stringObj = new String('test')
export const numberObj = new Number(123)
export const booleanObj = new Boolean(true)
export const date = new Date()

export const asyncFunc = async() => {}
export const generatorFunc = function* () {
  yield 1
}
export const regex = /test/
export const func = () => {}

export const argsFn = function() {
  return arguments
}

export const mapObj = new Map()
export const weakMapObj = new WeakMap()
export const setObj = new Set()
export const weakSetObj = new WeakSet()

export class CustomError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CustomError'
  }
}
