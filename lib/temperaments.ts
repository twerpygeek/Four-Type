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
    characterImage: '/images/characters/bard.png',
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
    characterImage: '/images/characters/commander.png',
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
    characterImage: '/images/characters/strategist.png',
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
    characterImage: '/images/characters/guardian.png',
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
  },
}
