import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'

const root = resolve(process.env.FIELD_GUIDE_AUDIT_ROOT ?? process.cwd())
const finalAudit = process.env.FIELD_GUIDE_AUDIT_MODE !== 'fixture'
const findings = new Set()

const artifactRules = [
  { label: 'complete Field Guide PDF filename or content', pattern: /FourType-Field-Guide\.pdf/i },
  { label: 'complete Field Guide EPUB filename or content', pattern: /FourType-Field-Guide\.epub/i },
  { label: 'complete Field Guide worksheets filename or content', pattern: /FourType-Field-Guide-Worksheets\.pdf/i },
]
const credentialRules = [
  { label: 'Stripe secret-shaped content', pattern: /sk_(test|live)_[A-Za-z0-9]{8,}/ },
  { label: 'Stripe webhook secret-shaped content', pattern: /whsec_[A-Za-z0-9]{8,}/ },
  { label: 'Blob token assignment', pattern: /\bBLOB_READ_WRITE_TOKEN\s*(?:=|:)\s*(?:['"`]|[A-Za-z0-9])/ },
]
const allRules = [...artifactRules, ...credentialRules]
const sourceExtensions = new Set(['.cjs', '.js', '.jsx', '.json', '.mjs', '.ts', '.tsx'])
const ignoredProductionPrefixes = [
  '.git/',
  '.next/',
  '.next-playwright/',
  '.superpowers/',
  'coverage/',
  'node_modules/',
  'playwright-report/',
  'private/',
  'public/',
  'test-results/',
  'tests/',
]

function isDirectory(pathname) {
  return existsSync(pathname) && statSync(pathname).isDirectory()
}

function filesIn(directory) {
  if (!isDirectory(directory)) return []

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const pathname = join(directory, entry.name)
    if (entry.isDirectory()) return filesIn(pathname)
    return entry.isFile() ? [pathname] : []
  })
}

function redactedLocation(pathname) {
  return relative(root, pathname)
    .replaceAll('\\', '/')
    .replace(/sk_(test|live)_[A-Za-z0-9]+/g, '[redacted]')
    .replace(/whsec_[A-Za-z0-9]+/g, '[redacted]')
}

function addFinding(pathname, label) {
  findings.add(`${redactedLocation(pathname)}: ${label}`)
}

function scanRules(pathname, text, rules) {
  for (const rule of rules) {
    rule.pattern.lastIndex = 0
    if (rule.pattern.test(text)) addFinding(pathname, rule.label)
  }
}

function plausibleBase64Values(text) {
  const tokens = text.match(/\b(?:[A-Za-z0-9+/_-]{16,}={0,2})\b/g) ?? []
  return tokens.flatMap((token) => {
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf8')
      return /^[\x09\x0a\x0d\x20-\x7e]+$/.test(decoded) ? [decoded] : []
    } catch {
      return []
    }
  })
}

