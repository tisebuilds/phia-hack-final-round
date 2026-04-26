import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  Bookmark,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Info,
  LayoutGrid,
  Leaf,
  SlidersHorizontal,
  User,
  X,
} from 'lucide-react'
import phiaWordmarkBlack from '../assets/phia-wordmark-black.svg'
import { pieceByKey } from '../data/capsule'
import { ARITZIA_PANTS_PRODUCT_SRC } from '../data/capsuleImages'
import {
  EASY_CARE_DETAILS,
  FABRIC_QUALITY_DETAILS,
  OCCASION_LABELS,
  occasionFitPill,
  verdictForOccasion,
  type OccasionLabel,
} from '../data/occasionVerdicts'

type Props = {
  onOccasionCapsuleCta: () => void
  /** Row-based occasion card (multi-criteria pills) — enabled after using the Future demo pill. */
  futureOccasionLayout?: boolean
}

const FILTER_CHIPS = ['Price', 'Brand', 'Color', 'Size', 'Condition'] as const

const DEMO_PRICE = 148
const RANGE_LO = 100
const RANGE_HI = 553

const VISUALLY_SIMILAR_ROWS = [
  {
    name: 'Aritzia The Effortless Pant Black…',
    market: 'Poshmark',
    size: 'Size 10',
    now: 120,
    less: 18,
  },
  {
    name: 'Aritzia “The Effortless Pant” Blac…',
    market: 'Poshmark',
    size: 'Size 12',
    now: 65,
    less: 56,
  },
  {
    name: 'Aritzia The Effortless Pant Black…',
    market: 'Poshmark',
    size: 'Size 8',
    now: 70,
    less: 52,
  },
  {
    name: 'Aritzia The Effortless Pants In Cr…',
    market: 'Poshmark',
    size: 'Size 00',
    now: 85,
    less: 42,
  },
  {
    name: "Aritzia Women's Pants - Black - 0",
    market: 'Depop',
    size: 'Size 0',
    now: 100,
    less: 32,
  },
  {
    name: "Aritzia Women's Pants - Black - 2",
    market: 'Depop',
    size: 'Size 2',
    now: 35,
    less: 76,
  },
  {
    name: 'Aritzia The Effortless Pant Black…',
    market: 'Poshmark',
    size: 'Size 4',
    now: 55,
    less: 62,
  },
  {
    name: 'Aritzia The Effortless Pant Black…',
    market: 'Poshmark',
    size: 'Size 0',
    now: 50,
    less: 66,
  },
] as const

const VISUALLY_SIMILAR_ITEMS = VISUALLY_SIMILAR_ROWS.map((row) => ({
  ...row,
  thumbSrc: ARITZIA_PANTS_PRODUCT_SRC,
}))

function PriceTypicalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="flex-shrink-0">
      <line
        x1="3"
        y1="13.5"
        x2="15"
        y2="13.5"
        stroke="var(--color-phia-muted-soft)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path d="M9 3.5 L12.5 10.5 H5.5 Z" fill="var(--color-phia-orange)" />
    </svg>
  )
}

const PRICE_CONFIDENCE_PANEL_ID = 'extension-price-confidence-panel'

function OccasionAnswerBody({ message, appropriate }: { message: string; appropriate: boolean }) {
  if (appropriate && message.startsWith('Yes')) {
    return (
      <p className="mb-0 font-sans text-[12px] leading-relaxed text-phia-text">
        <span className="font-medium text-phia-success">Yes</span>
        {message.slice(3)}
      </p>
    )
  }
  return <p className="mb-0 font-sans text-[12px] leading-relaxed text-phia-text">{message}</p>
}

function OccasionAnswerBlock({
  occasion,
  onOccasionCapsuleCta,
}: {
  occasion: OccasionLabel
  onOccasionCapsuleCta: () => void
}) {
  const verdict = verdictForOccasion(occasion)
  return (
    <motion.div
      key={occasion}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
      className="mt-0"
    >
      <OccasionAnswerBody message={verdict.message} appropriate={verdict.appropriate} />
      {verdict.appropriate ? (
        <button
          type="button"
          onClick={onOccasionCapsuleCta}
          className="mt-3 flex cursor-pointer items-center gap-0.5 font-sans text-[13px] text-phia-muted transition-colors hover:text-phia-text"
        >
          See outfits
          <ChevronRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
        </button>
      ) : null}
    </motion.div>
  )
}

