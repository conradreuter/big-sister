import * as path from 'path'
import * as rimraf from 'rimraf'
import { promisify } from 'util'
import { PACKAGES, Package } from './util'

cleanPackages()

async function cleanPackages(): Promise<void> {
  await Promise.all(PACKAGES.map(cleanPackage))
}

async function cleanPackage(pkg: Package): Promise<void> {
  const distPath = path.join(pkg.path, 'dist')
  await promisify(rimraf)(distPath)
  console.log(`Cleaned package ${pkg.name}`)
}
