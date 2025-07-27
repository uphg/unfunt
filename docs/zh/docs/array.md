# Array Methods

这些是处理数组的实用方法。

## `remain(array, start, [deleteCount])`

根据给定参数分割数组，返回分割后的剩下的部分

### Usage

```ts
import { remain } from 'unfunt'

remain([1, 2, 3, 4, 5], 2)
// => [1, 2]

remain([1, 2, 3, 4, 5], 2, 1)
// => [1, 2, 4, 5]
```

### Arguments

1. `array` *(Array)*: 要处理的数组
2. `start` *(number)*: 开始删除的索引位置
3. `[deleteCount]` *(number)*: 要删除的元素数量，默认为数组长度减 1

### Returns

*(Array)*: 返回删除指定元素后的新数组

## `toArray(value)`

将值转换为数组

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

1. `value` *(unknown)*: 要转换的值

### Returns

*(Array)*: 返回转换后的数组