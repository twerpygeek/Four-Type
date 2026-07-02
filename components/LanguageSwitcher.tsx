'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'

const localizedBases = ['zh-CN', 'es'] as const

function stripLocale(pathname: string) {
  for (const locale of localizedBases) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) return pathname.replace(`/${locale}`, '') || '/'
  }
  return pathname
}

function localizedHref(locale: 'en' | 'zh-CN' | 'es', pathname: string) {
  const cleanPath = stripLocale(pathname)
  const supportedPath = ['/', '/temperament-test', '/four-temperaments-test', '/quiz'].includes(cleanPath)
    ? cleanPath
    : '/'

  if (locale === 'en') return supportedPath
  return supportedPath === '/' ? `/${locale}` : `/${locale}${supportedPath}`
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname()
  const current = pathname.startsWith('/zh-CN') ? 'zh-CN' : pathname.startsWith('/es') ? 'es' : 'en'
  const languages = [
    { code: 'en' as const, label: 'EN' },
    { code: 'zh-CN' as const, label: '中文' },
    { code: 'es' as const, label: 'ES' },
  ]

  return (
    <div className={cn('flex items-center gap-1 rounded-lg border border-border bg-card/70 p-1', compact && 'w-full justify-center')}>
      <Languages className="h-4 w-4 text-muted-foreground" />
      {languages.map((language) => (
        <Link
          key={language.code}
          href={localizedHref(language.code, pathname)}
          hrefLang={language.code}
          className={cn(
            'rounded-md px-2 py-1 text-xs font-semibold transition-colors',
            current === language.code ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {language.label}
        </Link>
      ))}
    </div>
  )
}
