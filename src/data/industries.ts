import { consultingCapsule } from './capsule'
import type { Industry } from '../types'

export const industries: Industry[] = [
  {
    key: 'consulting',
    label: 'Consulting',
    dressCodeSummary: 'Polished business casual — blazers, loafers, quiet luxury.',
    dressCodeSourceCount: 2140,
    capsule: consultingCapsule,
  },
  {
    key: 'banking',
    label: 'Banking & finance',
    dressCodeSummary: 'Sharp formal — suiting, structured shoes, conservative palette.',
    dressCodeSourceCount: 1842,
    capsule: consultingCapsule,
  },
  {
    key: 'creative',
    label: 'Startups & creative',
    dressCodeSummary: 'Considered casual — denim, sneakers, expressive layers.',
    dressCodeSourceCount: 967,
    capsule: consultingCapsule,
  },
  {
    key: 'tech',
    label: 'Tech',
    dressCodeSummary: 'Neutral comfort — clean basics, sneakers, low-key knits.',
    dressCodeSourceCount: 3104,
    capsule: consultingCapsule,
  },
]

export function getIndustry(key: string) {
  return industries.find((i) => i.key === key) ?? industries[0]
}
