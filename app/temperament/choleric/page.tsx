'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RuneBackground from '@/components/RuneBackground';

export default function ChloricPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'traits' | 'strengths' | 'challenges'>(
    'traits'
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const traits = [
    'Natural leader',
    'Decisive and determined',
    'Goal-oriented',
    'Direct communicator',
    'Competitive',
    'Action-focused',
    'Confident',
    'Takes charge naturally',
  ];

  const strengths = [
    'Excellent leadership abilities',
    'Gets things done efficiently',
    'Natural problem-solver',
    'Motivates teams to achieve',
    'Strong willpower and focus',
    'Clear vision and direction',
    'Confident decision-maker',
    'Drives organizational success',
  ];

  const challenges = [
    'Can be overly aggressive',
    'May appear domineering',
    'Impatient with others',
    'Difficulty delegating',
    'Can seem cold or insensitive',
    'Burnout from overwork',
    'May dismiss others\' input',
    'Struggles with empathy',
  ];

  const careerFits = [
    'Executive Leadership',
    'Military/Law Enforcement',
    'Entrepreneurship',
    'Project Management',
    'Sales Management',
    'Strategic Planning',
    'Politics',
    'Emergency Services',
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
                  <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">
                    The Commander Archetype
                  </span>
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  The Choleric Temperament
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Powerful, decisive, and commanding, the Choleric personality is born to lead.
                  These natural authorities drive ambitious goals and inspire action in others
                  through their unwavering confidence and strategic vision.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/blog/choleric"
                    className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Read Deep Dive
                  </Link>
                  <Link
                    href="/manifesto"
                    className="px-8 py-3 border-2 border-red-600 text-red-500 font-bold rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Back to Manifesto
                  </Link>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-transparent rounded-lg blur-xl opacity-20 animate-pulse"></div>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png"
                    alt="The Commander - Choleric Temperament"
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
              src="/images/choleric-depth.jpg"
              alt="Choleric temperament representation"
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
                      ? 'text-red-500 border-b-2 border-red-500'
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
                  className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-red-500 transition-all duration-300 transform hover:scale-105 animate-fade-in"
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
                  className="p-6 bg-gray-900 border border-red-600/30 rounded-lg hover:border-red-600 transition-all duration-300 group cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-red-500 group-hover:translate-x-2 transition-transform duration-300">
                    {career}
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm">
                    Natural fit for Choleric temperaments seeking control and impact.
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
                'Putting others first and verbalizing your appreciation for them',
                'Greeting others with a sincere smile and giving them your full attention',
                'Waiting until you\'re asked before sharing your opinions',
                'Listening all the way to the end – trying to understand, not just formulating your response',
                'Making requests instead of issuing demands, saying please',
                'Pausing for a deep breath when you feel yourself getting angry and/or loud',
                'Connecting with people, not just completing projects',
                'Moderating your tone and volume',
                'Owning your mistakes and apologizing out loud',
                'Praying for others instead of trying to fix them or giving unsolicited advice',
                'Lightening up, cutting loose, stepping away from work and tasks',
                'Giving others complete ownership over the method and time frame of completing tasks',
              ].map((tip, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-red-600 transition-all duration-300"
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
                <h3 className="text-xl font-bold text-red-500 mb-6">Encouraging Verses</h3>
                <div className="space-y-4">
                  {[
                    { verse: 'Commit to the Lord whatever you do, and he will establish your plans.', ref: 'Proverbs 16:3' },
                    { verse: 'Those who know your name trust in you, for you, Lord, have never forsaken those who seek you.', ref: 'Psalms 9:10' },
                    { verse: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters, since you know that you will receive an inheritance from the Lord as a reward.', ref: 'Colossians 3:23-24' },
                    { verse: 'For you, [God], created my inmost being; you knit me together in my mother\'s womb. I praise you because I am fearfully and wonderfully made.', ref: 'Psalm 139:13-14' },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-900 border border-red-600/30 rounded-lg">
                      <p className="text-gray-300 text-sm italic mb-2">&ldquo;{item.verse}&rdquo;</p>
                      <p className="text-red-500 text-xs font-semibold">{item.ref}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-400 mb-6">Cautionary Verses</h3>
                <div className="space-y-4">
                  {[
                    { verse: 'Be completely humble and gentle; be patient, bearing with one another in love.', ref: 'Ephesians 4:2' },
                    { verse: 'When pride comes, then comes disgrace, but with humility comes wisdom.', ref: 'Proverbs 11:2' },
                    { verse: 'Those who trust in themselves are fools, but those who walk in wisdom are kept safe.', ref: 'Proverbs 28:26' },
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
              Knowing someone&apos;s temperament is like having a cheat sheet! Use these actions and words to build up the Choleric in your life.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-900 border border-red-600/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-500 mb-6">Build Them Up By...</h3>
                <ul className="space-y-3">
                  {[
                    'Giving them something to be in control of: "Will you be in charge of ___?"',
                    'Recognizing their work: "That must have taken you hours! Thank you!"',
                    'Encouraging their intellect: "You\'re great at solving this kind of problem."',
                    'Having their back: "I know you have a good reason for..."',
                    'Letting them decide: "Where should we eat? You pick."',
                    'Keeping communication short and to the point',
                    'Promoting their leadership: "Why don\'t you lead out on this?"',
                    'Speaking logically and realistically: "if..., then..."',
                  ].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-red-500 mt-1">&#9654;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-gray-900 border border-red-900/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-6">Caution! You May Tear Them Down By...</h3>
                <ul className="space-y-3">
                  {[
                    'Making decisions for them: "Here, this one\'s yours"',
                    'Not doing what you say you will do',
                    'Embarrassing them in front of others',
                    'Arguing with or lecturing them',
                    'Not asking for or respecting their opinions',
                    'Overlooking their work/assuming they\'ll do it',
                    'Not verbalizing your appreciation for them/their strengths',
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
                { name: 'Melancholic', color: '#3B82F6', emoji: '📚' },
                { name: 'Phlegmatic', color: '#22C55E', emoji: '🌿' },
              ].map((temp) => (
                <Link
                  key={temp.name}
                  href={`/temperament/${temp.name.toLowerCase()}`}
                  className="group p-8 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-4">{temp.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
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