const occasionPillClass = (positive: boolean) =>
  [
    'shrink-0 rounded-full px-2.5 py-1 font-sans text-[11px] font-semibold leading-none tracking-[-0.01em]',
    positive
      ? 'bg-[#e3f2e6] text-phia-success'
      : 'bg-[#f3ece2] text-[#5c442e]',
  ].join(' ')

function OccasionStatusPill({ positive, children }: { positive: boolean; children: ReactNode }) {
  return <span className={occasionPillClass(positive)}>{children}</span>
}

const criterionQuestionButtonClass =
  'min-w-0 flex-1 cursor-pointer rounded-md text-left font-sans text-[13px] font-medium leading-snug text-phia-text underline-offset-2 transition-colors hover:text-phia-blue hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-phia-blue/35 focus-visible:ring-offset-0'

const criterionPillButtonClass =
  'cursor-pointer transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-phia-blue/35 focus-visible:ring-offset-0'

/** Expanded copy: soft panel + primary text; section border sits on the wrapper below (not under header). */
const expandableDetailBodyClass =
  'rounded-lg bg-phia-card-soft px-3 py-2.5 font-sans text-[12px] leading-relaxed text-phia-text'

function ExpandableCriterionRow({
  label,
  details,
  pillText,
  pillPositive,
  open,
  onToggle,
  rowDivider,
  ariaNoteTopic,
}: {
  label: string
  details: string
  pillText: string
  pillPositive: boolean
  open: boolean
  onToggle: () => void
  rowDivider: string
  /** Short phrase for aria-label, e.g. “fabric quality”. */
  ariaNoteTopic: string
}) {
  return (
    <>
      <div className={`flex items-center justify-between gap-3 px-3.5 py-2.5 ${open ? '' : rowDivider}`}>
        <button type="button" onClick={onToggle} aria-expanded={open} className={criterionQuestionButtonClass}>
          {label}
        </button>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={open ? `Hide Phia’s ${ariaNoteTopic} note` : `Show Phia’s ${ariaNoteTopic} note`}
          className={[occasionPillClass(pillPositive), criterionPillButtonClass].join(' ')}
        >
          {pillText}
        </button>
      </div>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
          className={`px-3.5 pb-2.5 pt-2 ${rowDivider}`}
        >
          <p className={expandableDetailBodyClass}>{details}</p>
        </motion.div>
      ) : null}
    </>
  )
}

const occasionSelectClass =
  'h-8 w-full min-w-0 cursor-pointer appearance-none rounded-md border border-phia-border bg-white py-0 pl-2.5 pr-8 font-sans text-[12px] font-medium text-phia-text transition-colors hover:border-phia-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-phia-blue/30 focus-visible:ring-offset-0'

