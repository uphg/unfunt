# Type Check Methods

These are utility methods for type checking.

## Available Functions

### Basic Type Checks

#### `isString(value)`
Checks if `value` is classified as a String primitive or object.

```ts
import { isString } from 'unfunt'

isString('abc')
// => true

isString(123)
// => false
```

#### `isNumber(value)`
Checks if `value` is classified as a Number primitive or object.

```ts
import { isNumber } from 'unfunt'

isNumber(123)
// => true

isNumber('123')
// => false
```

#### `isBoolean(value)`
Checks if `value` is classified as a boolean primitive or object.

```ts
import { isBoolean } from 'unfunt'

isBoolean(true)
// => true

isBoolean('true')
// => false
```

### Null/Undefined Checks

#### `isNil(value)`
Checks if `value` is `null` or `undefined`.

```ts
import { isNil } from 'unfunt'

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
import { isEmpty } from 'unfunt'

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
import { isObject } from 'unfunt'

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
import { isPlainObject } from 'unfunt'

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
import { isFunction } from 'unfunt'

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
import { isDate } from 'unfunt'

isDate(new Date())
// => true

isDate('2023-01-01')
// => false
```

#### `isRegExp(value)`
Checks if `value` is classified as a RegExp object.

```ts
import { isRegExp } from 'unfunt'

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
import { isPromise } from 'unfunt'

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
import { isError } from 'unfunt'

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