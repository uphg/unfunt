import isObject from './isObject'
import isSymbol from './isSymbol'
import trim from './trim'
import { NAN, _Number, _parseInt } from './internal/common'

// 检测不规范的十六进制字符串值
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

// 检测二进制字符串值
const reIsBinary = /^0b[01]+$/i

// 检测八进制字符串值
const reIsOctal = /^0o[0-7]+$/i

function toNumber(value: any) {
  if (typeof value === 'number') return value
  if (typeof value === 'bigint') return _Number(value)
  if (isSymbol(value)) return NAN

  if (isObject(value)) {
    const other = typeof value.valueOf === 'function' ? value.valueOf() : value
    value = isObject(other) ? String(other) : other
  }

  if (typeof value !== 'string') return +value

  value = trim(value)

  if (reIsBadHex.test(value)) return NAN

  const isBinary = reIsBinary.test(value)

  if (isBinary || reIsOctal.test(value)) return _parseInt(value.slice(2), isBinary ? 2 : 8)

  return +value
}

export default toNumber
