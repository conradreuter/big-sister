import * as fs from 'fs'
import * as path from 'path'

const PACKAGES_ROOT = path.join(__dirname, '../packages/node_modules/@big-sister')
const PACKAGE_NAMES = fs.readdirSync(PACKAGES_ROOT)

export const PACKAGES = PACKAGE_NAMES.map(name => ({ name, path: path.join(PACKAGES_ROOT, name) }))

export interface Package {
  readonly name: string
  readonly path: string
}
