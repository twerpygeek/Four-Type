'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/quiz', label: 'Take the Quiz' },
  {
    label: 'Temperaments',
    children: [
      { href: '/temperament/sanguine', label: 'The Bard (Sanguine)' },
      { href: '/temperament/choleric', label: 'The Commander (Choleric)' },
      { href: '/temperament/melancholic', label: 'The Strategist (Melancholic)' },
      { href: '/temperament/phlegmatic', label: 'The Guardian (Phlegmatic)' },
    ],
  },
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [temperamentOpen, setTemperamentOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setTemperamentOpen(false)
  }, [pathname])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Gold shield/crest logo with "4" */}
            <div 
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-105 transition-transform"
              style={{
                background: 'linear-gradient(145deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(255,215,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              {/* Inner embossed effect */}
              <div 
                className="absolute inset-[2px] rounded-[6px] flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, #B8860B 0%, #DAA520 50%, #FFD700 100%)',
                }}
              >
                <span 
                  className="font-serif font-black text-lg sm:text-xl"
                  style={{ 
                    color: '#1a1a1a',
                    textShadow: '0 1px 0 rgba(255,255,255,0.3)',
                  }}
                >
                  4
                </span>
              </div>
            </div>
            {/* FourType text with gold accent */}
            <span 
              className="font-serif text-lg sm:text-xl font-semibold tracking-wide"
              style={{ 
                color: '#E5E7EB',
                textShadow: '0 0 20px rgba(255,215,0,0.15)',
              }}
            >
              <span style={{ color: '#FFD700' }}>Four</span>Type
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setTemperamentOpen(true)}
                  onMouseLeave={() => setTemperamentOpen(false)}
                >
                  <button
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1',
                      'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn('w-4 h-4 transition-transform', temperamentOpen && 'rotate-180')} />
                  </button>
                  {temperamentOpen && (
                    <div className="absolute top-full left-0 pt-2 w-64">
                      <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-4 py-3 text-sm transition-colors hover:bg-secondary/50',
                              pathname === child.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/quiz"
              className="px-5 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Discover Your Type
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-foreground hover:bg-secondary/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-md border-b border-border animate-in slide-in-from-top duration-200">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="space-y-1">
                  <button
                    onClick={() => setTemperamentOpen(!temperamentOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground"
                  >
                    {link.label}
                    <ChevronDown className={cn('w-4 h-4 transition-transform', temperamentOpen && 'rotate-180')} />
                  </button>
                  {temperamentOpen && (
                    <div className="pl-4 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-4 py-3 text-sm rounded-lg transition-colors',
                            pathname === child.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    pathname === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-4">
              <Link
                href="/quiz"
                className="block w-full text-center px-5 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary/90 transition-colors"
              >
                Discover Your Type
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
