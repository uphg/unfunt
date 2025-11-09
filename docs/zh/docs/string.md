# 字符串方法

这些是处理字符串的实用方法。

## `capitalize(str)`

将字符串的第一个字符转换为大写，其余字符转换为小写。

### 使用示例

```ts
import { capitalize } from 'unfunt'

capitalize('FRED')
// => 'Fred'

capitalize('fRED')
// => 'Fred'

capitalize('hello world')
// => 'Hello world'
```

### 参数

1. `str` *(string)*: 要转换的字符串

### 返回值

*(string)*: 返回转换后的字符串

### 说明

- 使用缓存提高重复调用的性能
- 安全处理空字符串
- 只影响第一个字符的大小写

## `lowerFirst(str)`

将字符串的第一个字符转换为小写。

### 使用示例

```ts
import { lowerFirst } from 'unfunt'

lowerFirst('Fred')
// => 'fred'

lowerFirst('FRED')
// => 'fRED'

lowerFirst('Hello')
// => 'hello'
```

### 参数

1. `str` *(string)*: 要转换的字符串

### 返回值

*(string)*: 返回转换后的字符串

### 说明

- 使用缓存提高重复调用的性能
- 安全处理空字符串
- 只影响第一个字符的大小写

## `upperFirst(str)`

将字符串的第一个字符转换为大写。

### 使用示例

```ts
import { upperFirst } from 'unfunt'

upperFirst('fred')
// => 'Fred'

upperFirst('FRED')
// => 'FRED'

upperFirst('hello')
// => 'Hello'
```

### 参数

1. `str` *(string)*: 要转换的字符串

### 返回值

*(string)*: 返回转换后的字符串

### 说明

- 使用缓存提高重复调用的性能
- 安全处理空字符串
- 只影响第一个字符的大小写

## `camelize(str)`

将连字符字符串转换为驼峰格式。

### 使用示例

```ts
import { camelize } from 'unfunt'

camelize('foo-bar')
// => 'fooBar'

camelize('foo-bar-baz')
// => 'fooBarBaz'

camelize('my-component-name')
// => 'myComponentName'
```

### 参数

1. `str` *(string)*: 要转换的连字符字符串

### 返回值

*(string)*: 返回驼峰格式的字符串

### 说明

- 使用缓存提高重复调用的性能
- 将连字符分隔的单词转换为驼峰格式
- 适用于将 CSS 类名转换为 JavaScript 属性名

## `hyphenate(str)`

将驼峰格式字符串转换为连字符格式（kebab-case）。

### 使用示例

```ts
import { hyphenate } from 'unfunt'

hyphenate('fooBar')
// => 'foo-bar'

hyphenate('fooBarBaz')
// => 'foo-bar-baz'

hyphenate('myComponentName')
// => 'my-component-name'
```

### 参数

1. `str` *(string)*: 要转换的驼峰格式字符串

### 返回值

*(string)*: 返回连字符格式的字符串

### 说明

- 使用缓存提高重复调用的性能
- 将驼峰格式转换为 kebab-case
- 适用于将 JavaScript 属性名转换为 CSS 类名