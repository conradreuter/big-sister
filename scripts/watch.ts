import * as fs from 'fs'
import * as path from 'path'
import { Observable, Subject } from 'rxjs'
import { buildPackage, getPackageFromFile, listPackages, Package, PACKAGES_ROOT } from './__util__'

const DEBOUNCE_TIME = 1500

watchPackages()

async function watchPackages(): Promise<void> {
  await buildPackagesInitially()
  buildPackagesUponChanges()
}

async function buildPackagesInitially(): Promise<void> {
  const packages = await listPackages()
  await Promise.all(packages.map(buildPackage))
}

function buildPackagesUponChanges(): void {
  detectChanges().subscribe(changes$ => (
    changes$
      .debounceTime(DEBOUNCE_TIME)
      .do(() => console.log(`Detected changes in package ${changes$.pkg.name}...`))
      .subscribe(() => buildPackage(changes$.pkg))
  ))
}

function detectChanges(): Observable<Changes> {
  return (
    watchPackageRoot()
    .groupBy(getPackageFromFile)
    .filter(group => !!group.key)
    .map(group => Object.assign(group, { pkg: group.key }) as Changes)
    .map(excludeIrrelevantFiles)
  )
}

function watchPackageRoot(): Observable<string> {
  const subject = new Subject<string>()
  fs.watch(
    PACKAGES_ROOT,
    { recursive: true },
    (event, filename) => subject.next(filename),
  )
  return subject.asObservable()
}

function excludeIrrelevantFiles(changes$: Changes): Changes {
  const filteredChanges$ = changes$.filter(isRelevant(changes$.pkg))
  return Object.assign(filteredChanges$, { pkg: changes$.pkg })
}

function isRelevant(pkg: Package): (filename: string) => boolean {
  const distPath = path.join(pkg.name, 'dist')
  return filename => !filename.startsWith(distPath)
}

type Changes = { pkg: Package } & Observable<string>
