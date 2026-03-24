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

        {/* Strength Training Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Strength Training</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              God wired you with the specific strengths of your temperament for a reason. Use these tips to amplify the strengths you&apos;re naturally wired with.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Smiling more, lightening up, responding optimistically',
                'Being grateful and counting your blessings',
                'Reflecting back what others say to confirm you heard correctly',
                'Turning in/moving on from projects when they are good enough',
                'Coming up with a Plan B when you start feeling anxious or overwhelmed',
                'Accepting invitations, joining in, volunteering',
                'Captivating your thoughts and memorizing helpful scriptural truths',
                'Responding with trust rather than suspicion',
                'Speaking up to share what\'s on your mind instead of withdrawing',
                'Being flexible, particularly about changes to your plans',
                'Sharing your creative talents and graciously accepting compliments',
                'Forgiving others and releasing grudges',
              ].map((tip, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-blue-600 transition-all duration-300"
                >
                  <p className="text-sm text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scripture Verses Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Scripture Verses</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Your temperament is neither a weapon nor an excuse. Use these verses to stay focused on healthy ways you can grow.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-6">Encouraging Verses</h3>
                <div className="space-y-4">
                  {[
                    { verse: '[God] He gives strength to the weary and increases the power of the weak.', ref: 'Isaiah 40:29' },
                    { verse: 'But the Lord is faithful, and he will strengthen you and protect you from the evil one.', ref: '2 Thessalonians 3:3' },
                    { verse: 'Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.', ref: 'Matthew 6:34' },
                    { verse: 'The Lord is my shepherd... He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.', ref: 'Psalms 23:1-3' },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-900 border border-blue-600/30 rounded-lg">
                      <p className="text-gray-300 text-sm italic mb-2">&ldquo;{item.verse}&rdquo;</p>
                      <p className="text-blue-400 text-xs font-semibold">{item.ref}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-400 mb-6">Cautionary Verses</h3>
                <div className="space-y-4">
                  {[
                    { verse: 'Whoever listens to me will live in safety and be at ease, without fear of harm.', ref: 'Proverbs 1:33' },
                    { verse: 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.', ref: 'Romans 15:13' },
                    { verse: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.', ref: 'Philippians 4:6-7' },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                      <p className="text-gray-300 text-sm italic mb-2">&ldquo;{item.verse}&rdquo;</p>
                      <p className="text-gray-500 text-xs font-semibold">{item.ref}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Build-Up Guide Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Build-Up Guide</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Knowing someone&apos;s temperament is like having a cheat sheet! Use these actions and words to build up the Melancholic in your life.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-900 border border-blue-600/30 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-6">Build Them Up By...</h3>
                <ul className="space-y-3">
                  {[
                    'Noticing when they need support: "You must be slammed. How can I help?"',
                    'Keeping their secrets',
                    'Encouraging their creativity: "I love seeing your artwork/hearing you sing"',
                    'Being sensitive to their emotions: "I can totally see why that made you sad."',
                    'Helping them feel safe: "You can tell me anything. I\'m always here for you."',
                    'Helping them formulate a Plan B: "Okay, if that happens, what could you do?"',
                    'Making eye contact when they\'re talking',
                    'Believing in them: "You\'ve got this!"',
                  ].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-blue-400 mt-1">&#9654;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-gray-900 border border-red-900/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-6">Caution! You May Tear Them Down By...</h3>
                <ul className="space-y-3">
                  {[
                    'Dismissing their emotions: "Lighten up, it wasn\'t that bad"',
                    'Not giving them enough/all the details',
                    'Infringing on their space and silence',
                    'Joining their complaining and judging',
                    'Changing the schedule – especially without notice',
                    'Making them feel guilty or wrong: "You never want to come with us."',
                    'Interrupting them',
                  ].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-red-400 mt-1">&#9654;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
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
