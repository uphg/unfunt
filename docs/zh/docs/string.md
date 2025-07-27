# String Methods

这些是处理字符串的实用方法。

## `trim(value)`

移除字符串首尾的空白字符

### Usage

```ts
import { trim } from 'unfunt'

trim('  hello world  ')
// => 'hello world'

trim('\t\n  text  \n\t')
// => 'text'

trim(undefined)
// => undefined

trim('')
// => ''
```

### Arguments

1. `value` *(string | undefined)*: 要处理的字符串

### Returns

*(string | undefined)*: 返回处理后的字符串，如果输入为 undefined 则返回 undefined