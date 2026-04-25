import { motion } from 'framer-motion'
import { OUTFIT_FLIP_MS, EASE_PHIA } from '../config/prototype'

type Props = {
  label: 'Top' | 'Bottom' | 'Shoes'
  name: string
  priceLine: string
  swatchClass: string
  imageSrc?: string
  showAnchorBadge: boolean
  flipKey: string | number
  onPrev: () => void
  onNext: () => void
  /** Footwear row: `shoes-*` / `boots-*` stems for DOM + testing (matches `public/Phia clothing` filenames without `.jpg`). */
  footwearAsset?: { current: string; all: string }
}

export function OutfitRow({
  label,
  name,
  priceLine,
  swatchClass,
  imageSrc,
  showAnchorBadge,
  flipKey,
  onPrev,
  onNext,
  footwearAsset,
}: Props) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-xl border border-phia-border bg-white py-2.5 pr-3 pl-3"
      {...(footwearAsset
        ? {
            'data-phia-footwear': footwearAsset.current,
            'data-phia-footwear-options': footwearAsset.all,
          }
        : {})}
    >
      <div
        className="relative h-20 w-[60px] flex-shrink-0 overflow-hidden rounded-lg"
        style={{ perspective: 600 }}
      >
        <motion.div
          key={flipKey}
          initial={{ rotateX: 75, opacity: 0.2 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: OUTFIT_FLIP_MS / 1000, ease: EASE_PHIA }}
          className="h-full w-full [transform-style:preserve-3d]"
        >
          <div className="relative h-full w-full overflow-hidden">
            <div className={`absolute inset-0 ${swatchClass}`} />
            {imageSrc && (
              <img
                src={imageSrc}
                alt={name}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
          {showAnchorBadge && (
            <span className="absolute top-1 left-1 rounded bg-phia-blue px-1 py-0.5 font-sans text-[7px] font-semibold uppercase tracking-wide text-white">
              Your pick
            </span>
          )}
        </motion.div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-phia-muted">
          {label}
        </div>
        <div className="mb-0.5 font-serif text-sm font-medium leading-tight">{name}</div>
        <div className="text-[11px] text-phia-muted">{priceLine}</div>
      </div>
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={onPrev}
          className="flex h-[22px] w-7 cursor-pointer items-center justify-center rounded-md border border-phia-border bg-phia-card-soft font-sans text-[11px] text-phia-text transition hover:border-phia-blue hover:bg-phia-blue hover:text-white"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex h-[22px] w-7 cursor-pointer items-center justify-center rounded-md border border-phia-border bg-phia-card-soft font-sans text-[11px] text-phia-text transition hover:border-phia-blue hover:bg-phia-blue hover:text-white"
        >
          ▶
        </button>
      </div>
    </div>
  )
}
