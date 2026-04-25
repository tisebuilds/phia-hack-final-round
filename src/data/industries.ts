import { consultingCapsule } from './capsule'
import type { Industry } from '../types'

export const industries: Industry[] = [
  {
    key: 'banking',
    label: 'Banking & finance',
    dressCodeSummary: 'Sharp formal — suiting, structured shoes, conservative palette.',
    dressCodeSourceCount: 1842,
    capsule: consultingCapsule,
  },
  {
    key: 'consulting',
    label: 'Consulting',
    dressCodeSummary: 'Polished business casual — blazers, loafers, quiet luxury.',
    dressCodeSourceCount: 2140,
    capsule: consultingCapsule,
  },
  {
    key: 'law',
    label: 'Law',
    dressCodeSummary: 'Classic professional — tailored suiting, dress shoes, traditional polish.',
    dressCodeSourceCount: 1620,
    capsule: consultingCapsule,
  },
  {
    key: 'healthcare',
    label: 'Healthcare',
    dressCodeSummary: 'Practical & professional — easy-care layers, comfortable footwear, minimal jewelry.',
    dressCodeSourceCount: 2280,
    capsule: consultingCapsule,
  },
  {
    key: 'tech',
    label: 'Tech',
    dressCodeSummary: 'Neutral comfort — clean basics, sneakers, low-key knits.',
    dressCodeSourceCount: 3104,
    capsule: consultingCapsule,
  },
  {
    key: 'marketing',
    label: 'Marketing & PR',
    dressCodeSummary: 'Client-facing polish — statement pieces, versatile event-ready looks.',
    dressCodeSourceCount: 1410,
    capsule: consultingCapsule,
  },
  {
    key: 'media',
    label: 'Media & journalism',
    dressCodeSummary: 'Field-to-desk ready — smart casual, mobile shoes, modern basics.',
    dressCodeSourceCount: 1120,
    capsule: consultingCapsule,
  },
  {
    key: 'nonprofit',
    label: 'Nonprofit & government',
    dressCodeSummary: 'Public-sector appropriate — classic separates, approachable, understated formality.',
    dressCodeSourceCount: 980,
    capsule: consultingCapsule,
  },
  {
    key: 'education',
    label: 'Education',
    dressCodeSummary: 'Classroom ready — comfortable layers, durable shoes, warm polish.',
    dressCodeSourceCount: 1350,
    capsule: consultingCapsule,
  },
  {
    key: 'creative',
    label: 'Startups & creative',
    dressCodeSummary: 'Considered casual — denim, sneakers, expressive layers.',
    dressCodeSourceCount: 967,
    capsule: consultingCapsule,
  },
]

export function getIndustry(key: string) {
  return industries.find((i) => i.key === key) ?? industries[0]
}
