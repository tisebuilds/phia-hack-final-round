import { AnimatePresence, motion } from 'framer-motion'
import type { Piece } from '../types'
import { BackButton, CloseButton } from '../components/BackButton'
import { formatCurrency, percentOff } from '../lib/format'
import { pieceByKey } from '../data/capsule'
import { SCREEN_MS } from '../config/prototype'

type Props = {
  piece: Piece
  sourceCount: number
  onBack: () => void
  onClose: () => void
  onOpenRelated?: (p: Piece) => void
}

function parseConfidenceStat(stat: string, sourceCount: number) {
  const prefix = /^In (\d+)% of first-year consulting wardrobes/
  const match = stat.match(prefix)
  if (!match) return null
  const pct = match[1]
  let tail = stat.slice(match[0].length).trim()
  let valueProp: string | null = null
  if (/^[—–-]/.test(tail)) {
    valueProp = tail.replace(/^[—–-]\s*/, '').replace(/\.\s*$/, '').trim()
    tail = ''
  } else {
    tail = tail.replace(/^\.\s*/, '').trim()
  }

  let valueSentence: string | null = null
  if (valueProp) {
    const cap = valueProp.charAt(0).toUpperCase() + valueProp.slice(1)
    const lower = valueProp.toLowerCase()
    if (lower === 'your pick anchors the rest') {
      valueSentence = 'Your pick anchors the rest of the capsule.'
    } else if (/[.!?]$/.test(cap)) {
      valueSentence = cap
    } else {
      valueSentence = `${cap}.`
    }
  }

  const methodology = `From ${sourceCount.toLocaleString()} current consultants, updated weekly.`
  const bodyLine = valueSentence ? `${valueSentence} ${methodology}` : methodology

  return { percent: pct, bodyLine }
}

function formatSourceLine(piece: Piece) {
  const base = piece.retailer.replace(/\s*\(used\)\s*/i, '').trim()
  if (piece.isResale) return `${base} · pre-owned`
  return piece.retailer
}

export function PieceDetailsScreen({ piece, sourceCount, onBack, onClose, onOpenRelated }: Props) {
  const pct = percentOff(piece)
  const parsed = parseConfidenceStat(piece.confidenceStat, sourceCount)

  const companions = piece.complementaryKeys
    .map((k) => pieceByKey(k))
    .filter((p): p is Piece => !!p)
    .slice(0, 4)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={piece.key}
        className="relative flex h-full min-h-0 flex-col overflow-hidden px-4 pt-5 pb-5 font-['Inter',var(--font-sans)] text-[13px] sm:px-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: SCREEN_MS / 1000 }}
      >
        <div className="mb-4 flex flex-shrink-0 items-center justify-between">
          <BackButton onClick={onBack} />
          <div className="min-w-0 flex-1 px-2 text-center font-sans text-[13px] font-medium text-phia-text">
            <span className="block truncate">{piece.name}</span>
          </div>
          <CloseButton onClick={onClose} />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative mb-3 aspect-[3/2] w-full overflow-hidden rounded-xl">
            <div className={`absolute inset-0 ${piece.swatch}`} />
            {piece.imageSrc && (
              <img
                src={piece.imageSrc}
                alt={piece.name}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            )}

            <div className="absolute right-2 bottom-2 rounded-lg bg-black/60 px-2 py-1.5 text-right text-white backdrop-blur-sm">
              <div className="font-sans text-[14px] font-semibold leading-none">{formatCurrency(piece.priceNow)}</div>
              {piece.priceWas > piece.priceNow && (
                <div className="mt-1 font-sans text-[11px] leading-tight text-white/90">
                  <span className="line-through">{formatCurrency(piece.priceWas)}</span>
                  {pct > 0 && (
                    <>
                      <span className="text-white/70"> · </span>
                      <span className="font-semibold">{pct}% off</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-1 font-sans text-[13px] text-phia-muted">{formatSourceLine(piece)}</p>
            <div className="flex items-start justify-between gap-3">
              <h3 className="min-w-0 flex-1 font-serif text-[22px] font-medium leading-snug text-phia-text">
                {piece.name}
              </h3>
            </div>
          </div>

          <div className="mb-6 rounded-xl bg-phia-icon-bg px-3.5 py-3 font-sans">
            {parsed ? (
              <>
                <p className="mb-2 text-[13px] leading-snug text-phia-muted">
                  <span className="text-[22px] font-medium text-phia-text">{parsed.percent}%</span>
                  <span> of first-year consulting wardrobes</span>
                </p>
                <p className="text-[13px] leading-normal text-phia-text">{parsed.bodyLine}</p>
              </>
            ) : (
              <p className="text-[13px] leading-normal text-phia-text">
                {piece.confidenceStat}{' '}
                <span className="text-phia-muted">
                  From {sourceCount.toLocaleString()} current consultants, updated weekly.
                </span>
              </p>
            )}
          </div>

          {companions.length > 0 && (
            <div className="mb-6">
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <p className="font-sans text-sm font-medium text-phia-text">Pairs in the capsule</p>
                <p className="shrink-0 font-sans text-sm text-phia-muted">{companions.length} items</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {companions.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => onOpenRelated?.(c)}
                    className="flex cursor-pointer flex-col items-stretch overflow-hidden rounded-lg border border-phia-border bg-white text-left transition hover:border-phia-blue"
                  >
                    <div className="relative aspect-square w-full overflow-hidden">
                      <div className={`absolute inset-0 ${c.swatch}`} />
                      {c.imageSrc && (
                        <img
                          src={c.imageSrc}
                          alt={c.name}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>
                    <div className="px-2 py-2">
                      <div className="line-clamp-2 font-sans text-xs font-medium leading-tight text-phia-text">
                        {c.name}
                      </div>
                      <div className="mt-0.5 font-sans text-xs text-phia-muted">{formatCurrency(c.priceNow)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="flex w-full min-w-0 cursor-pointer items-center justify-center gap-1.5 py-3 font-sans text-[12px] font-semibold text-phia-text underline-offset-4 hover:underline"
            >
              Add to collection
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

