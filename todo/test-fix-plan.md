# 测试修复任务计划

## 问题概述
运行 `pnpm test` 发现 11 个测试失败，涉及 5 个测试文件的问题需要修复。

## 失败统计
- **总失败测试**: 11 个
- **涉及文件**: 5 个
- **主要问题类别**: 
  - 排序函数处理 undefined/null 值问题 (2个)
  - 对象属性复制函数问题 (3个)
  - 对象属性访问函数问题 (3个)
  - 类型断言函数问题 (3个)

## 任务清单

#### [x] 修复 orderBy 函数对 undefined/null 值的处理
- **状态**: completed
- **位置**: src/array/orderBy.ts 和 test/array/orderBy.spec.ts:112
- **问题**: 排序时期望倒数第二个值为5，但实际得到undefined ✅
- **测试文件**: test/array/orderBy.spec.ts
- **修复内容**: 添加 undefined 和 null 值的特殊处理逻辑，确保它们排在最后

#### [x] 修复 sortBy 函数对 undefined/null 值的处理
- **状态**: completed
- **位置**: src/array/sortBy.ts 和 test/array/sortBy.spec.ts:98
- **问题**: 与orderBy类似，排序结果不符合预期 ✅
- **测试文件**: test/array/sortBy.spec.ts
- **修复内容**: 添加 undefined 和 null 值的特殊处理逻辑，确保它们排在最前面（与 orderBy 不同）

#### [x] 修复 assignIn 函数的对象复制问题
- **状态**: completed
- **位置**: src/object/assignIn.ts 和 test/object/assignIn.spec.ts
- **问题**: 
  - 函数引用比较失败 (line 108) ✅
  - Symbol键值无法正确复制 (line 116) ✅
  - getter/setter属性描述符丢失 (line 152) ✅
- **测试文件**: test/object/assignIn.spec.ts
- **修复内容**: 使用 Object.getOwnPropertyDescriptor 和 Object.defineProperty 来正确处理属性描述符，包括 Symbol 键、getter/setter 和函数引用

#### [ ] 修复类型断言函数的返回值问题
- **状态**: pending
- **位置**: src/typed/type-assert.ts 和 test/typed/type-assert.test.ts
- **问题**: isArrayLike, isEmpty, isIterable 返回错误的布尔值
- **测试文件**: test/typed/type-assert.test.ts

## 修复顺序建议
1. 修复 assignIn 函数 (影响对象操作功能)
2. 修复排序函数 (orderBy, sortBy)
3. 修复类型断言函数

## 测试验证
每个修复完成后需要：
- 运行单个测试文件确认修复
- 运行完整测试套件确保没有回归
- 验证边界情况处理