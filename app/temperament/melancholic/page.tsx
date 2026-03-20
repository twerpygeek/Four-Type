'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RuneBackground from '@/components/RuneBackground';

export default function MelancholicPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'traits' | 'strengths' | 'challenges'>(
    'traits'
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const traits = [
    'Analytical and thoughtful',
    'Detail-oriented perfectionist',
    'Introverted and reserved',
    'Deep thinker',
    'Values quality over quantity',
    'Sensitive and empathetic',
    'Organized planner',
    'Seeks meaning and depth',
  ];

  const strengths = [
    'Exceptional analytical skills',
    'High-quality work output',
    'Great attention to detail',
    'Reliable and dependable',
    'Deep emotional intelligence',
    'Excellent problem-solving',
    'Creates comprehensive plans',
    'Produces thorough research',
  ];

  const challenges = [
    'Can be overly critical',
    'Perfectionism can paralyze',
    'Difficulty with delegation',
    'May be socially withdrawn',
    'Prone to anxiety',
    'Slow decision-making',
    'Can seem pessimistic',
    'Struggles with spontaneity',
  ];

  const careerFits = [
    'Research & Science',
    'Software Development',
    'Accounting & Finance',
    'Academic Careers',
    'Quality Assurance',
    'Writing & Journalism',
    'Psychology',
    'Engineering',
  ];

  return (
    <>
      <RuneBackground />
      <Navigation />
      <main className="min-h-screen relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="inline-block mb-4">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                    The Strategist Archetype
                  </span>
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  The Melancholic Temperament
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Contemplative, analytical, and deeply thoughtful, the Melancholic personality
                  excels at understanding complexity. These introspective perfectionists create
                  meaningful work and drive innovation through careful deliberation.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/blog/melancholic"
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Read Deep Dive
                  </Link>
                  <Link
                    href="/manifesto"
                    className="px-8 py-3 border-2 border-blue-600 text-blue-400 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    Back to Manifesto
                  </Link>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent rounded-lg blur-xl opacity-20 animate-pulse"></div>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png"
                    alt="The Strategist - Melancholic Temperament"
                    width={400}
                    height={500}
                    className="relative z-10 w-auto h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Image
              src="/images/melancholic-depth.jpg"
              alt="Melancholic temperament representation"
              width={1200}
              height={400}
              className="rounded-lg shadow-2xl w-full object-cover"
            />
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-700">
              {[
                { id: 'traits', label: 'Key Traits' },
                { id: 'strengths', label: 'Strengths' },
                { id: 'challenges', label: 'Challenges' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 px-2 font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(activeTab === 'traits'
                ? traits
                : activeTab === 'strengths'
                  ? strengths
                  : challenges
              ).map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-blue-500 transition-all duration-300 transform hover:scale-105 animate-fade-in"
                >
                  <p className="text-sm font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Fits */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Career & Life Paths</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {careerFits.map((career, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-900 border border-blue-600/30 rounded-lg hover:border-blue-600 transition-all duration-300 group cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                    {career}
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm">
                    Natural fit for Melancholic temperaments seeking precision and depth.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Growth Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Personal Growth Tips</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Embrace Imperfection',
                  description:
                    'Done is better than perfect. Learning to ship good-enough work frees you to achieve more.',
                },
                {
                  title: 'Social Engagement',
                  description:
                    'Make deliberate efforts to connect with others. Your depth resonates when you share it.',
                },
                {
                  title: 'Manage Anxiety',
                  description:
                    'Your thoughtfulness can spiral into worry. Practice mindfulness and meditation to stay grounded.',
                },
                {
                  title: 'Celebrate Progress',
                  description:
                    'Take time to acknowledge your accomplishments. Your eye for detail should appreciate completion too.',
                },
              ].map((tip, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-blue-600 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-blue-400 mb-2">{tip.title}</h3>
                  <p className="text-gray-300">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Explore Other Temperaments</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Sanguine', color: '#FFD700', emoji: '🎭' },
                { name: 'Choleric', color: '#EF4444', emoji: '👑' },
                { name: 'Phlegmatic', color: '#22C55E', emoji: '🌿' },
              ].map((temp) => (
                <Link
                  key={temp.name}
                  href={`/temperament/${temp.name.toLowerCase()}`}
                  className="group p-8 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-4">{temp.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {temp.name}
                  </h3>
                  <p className="text-gray-400 text-sm">Discover this unique temperament type</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
