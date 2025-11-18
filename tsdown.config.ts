import { defineConfig } from 'tsdown'

export default defineConfig({
  // entry: ['./src/index.ts'],
  sourcemap: true,
  clean: false,
  format: ['cjs', 'esm', 'umd'],
  outDir: './dist',
  outputOptions: {
    name: 'xfunc'
  }
})
