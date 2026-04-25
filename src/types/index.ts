export type Piece = {
  key: string
  name: string
  category: 'top' | 'bottom' | 'shoe' | 'outerwear' | 'accessory'
  retailer: string
  priceNow: number
  priceWas: number
  isResale: boolean
  isAnchor?: boolean
  swatch: string
  /** Optional product image URL (bundled asset or remote). */
  imageSrc?: string
  confidenceStat: string
  pairsWith: string
  /** 3–4 other capsule keys that pair with this piece (confidence sheet). */
  complementaryKeys: string[]
}

export type Industry = {
  key: string
  label: string
  dressCodeSummary: string
  dressCodeSourceCount: number
  capsule: Piece[]
}

/** Extension (0) → Setup (1) → Capsule (2) */
export type ScreenIndex = 0 | 1 | 2

export type CapsuleView = 'pieces' | 'outfits'

export type PieceMap = Record<string, Piece>
