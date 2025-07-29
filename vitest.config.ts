import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 测试文件匹配模式
    include: ['test/**/*.{spec,test}.ts'],
    // 排除的文件
    exclude: ['node_modules/**'],
    // 覆盖率配置
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    },
    // 环境配置
    environment: 'node',
    // 显示更清晰的文件路径，去掉绝对路径前缀
    root: process.cwd(),
    // 显示测试执行时间，超过这个时间的测试会被标记为慢测试
    slowTestThreshold: 500,
    // 按文件名排序测试文件，让相同模块的测试聚集在一起
    sequence: {
      shuffle: false,
      concurrent: false
    }
  }
})
