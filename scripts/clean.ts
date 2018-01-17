import * as path from 'path'
import * as rimraf from 'rimraf'
import { promisify } from 'util'
import { listPackages, Package } from './__util__'

cleanPackages()

async function cleanPackages(): Promise<void> {
  const packages = await listPackages()
  await Promise.all(packages.map(cleanPackage))
}

async function cleanPackage(pkg: Package): Promise<void> {
  const distPath = path.join(pkg.path, 'dist')
  await promisify(rimraf)(distPath)
  console.log(`Cleaned package ${pkg.name}`)
}
