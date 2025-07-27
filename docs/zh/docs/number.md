# Number Methods

这些是处理数字的实用方法。

## `toNumber(value)`

将值转换为数字

### Usage

```ts
import { toNumber } from 'unfunt'

toNumber('42')
// => 42

toNumber('  123  ')
// => 123

toNumber(true)
// => 1

toNumber(false)
// => 0

toNumber([42])
// => 42

toNumber([1, 2])
// => NaN
```

### Arguments

1. `value` *(unknown)*: 要转换的值

### Returns

*(number)*: 返回转换后的数字

## `toFinite(value)`

将值转换为有限数字

### Usage

```ts
import { toFinite } from 'unfunt'

toFinite(3.2)
// => 3.2

toFinite(Number.POSITIVE_INFINITY)
// => 1.7976931348623157e+308

toFinite(Number.NEGATIVE_INFINITY)
// => -1.7976931348623157e+308

toFinite('3.2')
// => 3.2
```

### Arguments

1. `value` *(unknown)*: 要转换的值

### Returns

*(number)*: 返回转换后的有限数字

## `toInteger(value)`

将值转换为整数

### Usage

```ts
import { toInteger } from 'unfunt'

toInteger(3.2)
// => 3

toInteger(Number.MIN_VALUE)
// => 0

toInteger(Infinity)
// => 1.7976931348623157e+308

toInteger('3.2')
// => 3
```

### Arguments

1. `value` *(unknown)*: 要转换的值

### Returns

*(number)*: 返回转换后的整数

## `toLength(value)`

将值转换为适合用作类数组对象长度的整数

### Usage

```ts
import { toLength } from 'unfunt'

toLength(3.2)
// => 3

toLength(Number.MIN_VALUE)
// => 0

toLength(-4)
// => 0

toLength(Number.MAX_VALUE)
// => 4294967295
```

### Arguments

1. `value` *(unknown)*: 要转换的值，默认为 0

### Returns

*(number)*: 返回转换后的整数，范围在 0 到 4294967295 之间