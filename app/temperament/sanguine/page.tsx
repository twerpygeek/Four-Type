'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RuneBackground from '@/components/RuneBackground';

export default function SanguinePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'traits' | 'strengths' | 'challenges'>(
    'traits'
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const traits = [
    'Extroverted and social',
    'Enthusiastic and optimistic',
    'Creative and spontaneous',
    'Talkative and persuasive',
    'Enjoys new experiences',
    'Playful and humorous',
    'Adaptable and flexible',
    'People-focused',
  ];

  const strengths = [
    'Natural communicators with charisma',
    'Excellent at building relationships',
    'Creative problem-solving approach',
    'Energizes and motivates others',
    'Adaptable to change',
    'Brings joy and light to situations',
    'Strong networking abilities',
    'Excellent at public speaking',
  ];

  const challenges = [
    'Can be impulsive and scattered',
    'Difficulty with long-term focus',
    'May struggle with detail-oriented tasks',
    'Can appear shallow to others',
    'Prone to overspending',
    'May avoid difficult conversations',
    'Can be unreliable if not disciplined',
    'Struggles with patience',
  ];

  const careerFits = [
    'Sales and Marketing',
    'Entertainment',
    'Event Planning',
    'Public Relations',
    'Teaching',
    'Hospitality',
    'Creative Industries',
    'Leadership Roles',
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
                  <span className="text-xs font-semibold text-[#FFD700] uppercase tracking-widest">
                    The Bard Archetype
                  </span>
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  The Sanguine Temperament
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Vibrant, charismatic, and eternally optimistic, the Sanguine personality brings
                  warmth and energy to every interaction. Known as the life of the party, Sanguines
                  thrive in social settings and inspire those around them with their infectious
                  enthusiasm.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/blog/sanguine"
                    className="px-8 py-3 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
                  >
                    Read Deep Dive
                  </Link>
                  <Link
                    href="/manifesto"
                    className="px-8 py-3 border-2 border-[#FFD700] text-[#FFD700] font-bold rounded-lg hover:bg-[#FFD700] hover:text-black transition-all duration-300"
                  >
                    Back to Manifesto
                  </Link>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-transparent rounded-lg blur-xl opacity-20 animate-pulse"></div>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png"
                    alt="The Bard - Sanguine Temperament"
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
              src="/images/sanguine-depth.jpg"
              alt="Sanguine temperament representation"
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
                      ? 'text-[#FFD700] border-b-2 border-[#FFD700]'
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
                  className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-all duration-300 transform hover:scale-105 animate-fade-in"
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
                  className="p-6 bg-gray-900 border border-[#FFD700]/30 rounded-lg hover:border-[#FFD700] transition-all duration-300 group cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-[#FFD700] group-hover:translate-x-2 transition-transform duration-300">
                    {career}
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm">
                    Natural fit for Sanguine temperaments seeking impact and engagement.
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
                'Pausing and filtering your thoughts before blurting them out',
                'Matching the volume and atmosphere in the room',
                'Remembering your obligations and establishing organizational systems',
                'Staying on track when telling a story',
                'Being on time and realistically assessing how long things take',
                'Waiting for others to finish talking, then asking them another question',
                'Thinking before volunteering or committing to something',
                'Finishing what you start',
                'Telling only the truth and limiting your exaggerations',
                'Showing curiosity and interest in everyone',
                '"Adulting" – being responsible for even the boring obligations',
                'Empathizing with others\' emotions without trying to cheer them up',
              ].map((tip, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-all duration-300"
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
                <h3 className="text-xl font-bold text-[#FFD700] mb-6">Encouraging Verses</h3>
                <div className="space-y-4">
                  {[
                    { verse: 'Are not five sparrows sold for two pennies? Yet not one of them is forgotten by God. Indeed, the very hairs of your head are all numbered. Don\'t be afraid; you are worth more than many sparrows.', ref: 'Luke 12:6-7' },
                    { verse: 'Am I now trying to win the approval of human beings, or of God? Or am I trying to please people? If I were still trying to please people, I would not be a servant of Christ.', ref: 'Galatians 1:10' },
                    { verse: 'For he chose us in him before the creation of the world to be holy and blameless in his sight.', ref: 'Ephesians 1:4' },
                    { verse: 'But you, Lord, are a compassionate and gracious God... abounding in love and faithfulness.', ref: 'Psalm 86:15' },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-900 border border-[#FFD700]/30 rounded-lg">
                      <p className="text-gray-300 text-sm italic mb-2">&ldquo;{item.verse}&rdquo;</p>
                      <p className="text-[#FFD700] text-xs font-semibold">{item.ref}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-400 mb-6">Cautionary Verses</h3>
                <div className="space-y-4">
                  {[
                    { verse: 'The wisdom of the prudent is to give thought to their ways, but the folly of fools is deception.', ref: 'Proverbs 14:8' },
                    { verse: 'To answer before listening—that is folly and shame.', ref: 'Proverbs 18:13' },
                    { verse: 'A gossip betrays a confidence, but a trustworthy person keeps a secret.', ref: 'Proverbs 11:13' },
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
              Knowing someone&apos;s temperament is like having a cheat sheet! Use these actions and words to build up the Sanguine in your life.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-900 border border-[#FFD700]/30 rounded-lg">
                <h3 className="text-xl font-bold text-[#FFD700] mb-6">Build Them Up By...</h3>
                <ul className="space-y-3">
                  {[
                    'Listening to their stories',
                    'Making eye contact when they\'re talking',
                    'Being positive and matching their enthusiasm',
                    'Promoting their creativity: "What should we do next? You pick."',
                    'Laughing with them',
                    'Showing interest in their friends',
                    'Approving of them: "You\'re so good at..."',
                    'Taking them seriously when needed',
                  ].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">&#9654;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-gray-900 border border-red-900/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-6">Caution! You May Tear Them Down By...</h3>
                <ul className="space-y-3">
                  {[
                    'Being too serious: "I just want to get this over with"',
                    'Demanding perfection: "Go back over this one more time."',
                    'Shaming them: "Shhhh! You\'re being too loud"',
                    'Consuming all their free time',
                    'Not listening or giving them your full attention',
                    'Not respecting their need for friends',
                    'Requiring them to always be "on"',
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
                { name: 'Choleric', color: '#EF4444', emoji: '👑' },
                { name: 'Melancholic', color: '#3B82F6', emoji: '📚' },
                { name: 'Phlegmatic', color: '#22C55E', emoji: '🌿' },
              ].map((temp) => (
                <Link
                  key={temp.name}
                  href={`/temperament/${temp.name.toLowerCase()}`}
                  className="group p-8 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-4">{temp.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
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
