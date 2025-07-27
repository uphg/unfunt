# Number Methods

These are utility methods for handling numbers.

## `toNumber(value)`

Converts `value` to a number.

### Usage

```ts
import { toNumber } from 'unfunt'

toNumber('42')
// => 42

toNumber('3.14')
// => 3.14

toNumber([42])
// => 42

toNumber('invalid')
// => NaN
```

### Arguments

1. `value` *(any)*: The value to convert

### Returns

*(number)*: Returns the converted number

## `toFinite(value)`

Converts `value` to a finite number.

### Usage

```ts
import { toFinite } from 'unfunt'

toFinite('3.2')
// => 3.2

toFinite(Infinity)
// => Number.MAX_VALUE

toFinite(-Infinity)
// => -Number.MAX_VALUE
```

### Arguments

1. `value` *(any)*: The value to convert

### Returns

*(number)*: Returns the converted finite number

## `toInteger(value)`

Converts `value` to an integer.

### Usage

```ts
import { toInteger } from 'unfunt'

toInteger('3.2')
// => 3

toInteger(-4.7)
// => -4

toInteger(Infinity)
// => Number.MAX_SAFE_INTEGER
```

### Arguments

1. `value` *(any)*: The value to convert

### Returns

*(number)*: Returns the converted integer

## `toLength(value)`

Converts `value` to an integer suitable for use as the length of an array-like object.

### Usage

```ts
import { toLength } from 'unfunt'

toLength('3.2')
// => 3

toLength(-4)
// => 0

toLength(Infinity)
// => Number.MAX_SAFE_INTEGER
```

### Arguments

1. `value` *(any)*: The value to convert

### Returns

*(number)*: Returns the converted length value

### Notes

- Returns 0 for negative numbers
- Handles infinity and edge cases safely
- Ensures the result is suitable for array length