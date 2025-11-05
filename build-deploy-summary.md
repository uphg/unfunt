# Unfunt 项目打包发布流程总结

## 项目概述
Unfunt 是一个现代化的 TypeScript/JavaScript 工具函数库，使用 pnpm 作为包管理器，集成了完整的 CI/CD 流水线和自动化部署功能。

## 技术栈
- **包管理器**: pnpm 10.13.1
- **构建工具**: tsdown (基于 Rollup)
- **测试框架**: Vitest
- **代码检查**: ESLint
- **文档工具**: VitePress
- **CI/CD**: GitHub Actions
- **发布平台**: npm

## 构建流程

### 1. 本地构建
```bash
pnpm build          # 主包构建
pnpm build:packages # 分包构建
```

构建过程包括：
- TypeScript 编译
- ESM 和 UMD 格式打包
- 生成类型定义文件 (.d.ts)
- 复制 README.md 和 LICENSE 到 dist 目录

### 2. 构建配置
- **ESM 格式**: 保留模块结构，支持 tree-shaking
- **UMD 格式**: 浏览器直接使用，全局变量名为 `unfunt`
- **源码映射**: 包含 sourcemap 文件
- **类型定义**: 自动生成 TypeScript 类型声明

## 自动化功能

### 1. Git Hooks
- **pre-commit**: 自动运行 ESLint 修复代码风格
- 使用 `simple-git-hooks` 和 `lint-staged` 实现

### 2. 持续集成 (CI)
**触发条件**: 所有分支的 push 和 PR
- 运行单元测试 (`pnpm test:run`)
- 代码风格检查 (`pnpm lint:check`)
- TypeScript 类型检查 (通过构建验证)

### 3. 持续发布
**触发条件**: dev 分支 push
- 自动构建和发布到 npm (使用 `pkg-pr-new`)
- 支持预发布版本测试

### 4. 正式发布
**触发条件**: 版本标签推送 (v*)
- 完整测试套件运行
- 构建和发布到 npm
- 自动创建 GitHub Release
- 生成和更新 CHANGELOG.md

### 5. 文档部署
**触发条件**: master 分支 push
- 自动构建 VitePress 文档
- 部署到 GitHub Pages

### 6. 包大小监控
**触发条件**: master/dev 分支和 PR
- 构建后分析包大小
- 在 PR 中自动生成大小对比报告
- 包含当前和上一版本的大小对比

### 7. 自动代码修复
**触发条件**: PR 创建
- 自动运行 ESLint 修复
- 提交修复后的代码

## 分支策略

### master 分支
- 稳定版本分支
- 触发文档自动部署
- 包大小监控

### dev 分支
- 开发主分支
- 触发持续发布到 npm
- 预发布版本测试

### 功能分支
- 通过 PR 合并到 dev/master
- 自动触发 CI 测试
- 生成包大小报告

## 发布脚本

### 手动发布
```bash
pnpm release        # 交互式发布
pnpm release:dry    # 干运行预览
```

发布流程：
1. 选择版本号 (patch/minor/major/custom)
2. 运行完整测试套件
3. 更新 package.json 版本
4. 生成变更日志
5. 构建项目
6. 提交更改并推送标签
7. 发布到 npm

### 分包发布
项目支持将工具函数拆分为独立 npm 包：
- 自动生成分包配置
- 并行发布所有分包
- 每个分包独立版本管理

## 质量保证

### 测试策略
- 单元测试覆盖所有功能
- 错误路径测试
- 使用 Vitest 框架
- 支持 watch 模式和单次运行

### 代码质量
- ESLint 配置 (支持自动修复)
- TypeScript 严格模式
- 统一的代码风格 (2 空格缩进、无分号)
- Pre-commit hooks 强制检查

### 发布前检查
- `prepublishOnly`: 运行测试和代码检查
- 确保构建产物完整性
- 验证包内容 (dry-run 模式)

## 部署环境

### GitHub Actions 工作流
- **ci.yml**: 主 CI 工作流
- **release.yml**: 正式发布工作流
- **deploy.yml**: 文档部署工作流
- **test.yml**: 可重用测试工作流
- **size-data.yml**: 包大小数据收集
- **size-report.yml**: 大小报告生成
- **autofix.yml**: 自动代码修复

### 环境要求
- Node.js 20
- pnpm 10.13.1
- Ubuntu 最新版 (CI 环境)

## 集成工具

### 开发工具
- **VitePress**: 文档网站生成
- **Vitest**: 现代化测试框架
- **ESLint**: 代码质量检查
- **TypeScript**: 类型安全
- **tsdown**: 高效打包工具

### CI/CD 工具
- **pkg-pr-new**: 预发布版本管理
- **conventional-changelog**: 自动生成变更日志
- **semantic commits**: 规范提交信息
- **GitHub Releases**: 版本发布管理

这个项目展示了现代前端库的完整工程化实践，集成了从开发到发布的完整自动化流程。