import { getPackageEntries } from './get-package-entries.js'
import { mkdirSync, writeFileSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const npmPackagesDir = join(__dirname, '..', 'npm-packages')

export async function createPackages() {
  const entries = getPackageEntries()
  for (const [functionName, entryPath] of Object.entries(entries)) {
    const functionDir = join(npmPackagesDir, functionName)

    // Create directory for the function
    mkdirSync(functionDir, { recursive: true })
    await createTsdownConfig(functionName, { functionDir, entryPath })
    await createMetaDocs(functionName, { functionDir })
  }
  console.log(`Created ${Object.keys(entries).length} package configs`)
}

export async function createTsdownConfig(functionName, { functionDir, entryPath }) {
  // Generate tsdown.config.ts content
  const configContent = `import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: '${entryPath}',
  },
  format: ['esm', 'umd'],
  outDir: './npm-packages/${functionName}/dist',
  dts: true,
  sourcemap: true,
  clean: true,
  outputOptions: {
    name: 'unfunt_${functionName.replace(/[-]/g, '_')}',
  }
})
`

  // Write tsdown.config.ts file
  const configPath = join(functionDir, 'tsdown.config.ts')
  writeFileSync(configPath, configContent)

  console.log(`Created config for ${functionName} at ${configPath}`)
}

export async function createMetaDocs(functionName, { functionDir }) {
  // Read main package.json to get version
  const mainPackagePath = join(__dirname, '..', 'package.json')
  const mainPackage = JSON.parse(readFileSync(mainPackagePath, 'utf-8'))
  const version = mainPackage.version

  // Create package.json
  const packageJson = {
    name: `@unfunt/${functionName}`,
    version,
    license: 'MIT',
    main: 'dist/index.umd.js',
    module: 'dist/index.js',
    types: 'dist/index.d.ts',
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

  writeFileSync(
    join(functionDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  )

  // Copy LICENSE file
  const licensePath = join(__dirname, '..', 'LICENSE')
  const licenseContent = readFileSync(licensePath, 'utf-8')
  writeFileSync(join(functionDir, 'LICENSE'), licenseContent)

  // Create README.md
  const readmeContent = `# @unfunt/${functionName} v${version}

## Installation

Using npm

\`\`\`bash
$ npm i @unfunt/${functionName}
\`\`\`

See the documentation or package source for more details.
`

  writeFileSync(join(functionDir, 'README.md'), readmeContent)

  console.log(`Created meta docs for ${functionName} at ${functionDir}`)
}
