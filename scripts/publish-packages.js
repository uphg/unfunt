export async function publishPackages(version) {
  const npmPackagesDir = path.resolve(__dirname, '../npm-packages')

  if (!fs.existsSync(npmPackagesDir)) {
    console.log(pico.yellow('npm-packages 目录不存在，跳过分包发布'))
    return
  }

  const packageDirs = fs.readdirSync(npmPackagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const packageDir of packageDirs) {
    const packagePath = path.join(npmPackagesDir, packageDir)
    const pkgPath = path.join(packagePath, 'package.json')

    if (!fs.existsSync(pkgPath)) {
      console.log(pico.yellow(`跳过 ${packageDir}：缺少 package.json`))
      continue
    }

    // 更新分包版本
    // const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    // pkg.version = version
    // fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)

    // 发布分包
    step(`发布 ${pkg.name}@${version}...`)
    await run('pnpm', ['publish', '--access', 'public'], { cwd: packagePath })
    console.log(pico.green(`成功发布 ${pkg.name}@${version}`))
  }
}
