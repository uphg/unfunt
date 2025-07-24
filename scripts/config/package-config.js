/**
 * 生成 package.json 配置
 * @param {string} version - 版本号
 * @returns {Object} package.json 配置对象
 */
export function createPackageConfig(version = '0.1.6') {
  return {
    name: 'unfunt',
    version,
    license: 'MIT',
    main: 'index.umd.js',
    module: 'index.js',
    types: 'index.d.ts',
    description: 'A lightweight JavaScript utility library with common functions',
    keywords: ['javascript', 'typescript', 'utils', 'utility', 'functions', 'library', 'tools'],
    homepage: 'https://github.com/lvheng/unfunt#readme',
    repository: 'lvheng/unfunt',
    bugs: 'https://github.com/lvheng/unfunt/issues',
    author: 'Lv Heng <lvheng233@gmail.com>'
  }
}
