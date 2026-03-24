import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Clock, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog | FourType - Temperament Education & Insights',
  description: 'Explore articles about the four temperaments, personality psychology, leadership, relationships, and self-development. Learn how to apply temperament theory in daily life.',
}

const blogPosts = [
  {
    slug: 'history-of-temperaments',
    title: 'History of the 4 Temperaments: From Hippocrates to Modern Psychology',
    excerpt: 'The complete history of the four temperaments — from ancient Greek medicine through Galen, Kant, Wundt, Steiner, Keirsey, and LaHaye. How a 2,500-year-old idea still shapes personality science today.',
    category: 'History',
    readTime: '8 min',
    featured: true,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png',
    icon: '/icon.png',
  },
  {
    slug: 'sanguine-temperament',
    title: 'Sanguine Temperament: Traits, Strengths & Challenges',
    excerpt: 'Everything you need to know about the Sanguine temperament — core traits, strengths, weaknesses, career fits, relationship style, and practical growth tips.',
    category: 'Temperaments',
    readTime: '7 min',
    color: '#FFD700',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png',
    icon: '/icon.png',
  },
  {
    slug: 'choleric-temperament',
    title: 'Choleric Temperament: The Natural Leader Explained',
    excerpt: 'Discover the Choleric temperament — the rarest and most driven of the four types. Learn their leadership traits, strengths, weaknesses, career fits, and growth strategies.',
    category: 'Temperaments',
    readTime: '7 min',
    color: '#E63946',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png',
    icon: '/icon.png',
  },
  {
    slug: 'melancholic-temperament',
    title: 'Melancholic Temperament: Depth, Detail & Perfectionism',
    excerpt: 'A complete guide to the Melancholic temperament — the deep thinker and perfectionist of the four types. Discover their traits, strengths, challenges, and growth strategies.',
    category: 'Temperaments',
    readTime: '8 min',
    color: '#4CC9F0',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png',
    icon: '/icon.png',
  },
  {
    slug: 'phlegmatic-temperament',
    title: 'Phlegmatic Temperament: The Quiet Strength',
    excerpt: 'A complete guide to the Phlegmatic temperament — the calm peacemaker of the four types. Discover their traits, strengths, challenges, career fits, and relationship style.',
    category: 'Temperaments',
    readTime: '8 min',
    color: '#52B788',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png',
    icon: '/icon.png',
  },
  {
    slug: 'leadership-and-temperament',
    title: 'How to Use Temperament for Better Leadership',
    excerpt: 'Discover how each of the 4 temperaments approaches leadership. Learn your natural leadership style, your blind spots, and how to build a balanced team.',
    category: 'Leadership',
    readTime: '6 min',
    featured: true,
    icon: '/icon.png',
  },
  {
    slug: 'temperaments-vs-mbti-big-five',
    title: '4 Temperaments vs MBTI vs Big Five — How They Compare',
    excerpt: 'A clear comparison of the 4 temperaments, Myers-Briggs (MBTI), Big Five, and DISC personality systems. Learn how they relate and which one is right for you.',
    category: 'Comparison',
    readTime: '7 min',
    icon: '/icon.png',
  },
  {
    slug: 'subtypes',
    title: 'The 15 Temperament Subtypes You Never Knew Existed',
    excerpt: 'Go beyond the 4 temperaments and discover the 15 subtypes that make each person unique. Learn your blend\'s traits, strengths, risks, and growth path.',
    category: 'Deep Dive',
    readTime: '10 min',
    featured: true,
    icon: '/icon.png',
  },
]

const categories = ['All', 'Temperaments', 'History', 'Leadership', 'Comparison', 'Deep Dive']

export default function BlogPage() {
  const featuredPost = blogPosts.find(p => p.featured && p.slug === 'history-of-temperaments')
  const regularPosts = blogPosts.filter(p => p.slug !== featuredPost?.slug)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Temperament Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the science, history, and practical applications of temperament theory. 
            Learn how to understand yourself and connect better with others.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                cat === 'All'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block relative overflow-hidden rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-[#4CC9F0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              {featuredPost.image && (
                <div className="relative w-48 h-64 flex-shrink-0">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                  <span className="text-xs font-semibold text-primary">Featured</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-2 max-w-2xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime} read
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Glow effect based on temperament color */}
              {post.color && (
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: post.color }}
                />
              )}
              
              <div className="relative p-6">
                {/* Character image if available */}
                {post.image && (
                  <div className="relative w-20 h-28 mx-auto mb-4">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-3">
                  <span 
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: post.color ? `${post.color}20` : 'rgb(var(--primary) / 0.1)',
                      color: post.color || 'rgb(var(--primary))'
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-1 text-sm text-primary font-medium">
                  Read article
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}