function OccasionSelect({
  value,
  onChange,
  ariaLabel,
}: {
  value: OccasionLabel
  onChange: (next: OccasionLabel) => void
  ariaLabel: string
}) {
  return (
    <div className="relative min-w-0 flex-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as OccasionLabel)}
        aria-label={ariaLabel}
        className={occasionSelectClass}
      >
        {OCCASION_LABELS.map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-phia-muted"
        strokeWidth={2}
        aria-hidden
      />
    </div>
  )
}

function OccasionFitCard({
  occasion,
  onOccasionChange,
  onOccasionCapsuleCta,
}: {
  occasion: OccasionLabel
  onOccasionChange: (next: OccasionLabel) => void
  onOccasionCapsuleCta: () => void
}) {
  const [occasionDetailsOpen, setOccasionDetailsOpen] = useState(false)
  const [fabricDetailsOpen, setFabricDetailsOpen] = useState(false)
  const [careDetailsOpen, setCareDetailsOpen] = useState(false)
  const { appropriate, message } = verdictForOccasion(occasion)
  const fit = occasionFitPill(occasion)
  const rowDivider = 'border-b border-phia-border-subtle'
  const toggleOccasionDetails = () => setOccasionDetailsOpen((o) => !o)

  return (
    <motion.div
      key={occasion}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
      className="flex flex-col"
    >
      <div
        className={`flex items-center gap-2.5 px-3.5 py-2.5 ${occasionDetailsOpen ? '' : rowDivider}`}
      >
        <button
          type="button"
          onClick={toggleOccasionDetails}
          aria-expanded={occasionDetailsOpen}
          className="shrink-0 cursor-pointer rounded-md text-left font-sans text-[13px] font-medium leading-snug text-phia-text underline-offset-2 transition-colors hover:text-phia-blue hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-phia-blue/35 focus-visible:ring-offset-0"
        >
          Right for the occasion?
        </button>
        <OccasionSelect value={occasion} onChange={onOccasionChange} ariaLabel="Occasion" />
        <button
          type="button"
          onClick={toggleOccasionDetails}
          aria-expanded={occasionDetailsOpen}
          aria-label={occasionDetailsOpen ? 'Hide Phia’s occasion note' : 'Show Phia’s occasion note'}
          className={[
            occasionPillClass(fit.positive),
            'cursor-pointer transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-phia-blue/35 focus-visible:ring-offset-0',
          ].join(' ')}
        >
          {fit.text}
        </button>
      </div>

      {occasionDetailsOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
          className={`px-3.5 pb-2.5 pt-2 ${rowDivider}`}
        >
          <p className={expandableDetailBodyClass}>{message}</p>
        </motion.div>
      ) : null}

      <ExpandableCriterionRow
        label="Fabric quality"
        details={FABRIC_QUALITY_DETAILS}
        pillText="Average"
        pillPositive={false}
        open={fabricDetailsOpen}
        onToggle={() => setFabricDetailsOpen((o) => !o)}
        rowDivider={rowDivider}
        ariaNoteTopic="fabric quality"
      />

      <ExpandableCriterionRow
        label="Easy to care for"
        details={EASY_CARE_DETAILS}
        pillText="Maybe"
        pillPositive={false}
        open={careDetailsOpen}
        onToggle={() => setCareDetailsOpen((o) => !o)}
        rowDivider={rowDivider}
        ariaNoteTopic="care instructions"
      />

      <div className={`flex items-center justify-between gap-3 px-3.5 py-2.5 ${rowDivider}`}>
        <span className="font-sans text-[13px] font-medium leading-snug text-phia-text">Right for your climate</span>
        <OccasionStatusPill positive>Yes</OccasionStatusPill>
      </div>

      {appropriate ? (
        <div className="px-3.5 py-2.5">
          <button
            type="button"
            onClick={onOccasionCapsuleCta}
            className="flex cursor-pointer items-center gap-0.5 font-sans text-[13px] font-medium text-phia-text transition-colors hover:text-phia-blue"
          >
            See outfits
            <ChevronRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
          </button>
        </div>
      ) : null}
    </motion.div>
  )
}

