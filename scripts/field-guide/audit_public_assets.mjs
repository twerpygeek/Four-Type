import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'

const root = resolve(process.env.FIELD_GUIDE_AUDIT_ROOT ?? process.cwd())

const forbidden = [
  { label: 'complete Field Guide PDF filename or content', pattern: /FourType-Field-Guide\.pdf/i },
  { label: 'complete Field Guide EPUB filename or content', pattern: /FourType-Field-Guide\.epub/i },
  { label: 'complete Field Guide worksheets filename or content', pattern: /FourType-Field-Guide-Worksheets\.pdf/i },
  { label: 'Stripe secret-shaped content', pattern: /sk_(test|live)_[A-Za-z0-9]+/ },
  { label: 'Stripe webhook secret-shaped content', pattern: /whsec_[A-Za-z0-9]+/ },
  { label: 'Blob token assignment', pattern: /BLOB_READ_WRITE_TOKEN=/ },
]

const tokenRules = forbidden.slice(3)
const findings = new Set()

function filesIn(directory) {
  if (!existsSync(directory)) return []

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const pathname = join(directory, entry.name)

    if (entry.isDirectory()) return filesIn(pathname)
    return entry.isFile() ? [pathname] : []
  })
}

function addMatches(pathname, rules, contents) {
  const pathnameForReport = relative(root, pathname).replaceAll('\\', '/')
  const haystack = contents ?? pathnameForReport

  for (const rule of rules) {
    rule.pattern.lastIndex = 0
    if (rule.pattern.test(haystack)) {
      findings.add(`${pathnameForReport}: ${rule.label}`)
    }
  }
}

function scanDirectory(directory, options) {
  for (const pathname of filesIn(directory)) {
    addMatches(pathname, options.pathRules)

    if (!options.shouldScanContents(pathname)) continue

    const contents = readFileSync(pathname).toString('utf8')
    addMatches(pathname, options.contentRules, contents)
  }
}

scanDirectory(join(root, 'public'), {
  pathRules: forbidden,
  contentRules: forbidden,
  shouldScanContents: () => true,
})

scanDirectory(join(root, '.next', 'static'), {
  pathRules: forbidden,
  contentRules: forbidden,
  shouldScanContents: () => true,
})

scanDirectory(join(root, '.next', 'server'), {
  pathRules: forbidden,
  contentRules: tokenRules,
  shouldScanContents: (pathname) => extname(pathname) === '.map',
})

for (const sourceDirectory of ['app/field-guide', 'components/field-guide']) {
  scanDirectory(join(root, sourceDirectory), {
    pathRules: [],
    contentRules: forbidden,
    shouldScanContents: () => true,
  })
}

for (const sourceFile of ['app/api/events/route.ts', 'lib/analytics.ts']) {
  const pathname = join(root, sourceFile)
  if (existsSync(pathname)) addMatches(pathname, forbidden, readFileSync(pathname, 'utf8'))
}

if (findings.size > 0) {
  console.error('Field Guide public asset audit failed:')
  for (const finding of findings) console.error(`- ${finding}`)
  process.exitCode = 1
} else {
  console.log('Field Guide public asset audit passed.')
}
