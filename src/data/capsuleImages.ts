import type { Piece } from '../types'

/** Public folder is `Phia clothing` (space + casing); encode for reliable fetches. */
export const CAPSULE_IMAGE_PUBLIC_BASE = '/Phia%20clothing'

/**
 * Footwear under `public/Phia clothing/{stem}.jpg`.
 * Stems match your assets: 3× shoes-*, 2× boots-* (oxford reuses the slouch boot shot until a dress-shoe asset exists).
 */
export const CAPSULE_FOOTWEAR_STEMS = {
  loafer: 'shoes-loafer-horsebit-tan-suede',
  sneaker: 'shoes-pump-beige-stiletto',
  boot: 'boots-ankle-suede-brown-kitten',
  mule: 'shoes-mule-sarto-beige',
  oxford: 'boots-slouch-black-knee-white-skirt',
} as const

export type CapsuleFootwearKey = keyof typeof CAPSULE_FOOTWEAR_STEMS

export function capsuleFootwearStem(key: string): string | undefined {
  if (Object.prototype.hasOwnProperty.call(CAPSULE_FOOTWEAR_STEMS, key)) {
    return CAPSULE_FOOTWEAR_STEMS[key as CapsuleFootwearKey]
  }
  return undefined
}

function footwearFilename(key: CapsuleFootwearKey): string {
  return `${CAPSULE_FOOTWEAR_STEMS[key]}.jpg`
}

/**
 * Maps each capsule piece key to a filename under `public/Phia clothing/`.
 * Pools: bottom, top, outerwear, shoes-*, boots-*, bag-*. Hoops still uses a top (no jewelry assets).
 */
const CAPSULE_IMAGE_FILES: Record<Piece['key'], string> = {
  /** Overridden in capsulePieceImageSrc — same studio shot as extension screen 0. */
  aritzia: 'bottom-phia-01.jpg',
  jean: 'bottom-phia-02.jpg',
  blazer: 'top-phia-01.jpg',
  shell: 'top-phia-02.jpg',
  cashmere: 'top-phia-03.jpg',
  stripe: 'top-phia-04.jpg',
  turtleneck: 'top-phia-05.jpg',
  trench: 'outerwear-phia-01.jpg',
  loafer: footwearFilename('loafer'),
  sneaker: footwearFilename('sneaker'),
  boot: footwearFilename('boot'),
  mule: footwearFilename('mule'),
  oxford: footwearFilename('oxford'),
  tote: 'bag-tote-cognac-pebble-leather.jpg',
  hoops: 'top-phia-22.jpg',
}

/** Single Aritzia Effortless Pant studio asset (ghost mannequin) — extension + capsule anchor. */
export const ARITZIA_PANTS_PRODUCT_SRC = '/aritzia-pants-product.png'

export function capsulePieceImageSrc(key: Piece['key']): string {
  if (key === 'aritzia') return ARITZIA_PANTS_PRODUCT_SRC
  return `${CAPSULE_IMAGE_PUBLIC_BASE}/${CAPSULE_IMAGE_FILES[key]}`
}

export function capsulePublicImageUrl(filename: string): string {
  return `${CAPSULE_IMAGE_PUBLIC_BASE}/${filename}`
}
