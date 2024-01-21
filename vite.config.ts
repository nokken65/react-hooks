import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

import packageJson from './package.json'
import { createRollupInput } from './scripts/createRollupInput'

const ignorePatterns = ['src/**/*.test.*', 'src/tests/**']

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      include: ['src'],
      exclude: ignorePatterns
    })
  ],
  build: {
    lib: {
      entry: ['src/index.ts'],
      name: packageJson.name,
      formats: ['cjs', 'es'],
      fileName: (format, name) => `${name}.${format}.js`
    },
    outDir: 'lib',
    sourcemap: true,
    rollupOptions: {
      external: ['react'],
      input: createRollupInput({
        ignore: ignorePatterns
      }),
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  }
})