export function ExtensionScreen({ onOccasionCapsuleCta, futureOccasionLayout = false }: Props) {
  const [priceConfidenceOpen, setPriceConfidenceOpen] = useState(false)
  const [selectedContext, setSelectedContext] = useState<OccasionLabel>('Work')
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const topCardRef = useRef<HTMLDivElement | null>(null)
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const aritziaThumb = pieceByKey('aritzia')?.imageSrc

  useEffect(() => {
    const root = scrollRef.current
    const target = topCardRef.current
    if (!root || !target) return

    const io = new IntersectionObserver(
      ([entry]) => {
        // Show only once the object card is fully out of view.
        setShowStickyHeader(!entry.isIntersecting)
      },
      { root, threshold: 0 }
    )

    io.observe(target)
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div
        className={[
          'pointer-events-none absolute inset-x-0 top-0 bg-phia-canvas px-3.5 py-3 transition-opacity duration-150',
          // Higher z-index when active so the other bar (same DOM order, pointer-events-auto children)
          // does not sit on top and steal clicks while opacity-0.
          showStickyHeader ? 'z-30 opacity-100' : 'z-10 opacity-0',
        ].join(' ')}
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Scroll to top"
            className="pointer-events-auto flex h-[33px] w-[33px] items-center justify-center rounded-full bg-black/[0.04] text-phia-muted transition hover:bg-black/[0.06]"
            onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp className="h-4 w-4" strokeWidth={2} />
          </button>

          <div className="flex min-w-0 items-center gap-2">
            <div className="h-[26px] w-[26px] flex-shrink-0 overflow-hidden rounded-full bg-phia-card-soft">
              {aritziaThumb ? (
                <img src={aritziaThumb} alt="" className="h-full w-full object-cover" draggable={false} />
              ) : (
                <div className="h-full w-full s-aritzia" />
              )}
            </div>
            <div className="min-w-0 truncate font-sans text-[15px] font-semibold tracking-[-0.01em] text-phia-text">
              Aritzia <span className="text-phia-muted">·</span> ${DEMO_PRICE}
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            className="pointer-events-auto flex h-[33px] w-[33px] items-center justify-center rounded-full bg-black/[0.04] text-phia-muted transition hover:bg-black/[0.06]"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div
        className={[
          'pointer-events-none absolute inset-x-0 top-0 bg-phia-canvas px-3.5 py-3 transition-opacity duration-150',
          showStickyHeader ? 'z-10 opacity-0' : 'z-30 opacity-100',
        ].join(' ')}
      >
        <div className="flex items-center justify-between">
          <img
            src={phiaWordmarkBlack}
            alt="Phia"
            className="pointer-events-auto h-6 w-auto select-none"
            draggable={false}
          />
          <div className="flex gap-1.5">
            <button
              type="button"
              aria-label="Notifications"
              className="pointer-events-auto flex h-[33px] w-[33px] items-center justify-center rounded-full bg-black/[0.04] text-phia-muted transition hover:bg-black/[0.06]"
            >
              <Bell className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Account"
              className="pointer-events-auto flex h-[33px] w-[33px] items-center justify-center rounded-full bg-black/[0.04] text-phia-muted transition hover:bg-black/[0.06]"
            >
              <User className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Close"
              className="pointer-events-auto flex h-[33px] w-[33px] items-center justify-center rounded-full bg-black/[0.04] text-phia-muted transition hover:bg-black/[0.06]"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-3.5 pb-3.5 pt-[58px] [scrollbar-width:thin]">
        <div
          ref={topCardRef}
          className="mb-3.5 flex flex-col gap-3 rounded-xl bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-phia-card-soft">
              {aritziaThumb ? (
                <img
                  src={aritziaThumb}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="h-full w-full s-aritzia" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-phia-muted">
                Aritzia
              </div>
              <div className="font-sans text-xl font-bold text-phia-text">${DEMO_PRICE}</div>
            </div>
            <button
              type="button"
              aria-label="Save item"
              className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-phia-icon-bg text-phia-muted transition hover:bg-phia-border"
            >
              <Bookmark className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>

          <div className="rounded-lg bg-phia-card-soft p-2.5">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-2 rounded-md py-0.5 text-left text-[13px] text-phia-text transition hover:bg-black/[0.03]"
              aria-expanded={priceConfidenceOpen}
              aria-controls={PRICE_CONFIDENCE_PANEL_ID}
              onClick={() => setPriceConfidenceOpen((o) => !o)}
            >
              <PriceTypicalIcon />
              <span className="min-w-0 flex-1 leading-snug">
                This price is <span className="font-bold text-phia-orange">typical</span>
              </span>
              {priceConfidenceOpen ? (
                <ChevronUp className="h-4 w-4 flex-shrink-0 text-phia-muted" strokeWidth={2} aria-hidden />
              ) : (
                <ChevronDown className="h-4 w-4 flex-shrink-0 text-phia-muted" strokeWidth={2} aria-hidden />
              )}
            </button>

            <div
              id={PRICE_CONFIDENCE_PANEL_ID}
              hidden={!priceConfidenceOpen}
              className="mt-3"
            >
              <div className="relative mb-2 h-[52px]">
                <div
                  className="pointer-events-none absolute bottom-[22px] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-[rgba(249,115,22,0.16)] px-2.5 py-0.5 font-sans text-[11px] font-semibold text-phia-orange"
                >
                  ${DEMO_PRICE} is typical.
                </div>
                <div className="absolute inset-x-0 bottom-0 flex h-[7px] gap-1">
                  <div className="min-w-0 flex-1 rounded-sm bg-phia-resale" />
                  <div className="min-w-0 flex-[2.2] rounded-sm bg-phia-orange" />
                  <div className="min-w-0 flex-1 rounded-sm bg-phia-muted-soft" />
                </div>
              </div>

              <div className="mb-3 grid grid-cols-[1fr_2.2fr_1fr] gap-1 font-sans text-[10px] text-phia-muted">
                <div />
                <div className="flex justify-between px-0.5">
                  <span>${RANGE_LO}</span>
                  <span>${RANGE_HI}</span>
                </div>
                <div />
              </div>

              <p className="mb-3 font-sans text-[12px] leading-relaxed text-phia-muted">
                Other options cost between ${RANGE_LO} secondhand to ${RANGE_HI} new.{' '}
                <button type="button" className="inline font-semibold text-phia-text underline-offset-2 hover:underline">
                  How was this calculated?
                </button>
                <Info className="ml-0.5 inline-block h-3 w-3 align-text-bottom text-phia-muted" strokeWidth={2} aria-hidden />
              </p>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-phia-icon-bg py-3 font-sans text-[13px] font-medium text-phia-muted transition hover:bg-phia-border"
              >
                <Bell className="h-4 w-4" strokeWidth={2} />
                Track price
              </button>
            </div>
          </div>
        </div>

        <div className="mb-3.5 overflow-hidden rounded-xl bg-white shadow-sm">
          {futureOccasionLayout ? (
            <OccasionFitCard
              occasion={selectedContext}
              onOccasionChange={setSelectedContext}
              onOccasionCapsuleCta={onOccasionCapsuleCta}
            />
          ) : (
            <>
              <div className="border-b border-phia-border-subtle bg-phia-card-soft/60 px-3.5 py-2.5">
                <div className="flex min-h-8 items-center gap-3">
                  <div className="shrink-0 whitespace-nowrap font-sans text-[13px] font-semibold leading-tight tracking-[-0.01em] text-phia-text">
                    Shopping for an occasion?
                  </div>
                  <OccasionSelect
                    value={selectedContext}
                    onChange={setSelectedContext}
                    ariaLabel="Shopping occasion"
                  />
                </div>
              </div>
              <div className="px-3.5 py-3">
                <OccasionAnswerBlock occasion={selectedContext} onOccasionCapsuleCta={onOccasionCapsuleCta} />
              </div>
            </>
          )}
        </div>

        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="min-w-0 font-sans text-[16px] font-bold leading-tight tracking-[-0.01em] text-phia-text">
            See visually similar
          </h2>
          <div className="flex shrink-0 gap-1.5">
            <span
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-phia-icon-bg text-phia-muted"
              aria-hidden
            >
              <LayoutGrid className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <span
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-phia-icon-bg text-phia-muted"
              aria-hidden
            >
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </div>
        </div>

        <div className="mb-2.5 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:thin]">
          {FILTER_CHIPS.map((label) => (
            <div
              key={label}
              className="shrink-0 select-none rounded-lg border border-phia-border bg-white px-2.5 py-1.5 font-sans text-xs font-normal text-phia-text transition hover:bg-phia-card-soft"
              aria-hidden={false}
            >
              {label}
            </div>
          ))}
        </div>

        {VISUALLY_SIMILAR_ITEMS.map((row) => (
          <div
            key={`${row.market}-${row.size}-${row.now}`}
            className="mb-1.5 flex items-center gap-2.5 rounded-[10px] bg-white px-2.5 py-2 text-[11px]"
          >
            <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-md bg-phia-card-soft">
              <img
                src={row.thumbSrc}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-sans font-medium text-phia-text">{row.name}</div>
              <div className="mt-0.5 flex flex-wrap items-center gap-1 text-[10px]">
                <Leaf className="h-3 w-3 shrink-0 text-phia-resale" strokeWidth={2} aria-hidden />
                <span className="font-sans font-semibold text-phia-resale">Used</span>
                <span className="font-sans text-phia-muted">
                  {row.market} · {row.size}
                </span>
              </div>
            </div>
            <div className="text-right font-sans">
              <div className="text-[11px] font-bold text-phia-text">${row.now}</div>
              <div className="text-[9px] font-normal text-phia-muted">{row.less}% less</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
