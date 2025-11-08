# 发布脚本使用说明

## 功能概述

`scripts/publish-packages.js` 是一个增强版的分包发布脚本，支持缓存失败包和重试功能。

## 使用方法

### 1. 发布所有包（默认）
```bash
node scripts/publish-packages.js
```

### 2. 重试发布失败的包
```bash
node scripts/publish-packages.js --retry-failed
```

### 3. 清除缓存
```bash
node scripts/publish-packages.js --clear-cache
```

## 功能特性

- **失败缓存**: 发布失败的包会被缓存到 `.publish-cache.json` 文件中
- **继续发布**: 即使某个包发布失败，脚本也会继续发布其他包
- **重试机制**: 使用 `--retry-failed` 参数可以只重新发布之前失败的包
- **成功清理**: 当包发布成功时，会自动从缓存中移除
- **完整报告**: 发布完成后会显示成功和失败的统计信息

## 缓存文件格式

缓存文件 `.publish-cache.json` 包含以下信息：
- 包名
- 版本号
- 错误信息
- 失败时间戳

## 注意事项

- 缓存文件已添加到 `.gitignore`，不会被提交到版本控制
- 当所有包都发布成功时，缓存文件会自动删除
- 每次重试都会更新失败包的时间戳