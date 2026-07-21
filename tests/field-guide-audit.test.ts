import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

function runAudit(root: string) {
  try {
    execFileSync(process.execPath, ['scripts/field-guide/audit_public_assets.mjs'], {
      cwd: process.cwd(),
      env: { ...process.env, FIELD_GUIDE_AUDIT_ROOT: root },
      encoding: 'utf8',
      stdio: 'pipe',
    })
    return { status: 0, output: '' }
  } catch (error) {
    const result = error as { status: number | null; stderr?: Buffer; stdout?: Buffer }
    return {
      status: result.status,
      output: `${result.stdout?.toString() ?? ''}${result.stderr?.toString() ?? ''}`,
    }
  }
}

test('public asset audit rejects complete rewards and token-shaped bundle content', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))

  try {
    mkdirSync(join(root, 'public', 'rewards'), { recursive: true })
    mkdirSync(join(root, '.next', 'static'), { recursive: true })
    writeFileSync(join(root, 'public', 'rewards', 'FourType-Field-Guide.pdf'), 'not a real reward')
    writeFileSync(join(root, '.next', 'static', 'chunk.js'), ['sk', 'test', 'auditvalue'].join('_'))

    const result = runAudit(root)

    assert.equal(result.status, 1)
    assert.match(result.output, /complete Field Guide PDF filename or content/)
    assert.match(result.output, /Stripe secret-shaped content/)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})

test('public asset audit allows a server source map to name an environment variable without a value', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))

  try {
    mkdirSync(join(root, 'public', 'images', 'field-guide'), { recursive: true })
    mkdirSync(join(root, '.next', 'server'), { recursive: true })
    writeFileSync(join(root, 'public', 'images', 'field-guide', 'preview-01.webp'), 'preview')
    writeFileSync(join(root, '.next', 'server', 'route.js.map'), JSON.stringify({
      sourcesContent: ['const configured = process.env.BLOB_READ_WRITE_TOKEN'],
    }))

    const result = runAudit(root)

    assert.equal(result.status, 0, result.output)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})

test('public asset audit rejects complete reward or token-shaped campaign source content', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))

  try {
    mkdirSync(join(root, 'app', 'field-guide'), { recursive: true })
    writeFileSync(join(root, 'app', 'field-guide', 'Campaign.tsx'), [
      "const reward = 'FourType-Field-Guide.pdf'",
      "const secret = 'whsec_auditvalue'",
    ].join('\n'))

    const result = runAudit(root)

    assert.equal(result.status, 1)
    assert.match(result.output, /complete Field Guide PDF filename or content/)
    assert.match(result.output, /Stripe webhook secret-shaped content/)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})
