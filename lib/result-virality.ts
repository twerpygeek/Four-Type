import type { Blend } from './blends'

type Primary = Blend['primary']

const oneSentenceByPrimary: Record<Primary, string> = {
  Red: 'You calm down by taking control, moving the situation forward, and making the next decision obvious.',
  Yellow: 'You come alive when there is energy in the room, people to connect with, and something worth getting excited about.',
  Blue: 'You notice the hidden flaw, the deeper meaning, and the standard everyone else is quietly stepping over.',
  Green: 'You keep the emotional temperature steady, often long before anyone else realizes the room needs calming.',
}

const misunderstoodByPrimary: Record<Primary, string> = {
  Red: 'People may call you controlling when you are often trying to stop drift, waste, or weak leadership from hurting everyone.',
  Yellow: 'People may call you unserious when you are often trying to keep hope, connection, and movement alive.',
  Blue: 'People may call you negative when you are often protecting what is true, careful, beautiful, or worth doing well.',
  Green: 'People may call you passive when you are often trying to protect trust, peace, and emotional safety.',
}

const challengeByPrimary: Record<Primary, string> = {
  Red: 'Ask one more question before giving the answer.',
  Yellow: 'Finish one small promise before chasing the next exciting thing.',
  Blue: 'Share the draft before it feels completely ready.',
  Green: 'State one real preference before anyone asks twice.',
}

const socialPromptByPrimary: Record<Primary, string[]> = {
  Red: [
    'Send this to the friend who always takes charge.',
    'Send this to someone who says "just decide" at least once a week.',
    'Send this to the person who gets calmer when there is a clear plan.',
  ],
  Yellow: [
    'Send this to the friend who can revive a dead room.',
    'Send this to someone who starts ten things because all ten sound fun.',
    'Send this to the person who turns errands into an event.',
  ],
  Blue: [
    'Send this to the friend who notices the detail everyone missed.',
    'Send this to someone who says "it depends" because it actually does.',
    'Send this to the person who feels things deeply but explains them carefully.',
  ],
  Green: [
    'Send this to the friend who says "I am fine" but absolutely has thoughts.',
    'Send this to someone who keeps everyone calm without getting credit for it.',
    'Send this to the person who avoids drama until silence becomes the drama.',
  ],
}

const ogHookByPrimary: Record<Primary, string> = {
  Red: 'I got the one who takes over under pressure',
  Yellow: 'I got the one who turns life into momentum',
  Blue: 'I got the one who notices what everyone missed',
  Green: 'I got the one who keeps the peace until it costs them',
}

const ogLineByPrimary: Record<Primary, string> = {
  Red: 'It caught my need for control, clarity, and forward motion.',
  Yellow: 'It caught my need for energy, connection, and a room that feels alive.',
  Blue: 'It caught my standards, overthinking, and quiet need for meaning.',
  Green: 'It caught my calm, avoidance, and the things I do not say out loud.',
}

export function getResultOneSentence(blend: Blend) {
  return oneSentenceByPrimary[blend.primary]
}

export function getMisunderstoodLine(blend: Blend) {
  return misunderstoodByPrimary[blend.primary]
}

export function getWeeklyChallenge(blend: Blend) {
  return challengeByPrimary[blend.primary]
}

export function getSharePrompts(blend: Blend) {
  return socialPromptByPrimary[blend.primary]
}

export function getOgHook(blend: Blend) {
  return ogHookByPrimary[blend.primary]
}

export function getOgLine(blend: Blend) {
  return ogLineByPrimary[blend.primary]
}

export function getProfileEmailPreview(blend: Blend) {
  return {
    oneSentence: getResultOneSentence(blend),
    misunderstood: getMisunderstoodLine(blend),
    challenge: getWeeklyChallenge(blend),
  }
}
