# Array Methods

These are utility methods for handling arrays.

## `toArray(value)`

Convert value to array.

### Usage

```ts
import { toArray } from 'xfunc'

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

## `unionBy(...arrays, iteratee)`

Merge multiple arrays and remove duplicates based on iteratee function.

### Usage

```ts
import { unionBy } from 'xfunc'

unionBy([2.1], [1.2, 2.3], Math.floor)
// => [2.1, 1.2]

unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x')
// => [{ x: 1 }, { x: 2 }]
```

### Arguments

1. `...arrays` *(Array[])*: Arrays to merge
2. `iteratee` *(Function|string)*: Function to generate unique identifier or property name

### Returns

*(Array)*: Returns deduplicated merged array

## `range(start, [end], [step=1])`

Generates a numeric range array.

### Usage

```ts
import { range } from 'xfunc'

range(4)
// => [0, 1, 2, 3]

range(1, 5)
// => [1, 2, 3, 4]

range(0, 20, 5)
// => [0, 5, 10, 15]

range(0, -4, -1)
// => [0, -1, -2, -3]
```

### Arguments

1. `start` *(number)*: The start value
2. `[end]` *(number)*: The end value (exclusive)
3. `[step=1]` *(number)*: The step size

### Returns

*(Array)*: Returns a numeric range array

## `sortBy(array, ...iteratees)`

Sort array based on iteratee functions.

### Usage

```ts
import { sortBy } from 'xfunc'

const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 36 }
]

sortBy(users, 'age')
// => [{ name: 'barney', age: 36 }, { name: 'fred', age: 48 }]

sortBy(users, o => o.name)
// => [{ name: 'barney', age: 36 }, { name: 'fred', age: 48 }]
```

### Arguments

1. `array` *(Array)*: Array to sort
2. `...iteratees` *(Function[]|string[])*: Iteratee functions or property names

### Returns

*(Array)*: Returns sorted new array

## `orderBy(array, iteratees, [orders])`

Sorts an array by multiple criteria with specified sort orders.

### Usage

```ts
import { orderBy } from 'xfunc'

const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 36 }
]

orderBy(users, ['name'], ['desc'])
// => [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }]

orderBy(users, ['age', 'name'], ['asc', 'desc'])
// => [{ name: 'barney', age: 36 }, { name: 'fred', age: 48 }]
```

### Arguments

1. `array` *(Array)*: The array to sort
2. `iteratees` *(Array)*: Array of iterator functions or property names
3. `[orders]` *(Array)*: Array of sort directions, 'asc' or 'desc'

### Returns

*(Array)*: Returns a new sorted array

## `uniq(array)`

Create a deduplicated array copy using SameValueZero for equality comparison.

### Usage

```ts
import { uniq } from 'xfunc'

uniq([2, 1, 2])
// => [2, 1]

uniq([1, 2, 1, 3, 2])
// => [1, 2, 3]
```

### Arguments

1. `array` *(Array)*: Array to deduplicate

### Returns

*(Array)*: Returns deduplicated new array

## `uniqWith(array, comparator)`

Create a deduplicated array copy based on comparison function.

### Usage

```ts
import { uniqWith } from 'xfunc'

const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 1, y: 2 }
]

uniqWith(objects, (a, b) => a.x === b.x && a.y === b.y)
// => [{ x: 1, y: 2 }, { x: 2, y: 1 }]
```

### Arguments

1. `array` *(Array)*: Array to deduplicate
2. `comparator` *(Function)*: Comparison function, returns true if two elements are equal

### Returns

*(Array)*: Returns deduplicated new array

## `castArray(value)`

Converts value to an array, wrapping it in an array if it's not already one.

### Usage

```ts
import { castArray } from 'xfunc'

castArray(1)
// => [1]

castArray({ a: 1 })
// => [{ a: 1 }]

castArray('abc')
// => ['abc']

castArray([1, 2, 3])
// => [1, 2, 3]
```

### Arguments

1. `value` *(any)*: The value to convert

### Returns

*(Array)*: Returns array

### Notes

- Non-array values are wrapped in an array
- Arrays are returned as-is
- Preserves array type information

## `remove(array, item)`

Removes the first occurrence of an item from an array.

### Usage

```ts
import { remove } from 'xfunc'

remove([1, 2, 3, 2], 2)
// => [1, 3, 2]

remove(['a', 'b', 'c'], 'b')
// => ['a', 'c']

remove([true, false, true], false)
// => [true, true]
```

### Arguments

1. `array` *(Array)*: The array to modify
2. `item` *(any)*: The item to remove

### Returns

*(Array)*: Returns the modified array

### Notes

- Modifies the original array in place
- Only removes the first occurrence of the item
- Returns the same array reference for chaining