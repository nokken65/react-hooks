import { extname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import type { GlobOptionsWithFileTypesFalse } from 'glob'

import { srcPath } from './utils'

type CreateRollupInputConfig = GlobOptionsWithFileTypesFalse

const createRollupInput = (
  options: CreateRollupInputConfig
): { [entryAlias: string]: string } => {
  return Object.fromEntries(
    glob
      .sync(`${srcPath}/**/*.ts`, options ?? {})
      .map((file) => [
        relative(srcPath, file.slice(0, file.length - extname(file).length)),
        fileURLToPath(new URL(file, import.meta.url))
      ])
  )
}

export { createRollupInput }
