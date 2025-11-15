# 数组方法

这些是处理数组的实用方法。

## `toArray(value)`

将值转换为数组。

### 使用示例

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

### 参数

1. `value` *(unknown)*: 要转换的值

### 返回值

*(Array)*: 返回转换后的数组

### 说明

- `null` 和 `undefined` 返回空数组
- 字符串会被转换为字符数组
- 数组会原样返回
- 其他值会被包装在数组中

## `unionBy(...arrays, iteratee)`

合并多个数组并根据迭代器函数去重。

### 使用示例

```ts
import { unionBy } from 'unfunt'

unionBy([2.1], [1.2, 2.3], Math.floor)
// => [2.1, 1.2]

unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x')
// => [{ x: 1 }, { x: 2 }]
```

### 参数

1. `...arrays` *(Array[])*: 要合并的数组
2. `iteratee` *(Function|string)*: 生成唯一标识符的函数或属性名

### 返回值

*(Array)*: 返回去重后的合并数组

## `range(start, [end], [step=1])`

生成数字范围数组。

### 使用示例

```ts
import { range } from 'unfunt'

range(4)
// => [0, 1, 2, 3]

range(1, 5)
// => [1, 2, 3, 4]

range(0, 20, 5)
// => [0, 5, 10, 15]

range(0, -4, -1)
// => [0, -1, -2, -3]
```

### 参数

1. `start` *(number)*: 起始值
2. `[end]` *(number)*: 结束值（不包含）
3. `[step=1]` *(number)*: 步长

### 返回值

*(Array)*: 返回数字范围数组

## `sortBy(array, ...iteratees)`

根据迭代器函数对数组进行排序。

### 使用示例

```ts
import { sortBy } from 'unfunt'

const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 36 }
]

sortBy(users, 'age')
// => [{ name: 'barney', age: 36 }, { name: 'fred', age: 48 }]

sortBy(users, o => o.name)
// => [{ name: 'barney', age: 36 }, { name: 'fred', age: 48 }]
```

### 参数

1. `array` *(Array)*: 要排序的数组
2. `...iteratees` *(Function[]|string[])*: 迭代器函数或属性名

### 返回值

*(Array)*: 返回排序后的新数组

## `orderBy(array, iteratees, [orders])`

根据多个条件和指定排序方向对数组进行排序。

### 使用示例

```ts
import { orderBy } from 'unfunt'

const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 36 }
]

orderBy(users, ['name'], ['desc'])
// => [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }]

orderBy(users, ['age', 'name'], ['asc', 'desc'])
// => [{ name: 'barney', age: 36 }, { name: 'fred', age: 48 }]
```

### 参数

1. `array` *(Array)*: 要排序的数组
2. `iteratees` *(Array)*: 迭代器函数或属性名数组
3. `[orders]` *(Array)*: 排序方向数组，'asc' 或 'desc'

### 返回值

*(Array)*: 返回排序后的新数组

## `uniq(array)`

使用 SameValueZero 进行相等比较，创建去重数组副本。

### 使用示例

```ts
import { uniq } from 'unfunt'

uniq([2, 1, 2])
// => [2, 1]

uniq([1, 2, 1, 3, 2])
// => [1, 2, 3]
```

### 参数

1. `array` *(Array)*: 要去重的数组

### 返回值

*(Array)*: 返回去重后的新数组

## `uniqWith(array, comparator)`

根据比较函数创建去重数组副本。

### 使用示例

```ts
import { uniqWith } from 'unfunt'

const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 1, y: 2 }
]

uniqWith(objects, (a, b) => a.x === b.x && a.y === b.y)
// => [{ x: 1, y: 2 }, { x: 2, y: 1 }]
```

### 参数

1. `array` *(Array)*: 要去重的数组
2. `comparator` *(Function)*: 比较函数，如果两个元素相等则返回 true

### 返回值

*(Array)*: 返回去重后的新数组

## `castArray(value)`

将值转换为数组，如果不是数组则包装在数组中。

### 使用示例

```ts
import { castArray } from 'unfunt'

castArray(1)
// => [1]

castArray({ a: 1 })
// => [{ a: 1 }]

castArray('abc')
// => ['abc']

castArray([1, 2, 3])
// => [1, 2, 3]
```

### 参数

1. `value` *(unknown)*: 要转换的值

### 返回值

*(Array)*: 返回数组

### 说明

- 非数组值会被包装在数组中
- 数组会原样返回
- 保留数组类型信息