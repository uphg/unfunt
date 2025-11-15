# 数字方法

这些是处理数字的实用方法。

## `toNumber(value)`

将值转换为数字。

### 使用示例

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

### 参数

1. `value` *(unknown)*: 要转换的值

### 返回值

*(number)*: 返回转换后的数字

## `randomInt([lower=0], [upper=1])`

在指定范围内生成随机整数。

### 使用示例

```ts
import { randomInt } from 'unfunt'

randomInt(0, 5)
// => 0 到 5 之间的整数（包含）

randomInt(5)
// => 0 到 5 之间的整数（包含）

randomInt(10, 20)
// => 10 到 20 之间的整数（包含）

randomInt(-5, 5)
// => -5 到 5 之间的整数（包含）
```

### 参数

1. `[lower=0]` *(number)*: 下界
2. `[upper=1]` *(number)*: 上界

### 返回值

*(number)*: 返回指定范围内的随机整数

### 说明

- 如果只提供一个参数，则用作上界，下界为 0
- 自动处理边界顺序（如果下界 > 上界则交换）
- 返回包含边界的随机整数（两个边界都可能作为结果）