import * as fs from 'fs'
import { buildPackage, listPackages, Package } from './__util__'

buildPackages()

async function buildPackages(): Promise<void> {
  const packages = await listPackages()
  const succeeded = await Promise.all(packages.map(buildPackage))
  const allSucceeded = succeeded.every(s => s)
  process.exit(allSucceeded ? 0 : 1)
}

