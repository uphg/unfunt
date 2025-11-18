# API Reference

欢迎使用 Unfunt API 参考文档。Unfunt 是一个专为 TypeScript/JavaScript 设计的实用工具函数集合。

## 快速导航

### [Array Methods](./array.md)
数组处理相关的实用方法
- `remain` - 根据给定参数分割数组，返回分割后的剩下的部分
- `toArray` - 将值转换为数组

### [Function Methods](./function.md)  
函数处理相关的实用方法
- `debounce` - 创建防抖函数
- `throttle` - 创建节流函数

### [Number Methods](./number.md)
数字处理相关的实用方法
- `toNumber` - 将值转换为数字
- `toFinite` - 将值转换为有限数字
- `toInteger` - 将值转换为整数
- `toLength` - 将值转换为适合用作类数组对象长度的整数

### [Object Methods](./object.md)
对象处理相关的实用方法
- `omit` / `omitBy` - 创建忽略指定属性的对象
- `pick` / `pickBy` - 创建只包含指定属性的对象
- `mapEntries` - 通过映射函数转换对象的键值对
- `forEachEntry` - 遍历对象的键值对

### [String Methods](./string.md)
字符串处理相关的实用方法
- `trim` - 移除字符串首尾的空白字符

### [Type Check Methods](./typed.md)
类型检查相关的实用方法
- 包含 17 个类型检查函数，如 `isArray`、`isString`、`isNumber` 等

## 使用方式

```ts
// 按需导入
import { debounce, isArray, toNumber } from 'xfunc'

// 或者导入所有方法
import * as xfunc from 'xfunc'
```

## 总览

- **总方法数**: 32个
- **分类数**: 6个
- **支持 TypeScript**: ✅
- **支持 Tree Shaking**: ✅
- **零依赖**: ✅