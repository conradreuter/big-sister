import * as fs from 'fs'
import * as path from 'path'
import * as tsc from 'typescript'
import { promisify } from 'util'

const PACKAGE_MAP: { [name: string]: Package } = {}

export const PACKAGES_ROOT = path.join(__dirname, '../packages/node_modules/@big-sister')

export async function buildPackage(pkg: Package): Promise<boolean> {
  const configFile = tsc.findConfigFile(pkg.path, fs.existsSync)
  if (!configFile) return true
  const configFileContent = await promisify(fs.readFile)(configFile)
  const configFileJson = tsc.parseJsonText(configFile, configFileContent.toString())
  const config = tsc.parseJsonSourceFileConfigFileContent(configFileJson, tsc.sys, pkg.path)
  const program = tsc.createProgram(config.fileNames, config.options)
  const result = program.emit()
  const succeeded = !result.emitSkipped
  console.log(`Built package ${pkg.name}`)
  return succeeded
}

export function getPackage(name: string): Package {
  return PACKAGE_MAP[name] || (PACKAGE_MAP[name] = { name, path: path.join(PACKAGES_ROOT, name) })
}

export function getPackageFromFile(filename: string): Package | undefined {
  const directory = path.dirname(filename)
  if (directory === '.') return
  const name = directory.split(path.sep)[0]
  return getPackage(name)
}

export async function listPackages(): Promise<Package[]> {
  const names = await promisify(fs.readdir)(PACKAGES_ROOT)
  return names.map(getPackage)
}

export interface Package {
  readonly name: string
  readonly path: string
}
