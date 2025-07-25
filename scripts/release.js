// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import pico from 'picocolors'
import semver from 'semver'
import enquirer from 'enquirer'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { exec } from './utils.js'
import { parseArgs } from 'node:util'

const { prompt } = enquirer
const currentVersion = createRequire(import.meta.url)('../package.json').version
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const { values: args, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    dry: {
      type: 'boolean'
    },
    skipBuild: {
      type: 'boolean'
    },
    skipTests: {
      type: 'boolean'
    },
    skipGit: {
      type: 'boolean'
    },
    skipPrompts: {
      type: 'boolean'
    }
  }
})

const isDryRun = args.dry
const skipTests = args.skipTests
const skipBuild = args.skipBuild
const skipGit = args.skipGit
const skipPrompts = args.skipPrompts

/** @type {ReadonlyArray<import('semver').ReleaseType>} */
const versionIncrements = ['patch', 'minor', 'major']

const inc = (/** @type {import('semver').ReleaseType} */ i) =>
  semver.inc(currentVersion, i)

const run = async(
  /** @type {string} */ bin,
  /** @type {ReadonlyArray<string>} */ args,
  /** @type {import('node:child_process').SpawnOptions} */ opts = {}
) => exec(bin, args, { stdio: 'inherit', ...opts })

const dryRun = async(
  /** @type {string} */ bin,
  /** @type {ReadonlyArray<string>} */ args
) => console.log(pico.blue(`[dryrun] ${bin} ${args.join(' ')}`))

const runIfNotDry = isDryRun ? dryRun : run
const step = (/** @type {string} */ msg) => console.log(pico.cyan(msg))

async function main() {
  let targetVersion = positionals[0]

  if (!targetVersion) {
    /** @type {{ release: string }} */
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: '选择发布类型',
      choices: versionIncrements
        .map(i => `${i} (${inc(i)})`)
        .concat(['custom'])
    })

    if (release === 'custom') {
      /** @type {{ version: string }} */
      const result = await prompt({
        type: 'input',
        name: 'version',
        message: '输入自定义版本号',
        initial: currentVersion
      })
      targetVersion = result.version
    } else {
      targetVersion = release.match(/\((.*)\)/)?.[1] ?? ''
    }
  }

  // @ts-expect-error
  if (versionIncrements.includes(targetVersion)) {
    // @ts-expect-error
    targetVersion = inc(targetVersion)
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`无效的目标版本: ${targetVersion}`)
  }

  if (!skipPrompts) {
    /** @type {{ yes: boolean }} */
    const { yes: confirmRelease } = await prompt({
      type: 'confirm',
      name: 'yes',
      message: `发布 v${targetVersion}，确认继续？`
    })

    if (!confirmRelease) {
      return
    }
  }

  step(`发布 v${targetVersion}...`)

  // 运行测试
  if (!skipTests) {
    step('\n运行测试...')
    if (!isDryRun) {
      await run('pnpm', ['test:run'])
    } else {
      console.log('跳过（干运行）')
    }
  } else {
    step('跳过测试')
  }

  // 更新版本号
  step('\n更新版本号...')
  updateVersion(targetVersion)

  // 构建项目
  if (!skipBuild) {
    step('\n构建项目...')
    if (!isDryRun) {
      await run('pnpm', ['build'])
    } else {
      console.log('跳过（干运行）')
    }
  } else {
    step('跳过构建')
  }

  // 代码检查
  step('\n运行代码检查...')
  if (!isDryRun) {
    await run('pnpm', ['lint:check'])
  } else {
    console.log('跳过（干运行）')
  }

  if (!skipGit) {
    const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
    if (stdout) {
      step('\n提交更改...')
      await runIfNotDry('git', ['add', '-A'])
      await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`])
    } else {
      console.log('没有更改需要提交')
    }

    step('\n推送到远程仓库...')
    await runIfNotDry('git', ['tag', `v${targetVersion}`])
    await runIfNotDry('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
    await runIfNotDry('git', ['push'])
  }

  // 发布到 npm
  step('\n发布到 npm...')
  if (!isDryRun) {
    await run('pnpm', ['publish', '--access', 'public'], { cwd: path.resolve(__dirname, '../dist') })
    console.log(pico.green(`成功发布 ${targetVersion}`))
  } else {
    console.log('跳过（干运行）')
  }

  if (isDryRun) {
    console.log('\n干运行完成 - 运行 git diff 查看更改')
  }
}

function updateVersion(version) {
  const pkgPath = path.resolve(__dirname, '../package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
