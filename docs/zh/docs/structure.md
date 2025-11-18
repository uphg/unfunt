# 数据结构方法

这些是用于高级用例的实用数据结构。

## `QueueMap`

基于 Map 的队列实现，在提供队列操作的同时维护插入顺序。

### 使用示例

```ts
import { QueueMap } from 'xfunc'

// 创建新的 QueueMap
const queue = new QueueMap<string, number>()

// 设置值（维护插入顺序）
queue.set('first', 1)
queue.set('second', 2)
queue.set('third', 3)

// 获取第一个插入的值
queue.getFirst()
// => 1

// 移除并返回第一个值
queue.removeFirst()
// => 1

// 检查队列是否为空
queue.isEmpty()
// => false

// 作为常规 Map 使用
queue.get('second')
// => 2

queue.has('third')
// => true

// 获取大小
queue.size
// => 2
```

### 构造函数

#### `new QueueMap([iterable])`

创建新的 QueueMap 实例。

**参数：**
1. `[iterable]` *(Iterable)*: 用于初始化 QueueMap 的可迭代对象

### 方法

#### `set(key, value)`

在 QueueMap 中为键设置值。维护插入顺序。

**参数：**
1. `key` *(any)*: 要设置的键
2. `value` *(any)*: 要设置的值

**返回值：** *(QueueMap)*: 返回 QueueMap 实例以支持链式调用

#### `get(key)`

获取 QueueMap 中键对应的值。

**参数：**
1. `key` *(any)*: 要获取的键

**返回值：** *(any)*: 返回与键关联的值，如果不存在则返回 undefined

#### `getFirst()`

获取第一个插入键的值，但不移除它。

**返回值：** *(any)*: 返回第一个值，如果为空则返回 undefined

#### `removeFirst()`

移除并返回第一个插入键的值。

**返回值：** *(any)*: 返回被移除的第一个值，如果为空则返回 undefined

#### `isEmpty()`

检查 QueueMap 是否为空。

**返回值：** *(boolean)*: 如果为空返回 true，否则返回 false

#### `delete(key)`

从 QueueMap 中删除键值对。

**参数：**
1. `key` *(any)*: 要删除的键

**返回值：** *(boolean)*: 如果元素存在并被移除则返回 true，否则返回 false

#### `has(key)`

检查 QueueMap 中是否存在某个键。

**参数：**
1. `key` *(any)*: 要检查的键

**返回值：** *(boolean)*: 如果键存在则返回 true，否则返回 false

#### `clear()`

移除 QueueMap 中的所有键值对。

**返回值：** *(undefined)*

### 属性

#### `size`

获取 QueueMap 中键值对的数量。

**类型：** *(number)*

### 说明

- 扩展原生 Map 类，因此所有 Map 方法都可用
- 为队列操作维护插入顺序
- 适用于实现 LRU（最近最少使用）缓存
- 被 `memoize` 函数内部用于缓存管理
- 基本操作的时间复杂度为 O(1)

### 示例

#### LRU 缓存实现

```ts
import { QueueMap } from 'xfunc'

class LRUCache<K, V> {
  private cache: QueueMap<K, V>
  private maxSize: number

  constructor(maxSize: number) {
    this.cache = new QueueMap<K, V>()
    this.maxSize = maxSize
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key)
    if (value !== undefined) {
      // 移除并重新插入以标记为最近使用
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.maxSize) {
      this.cache.removeFirst()
    }
    this.cache.set(key, value)
  }
}

// 使用
const cache = new LRUCache<string, number>(3)
cache.set('a', 1)
cache.set('b', 2)
cache.set('c', 3)

// 这将移除 'a'（最近最少使用）
cache.set('d', 4)

console.log(cache.get('a')) // undefined
console.log(cache.get('b')) // 2
```