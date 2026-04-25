import type { CapsuleView } from '../types'

type Props = {
  value: CapsuleView
  onChange: (v: CapsuleView) => void
  pieceCount: number
}

/** Outfits first (visual-first default per product feedback). */
export function Tabs({ value, onChange, pieceCount }: Props) {
  return (
    <div
      className="mb-3 inline-flex w-fit rounded-full p-0.5"
      style={{ backgroundColor: '#e4e4e7' }}
      role="tablist"
      aria-label="Capsule view"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === 'outfits'}
        onClick={() => onChange('outfits')}
        className={`cursor-pointer whitespace-nowrap rounded-full px-3 py-1.5 font-sans text-[12px] font-medium transition ${
          value === 'outfits'
            ? 'bg-white text-[#0f0f0f] shadow-sm'
            : 'bg-transparent text-[#6b7280]'
        }`}
      >
        <span className="inline-flex items-center gap-1.5">
          <span>Outfits</span>
        </span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === 'pieces'}
        onClick={() => onChange('pieces')}
        className={`cursor-pointer whitespace-nowrap rounded-full px-3 py-1.5 font-sans text-[12px] font-medium transition ${
          value === 'pieces'
            ? 'bg-white text-[#0f0f0f] shadow-sm'
            : 'bg-transparent text-[#6b7280]'
        }`}
      >
        <span className="inline-flex items-center gap-1.5">
          <span>Pieces</span>
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
              value === 'pieces' ? 'bg-[#f4f4f5] text-[#111827]' : 'bg-[#d4d4d8] text-[#374151]'
            }`}
            aria-label={`${pieceCount} pieces`}
          >
            {pieceCount}
          </span>
        </span>
      </button>
    </div>
  )
}
