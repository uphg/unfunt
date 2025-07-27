# Array Methods

These are utility methods for handling arrays.

## `remain(array, start, [deleteCount])`

Split array by given parameters and return the remaining parts after deletion.

### Usage

```ts
import { remain } from 'unfunt'

remain([1, 2, 3, 4, 5], 2)
// => [1, 2]

remain([1, 2, 3, 4, 5], 2, 1)
// => [1, 2, 4, 5]
```

### Arguments

1. `array` *(Array)*: The array to process
2. `start` *(number)*: The index to start deleting from
3. `[deleteCount]` *(number)*: The number of elements to delete, defaults to array length minus 1

### Returns

*(Array)*: Returns a new array with specified elements removed

## `toArray(value)`

Convert value to array.

### Usage

```ts
import { toArray } from 'unfunt'

toArray(null)
// => []

toArray([1, 2, 3])
// => [1, 2, 3]

toArray('hello')
// => ['h', 'e', 'l', 'l', 'o']

toArray(42)
// => [42]
```

### Arguments

1. `value` *(any)*: The value to convert

### Returns

*(Array)*: Returns the converted array

### Notes

- `null` and `undefined` return empty array
- Strings are converted to character arrays
- Arrays are returned as-is
- Other values are wrapped in an array