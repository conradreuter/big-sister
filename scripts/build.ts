import * as fs from 'fs'
import * as tsc from 'typescript'
import { promisify } from 'util'
import { PACKAGES, Package } from './util'

buildPackages()

async function buildPackages(): Promise<void> {
  const succeeded = await Promise.all(PACKAGES.map(buildPackage))
  const allSucceeded = succeeded.every(s => s)
  process.exit(allSucceeded ? 0 : 1)
}

async function buildPackage(pkg: Package): Promise<boolean> {
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
