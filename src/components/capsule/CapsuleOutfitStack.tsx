import { motion } from 'framer-motion'
import { ArrowLeftRight } from 'lucide-react'
import { formatCurrency } from '../../lib/format'
import type { DemoSlotPiece } from '../../data/capsuleOutfitDemo'

const swapIconClass =
  'z-[2] -my-0.5 inline-flex h-5 shrink-0 items-center justify-center self-baseline rounded p-0.5 text-phia-muted transition-colors group-hover:text-phia-text'

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
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <p className="m-0 min-w-0 break-words [overflow-wrap:anywhere] text-[12px] font-medium leading-tight tracking-tight text-phia-text sm:text-[13px]">
        {piece.name}
      </p>
      <p className="min-w-0 text-[12px] font-medium leading-snug text-phia-muted sm:text-[13px]">
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
  slideIndex: number
  slideCount: number
  onPrev: () => void
  onNext: () => void
}

const tapTransition = { type: 'tween' as const, duration: 0.12, ease: [0.2, 0, 0.2, 1] as const }

function SwappableColumn({
  piece,
  slideIndex,
  slideCount,
  onPrev: _onPrev,
  onNext,
}: SwappableProps) {
  return (
    <motion.button
      type="button"
      onClick={onNext}
      className="group relative w-full min-w-0 cursor-pointer overflow-hidden rounded-xl border border-phia-border bg-phia-card p-0 text-left shadow-[0_2px_6px_rgba(0,0,0,0.06)] outline-offset-2 outline-[#1f3aff] focus-visible:outline focus-visible:outline-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
      whileTap={{ scale: 0.99, transition: tapTransition }}
      aria-label={`Swap option. Now showing: ${piece.name}.`}
    >
      <div className="flex min-w-0 items-stretch gap-3 px-3 py-3.5 sm:gap-3.5 sm:px-4 sm:py-4">
        <div className="relative h-[72px] w-[72px] shrink-0 self-center overflow-hidden rounded-xl bg-phia-icon-bg sm:h-20 sm:w-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <SlotImage src={piece.imageSrc} alt="" />
          </div>
          <CarouselDots activeIndex={slideIndex} total={slideCount} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <p className="m-0 flex min-w-0 items-start gap-1.5 text-[12px] font-medium leading-tight tracking-tight text-phia-text sm:text-[13px]">
            <span className="min-w-0 w-max max-w-[calc(100%-1.5rem)] [overflow-wrap:anywhere] break-words">
              {piece.name}
            </span>
            <span className={swapIconClass} aria-hidden>
              <ArrowLeftRight className="size-3" strokeWidth={2} />
            </span>
          </p>
          <p className="min-w-0 text-[12px] font-medium leading-snug text-phia-muted sm:text-[13px]">
            {formatCurrency(piece.price)}
          </p>
        </div>
      </div>
    </motion.button>
  )
}

type AnchorProps = { piece: DemoSlotPiece; contentKey: string }

function AnchorColumn({ piece, contentKey }: AnchorProps) {
  return (
    <motion.div
      key={contentKey}
      className="w-full min-w-0 overflow-hidden rounded-xl border border-phia-border bg-phia-card shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
      initial={false}
    >
      <div className="flex min-w-0 items-stretch gap-3 px-3 py-3.5 sm:gap-3.5 sm:px-4 sm:py-4">
        <div className="relative h-[72px] w-[72px] shrink-0 self-center overflow-hidden rounded-xl bg-phia-icon-bg sm:h-20 sm:w-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <SlotImage src={piece.imageSrc} alt={piece.name} />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <span className="self-start rounded bg-phia-blue px-1 py-0.5 text-[7px] font-semibold uppercase tracking-wide text-white">
            Your pick
          </span>
          {pieceCaptionRow(piece)}
        </div>
      </div>
    </motion.div>
  )
}

type Props = {
  top: DemoSlotPiece
  anchor: DemoSlotPiece
  shoe: DemoSlotPiece
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
        slideIndex={topSlideIndex}
        slideCount={topSlideCount}
        onPrev={onTopPrev}
        onNext={onTopNext}
      />
      <AnchorColumn piece={anchor} contentKey="anchor" />
      <SwappableColumn
        piece={shoe}
        slideIndex={shoeSlideIndex}
        slideCount={shoeSlideCount}
        onPrev={onShoePrev}
        onNext={onShoeNext}
      />
    </div>
  )
}
