import { pieceByKey } from '../data/capsule'

export function AnchorCard() {
  const anchorSrc = pieceByKey('aritzia')?.imageSrc

  return (
    <div className="relative mb-[18px] flex items-center gap-3 rounded-[14px] border-[1.5px] border-phia-blue bg-white p-3">
      <span className="absolute -top-2 left-3.5 rounded bg-phia-blue px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-white">
        Your pick
      </span>
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
        {anchorSrc ? (
          <img
            src={anchorSrc}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full s-aritzia" />
        )}
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <div className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-phia-muted">
          Aritzia
        </div>
        <div className="mb-0.5 truncate font-serif text-[15px] font-medium">Effortless Pant</div>
        <div className="text-xs text-phia-muted">$148 new · $50 used (Poshmark)</div>
      </div>
    </div>
  )
}
