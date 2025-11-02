import { defineConfig } from 'tsdown'
import { getPackageEntries } from './scripts/get-package-entries.js'

const { BUILD_ENV } = process.env || {}
console.log('BUILD_ENV:', BUILD_ENV)

// tsdown --env.BUILD_ENV=esm

const configs = {
  // 生产环境配置
  esm: {
    entry: getPackageEntries(),
    format: ['esm'],
    dts: true,
    outDir: './dist',
    sourcemap: true,
    clean: false,
    outputOptions: {
      preserveModules: true
    }
  },
  // 其他环境配置
  umd: {
    entry: ['./src/index.ts'],
    format: ['umd'],
    outDir: './dist',
    sourcemap: true,
    clean: false,
    outputOptions: {
      name: 'unfunt'
    }
  }
}

export default () => {
  const defaultConfig = configs[BUILD_ENV as keyof typeof configs ?? 'esm'] as any
  return defineConfig(defaultConfig)
}
