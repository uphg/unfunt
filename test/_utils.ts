// import 'regenerator-runtime/runtime' // 解决报错：regeneratorruntime is not defined



// function CustomError(message: string) {
//   this.name = 'CustomError'
//   this.message = message
// }

class CustomError extends Error {
  name: string
  message: string
  constructor(message: string) {
    super(message)
    this.name = 'CustomError'
    this.message = message
  }
}

function toArgs(array) {
  return (function () { return arguments }.apply(undefined, array)) as IArguments
}

// CustomError.prototype = Object.create(Error.prototype, {
//   constructor: CustomError,
// } as any)

const stringObj = new String('a')
const numberObj = new Number(0)
const booleanObj = new Boolean(true)


const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
const arrayBuffer = new ArrayBuffer(0)

const arrayProto = Array.prototype

export * from '../src/internal/common'

export {
  symbol,
  bigInt,
  error,
  date,
  regex,
  func,
  asyncFunc,
  generatorFunc,
  argsFn,
  stringObj,
  numberObj,
  booleanObj,
  arrayLike,
  arrayBuffer,
  mapObj,
  weakMapObj,
  setObj,
  weakSetObj,
  CustomError,
  arrayProto,
  toArgs,
  args,
  strictArgs,
}
