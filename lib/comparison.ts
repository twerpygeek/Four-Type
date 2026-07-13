import type { Blend } from './blends'

type Primary = Blend['primary']

const protectionByPrimary: Record<Primary, string> = {
  Red: 'progress, control, and clear decisions',
  Yellow: 'connection, energy, and shared momentum',
  Blue: 'meaning, accuracy, and quality',
  Green: 'peace, trust, and emotional steadiness',
}

const practiceByPrimary: Record<Primary, string> = {
  Red: 'Ask before taking over.',
  Yellow: 'Stay present after the exciting beginning.',
  Blue: 'Say the concern without turning it into a verdict.',
  Green: 'State the real preference before it turns into quiet resentment.',
}

const sharedQualityByPair: Record<string, string> = {
  'Blue:Blue': 'You both protect meaning, accuracy, and work that meets a thoughtful standard.',
  'Blue:Green': 'You both value trust, careful attention, and relationships that feel emotionally safe.',
  'Blue:Red': 'You both care about standards and are willing to take responsibility when something matters.',
  'Blue:Yellow': 'You both notice emotional meaning: one gives it depth while the other gives it expression.',
  'Green:Green': 'You both protect peace, trust, and the steady rhythms that help people feel secure.',
  'Green:Red': 'You can create dependable direction by combining decisive movement with emotional steadiness.',
  'Green:Yellow': 'You both help people feel welcome, one through calm acceptance and the other through visible warmth.',
  'Red:Red': 'You both protect progress, direction, and the need for clear decisions when others hesitate.',
  'Red:Yellow': 'You both bring outward energy and the courage to move people toward something new.',
  'Yellow:Yellow': 'You both protect connection, optimism, and the energy that keeps an experience alive.',
}

const complementByPair: Record<string, string> = {
  'Blue:Blue': 'Your shared depth can produce exceptional care and insight when one of you helps the other stop refining and act.',
  'Blue:Green': 'Depth gives the pair discernment; steadiness gives that discernment enough safety and time to be heard.',
  'Blue:Red': 'Standards and action can reinforce each other: one sees what must be right while the other makes sure it moves.',
  'Blue:Yellow': 'Expression can bring hidden insight into the room, while depth keeps enthusiasm connected to meaning.',
  'Green:Green': 'You can create unusual patience and loyalty, especially when one person volunteers the first honest preference.',
  'Green:Red': 'Direction prevents drift while steadiness prevents urgency from becoming unnecessary damage.',
  'Green:Yellow': 'Warmth opens the conversation and calm helps the relationship remain safe after the excitement passes.',
  'Red:Red': 'Shared drive can create rapid progress when leadership is divided clearly instead of silently contested.',
  'Red:Yellow': 'Drive supplies direction and enthusiasm supplies social momentum, making ideas easier to start and share.',
  'Yellow:Yellow': 'Shared enthusiasm creates quick rapport, while mutual encouragement can help one person finish what both started.',
}

const frictionByPair: Record<string, string> = {
  'Blue:Blue': 'Both people may wait for certainty, amplify concerns, or quietly compare standards instead of naming what is good enough.',
  'Blue:Green': 'Careful analysis and conflict avoidance can combine into long silence when a direct conversation is needed.',
  'Blue:Red': 'Urgency may feel careless to one person, while requests for more context may feel like resistance to the other.',
  'Blue:Yellow': 'One person may experience spontaneity as shallow, while the other experiences careful processing as emotional distance.',
  'Green:Green': 'Harmony can become avoidance when both people hope the other will name the problem or choose the direction.',
  'Green:Red': 'Direct pressure may create withdrawal, and withdrawal may make the pressure become even more direct.',
  'Green:Yellow': 'Lightness can cover a real issue while accommodation lets both people postpone the uncomfortable decision.',
  'Red:Red': 'Two strong instincts for control can turn a practical disagreement into a contest over who gets the final word.',
  'Red:Yellow': 'Speed and excitement can generate promises faster than either person checks capacity, details, or follow-through.',
  'Yellow:Yellow': 'Both people may chase the next source of energy and leave routine responsibilities without a clear owner.',
}

const challengeByPair: Record<string, string> = {
  'Blue:Blue': 'Choose one decision this week where both of you agree that clear and complete is better than perfect.',
  'Blue:Green': 'Name one concern and one preference each before discussing how to keep the peace.',
  'Blue:Red': 'Let one person define the quality standard and the other define the next concrete action.',
  'Blue:Yellow': 'Trade roles once: lead with the feeling, then add the detail that makes it useful.',
  'Green:Green': 'Each person states one real preference before agreeing to the shared plan.',
  'Green:Red': 'Use a two-step repair: ask what is needed, then decide the next action together.',
  'Green:Yellow': 'Finish one small promise together before starting the next enjoyable idea.',
  'Red:Red': 'Divide ownership before the next decision so neither person has to win control in the moment.',
  'Red:Yellow': 'Before saying yes, agree on who owns the final ten percent of the work.',
  'Yellow:Yellow': 'Pick one shared idea and celebrate only after both of you complete it.',
}

function getPairKey(a: Primary, b: Primary) {
  return [a, b].sort().join(':')
}

export type PairInsight = {
  headline: string
  sharedQuality: string
  complement: string
  friction: string
  selfAdvice: string
  friendAdvice: string
  challenge: string
  chemistry: string
  repair: string
}

export function getComparisonInsight(self: Blend, friend: Blend): PairInsight {
  const key = getPairKey(self.primary, friend.primary)
  const samePrimary = self.primary === friend.primary

  const complement = complementByPair[key]
  const selfAdvice = practiceByPrimary[self.primary]
  const friendAdvice = practiceByPrimary[friend.primary]

  return {
    headline: samePrimary
      ? `You quickly recognize the instinct to protect ${protectionByPrimary[self.primary]}.`
      : 'Your different instincts can become a useful partnership when both are named clearly.',
    sharedQuality: sharedQualityByPair[key],
    complement,
    friction: frictionByPair[key],
    selfAdvice,
    friendAdvice,
    challenge: challengeByPair[key],
    chemistry: complement,
    repair: `Your move: ${selfAdvice} Their move: ${friendAdvice}`,
  }
}
