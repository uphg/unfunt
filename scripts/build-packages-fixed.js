import path from 'path'
import { execa } from 'execa'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import minimist from 'minimist'
import pc from 'picocolors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = path.resolve(__dirname, '..')
const distPackagesDir = path.resolve(rootDir, 'dist-packages')
const resolve = p => path.resolve(rootDir, p)
const argv = minimist(process.argv.slice(2))

// 获取所有导出的函数
function getAllExports() {
  const exports = {}
  
  // 读取各个模块的 index.ts 文件
  const modules = ['array', 'function', 'number', 'object', 'string', 'typed']
  
  modules.forEach(module => {
    const indexPath = resolve(`src/${module}/index.ts`)
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf-8')
      const lines = content.split('\n')
      
      lines.forEach(line => {
        // 匹配 export { functionName } from './functionName'
        const exportMatch = line.match(/export\s+\{[^}]*\}\s+from\s+['"]\.\/([^'"]+)['"]/)
        if (exportMatch) {
          const functionName = exportMatch[1]
          exports[functionName] = {
            module,
            path: `src/${module}/${functionName}.ts`
          }
        }
        
        // 匹配 export { default as functionName } from './functionName'
        const defaultExportMatch = line.match(/export\s+\{\s*default\s+as\s+(\w+)\s*\}\s+from\s+['"]\.\/([^'"]+)['"]/)
        if (defaultExportMatch) {
          const functionName = defaultExportMatch[1]
          const fileName = defaultExportMatch[2]
          exports[functionName] = {
            module,
            path: `src/${module}/${fileName}.ts`
          }
        }
      })
    }
  })
  
  return exports
}

// 创建分包的 package.json
function createPackageConfig(functionName, version) {
  return {
    name: `@unfunt/${functionName}`,
    version,
    license: 'MIT',
    main: 'index.umd.js',
    module: 'index.js',
    types: 'index.d.ts',
    description: 'A lightweight JavaScript utility library with common functions',
    keywords: [
      'javascript',
      'typescript',
      'utils',
      'utility',
      'functions',
      'library',
      'tools'
    ],
    homepage: 'https://github.com/lvheng/unfunt#readme',
    repository: 'lvheng/unfunt',
    bugs: 'https://github.com/lvheng/unfunt/issues',
    author: 'Lv Heng <lvheng233@gmail.com>'
  }
}

// 创建分包的 README.md
function createReadme(functionName, version) {
  return `# @unfunt/${functionName} v${version}

## Installation

Using npm

\`\`\`bash
$ npm i @unfunt/${functionName}
\`\`\`

See the documentation or package source for more details.
`
}

// 构建单个分包
async function buildPackage(functionName, entryPath, packageDir, version) {
  console.log(pc.dim(`Building ${functionName}...`))
  
  // 创建分包目录
  await fs.ensureDir(packageDir)
  
  try {
    const absEntryPath = resolve(entryPath)
    const absPackageDir = path.resolve(rootDir, packageDir)
    
    // 创建临时的 rollup 配置
    const rollupConfig = `
import path from 'path'
import esbuild from 'rollup-plugin-esbuild'
import typescript from 'rollup-plugin-typescript2'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const esbuildPlugin = esbuild({
  include: /\\.[jt]s$/,
  minify: false,
  target: 'es2015'
})

const tsPlugin = typescript({
  check: false,
  tsconfig: '${resolve('tsconfig.json')}',
  clean: true,
  cacheRoot: null,
  exclude: ['**/__tests__', '**/*.test.ts', '**/*.spec.ts'],
  tsconfigOverride: {
    compilerOptions: {
      sourceMap: false,
      declaration: true,
      declarationMap: false,
      rootDir: '${path.dirname(absEntryPath)}',
      outDir: '${absPackageDir}',
      declarationDir: '${absPackageDir}',
      module: 'ESNext',
      moduleResolution: 'node',
      target: 'ES2022',
      lib: ['ES2022', 'DOM']
    },
    include: ['${absEntryPath}']
  }
})

export default [
  {
    input: '${absEntryPath}',
    output: {
      file: '${path.join(absPackageDir, 'index.js')}',
      format: 'es',
      exports: 'auto'
    },
    plugins: [tsPlugin, esbuildPlugin],
    external: []
  },
  {
    input: '${absEntryPath}',
    output: {
      file: '${path.join(absPackageDir, 'index.umd.js')}',
      format: 'umd',
      name: '${functionName}'
    },
    plugins: [tsPlugin, esbuildPlugin],
    external: []
  }
]
`
    
    const configPath = path.join(packageDir, 'rollup.config.js')
    await fs.writeFile(configPath, rollupConfig)
    
    // 使用 Rollup 构建
    await execa('npx', [
      'rollup',
      '-c',
      configPath,
      '--configPlugin',
      '@rollup/plugin-typescript'
    ], {
      cwd: rootDir,
      stdio: 'pipe'
    })
    
    // 创建 package.json
    const packageJson = createPackageConfig(functionName, version)
    await fs.writeFile(
      path.join(packageDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    )
    
    // 创建 README.md
    await fs.writeFile(
      path.join(packageDir, 'README.md'),
      createReadme(functionName, version)
    )
    
    // 复制 LICENSE
    await fs.copy(resolve('LICENSE'), path.join(packageDir, 'LICENSE'))
    
    // 清理临时配置文件
    await fs.remove(configPath)
    
    console.log(pc.green('✓') + pc.dim(` ${functionName} built successfully!`))
  } catch (error) {
    console.error(pc.red('✗') + pc.bold(` Failed to build ${functionName}: `) + pc.red(error.message))
    throw error
  }
}

// 主函数
async function run(argv) {
  try {
    // 读取根目录 package.json 获取版本
    const rootPackagePath = resolve('package.json')
    const rootPackage = JSON.parse(await fs.readFile(rootPackagePath, 'utf-8'))
    const { v: version = rootPackage.version } = argv
    
    console.log(pc.dim(`Building packages with version ${version}...`))
    
    // 清理输出目录
    if (fs.existsSync(distPackagesDir)) {
      await fs.remove(distPackagesDir)
    }
    await fs.ensureDir(distPackagesDir)
    
    // 获取所有导出的函数
    const exports = getAllExports()
    console.log(pc.dim(`Found ${Object.keys(exports).length} functions to package`))
    
    // 并行构建所有分包
    const buildPromises = Object.entries(exports).map(async ([functionName, config]) => {
      const packageDir = path.join(distPackagesDir, functionName)
      await buildPackage(functionName, config.path, packageDir, version)
    })
    
    await Promise.all(buildPromises)
    
    console.log(pc.green('✓') + pc.bold(' All packages built successfully!'))
    console.log(pc.dim(`Packages output to: ${distPackagesDir}`))
    
  } catch (error) {
    console.error(pc.red('✗') + pc.bold(' Build failed: ') + pc.red(error.message))
    process.exit(1)
  }
}

run(argv)