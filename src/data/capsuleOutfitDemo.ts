/**
 * Small demo catalog for the capsule outfit stack (3–4 options per swappable slot).
 * Anchor trouser is fixed; top + shoes cycle.
 * Images reuse `public` capsule assets.
 */

import { capsulePieceImageSrc, capsulePublicImageUrl } from './capsuleImages'

export type DemoSlotPiece = {
  id: string
  name: string
  price: number
  isResale: boolean
  /** e.g. "Poshmark", "Nordstrom" — shown for resale as "used (source)" */
  source: string
  imageSrc: string
}

export const ANCHOR_TROUSER: DemoSlotPiece = {
  id: 'trouser',
  name: 'Aritzia Effortless Pant',
  price: 50,
  isResale: true,
  source: 'Poshmark',
  imageSrc: capsulePieceImageSrc('aritzia'),
}

export const DEMO_TOPS: DemoSlotPiece[] = [
  {
    id: 'blazer',
    name: 'Theory tailored blazer',
    price: 48,
    isResale: true,
    source: 'Poshmark',
    imageSrc: capsulePublicImageUrl('top-phia-01.jpg'),
  },
  {
    id: 'silkCami',
    name: 'Vince silk cami',
    price: 44,
    isResale: true,
    source: 'Poshmark',
    imageSrc: capsulePublicImageUrl('top-phia-02.jpg'),
  },
  {
    id: 'cashmere',
    name: 'Naadam crewneck',
    price: 58,
    isResale: true,
    source: 'The RealReal',
    imageSrc: capsulePublicImageUrl('top-phia-03.jpg'),
  },
  {
    id: 'top11',
    name: 'Wardrobe top (11)',
    price: 58,
    isResale: true,
    source: 'The RealReal',
    imageSrc: capsulePublicImageUrl('top-phia-11.jpg'),
  },
  {
    id: 'top12',
    name: 'Wardrobe top (12)',
    price: 58,
    isResale: true,
    source: 'The RealReal',
    imageSrc: capsulePublicImageUrl('top-phia-12.jpg'),
  },
]

export const DEMO_SHOES: DemoSlotPiece[] = [
  {
    id: 'pump',
    name: 'Sam Edelman Loraine',
    price: 65,
    isResale: false,
    source: 'Nordstrom',
    imageSrc: capsulePieceImageSrc('loafer'),
  },
  {
    id: 'sneaker',
    name: 'Veja V-10',
    price: 40,
    isResale: false,
    source: 'Veja',
    imageSrc: capsulePieceImageSrc('sneaker'),
  },
  {
    id: 'loafer',
    name: 'G.H. Bass Weejun',
    price: 55,
    isResale: true,
    source: 'Poshmark',
    imageSrc: capsulePieceImageSrc('mule'),
  },
  {
    id: 'boot',
    name: 'Vagabond Marja',
    price: 68,
    isResale: true,
    source: 'Poshmark',
    imageSrc: capsulePieceImageSrc('boot'),
  },
]
