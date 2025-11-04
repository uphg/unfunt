// @ts-check
import fs from 'node:fs'
import pico from 'picocolors'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const step = (/** @type {string} */ msg) => console.log(pico.cyan(msg))

run()

async function run() {
  // 发布 npm-packages 中的分包
  step('\n发布分包...')
  const npmPackagesDir = path.resolve(rootDir, 'npm-packages')
  if (!fs.existsSync(npmPackagesDir)) {
    console.log(pico.yellow('npm-packages 目录不存在，跳过分包发布'))
    return
  }

  const packageDirs = fs.readdirSync(npmPackagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const targetVersion = getPkgVersion()

  for (const packageDir of packageDirs) {
    const packagePath = path.join(npmPackagesDir, packageDir)
    const pkgPath = path.join(packagePath, 'package.json')
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

    if (!fs.existsSync(pkgPath)) {
      console.log(pico.yellow(`跳过 ${packageDir}：缺少 package.json`))
      continue
    }

    // 发布分包
    step(`发布 ${pkg.name}@${targetVersion}...`)
    // await run('pnpm', ['publish', '--access', 'public'], { cwd: packagePath })
    // console.log(pico.green(`成功发布 ${pkg.name}@${targetVersion}`))
  }
}

function getPkgVersion() {
  const pkgPath = path.resolve(rootDir, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  return pkg.version
}
