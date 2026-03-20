import Link from 'next/link'

const footerLinks = {
  learn: [
    { href: '/manifesto', label: 'The Manifesto' },
    { href: '/blog/history-of-temperaments', label: 'History' },
    { href: '/blog/temperaments-vs-mbti-big-five', label: 'Comparisons' },
    { href: '/blog/subtypes', label: '15 Subtypes' },
  ],
  temperaments: [
    { href: '/temperament/sanguine', label: 'The Bard (Sanguine)' },
    { href: '/temperament/choleric', label: 'The Commander (Choleric)' },
    { href: '/temperament/melancholic', label: 'The Strategist (Melancholic)' },
    { href: '/temperament/phlegmatic', label: 'The Guardian (Phlegmatic)' },
  ],
  resources: [
    { href: '/quiz', label: 'Take the Quiz' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="font-serif text-primary font-bold text-xl">4</span>
              </div>
              <span className="font-serif text-xl text-foreground">FourType</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover your true nature through the ancient wisdom of the four temperaments, reimagined for modern understanding.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground mb-4">Learn</h3>
            <ul className="space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Temperaments */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground mb-4">Temperaments</h3>
            <ul className="space-y-3">
              {footerLinks.temperaments.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} FourType. Know your true nature.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Built with ancient wisdom and modern craft</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
