/** Mood cards for pick-2 style selection (aligns with PRD Screen 2). */

export type StyleKey = 'polished' | 'soft' | 'sharp' | 'easy'

const abbrev: Record<StyleKey, string> = {
  easy: 'EE',
  polished: 'PC',
  sharp: 'SM',
  soft: 'ST',
}

export type StyleMood = {
  key: StyleKey
  label: string
  /** Full-bleed card background */
  gradient: string
  /** Class for bottom label: light swatches need dark text */
  labelTone: 'light' | 'dark'
}

export const styleMoods: StyleMood[] = [
  {
    key: 'polished',
    label: 'Polished classic',
    gradient: 'linear-gradient(160deg, #2C3144 0%, #4A5066 50%, #1A1F30 100%)',
    labelTone: 'light',
  },
  {
    key: 'soft',
    label: 'Soft tailored',
    gradient: 'linear-gradient(160deg, #C4A789 0%, #E8D7C0 50%, #8B6F52 100%)',
    labelTone: 'dark',
  },
  {
    key: 'sharp',
    label: 'Sharp minimal',
    gradient: 'linear-gradient(160deg, #1A1A1A 0%, #3A3A3A 50%, #0A0A0A 100%)',
    labelTone: 'light',
  },
  {
    key: 'easy',
    label: 'Easy elevated',
    gradient: 'linear-gradient(160deg, #E8E1D2 0%, #F5F0E2 50%, #C4B89E 100%)',
    labelTone: 'dark',
  },
]

export function getStyleMood(key: StyleKey): StyleMood {
  return styleMoods.find((s) => s.key === key) ?? styleMoods[0]
}

/**
 * Deterministic code from the two selected moods (keys sorted for stable output).
 * Example: polished + easy → PHIA-EE+PC
 */
export function styleCodeFromSelection(keys: readonly [StyleKey, StyleKey]): string {
  const [a, b] = [...keys].sort() as [StyleKey, StyleKey]
  return `PHIA-${abbrev[a]}+${abbrev[b]}`
}
