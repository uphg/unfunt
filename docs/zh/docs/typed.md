# Type Check Methods

这些是类型检查的实用方法。

## `isArrayLike(value)`

检查值是否为类数组对象

### Usage

```ts
import { isArrayLike } from 'unfunt'

isArrayLike([1, 2, 3])
// => true

isArrayLike('hello')
// => true

isArrayLike({ length: 2, 0: 'a', 1: 'b' })
// => true
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是类数组对象返回 true，否则返回 false

## `isBigInt(value)`

检查值是否为 BigInt

### Usage

```ts
import { isBigInt } from 'unfunt'

isBigInt(123n)
// => true

isBigInt(123)
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是 BigInt 返回 true，否则返回 false

## `isBoolean(value)`

检查值是否为布尔值

### Usage

```ts
import { isBoolean } from 'unfunt'

isBoolean(true)
// => true

isBoolean(false)
// => true

isBoolean(1)
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是布尔值返回 true，否则返回 false

## `isDate(value)`

检查值是否为 Date 对象

### Usage

```ts
import { isDate } from 'unfunt'

isDate(new Date())
// => true

isDate('2023-01-01')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是 Date 对象返回 true，否则返回 false

## `isEmpty(value)`

检查值是否为空

### Usage

```ts
import { isEmpty } from 'unfunt'

isEmpty([])
// => true

isEmpty('')
// => true

isEmpty({})
// => true

isEmpty(null)
// => true

isEmpty([1, 2, 3])
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值为空返回 true，否则返回 false

## `isFunction(value)`

检查值是否为函数

### Usage

```ts
import { isFunction } from 'unfunt'

isFunction(() => {})
// => true

isFunction(function() {})
// => true

isFunction('hello')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是函数返回 true，否则返回 false

## `isSet(value)`

检查值是否为 Set 对象

### Usage

```ts
import { isSet } from 'unfunt'

isSet(new Set())
// => true

isSet([])
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是 Set 对象返回 true，否则返回 false

## `isMap(value)`

检查值是否为 Map 对象

### Usage

```ts
import { isMap } from 'unfunt'

isMap(new Map())
// => true

isMap({})
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是 Map 对象返回 true，否则返回 false

## `isError(value)`

检查值是否为错误对象

### Usage

```ts
import { isError } from 'unfunt'

isError(new Error('test'))
// => true

isError({ message: 'error', name: 'Error' })
// => true

isError('error message')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是错误对象返回 true，否则返回 false

## `isLength(value)`

检查值是否为有效的类数组长度

### Usage

```ts
import { isLength } from 'unfunt'

isLength(3)
// => true

isLength(Number.MAX_SAFE_INTEGER)
// => true

isLength(-1)
// => false

isLength(3.2)
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是有效长度返回 true，否则返回 false

## `isNil(value)`

检查值是否为 null 或 undefined

### Usage

```ts
import { isNil } from 'unfunt'

isNil(null)
// => true

isNil(undefined)
// => true

isNil(0)
// => false

isNil('')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是 null 或 undefined 返回 true，否则返回 false

## `isNumber(value)`

检查值是否为数字

### Usage

```ts
import { isNumber } from 'unfunt'

isNumber(42)
// => true

isNumber(3.14)
// => true

isNumber('42')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是数字返回 true，否则返回 false

## `isObject(value)`

检查值是否为对象类型

### Usage

```ts
import { isObject } from 'unfunt'

isObject({})
// => true

isObject([])
// => true

isObject(() => {})
// => true

isObject(null)
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是对象类型返回 true，否则返回 false

## `isObjectLike(value)`

检查值是否为类对象

### Usage

```ts
import { isObjectLike } from 'unfunt'

isObjectLike({})
// => true

isObjectLike([])
// => true

isObjectLike(() => {})
// => false

isObjectLike(null)
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是类对象返回 true，否则返回 false

## `isPlainObject(value)`

检查值是否为普通对象

### Usage

```ts
import { isPlainObject } from 'unfunt'

isPlainObject({})
// => true

isPlainObject(Object.create(null))
// => true

isPlainObject([])
// => false

isPlainObject(new Date())
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是普通对象返回 true，否则返回 false

## `isPrimitive(value)`

检查值是否为原始类型

### Usage

```ts
import { isPrimitive } from 'unfunt'

isPrimitive('hello')
// => true

isPrimitive(42)
// => true

isPrimitive(null)
// => true

isPrimitive({})
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是原始类型返回 true，否则返回 false

## `isPromise(value)`

检查值是否为 Promise 对象

### Usage

```ts
import { isPromise } from 'unfunt'

isPromise(Promise.resolve())
// => true

isPromise({ then: () => {} })
// => true

isPromise({})
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是 Promise 对象返回 true，否则返回 false

## `isRegExp(value)`

检查值是否为正则表达式

### Usage

```ts
import { isRegExp } from 'unfunt'

isRegExp(/abc/)
// => true

isRegExp(new RegExp('abc'))
// => true

isRegExp('abc')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是正则表达式返回 true，否则返回 false

## `isString(value)`

检查值是否为字符串

### Usage

```ts
import { isString } from 'unfunt'

isString('hello')
// => true

isString('')
// => true

isString(42)
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是字符串返回 true，否则返回 false

## `isSymbol(value)`

检查值是否为 Symbol

### Usage

```ts
import { isSymbol } from 'unfunt'

isSymbol(Symbol('test'))
// => true

isSymbol(Symbol.iterator)
// => true

isSymbol('symbol')
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是 Symbol 返回 true，否则返回 false

## `isIterable(value)`

检查值是否为可迭代对象

### Usage

```ts
import { isIterable } from 'unfunt'

isIterable([1, 2, 3])
// => true

isIterable('hello')
// => true

isIterable(new Set())
// => true

isIterable({})
// => false
```

### Arguments

1. `value` *(unknown)*: 要检查的值

### Returns

*(boolean)*: 如果值是可迭代对象返回 true，否则返回 false