# Object Methods

这些是处理对象的实用方法。

## `omit(object, excludes)`

创建一个对象，忽略指定的属性

### Usage

```ts
import { omit } from 'unfunt'

const obj = { a: 1, b: 2, c: 3 }

omit(obj, ['a', 'c'])
// => { b: 2 }

omit(null, ['a'])
// => {}
```

### Arguments

1. `object` *(any)*: 源对象
2. `excludes` *(Array)*: 要忽略的属性名数组

### Returns

*(Object)*: 返回新对象

## `omitBy(object, callback)`

创建一个对象，忽略通过回调函数判断为真值的属性

### Usage

```ts
import { omitBy } from 'unfunt'

const obj = { a: 1, b: '2', c: 3 }

omitBy(obj, (value) => typeof value === 'number')
// => { b: '2' }
```

### Arguments

1. `object` *(unknown)*: 源对象
2. `callback` *(Function)*: 属性判断回调函数

### Returns

*(Object)*: 返回新对象

## `pick(object, includes)`

创建一个对象，只包含指定的属性

### Usage

```ts
import { pick } from 'unfunt'

const obj = { a: 1, b: 2, c: 3 }

pick(obj, ['a', 'c'])
// => { a: 1, c: 3 }

pick(null, ['a'])
// => {}
```

### Arguments

1. `object` *(unknown)*: 源对象
2. `includes` *(Array)*: 要包含的属性名数组

### Returns

*(Object)*: 返回新对象

## `pickBy(obj, callback)`

创建一个对象，只包含通过回调函数判断为真值的属性

### Usage

```ts
import { pickBy } from 'unfunt'

const obj = { a: 1, b: '2', c: 3 }

pickBy(obj, (value) => typeof value === 'number')
// => { a: 1, c: 3 }
```

### Arguments

1. `obj` *(unknown)*: 源对象
2. `callback` *(Function)*: 属性判断回调函数

### Returns

*(Object)*: 返回新对象

## `mapEntries(obj, mapper)`

通过映射函数转换对象的键值对

### Usage

```ts
import { mapEntries } from 'unfunt'

const obj = { a: 1, b: 2 }

mapEntries(obj, (key, value) => [`prefix_${key}`, value * 2])
// => { prefix_a: 2, prefix_b: 4 }
```

### Arguments

1. `obj` *(Object)*: 源对象
2. `mapper` *(Function)*: 映射函数，接收 key 和 value，返回 [newKey, newValue]

### Returns

*(Object)*: 返回转换后的新对象

## `forEachEntry(obj, callback)`

遍历对象的键值对

### Usage

```ts
import { forEachEntry } from 'unfunt'

const obj = { a: 1, b: 2, c: 3 }

forEachEntry(obj, (key, value) => {
  console.log(key, value)
  if (key === 'b') return false // 停止遍历
})
// 输出: a 1, b 2
```

### Arguments

1. `obj` *(Object)*: 要遍历的对象
2. `callback` *(Function)*: 遍历回调函数，返回 false 时停止遍历

### Returns

*(void)*: 无返回值