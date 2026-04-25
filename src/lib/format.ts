import type { Piece } from '../types'

export function formatPieceGridLabel(p: Piece) {
  if (p.isAnchor) return 'Aritzia trouser'
  const short: Record<string, string> = {
    blazer: 'Tailored blazer',
    shell: 'Silk shell',
    cashmere: 'Cashmere crew',
    loafer: 'Leather loafer',
    sneaker: 'White sneaker',
    boot: 'Leather boot',
    mule: 'Chain mule',
    oxford: 'Leather oxford',
    trench: 'Tan trench',
    jean: 'Dark wash jean',
    stripe: 'Stripe button-down',
    turtleneck: 'Knit turtleneck',
    tote: 'Structured tote',
    hoops: 'Gold hoops',
  }
  return short[p.key] ?? p.name
}

export function formatPieceGridPrice(p: Piece) {
  if (p.isAnchor) return '$50 used'
  return p.isResale ? `$${p.priceNow}` : `$${p.priceNow} new`
}

export function percentOff(p: Piece) {
  if (p.priceWas <= 0) return 0
  return Math.round(((p.priceWas - p.priceNow) / p.priceWas) * 100)
}

export function offLabel(p: Piece) {
  if (p.isResale && p.priceNow < p.priceWas) {
    const pct = percentOff(p)
    if (p.key === 'aritzia') return '66% less'
    return `${pct}% off`
  }
  return p.priceNow < p.priceWas ? `${percentOff(p)}% off` : ''
}

export function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}
