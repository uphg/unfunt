# Number Methods

These are utility methods for handling numbers.

## `toNumber(value)`

Converts `value` to a number.

### Usage

```ts
import { toNumber } from 'xfunc'

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

## `randomInt([lower=0], [upper=1])`

Generates a random integer within the specified range.

### Usage

```ts
import { randomInt } from 'xfunc'

randomInt(0, 5)
// => Integer between 0 and 5 (inclusive)

randomInt(5)
// => Integer between 0 and 5 (inclusive)

randomInt(10, 20)
// => Integer between 10 and 20 (inclusive)

randomInt(-5, 5)
// => Integer between -5 and 5 (inclusive)
```

### Arguments

1. `[lower=0]` *(number)*: The lower bound
2. `[upper=1]` *(number)*: The upper bound

### Returns

*(number)*: Returns a random integer within the specified range

### Notes

- If only one argument is provided, it's used as the upper bound with lower bound as 0
- Automatically handles bounds ordering (swaps if lower > upper)
- Returns inclusive random integers (both bounds are possible results)