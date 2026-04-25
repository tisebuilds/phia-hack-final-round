import { motion } from 'framer-motion'
import { ArrowLeftRight } from 'lucide-react'
import { formatCurrency } from '../../lib/format'
import type { DemoSlotPiece } from '../../data/capsuleOutfitDemo'

const swapNavOverlayBtn =
  'absolute top-1/2 z-[2] flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#e5e7eb] text-[#111827] opacity-100 shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-colors duration-150 hover:bg-[#d1d5db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1f3aff]'

function SlotImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover object-center"
      loading="lazy"
      decoding="async"
    />
  )
}

function pieceCaptionRow(piece: DemoSlotPiece) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3">
      <p className="min-w-0 truncate text-[12px] font-medium leading-tight tracking-tight text-phia-text">
        {piece.name}
      </p>
      <p className="shrink-0 text-[12px] font-medium leading-snug text-phia-muted">
        {formatCurrency(piece.price)}
      </p>
    </div>
  )
}

function CarouselDots({ activeIndex, total }: { activeIndex: number; total: number }) {
  if (total <= 1) return null
  return (
    <div
      className="pointer-events-none absolute bottom-1 left-1/2 z-[1] flex -translate-x-1/2 gap-1"
      aria-hidden
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1 w-1 rounded-full ${
            i === activeIndex ? 'bg-[#0f0f0f]' : 'bg-white/80 shadow-[0_0_0_1px_rgba(0,0,0,0.12)]'
          }`}
        />
      ))}
    </div>
  )
}

type SwappableProps = {
  piece: DemoSlotPiece
  contentKey: string
  slideIndex: number
  slideCount: number
  onPrev: () => void
  onNext: () => void
}

function SwappableColumn({
  piece,
  contentKey,
  slideIndex,
  slideCount,
  onPrev,
  onNext,
}: SwappableProps) {
  return (
    <motion.div
      key={contentKey}
      className="group relative w-full min-w-0 overflow-hidden rounded-xl border border-phia-border bg-phia-card shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: [1, 1.03, 1] }}
      transition={{
        opacity: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
        scale: { duration: 0.45, ease: [0.32, 0.72, 0, 1], times: [0, 0.35, 1] },
      }}
    >
      <div className="flex min-w-0 items-center gap-3 px-3 py-2.5 pr-10 sm:px-3.5 sm:py-3 sm:pr-11">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-phia-icon-bg sm:h-14 sm:w-14">
          <div className="absolute inset-0 flex items-center justify-center">
            <SlotImage src={piece.imageSrc} alt={piece.name} />
          </div>
          <CarouselDots activeIndex={slideIndex} total={slideCount} />
          <button
            type="button"
            onClick={onPrev}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          >
            Previous option
          </button>
        </div>
        {pieceCaptionRow(piece)}
      </div>
      <button
        type="button"
        onClick={onNext}
        className={`${swapNavOverlayBtn} right-2`}
        aria-label="Next option"
      >
        <ArrowLeftRight className="size-3" strokeWidth={2} aria-hidden />
      </button>
    </motion.div>
  )
}

type AnchorProps = { piece: DemoSlotPiece; contentKey: string }

function AnchorColumn({ piece, contentKey }: AnchorProps) {
  return (
    <motion.div
      key={contentKey}
      className="relative w-full min-w-0 overflow-hidden rounded-xl border border-phia-border bg-phia-card shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
      initial={false}
    >
      <div className="flex min-w-0 items-center gap-3 px-3 py-2.5 sm:px-3.5 sm:py-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-phia-icon-bg sm:h-14 sm:w-14">
          <div className="absolute inset-0 flex items-center justify-center">
            <SlotImage src={piece.imageSrc} alt={piece.name} />
          </div>
        </div>
        {pieceCaptionRow(piece)}
      </div>
    </motion.div>
  )
}

type Props = {
  top: DemoSlotPiece
  anchor: DemoSlotPiece
  shoe: DemoSlotPiece
  topKey: string
  shoeKey: string
  topSlideIndex: number
  topSlideCount: number
  shoeSlideIndex: number
  shoeSlideCount: number
  onTopPrev: () => void
  onTopNext: () => void
  onShoePrev: () => void
  onShoeNext: () => void
}

export function CapsuleOutfitStack({
  top,
  anchor,
  shoe,
  topKey,
  shoeKey,
  topSlideIndex,
  topSlideCount,
  shoeSlideIndex,
  shoeSlideCount,
  onTopPrev,
  onTopNext,
  onShoePrev,
  onShoeNext,
}: Props) {
  return (
    <div
      className="flex flex-col gap-1 rounded-xl bg-phia-app p-1.5 sm:gap-1.5 sm:p-2"
    >
      <SwappableColumn
        piece={top}
        contentKey={topKey}
        slideIndex={topSlideIndex}
        slideCount={topSlideCount}
        onPrev={onTopPrev}
        onNext={onTopNext}
      />
      <AnchorColumn piece={anchor} contentKey="anchor" />
      <SwappableColumn
        piece={shoe}
        contentKey={shoeKey}
        slideIndex={shoeSlideIndex}
        slideCount={shoeSlideCount}
        onPrev={onShoePrev}
        onNext={onShoeNext}
      />
    </div>
  )
}
