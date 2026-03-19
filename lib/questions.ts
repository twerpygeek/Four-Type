export type AnswerLetter = 'A' | 'B' | 'C' | 'D'

export interface AnswerOption {
  letter: AnswerLetter
  text: string
}

export interface Question {
  id: number
  section: 1 | 2 | 3 | 4
  sectionLabel: string
  instruction: string
  text?: string
  answers: AnswerOption[]
}

export const QUESTIONS: Question[] = [
  // SECTION 1: Questions 1–12 (Traits)
  {
    id: 1, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'Ready to jump into new tasks, energized by challenges' },
      { letter: 'B', text: 'Agreeable, easy to get along with' },
      { letter: 'C', text: 'Sensitive to the emotion of others' },
      { letter: 'D', text: 'Excitable, passionate, quick to say yes' },
    ],
  },
  {
    id: 2, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'Motivated to achieve goals, eager to be the leader' },
      { letter: 'B', text: 'Energetic, lively, exhibits love and affection openly' },
      { letter: 'C', text: 'Logical, gather facts and data, likes lists' },
      { letter: 'D', text: 'Flexible, able to adjust to new conditions, calm in the midst of chaos' },
    ],
  },
  {
    id: 3, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'Avoid conflict and drama, levelheaded' },
      { letter: 'B', text: 'Fun to be around, a good storyteller with a sense of humor' },
      { letter: 'C', text: 'Self-motivated, usually right' },
      { letter: 'D', text: "Careful, thoughtful, doesn't rush into things" },
    ],
  },
  {
    id: 4, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'Upbeat, always sees the best in people and situations' },
      { letter: 'B', text: 'Detail-oriented, orderly, tidy' },
      { letter: 'C', text: 'Confident and assertive with my opinion' },
      { letter: 'D', text: 'Cooperative, open to the needs and ideas of others' },
    ],
  },
  {
    id: 5, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'A determined problem solver, finds a way to get it done' },
      { letter: 'B', text: 'Playful, spontaneous, lives in the moment' },
      { letter: 'C', text: 'Considerate, kind, polite' },
      { letter: 'D', text: 'Serious, avoids being impulsive or flashy' },
    ],
  },
  {
    id: 6, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'Friendly, outgoing, talkative' },
      { letter: 'B', text: 'Efficient and effective with my time and effort' },
      { letter: 'C', text: 'Relaxed, hard to provoke or annoy' },
      { letter: 'D', text: 'Precise, thorough, has very high standards' },
    ],
  },
  {
    id: 7, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'Not confident in social situations' },
      { letter: 'B', text: 'Can be quick-tempered' },
      { letter: 'C', text: 'Struggles to make decisions quickly' },
      { letter: 'D', text: 'Can dominate conversations' },
    ],
  },
  {
    id: 8, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'Unafraid to disagree with others, bossy' },
      { letter: 'B', text: 'Uncomfortable with solitude, afraid of missing out' },
      { letter: 'C', text: 'Rarely sets goals for myself, unclear on purpose or direction' },
      { letter: 'D', text: 'Sometimes feels isolated, too introspective' },
    ],
  },
  {
    id: 9, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'Can be overbearing, prefers to be in control' },
      { letter: 'B', text: 'Unsure of myself, reluctant to jump into conversations or activities' },
      { letter: 'C', text: 'Seeks diversions from tasks, can waste time or daydream' },
      { letter: 'D', text: 'Prone to feeling sad or gloomy, gets hung up on bad news' },
    ],
  },
  {
    id: 10, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'Persuades others to do things my way, thinks the end justifies the means' },
      { letter: 'B', text: 'Often exaggerates stories, compulsive talker' },
      { letter: 'C', text: 'Uses sarcasm or the silent treatment when upset' },
      { letter: 'D', text: 'Struggles to express enthusiasm' },
    ],
  },
  {
    id: 11, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'No sense of urgency, resents being pushed' },
      { letter: 'B', text: 'Skeptical, sees obstacles, thinks about the worst-case scenario' },
      { letter: 'C', text: 'Fickle, forgetful, makes excuses, repeats stories' },
      { letter: 'D', text: "Reluctant to admit mistakes or say I'm sorry, rarely compliments others" },
    ],
  },
  {
    id: 12, section: 1, sectionLabel: 'Traits',
    instruction: 'Choose the ONE description you most naturally identify with.',
    text: 'Ask yourself: Am I someone who is...',
    answers: [
      { letter: 'A', text: 'Struggles with follow-through, especially when things stop being fun' },
      { letter: 'B', text: 'Slow to get moving, a procrastinator' },
      { letter: 'C', text: 'Dislikes tears and emotions in others, can be unsympathetic' },
      { letter: 'D', text: 'Hard to please, can be critical' },
    ],
  },
  // SECTION 2: Questions 13–19 (Statements)
  {
    id: 13, section: 2, sectionLabel: 'Statements',
    instruction: 'Choose the ONE statement that best represents you.',
    answers: [
      { letter: 'A', text: 'I like to talk through my decisions out loud with others.' },
      { letter: 'B', text: 'I am decisive and my decisions are usually right.' },
      { letter: 'C', text: 'I want all the information before I make a decision.' },
      { letter: 'D', text: 'I sometimes just want someone else to make the decision for me.' },
    ],
  },
  {
    id: 14, section: 2, sectionLabel: 'Statements',
    instruction: 'Choose the ONE statement that best represents you.',
    answers: [
      { letter: 'A', text: 'I like knowing a little about a lot of things and a lot about the things that really interest me.' },
      { letter: 'B', text: 'I like to stick to my schedule.' },
      { letter: 'C', text: 'I like accomplishing things and feeling productive.' },
      { letter: 'D', text: 'I like coming up with creative ideas people will enjoy.' },
    ],
  },
  {
    id: 15, section: 2, sectionLabel: 'Statements',
    instruction: 'Choose the ONE statement that best represents you.',
    answers: [
      { letter: 'A', text: 'I tend to notice imperfections and mistakes.' },
      { letter: 'B', text: "I tend to forget or disregard things I'm not interested in." },
      { letter: 'C', text: 'I tend to not even think of bad or sad things.' },
      { letter: 'D', text: 'I tend to not show my emotions.' },
    ],
  },
  {
    id: 16, section: 2, sectionLabel: 'Statements',
    instruction: 'Choose the ONE statement that best represents you.',
    answers: [
      { letter: 'A', text: 'I frequently tell stories about my personal experiences.' },
      { letter: 'B', text: 'I consider every thought and detail before communicating.' },
      { letter: 'C', text: "I cut to the chase in conversations; I don't need every last detail." },
      { letter: 'D', text: "I hesitate to speak up and advocate for myself when I disagree with the group." },
    ],
  },
  {
    id: 17, section: 2, sectionLabel: 'Statements',
    instruction: 'Choose the ONE statement that best represents you.',
    answers: [
      { letter: 'A', text: 'I want the freedom to do projects in my own time frame.' },
      { letter: 'B', text: "I want time to process my thoughts and answers so I know they're correct." },
      { letter: 'C', text: "I want to know the why behind a project so I know it's worth my time." },
      { letter: 'D', text: 'I want variety and spontaneity with projects.' },
    ],
  },
  {
    id: 18, section: 2, sectionLabel: 'Statements',
    instruction: 'Choose the ONE statement that best represents you.',
    answers: [
      { letter: 'A', text: "I'm good at delegating to others." },
      { letter: 'B', text: "I'm good at teaching others." },
      { letter: 'C', text: "I'm good at inspiring others." },
      { letter: 'D', text: "I'm good at caring for others." },
    ],
  },
  {
    id: 19, section: 2, sectionLabel: 'Statements',
    instruction: 'Choose the ONE statement that best represents you.',
    answers: [
      { letter: 'A', text: "I get stressed when I feel like I'm not liked." },
      { letter: 'B', text: "I get stressed when I feel like I'm not understood." },
      { letter: 'C', text: "I get stressed when I feel like I'm not in control." },
      { letter: 'D', text: "I get stressed when I feel like I'm being pulled into conflict." },
    ],
  },
  // SECTION 3: Questions 20–24 (Phrases)
  {
    id: 20, section: 3, sectionLabel: 'Phrases',
    instruction: 'Choose the ONE phrase you are most likely to say in your head or out loud.',
    answers: [
      { letter: 'A', text: "Who else is going to be there?" },
      { letter: 'B', text: "What will we be doing?" },
      { letter: 'C', text: "Do I have to go?" },
      { letter: 'D', text: "You go. I have better things to do." },
    ],
  },
  {
    id: 21, section: 3, sectionLabel: 'Phrases',
    instruction: 'Choose the ONE phrase you are most likely to say in your head or out loud.',
    answers: [
      { letter: 'A', text: "Are you sure that's safe?" },
      { letter: 'B', text: "Hurry up! We're late." },
      { letter: 'C', text: "That sounds like fun!" },
      { letter: 'D', text: "I'm good with whatever." },
    ],
  },
  {
    id: 22, section: 3, sectionLabel: 'Phrases',
    instruction: 'Choose the ONE phrase you are most likely to say in your head or out loud.',
    answers: [
      { letter: 'A', text: "It's done. I took care of it." },
      { letter: 'B', text: "I'll do it, if someone will do it with me." },
      { letter: 'C', text: "I've been giving it some thought." },
      { letter: 'D', text: "No worries, it will all work out." },
    ],
  },
  {
    id: 23, section: 3, sectionLabel: 'Phrases',
    instruction: 'Choose the ONE phrase you are most likely to say in your head or out loud.',
    answers: [
      { letter: 'A', text: "No, thanks. I'll just watch." },
      { letter: 'B', text: "I didn't mean it that way." },
      { letter: 'C', text: "I'd be happy to help!" },
      { letter: 'D', text: "I'm not sure I trust them." },
    ],
  },
  {
    id: 24, section: 3, sectionLabel: 'Phrases',
    instruction: 'Choose the ONE phrase you are most likely to say in your head or out loud.',
    answers: [
      { letter: 'A', text: "I totally forgot about that. I'm sorry." },
      { letter: 'B', text: "I don't really care. You decide." },
      { letter: 'C', text: "That won't work. I've already planned to..." },
      { letter: 'D', text: "Just give me the bottom line." },
    ],
  },
  // SECTION 4: Questions 25–40 (Single Words/Phrases)
  {
    id: 25, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Easygoing' },
      { letter: 'B', text: 'Ambitious' },
      { letter: 'C', text: 'Energetic' },
      { letter: 'D', text: 'Analytical' },
    ],
  },
  {
    id: 26, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Enthusiastic' },
      { letter: 'B', text: 'Fearless' },
      { letter: 'C', text: 'Agreeable' },
      { letter: 'D', text: 'Empathetic' },
    ],
  },
  {
    id: 27, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Cautious' },
      { letter: 'B', text: 'Capable' },
      { letter: 'C', text: 'Calm' },
      { letter: 'D', text: 'Charming' },
    ],
  },
  {
    id: 28, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Positive' },
      { letter: 'B', text: 'Organized' },
      { letter: 'C', text: 'Assertive' },
      { letter: 'D', text: 'Content' },
    ],
  },
  {
    id: 29, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Resourceful' },
      { letter: 'B', text: 'Considerate' },
      { letter: 'C', text: 'Lighthearted' },
      { letter: 'D', text: 'Reserved' },
    ],
  },
  {
    id: 30, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Productive' },
      { letter: 'B', text: 'Patient' },
      { letter: 'C', text: 'Detail-oriented' },
      { letter: 'D', text: 'People-oriented' },
    ],
  },
  {
    id: 31, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Pessimistic' },
      { letter: 'B', text: 'Bossy' },
      { letter: 'C', text: 'Indifferent' },
      { letter: 'D', text: 'Distractible' },
    ],
  },
  {
    id: 32, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Demanding' },
      { letter: 'B', text: 'Detached' },
      { letter: 'C', text: 'Naive' },
      { letter: 'D', text: 'Moody' },
    ],
  },
  {
    id: 33, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Self-centered' },
      { letter: 'B', text: 'Sluggish' },
      { letter: 'C', text: 'Scatterbrained' },
      { letter: 'D', text: 'Suspicious' },
    ],
  },
  {
    id: 34, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Undisciplined' },
      { letter: 'B', text: 'Unmotivated' },
      { letter: 'C', text: 'Unsympathetic' },
      { letter: 'D', text: 'Unforgiving' },
    ],
  },
  {
    id: 35, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Indecisive' },
      { letter: 'B', text: 'Dramatic' },
      { letter: 'C', text: 'Impatient' },
      { letter: 'D', text: 'Insecure' },
    ],
  },
  {
    id: 36, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Blunt' },
      { letter: 'B', text: 'Judgmental' },
      { letter: 'C', text: 'Apathetic' },
      { letter: 'D', text: 'Restless' },
    ],
  },
  {
    id: 37, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Driven' },
      { letter: 'B', text: 'Imaginative' },
      { letter: 'C', text: 'Compassionate' },
      { letter: 'D', text: 'Even-keeled' },
    ],
  },
  {
    id: 38, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Well-balanced' },
      { letter: 'B', text: 'Enjoys working hard' },
      { letter: 'C', text: 'Musical or artistic' },
      { letter: 'D', text: 'Turns crisis into comedy' },
    ],
  },
  {
    id: 39, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Methodical' },
      { letter: 'B', text: 'Loud laugh' },
      { letter: 'C', text: 'Quiet but witty' },
      { letter: 'D', text: 'Brave' },
    ],
  },
  {
    id: 40, section: 4, sectionLabel: 'Words',
    instruction: 'Choose the ONE word or phrase that best describes you.',
    answers: [
      { letter: 'A', text: 'Patient leader' },
      { letter: 'B', text: 'Curious' },
      { letter: 'C', text: 'Delegates well' },
      { letter: 'D', text: 'Deep and thoughtful' },
    ],
  },
]
