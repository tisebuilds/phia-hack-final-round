/**
 * Deterministic “Phia” answers for PDP occasion chips (ExtensionScreen).
 * Edit this table to change outcomes — no API.
 *
 * Demo anchor: tailored Aritzia Effortless trouser.
 */

export const OCCASION_LABELS = [
  'Work',
  'Concert',
  'School',
  'Halloween',
  'Holiday party',
] as const

export type OccasionLabel = (typeof OCCASION_LABELS)[number]

export type OccasionVerdict = {
  appropriate: boolean
  message: string
}

const VERDICTS: Record<OccasionLabel, OccasionVerdict> = {
  Work: {
    appropriate: true,
    message:
      'Yes — this trouser reads polished and desk-to-meeting ready. Pair with a shell or blazer from your capsule for a clean work line.',
  },
  Concert: {
    appropriate: true,
    message:
      'Yes for most venues — black tailored trousers dress up or down. If it’s standing-room only, swap to sneakers and a relaxed top.',
  },
  School: {
    appropriate: true,
    message:
      'Yes — tailored but not fussy. It works for campus days and presentations alike; keep the rest casual.',
  },
  Halloween: {
    appropriate: false,
    message:
      'For a costume-forward night, this trouser is probably not the hero piece — save it for the week after when you’re back to real outfits.',
  },
  'Holiday party': {
    appropriate: true,
    message:
      'Yes — easy to elevate with a silk top or heels. Phia’s capsule already builds holiday-ready pairings around this trouser.',
  },
}

export function verdictForOccasion(label: OccasionLabel): OccasionVerdict {
  return VERDICTS[label]
}

/** Short pill for “Right for the occasion?” row on PDP. */
export function occasionFitPill(label: OccasionLabel): { text: 'Yes' | 'No'; positive: boolean } {
  const { appropriate } = verdictForOccasion(label)
  return appropriate ? { text: 'Yes', positive: true } : { text: 'No', positive: false }
}

/** Expandable “Fabric quality?” copy — future PDP row (demo: Effortless trouser). */
export const FABRIC_QUALITY_DETAILS =
  'This piece uses Aritzia’s crepe-blend weave: smooth hand-feel and holds its line through a workday. Phia flags it as average for resale only because we can’t verify wear in photos — in person it’s typically very good for the category.'

/** Expandable “Easy to care for?” copy — future PDP row. */
export const EASY_CARE_DETAILS =
  'Machine-wash cold on gentle, lay flat or hang to dry — no dry-clean required for everyday wear. If you’re hard on trousers (frequent travel, long commutes), expect a little more pressing than a knit would need.'