function reconstructedValues(text) {
  const values = []
  const extractParts = (expression) => Array.from(expression.matchAll(/(['"])([A-Za-z0-9_-]{1,96})\1/g), (match) => match[2])
  const addJoined = (parts, separator) => {
    if (parts.length < 2) return
    values.push(parts.join(separator))
  }

  for (const match of text.matchAll(/\[([^\]]{1,512})\]\.join\(\s*(['"])([_-]?)\2\s*\)/g)) {
    const parts = extractParts(match[1])
    const remainder = match[1].replace(/(['"])[A-Za-z0-9_-]{1,96}\1/g, '').replace(/[\s,]/g, '')
    if (!remainder) addJoined(parts, match[3])
  }

  for (const match of text.matchAll(/(?:['"][A-Za-z0-9_-]{1,96}['"]\s*\+\s*){1,3}['"][A-Za-z0-9_-]{1,96}['"]/g)) {
    addJoined(extractParts(match[0]), '')
  }

  for (const match of text.matchAll(/`([^`]{1,512})`/g)) {
    const expression = match[1]
    const parts = []
    let cursor = 0
    let valid = true

    for (const interpolation of expression.matchAll(/\$\{([^}]*)\}/g)) {
      const staticPart = expression.slice(cursor, interpolation.index)
      const literal = interpolation[1].match(/^\s*(['"])([A-Za-z0-9_-]{1,96})\1\s*$/)
      if (!/^[A-Za-z0-9_-]*$/.test(staticPart) || !literal) {
        valid = false
        break
      }
      if (staticPart) parts.push(staticPart)
      parts.push(literal[2])
      cursor = (interpolation.index ?? 0) + interpolation[0].length
    }

    const trailingPart = expression.slice(cursor)
    if (!/^[A-Za-z0-9_-]*$/.test(trailingPart)) valid = false
    if (trailingPart) parts.push(trailingPart)
    if (valid) addJoined(parts, '')
  }

  return values
}

function scanText(pathname, text, rules) {
  scanRules(pathname, text, rules)

  for (const decoded of plausibleBase64Values(text)) {
    if (credentialRules.some((rule) => rule.pattern.test(decoded))) {
      addFinding(pathname, 'encoded credential-shaped content')
    }
  }

  for (const value of reconstructedValues(text)) {
    if (credentialRules.some((rule) => rule.pattern.test(value))) {
      addFinding(pathname, 'reconstructed credential-shaped content')
    }
  }
}

function releaseAssets() {
  const manifest = join(root, 'data', 'field-guide-release.json')
  if (!existsSync(manifest)) return []

  try {
    const parsed = JSON.parse(readFileSync(manifest, 'utf8'))
    return Object.values(parsed.assets ?? []).filter((asset) =>
      typeof asset?.bytes === 'number'
      && Number.isInteger(asset.bytes)
      && asset.bytes > 0
      && typeof asset.sha256 === 'string'
      && /^[a-f0-9]{64}$/i.test(asset.sha256),
    )
  } catch {
    findings.add('data/field-guide-release.json: invalid release manifest')
    return []
  }
}

const approvedAssets = releaseAssets()

function scanHash(pathname) {
  const size = statSync(pathname).size
  const candidates = approvedAssets.filter((asset) => asset.bytes === size)
  if (candidates.length === 0) return

  const digest = createHash('sha256').update(readFileSync(pathname)).digest('hex')
  if (candidates.some((asset) => asset.sha256.toLowerCase() === digest)) {
    addFinding(join(dirname(pathname), '[redacted-artifact]'), 'approved release asset hash')
  }
}

function scanFile(pathname, rules, checkHash = false) {
  scanRules(pathname, redactedLocation(pathname), rules)
  scanText(pathname, readFileSync(pathname).toString('utf8'), rules)
  if (checkHash) scanHash(pathname)
}

function scanFiles(paths, rules, checkHash = false) {
  for (const pathname of paths) scanFile(pathname, rules, checkHash)
}

function requireFinalRoots() {
  if (!finalAudit) return

  const publicRoot = join(root, 'public')
  const buildRoot = join(root, '.next')

  if (!isDirectory(publicRoot)) findings.add('public: required public root is missing')
  if (!isDirectory(buildRoot)) {
    findings.add('.next: required build output is missing')
    return
  }

  const buildFiles = filesIn(buildRoot)
  if (buildFiles.length === 0 || !existsSync(join(buildRoot, 'BUILD_ID'))) {
    findings.add('.next: required build output is empty')
  }
}

function isProductionSource(pathname) {
  const pathnameForReport = redactedLocation(pathname)
  if (!sourceExtensions.has(extname(pathname))) return false
  if (ignoredProductionPrefixes.some((prefix) => pathnameForReport.startsWith(prefix))) return false
  if (pathnameForReport === 'scripts/field-guide/audit_public_assets.mjs') return false
  if (pathnameForReport === 'data/field-guide-release.json' || pathnameForReport === 'data/field-guide-asset-report.json') return false
  return true
}

requireFinalRoots()

scanFiles(filesIn(join(root, 'public')), allRules, true)
scanFiles(filesIn(join(root, '.next', 'static')), allRules, true)
scanFiles(filesIn(join(root, '.next', 'server')), credentialRules, true)

const productionSource = filesIn(root).filter(isProductionSource)

scanFiles(productionSource, allRules)

if (findings.size > 0) {
  console.error('Field Guide public asset audit failed:')
  for (const finding of findings) console.error(`- ${finding}`)
  process.exitCode = 1
} else {
  console.log('Field Guide public asset audit passed.')
}
