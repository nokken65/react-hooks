import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootPath = resolve(__dirname, '..')
const srcPath = resolve(__dirname, '..', 'src')

export { __dirname, __filename, rootPath, srcPath }
