# 函数方法

这些是处理函数的实用方法。

## `debounce(func, wait, [options])`

创建一个防抖函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。

### 使用示例

```ts
import { debounce } from 'xfunc'

const debouncedHandler = debounce(() => {
  console.log('Called after 300ms delay')
}, 300)

// 在事件处理器中使用
searchInput.addEventListener('input', debouncedHandler)
```

### 参数

1. `func` *(Function)*: 要防抖的函数
2. `wait` *(number)*: 需要延迟的毫秒数
3. `[options]` *(Object)*: 选项对象
   - `[options.leading=false]` *(boolean)*: 指定是否在延迟开始前调用
   - `[options.trailing=true]` *(boolean)*: 指定是否在延迟结束后调用

### 返回值

*(Function)*: 返回新的防抖函数

## `throttle(func, wait, [options])`

创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。

### 使用示例

```ts
import { throttle } from 'xfunc'

const throttledHandler = throttle(() => {
  console.log('Scroll event handled')
}, 100)

window.addEventListener('scroll', throttledHandler)
```

### 参数

1. `func` *(Function)*: 要节流的函数
2. `wait` *(number)*: 需要节流的毫秒数
3. `[options]` *(Object)*: 选项对象
   - `[options.leading=true]` *(boolean)*: 指定是否在节流开始前调用
   - `[options.trailing=true]` *(boolean)*: 指定是否在节流结束后调用

### 返回值

*(Function)*: 返回新的节流函数

### 说明

- 防抖适用于搜索输入和表单验证
- 节流适用于滚动处理器和调整大小事件
- 两个函数都保留原始函数的上下文和参数

## `memoize(func, [options])`

创建一个缓存函数调用结果的记忆化函数。

### 使用示例

```ts
import { memoize } from 'xfunc'

const fibonacci = memoize((n: number): number => {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
})

fibonacci(10)
// => 55 (计算并缓存)

fibonacci(10)
// => 55 (从缓存返回)

// 使用自定义解析器
const getObject = memoize((id: number) => {
  return fetch(`/api/users/${id}`).then(res => res.json())
}, {
  resolver: (id) => `user_${id}`,
  maxSize: 100
})
```

### 参数

1. `func` *(Function)*: 要记忆化的函数
2. `[options]` *(Object)*: 选项对象
   - `[options.maxSize]` *(number)*: 最大缓存大小，默认无限制
   - `[options.resolver]` *(Function)*: 生成缓存键的函数

### 返回值

*(Function)*: 返回新的记忆化函数

### 说明

- 使用 QueueMap 进行高效的缓存管理，支持大小限制
- 保留原始函数的上下文和参数
- 默认缓存键是参数的 JSON.stringify 结果
- 适用于昂贵的计算和递归函数