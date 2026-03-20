import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RuneBackground from '@/components/RuneBackground';

interface BlogPostProps {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: {
    heading: string;
    content: string[];
  }[];
  relatedTopics?: string[];
}

export function BlogPostTemplate({
  title,
  subtitle,
  author,
  date,
  readTime,
  image,
  imageAlt,
  sections,
  relatedTopics = [],
}: BlogPostProps) {
  return (
    <>
      <RuneBackground />
      <Navigation />
      <main className="min-h-screen relative z-10">
        {/* Header */}
        <section className="pt-32 pb-12 px-4 border-b border-gray-800">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#FFD700] hover:text-yellow-300 mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">{subtitle}</p>
            <div className="flex flex-wrap gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {readTime} min read
              </div>
              <div>By {author}</div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={image}
                alt={imageAlt}
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-invert max-w-none space-y-12">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-3xl font-bold text-white mb-6">{section.heading}</h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-300 leading-relaxed text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </article>

            {/* Related Topics */}
            {relatedTopics.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-6">Related Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {relatedTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 hover:border-[#FFD700] transition-colors cursor-pointer"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Explore All Temperaments</h3>
            <p className="text-gray-300 mb-8">
              Discover more about each temperament type and how they shape personality and behavior.
            </p>
            <Link
              href="/manifesto"
              className="inline-block px-8 py-3 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              View the Manifesto
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
