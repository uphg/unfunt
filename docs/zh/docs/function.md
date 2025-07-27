# Function Methods

这些是处理函数的实用方法。

## `debounce(func, wait, [immediate=false])`

创建一个防抖函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法

### Usage

```ts
import { debounce } from 'unfunt'

// 防抖处理搜索
const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query)
}, 300)

// 立即执行模式
const debouncedImmediate = debounce((value: string) => {
  console.log('Processing:', value)
}, 500, true)

// 取消防抖
debouncedSearch.cancel()
```

### Arguments

1. `func` *(Function)*: 要防抖的函数
2. `wait` *(number)*: 需要延迟的毫秒数
3. `[immediate=false]` *(boolean)*: 指定是否在延迟开始前调用

### Returns

*(Function)*: 返回新的防抖函数，包含 `cancel` 方法用于取消防抖

## `throttle(func, wait, [options])`

创建一个节流函数，在 wait 秒内最多执行 func 一次的函数

### Usage

```ts
import { throttle } from 'unfunt'

// 基本节流
const throttledScroll = throttle(() => {
  console.log('Scroll event handled')
}, 100)

// 配置选项
const throttledResize = throttle(() => {
  console.log('Resize event handled')
}, 200, { leading: false, trailing: true })

// 取消节流
throttledScroll.cancel()
```

### Arguments

1. `func` *(Function)*: 要节流的函数
2. `wait` *(number)*: 需要节流的毫秒数
3. `[options]` *(Object)*: 选项对象
   - `[leading=true]` *(boolean)*: 指定调用在节流开始前
   - `[trailing=true]` *(boolean)*: 指定调用在节流结束后

### Returns

*(Function)*: 返回新的节流函数，包含 `cancel` 方法用于取消节流