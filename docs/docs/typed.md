# Type Check Methods

These are utility methods for type checking.

## Available Functions

### Basic Type Checks

#### `isString(value)`
Checks if `value` is classified as a String primitive or object.

```ts
import { isString } from 'xfunc'

isString('abc')
// => true

isString(123)
// => false
```

#### `isNumber(value)`
Checks if `value` is classified as a Number primitive or object.

```ts
import { isNumber } from 'xfunc'

isNumber(123)
// => true

isNumber('123')
// => false
```

#### `isBoolean(value)`
Checks if `value` is classified as a boolean primitive or object.

```ts
import { isBoolean } from 'xfunc'

isBoolean(true)
// => true

isBoolean('true')
// => false
```

### Null/Undefined Checks

#### `isNil(value)`
Checks if `value` is `null` or `undefined`.

```ts
import { isNil } from 'xfunc'

isNil(null)
// => true

isNil(undefined)
// => true

isNil(0)
// => false
```

#### `isEmpty(value)`
Checks if `value` is an empty object, collection, map, or set.

```ts
import { isEmpty } from 'xfunc'

isEmpty([])
// => true

isEmpty({})
// => true

isEmpty('')
// => true

isEmpty([1, 2, 3])
// => false
```

### Object Type Checks

#### `isObject(value)`
Checks if `value` is the language type of Object.

```ts
import { isObject } from 'xfunc'

isObject({})
// => true

isObject([1, 2, 3])
// => true

isObject(null)
// => false
```

#### `isPlainObject(value)`
Checks if `value` is a plain object.

```ts
import { isPlainObject } from 'xfunc'

isPlainObject({})
// => true

isPlainObject(new Object())
// => true

isPlainObject([1, 2, 3])
// => false
```

### Function Checks

#### `isFunction(value)`
Checks if `value` is classified as a Function object.

```ts
import { isFunction } from 'xfunc'

isFunction(() => {})
// => true

isFunction(function() {})
// => true

isFunction('function')
// => false
```

### Date and RegExp Checks

#### `isDate(value)`
Checks if `value` is classified as a Date object.

```ts
import { isDate } from 'xfunc'

isDate(new Date())
// => true

isDate('2023-01-01')
// => false
```

#### `isRegExp(value)`
Checks if `value` is classified as a RegExp object.

```ts
import { isRegExp } from 'xfunc'

isRegExp(/abc/)
// => true

isRegExp(new RegExp('abc'))
// => true

isRegExp('abc')
// => false
```

### Advanced Checks

#### `isPromise(value)`
Checks if `value` is a Promise.

```ts
import { isPromise } from 'xfunc'

isPromise(Promise.resolve())
// => true

isPromise({ then: () => {} })
// => true

isPromise({})
// => false
```

#### `isError(value)`
Checks if `value` is an Error object.

```ts
import { isError } from 'xfunc'

isError(new Error())
// => true

isError(new TypeError())
// => true

isError({ message: 'error' })
// => false
```

## Complete List

All available type checking functions:

- `isString` 
- `isNumber`
- `isBoolean`
- `isNil`
- `isEmpty`
- `isObject`
- `isPlainObject`
- `isFunction`
- `isDate`
- `isRegExp`
- `isPromise`
- `isError`
- `isSymbol`
- `isBigInt`
- `isArrayLike`
- `isSet`
- `isMap`
- `isLength`
- `isObjectLike`
- `isPrimitive`
- `isIterable`

Each function returns a boolean value indicating whether the value matches the expected type.