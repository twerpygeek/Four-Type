import { TemperamentKey } from './scoringKey'

export interface Temperament {
  key: TemperamentKey
  name: string
  title: string
  rpgClass: string
  language: string
  archetype: string
  color: string
  colorHex: string
  glowClass: string
  borderClass: string
  bgClass: string
  textClass: string
  characterImage: string
  characterOffset: string
  lore: string
  coreNeed: string
  strengths: string[]
  weaknesses: string[]
  communication: string[]
  speakTheir: string
  underStress: string
  bestPartners: string
  frictionWith: string
  famous: string[]
  emoji: string
  // Extended analysis content
  deeperAnalysis: string
  behavioralTraits: string[]
  inRelationships: string
  atWork: string
  growthAreas: string[]
}

export const TEMPERAMENTS: Record<TemperamentKey, Temperament> = {
  Yellow: {
    key: 'Yellow',
    name: 'Sanguine',
    title: 'The Bard',
    rpgClass: 'The Bard / The Rogue',
    language: 'People & Fun',
    archetype: 'Extrovert × People-Oriented',
    color: 'Yellow',
    colorHex: '#FFD700',
    glowClass: 'shadow-[0_0_30px_rgba(255,215,0,0.5)]',
    borderClass: 'border-[#FFD700]',
    bgClass: 'bg-[#FFD700]',
    textClass: 'text-[#FFD700]',
    characterImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-euLHMUxeRi6LvSmqlycXvdRStXiMmI.png',
    characterOffset: '',
    lore: "You are the spark in every room — the one who makes strangers feel like old friends in minutes. The world is your stage and you play it well. You live in the moment, love deeply, and laugh loudly. Your greatest gift is the ability to see the best in people and make them feel seen.",
    coreNeed: 'To be liked. Approval is oxygen.',
    strengths: [
      'Magnetic and charismatic — people are drawn to you',
      'Gifted storyteller; makes even mundane moments memorable',
      'Optimistic to the bone; you see the upside when others cannot',
      'Energizes rooms and rallies people naturally',
      'Spontaneous and creative — thrives on the new',
      'Inspires others just by being present',
    ],
    weaknesses: [
      'Follow-through is your Achilles heel — fun fades, discipline does not come easy',
      'Forgets commitments; lives in the story, not the calendar',
      'Talks more than listens — craves the spotlight',
      'Exaggerates for effect; sometimes the story beats the truth',
      'Fear of missing out can override logic',
      'Avoids deep introspection — "boredom" is threatening',
    ],
    communication: [
      'High-energy, expressive, and emotionally charged',
      'Loves storytelling and personal anecdotes',
      'Responds to warmth, humor, and enthusiasm',
      'Shuts down in cold, data-heavy, or overly formal environments',
    ],
    speakTheir: 'Be fun. Be personal. Celebrate them publicly.',
    underStress: 'Becomes louder, more dramatic, seeks distraction, or suddenly "ghosts" responsibilities and drowns in social activity.',
    bestPartners: 'Phlegmatic (grounding), Choleric (direction)',
    frictionWith: 'Melancholic (too critical), other Sanguines (chaos squared)',
    famous: ['Robin Williams', 'Ellen DeGeneres', 'Will Smith'],
    emoji: 'H',
    deeperAnalysis: "The Sanguine temperament is fundamentally impulsive and pleasure-seeking. You are expressive in personality, desiring influence and being enthusiastic with people. You express thoughts with excitement and naturally become the center of attention. You are sociable and charismatic, warm-hearted, pleasant, lively, optimistic, creative, and compassionate. You easily attract others and make friends, inspiring them to work and join in the fun.",
    behavioralTraits: [
      'Self-composed, seldom shows signs of embarrassment, perhaps forward or bold',
      'Eager to express yourself before a group; likes to be heard',
      'Prefers group activities; not easily satisfied with individual projects',
      'Hearty and cordial, even to strangers; forms acquaintanceship easily',
      'Quick and decisive in movements; pronounced energy output',
      'Frank, talkative, sociable; expresses emotions readily',
      'Frequent fluctuations of mood; tends to elation and depression cycles',
    ],
    inRelationships: "Sanguine people make great parents because they love to have fun, though their homes are often frenzied and disorganized. In relationships, you bring energy, spontaneity, and joy. You thrive on compliments and don't hold grudges. However, you may struggle with deeper emotional intimacy because 'boredom' feels threatening. Your partner needs to understand your need for excitement while helping ground you.",
    atWork: "You excel in roles requiring high energy, social interaction, and creativity. You're great volunteers, inspiring team members, and natural entertainers. However, you struggle with completing tasks, are chronically late, and tend to forget obligations. You base decisions primarily on feelings rather than facts. Best suited for: sales, entertainment, hospitality, teaching, and creative fields.",
    growthAreas: [
      'Develop follow-through — practice completing tasks before starting new ones',
      'Listen more than you talk — others have valuable perspectives too',
      'Build routines — some structure prevents chaos and missed commitments',
      'Cultivate deeper relationships — go beyond surface-level connections',
      'Practice impulse control — not every exciting opportunity deserves a yes',
    ],
  },
  Red: {
    key: 'Red',
    name: 'Choleric',
    title: 'The Commander',
    rpgClass: 'The Warrior / The Paladin',
    language: 'Power & Control',
    archetype: 'Extrovert × Task-Oriented',
    color: 'Red',
    colorHex: '#E63946',
    glowClass: 'shadow-[0_0_30px_rgba(230,57,70,0.5)]',
    borderClass: 'border-[#E63946]',
    bgClass: 'bg-[#E63946]',
    textClass: 'text-[#E63946]',
    characterImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-vXB8vIN16kna1cGrklqseOHC3gASWk.png',
    characterOffset: '',
    lore: "You are built to lead. Where others see problems, you see the next move. You don't wait for permission — you take the hill and figure out the details later. Loyalty, results, and efficiency are your sacred code. You are the most likely person in any room to actually get it done.",
    coreNeed: 'Loyalty and results. Incompetence is a personal offense.',
    strengths: [
      'Natural-born leader — decisive, clear, and confident',
      'Gets things done when others are still deliberating',
      "Self-motivated; doesn't need external validation to perform",
      'Sees the big picture and cuts to the solution fast',
      'Thrives under pressure; performs best in crisis',
      'Sets high standards and pulls teams toward them',
    ],
    weaknesses: [
      'Quick-tempered; shoots first, apologizes never',
      'Controlling — "my way" becomes the only way',
      "Runs over people's feelings in the name of efficiency",
      'Rarely says sorry; sees it as weakness',
      'Bulldozes rather than persuades when impatient',
      'Struggles to celebrate others — focus stays on the mission',
    ],
    communication: [
      'Bottom-line first. No fluff. No small talk.',
      'Speaks in directives; asks questions with expected answers',
      'Respects confidence; dismisses hesitation',
    ],
    speakTheir: "Lead with results and logic. Be brief. Don't waste their time. Don't complain without a solution.",
    underStress: 'Becomes domineering, micromanages, explosive. May steamroll the team. Needs a win fast.',
    bestPartners: 'Melancholic (detail and precision), Phlegmatic (diplomacy)',
    frictionWith: 'Other Cholerics (power clashes), Sanguines (unfocused energy)',
    famous: ['Steve Jobs', 'Margaret Thatcher', 'Gordon Ramsay'],
    emoji: 'C',
    deeperAnalysis: "The Choleric temperament is fundamentally ambitious and leader-like. You are the strongest of the extroverted temperaments, sometimes referred to as a 'Type A' personality. You are a hard-driving individual known for accomplishing goals with aggressive energy and passion. You desire control and are best at jobs demanding strong authority and quick decisions. You are the most insensitive of temperaments — feelings simply don't factor into your equations.",
    behavioralTraits: [
      'Self-composed; seldom shows embarrassment, is forward or bold',
      'Eager to express yourself before a group when you have a purpose',
      'Insistent upon acceptance of your ideas; argumentative and persuasive',
      'Impetuous and impulsive; plunges into situations without forethought',
      'Self-confident and self-reliant; tends to take success for granted',
      'Strong initiative; seldom gloomy; prefers to lead',
      'Quick and decisive in movement; pronounced energy output',
      'Marked tendency to persevere regardless of success or failure',
    ],
    inRelationships: "Choleric individuals have the most trouble with anger, intolerance, and impatience in relationships. You want facts instead of emotions, and if your partner gets their feelings hurt, you see it as their problem. You don't have many friends (though you need them) and have a tendency toward sudden deep depression. In marriage, your 'my way' approach can be challenging for partners who need emotional validation.",
    atWork: "You are naturally gifted in business — strong-willed, independent, self-sufficient. You see the whole picture, organize well, insist on production, and thrive on opposition. You are goal-oriented with wonderful focus, good at math and engineering, analytical, logical, and pragmatic. You systematize everything and do not do well in subordinate positions. Best suited for: entrepreneurship, executive leadership, military, law, and project management.",
    growthAreas: [
      'Practice empathy — others\' feelings are valid even if inconvenient',
      'Learn to apologize — admitting wrong is strength, not weakness',
      'Delegate without micromanaging — trust your team\'s competence',
      'Celebrate others\' wins — the mission includes the people',
      'Develop patience — not everything needs to happen at your pace',
    ],
  },
  Blue: {
    key: 'Blue',
    name: 'Melancholic',
    title: 'The Strategist',
    rpgClass: 'The Wizard / The Scholar',
    language: 'Order & Perfection',
    archetype: 'Introvert × Task-Oriented',
    color: 'Blue',
    colorHex: '#4CC9F0',
    glowClass: 'shadow-[0_0_30px_rgba(76,201,240,0.5)]',
    borderClass: 'border-[#4CC9F0]',
    bgClass: 'bg-[#4CC9F0]',
    textClass: 'text-[#4CC9F0]',
    characterImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-41w0Pxn7bABu8gSFUNO21vLrx42NVP.png',
    characterOffset: '',
    lore: "You see what others miss. The flaw in the plan. The pattern in the chaos. The standard that has not been met. You carry the weight of excellence — and it is a gift. Your depth is your power. You think before you speak, feel before you act, and rarely get it wrong when you do.",
    coreNeed: 'To be understood. Quality is non-negotiable.',
    strengths: [
      'Deeply analytical — the best thinker in the room',
      "High standards drive quality that others can't match",
      'Organized, systematic, and methodical',
      'Emotionally deep; forms meaningful relationships',
      'Detail-oriented; nothing slips through',
      'Loyal and consistent — a trustworthy rock',
    ],
    weaknesses: [
      'Perfectionism leads to paralysis; done is better than perfect (but not to you)',
      'Pessimistic by default — first thought is what could go wrong',
      'Hard to please; criticism comes more naturally than praise',
      'Holds grudges; forgiveness is slow',
      'Prone to depression and emotional withdrawal',
      "Suspicious of others' motives; trust is expensive",
    ],
    communication: [
      'Precise, thoughtful, and information-dense',
      "Needs time to process before responding — doesn't shoot from the hip",
      "Fact-based; emotional appeals feel manipulative",
    ],
    speakTheir: "Show your work. Prove it with data. Honor their standards. Never rush them.",
    underStress: 'Withdraws, over-analyzes, spirals into worst-case scenarios. May become passive-aggressive or emotionally cold.',
    bestPartners: 'Choleric (action), Sanguine (lightness)',
    frictionWith: 'Phlegmatic (too passive), other Melancholics (mutual criticism spiral)',
    famous: ['Albert Einstein', 'Emily Dickinson', 'Bill Gates'],
    emoji: 'S',
    deeperAnalysis: "The Melancholic temperament is fundamentally introverted and thoughtful. Your analytical personality desires caution and restraint, excelling at attending to details and analyzing problems too difficult for others. You are a deep-thinker and feeler who often sees the negative attributes of life rather than the positive. You are self-reliant, independent, and get wholly involved in what you are doing. You can be highly creative in art, literature, music, healthcare, and ministry.",
    behavioralTraits: [
      'Self-conscious, easily embarrassed, timid, bashful',
      'Avoids talking before a group; finds it difficult when obliged',
      'Prefers to work and play alone; good in details, careful',
      'Deliberative; slow in making decisions, perhaps overcautious',
      'Lacking in self-confidence; compliant and yielding',
      'Reserved and distant except to intimate friends',
      'Tends to depression; easily moved to tears',
      'Worries frequently; suspicious of others\' motives',
    ],
    inRelationships: "Melancholics are deeply caring people who form meaningful, loyal relationships. There's an old saying: 'If you have a Melancholy for a friend, you have a friend for life.' However, you hold yourself in contempt while loving others deeply. You have low self-image, are inclined toward depression, and tend to worry much too often. Forgiveness comes slowly, and you may hold grudges. You need a partner who provides lightness while respecting your depth.",
    atWork: "You are highly organized, schedule-oriented, economical, tidy, and detail-conscious. You finish what you start, like charts, graphs, figures, and lists. You see problems and identify creative solutions with ease. Your high degree of perfectionism applies especially to your own performance. Best suited for: accounting, research, engineering, healthcare, art, music, writing, ministry, and quality control.",
    growthAreas: [
      'Embrace "good enough" — perfectionism creates paralysis',
      'Practice optimism — train yourself to see what could go right',
      'Offer praise freely — criticism should not be your default',
      'Release grudges — forgiveness frees you more than them',
      'Share your inner world — others want to know the real you',
    ],
  },
  Green: {
    key: 'Green',
    name: 'Phlegmatic',
    title: 'The Guardian',
    rpgClass: 'The Ranger / The Healer',
    language: 'Calm & Harmony',
    archetype: 'Introvert × People-Oriented',
    color: 'Green',
    colorHex: '#52B788',
    glowClass: 'shadow-[0_0_30px_rgba(82,183,136,0.5)]',
    borderClass: 'border-[#52B788]',
    bgClass: 'bg-[#52B788]',
    textClass: 'text-[#52B788]',
    characterImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-zhzjVLCvu9ZK1JKMFkSwdcY4YCabE5.png',
    characterOffset: '',
    lore: "You are the peace everyone else is searching for. When the room is on fire, you are the still water. You listen when no one else does. You hold space when others cannot. Your gift is harmony — you see all sides, honor all voices, and rarely take a step that was not worth taking.",
    coreNeed: 'Peace and respect. Conflict is physically painful.',
    strengths: [
      'The most reliable person in any group — calm under pressure',
      'Master listener; people feel heard around you',
      'Diplomatic and fair; great at mediating conflict',
      'Patient to a fault — long-game thinker',
      'Loyal and supportive; the backbone of any team',
      "Adaptable; doesn't need to control outcomes",
    ],
    weaknesses: [
      'Avoids conflict to the point of self-erasure',
      '"I\'ll get to it" becomes never',
      'Unmotivated without external push; low urgency',
      'Passive-aggressive when pushed too far',
      'Indecisive — choosing feels like losing',
      'Can blend into the background and disappear',
    ],
    communication: [
      'Gentle, indirect, and diplomatic',
      'Avoids confrontation; speaks in suggestions, not demands',
      'Needs safety to open up; shuts down when pressured',
    ],
    speakTheir: "Be kind. Be patient. Don't push. Create space for their answer. Never humiliate them publicly.",
    underStress: 'Shuts down completely. Goes silent. May agree outwardly while building resentment internally.',
    bestPartners: 'Choleric (direction), Sanguine (energy)',
    frictionWith: 'Choleric (too aggressive), other Phlegmatics (nothing gets done)',
    famous: ['Fred Rogers', 'Gandhi', 'Barack Obama'],
    emoji: 'G',
    deeperAnalysis: "The Phlegmatic temperament is fundamentally relaxed and quiet, ranging from warmly attentive to lazily sluggish. You are best in positions of unity and mediation, solid in positions that desire steadiness. You tend to be easygoing, content with yourself, calm, cool, and collected. You are tolerant of others, well-balanced, sympathetic, kind, and unassuming. You keep emotions hidden and are happily reconciled to life.",
    behavioralTraits: [
      'Deliberative; slow in making decisions, perhaps overcautious',
      'Indifferent to external affairs; reserved and distant',
      'Slow in movement; not easily disturbed',
      'Marked tendency to persevere once committed',
      'Exhibits constancy of mood; rarely fluctuates',
      'Wonderful at gathering facts, classifying them, seeing relationships',
      'Accepting, affectionate, frequently shy; prefers stability to change',
      'Interested in cooperation and interpersonal harmony',
    ],
    inRelationships: "Phlegmatic individuals want to know other people's deepest feelings and strive to build intimate attachments with everyone in their lives. You are interested in cooperation and interpersonal harmony, preserving family ties and friendships. You could be described as considerate, charitable, trusting, warm, calm, and consistent. However, you may agree outwardly while building resentment internally. Your partner needs patience and must create safe spaces for you to express your true feelings.",
    atWork: "You make good administrators due to your rational, curious, and observant nature. You're wonderful at seeing the bigger picture and reading between the lines. Because you're fearful and hesitant, you have a compromising nature that makes you excellent mediators. However, you resist change, stay uninvolved, and can dampen enthusiasm. Best suited for: counseling, HR, nursing, social work, teaching, customer service, and administrative roles.",
    growthAreas: [
      'Take initiative — waiting for external push limits your potential',
      'Voice your opinions — your perspective matters and deserves to be heard',
      'Embrace healthy conflict — some disagreements lead to growth',
      'Set and pursue personal goals — you deserve to want things',
      'Express emotions directly — passive-aggression damages relationships',
    ],
  },
}
