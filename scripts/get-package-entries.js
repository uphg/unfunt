import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function getPackageEntries() {
  const srcDir = join(__dirname, '..', 'src')
  const entries = { ['index']: 'src/index.ts' }

  const modules = readdirSync(srcDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  for (const module of modules) {
    if (module === 'internal') continue

    const moduleIndexPath = join(srcDir, module, 'index.ts')
    try {
      const content = readFileSync(moduleIndexPath, 'utf-8')
      const exports = content.match(/export.*from\s+['"]\.\/([^'"]+)['"]/g)
      if (exports) {
        for (const exportLine of exports) {
          const match = exportLine.match(/export.*from\s+['"]\.\/([^'"]+)['"]/)
          if (match && match[1]) {
            const functionName = match[1]
            entries[`${functionName}/index`] = `src/${module}/${functionName}.ts`
            // entries[functionName] = `src/${module}/${functionName}.ts`
          }
        }
      }
    } catch(error) {
      console.warn(`Could not read ${moduleIndexPath}:`, error.message)
    }
  }

  return entries
}
