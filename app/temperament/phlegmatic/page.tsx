'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RuneBackground from '@/components/RuneBackground';

export default function PhlegmaticPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'traits' | 'strengths' | 'challenges'>(
    'traits'
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const traits = [
    'Calm and peaceful',
    'Loyal and dependable',
    'Cooperative',
    'Patient listener',
    'Avoids conflict',
    'Steady and reliable',
    'Supportive nature',
    'Low-key personality',
  ];

  const strengths = [
    'Creates peaceful environments',
    'Excellent team mediator',
    'Truly listens to others',
    'Consistent and reliable',
    'Supportive and encouraging',
    'Great at routine and process',
    'Loyal friend and colleague',
    'Keeps teams balanced',
  ];

  const challenges = [
    'Can be passive',
    'Slow to make decisions',
    'May lack initiative',
    'Difficulty with change',
    'Can seem unmotivated',
    'May suppress own needs',
    'Avoids conflict to a fault',
    'Struggles with assertiveness',
  ];

  const careerFits = [
    'Human Resources',
    'Social Services',
    'Nursing & Healthcare',
    'Teaching Support',
    'Administrative Roles',
    'Team Coordination',
    'Counseling',
    'Community Services',
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
                  <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">
                    The Guardian Archetype
                  </span>
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  The Phlegmatic Temperament
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Gentle, steady, and profoundly loyal, the Phlegmatic personality creates
                  harmony wherever they go. These peaceful supporters excel at building trust
                  and maintaining stable, nurturing environments for those around them.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/blog/phlegmatic"
                    className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Read Deep Dive
                  </Link>
                  <Link
                    href="/manifesto"
                    className="px-8 py-3 border-2 border-green-600 text-green-400 font-bold rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300"
                  >
                    Back to Manifesto
                  </Link>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-transparent rounded-lg blur-xl opacity-20 animate-pulse"></div>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png"
                    alt="The Guardian - Phlegmatic Temperament"
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
              src="/images/phlegmatic-depth.jpg"
              alt="Phlegmatic temperament representation"
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
                      ? 'text-green-400 border-b-2 border-green-400'
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
                  className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-green-500 transition-all duration-300 transform hover:scale-105 animate-fade-in"
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
                  className="p-6 bg-gray-900 border border-green-600/30 rounded-lg hover:border-green-600 transition-all duration-300 group cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-green-400 group-hover:translate-x-2 transition-transform duration-300">
                    {career}
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm">
                    Natural fit for Phlegmatic temperaments seeking harmony and support.
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
                'Regularly doing something – a class, hobby, or new skill – that interests you',
                'Advocating for yourself rather than letting resentment build',
                'Jumping into the conversation and sharing your ideas and opinions',
                'Matching the emotions and/or energy of others',
                'Trusting in your abilities and remembering the times you\'ve succeeded',
                'Responding enthusiastically',
                'Volunteering to be a leader, captain or point person',
                'Committing to deadlines and meeting them',
                'Expressing your preferences when you\'re offered choices',
                'Explaining that you need time to think, rather than leaving others confused',
                'Sticking around until conflicts are fully resolved',
                'Vocalizing your admiration and/or appreciation of others',
              ].map((tip, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-green-600 transition-all duration-300"
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
                <h3 className="text-xl font-bold text-green-400 mb-6">Encouraging Verses</h3>
                <div className="space-y-4">
                  {[
                    { verse: 'Come to me, all you who are weary and burdened, and I will give you rest.', ref: 'Matthew 11:28' },
                    { verse: 'Make it your ambition to lead a quiet life: You should mind your own business and work with your hands, just as we told you, so that your daily life may win the respect of outsiders.', ref: '1 Thessalonians 4:11-12' },
                    { verse: 'But the Lord said to Samuel, "Do not consider his appearance or his height, for I have rejected him. The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart."', ref: '1 Samuel 16:7' },
                    { verse: 'Blessed are the peacemakers, for they will be called children of God.', ref: 'Matthew 5:9' },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-900 border border-green-600/30 rounded-lg">
                      <p className="text-gray-300 text-sm italic mb-2">&ldquo;{item.verse}&rdquo;</p>
                      <p className="text-green-400 text-xs font-semibold">{item.ref}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-400 mb-6">Cautionary Verses</h3>
                <div className="space-y-4">
                  {[
                    { verse: 'Lazy hands make for poverty, but diligent hands bring wealth.', ref: 'Proverbs 10:4' },
                    { verse: 'Make every effort to keep the unity of the Spirit through the bond of peace.', ref: 'Ephesians 4:3' },
                    { verse: 'A sluggard\'s appetite is never filled, but the desires of the diligent are fully satisfied.', ref: 'Proverbs 13:4' },
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
              Knowing someone&apos;s temperament is like having a cheat sheet! Use these actions and words to build up the Phlegmatic in your life.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-900 border border-green-600/30 rounded-lg">
                <h3 className="text-xl font-bold text-green-400 mb-6">Build Them Up By...</h3>
                <ul className="space-y-3">
                  {[
                    'Letting them do one task at a time: "If you could just do ___, that would be great."',
                    'Being kind in your criticism: "Can I reflect something back to you?"',
                    'Asking their thoughts, opinions, and feelings: "What sounds good to you?"',
                    'Showing curiosity about their interests: "Tell me more about that."',
                    'Encouraging their involvement: "We\'d love to have you join us!"',
                    'Listening completely, without interrupting',
                    'Giving them time to process: "Think about it. We can talk more later."',
                    'Handling conflict calmly and quietly: "Is now an okay time to talk?"',
                  ].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-green-400 mt-1">&#9654;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-gray-900 border border-red-900/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-6">Caution! You May Tear Them Down By...</h3>
                <ul className="space-y-3">
                  {[
                    'Expecting things done in your time frame, not theirs',
                    'Pushing their involvement: "You\'re going. I already signed you up."',
                    'Not listening when they speak up',
                    'Mistaking their quiet for apathy: "Well, clearly this isn\'t important to you."',
                    'Speaking down to them: "Do I have to do everything around here?"',
                    'Stressing them with expectations and orders',
                    'Not verbalizing their value – assuming they know how you feel',
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
                { name: 'Melancholic', color: '#3B82F6', emoji: '📚' },
              ].map((temp) => (
                <Link
                  key={temp.name}
                  href={`/temperament/${temp.name.toLowerCase()}`}
                  className="group p-8 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-4">{temp.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
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
