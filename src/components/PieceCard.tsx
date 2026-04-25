import { motion } from 'framer-motion'
import type { Piece } from '../types'
import { formatPieceGridLabel, formatPieceGridPrice } from '../lib/format'
import { PIECE_REVEAL_MS, PIECE_STAGGER_MS } from '../config/prototype'

type Props = {
  piece: Piece
  index: number
  onSelect: (piece: Piece) => void
  animate: boolean
}

export function PieceCard({ piece, index, onSelect, animate }: Props) {
  return (
    <motion.button
      type="button"
      initial={animate ? { opacity: 0, scale: 0.92 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * (PIECE_STAGGER_MS / 1000),
        duration: PIECE_REVEAL_MS / 1000,
        ease: [0.32, 0.72, 0, 1],
      }}
      onClick={() => onSelect(piece)}
      className={`group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-lg transition hover:-translate-y-0.5 ${
        piece.isAnchor ? 'ring-2 ring-phia-blue ring-inset' : ''
      }`}
    >
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
      {piece.isAnchor && (
        <span className="absolute top-1.5 left-1.5 z-[1] rounded bg-phia-blue px-1 py-0.5 text-[7px] font-semibold uppercase tracking-wide text-white">
          Your pick
        </span>
      )}
      {!piece.isAnchor && (
        <span
          className={`absolute top-1.5 left-1.5 z-[1] rounded px-1 py-0.5 text-[7px] font-semibold uppercase tracking-wide ${
            piece.isResale
              ? 'bg-[rgba(45,140,92,0.95)] text-white'
              : 'bg-white/95 text-phia-text'
          }`}
        >
          {piece.isResale ? 'Resale' : 'New'}
        </span>
      )}
      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-black/70 px-1.5 py-1.5 text-left text-white">
        <div className="text-[9px] font-medium leading-tight">{formatPieceGridLabel(piece)}</div>
        <div className="text-[8px] opacity-90">{formatPieceGridPrice(piece)}</div>
      </div>
    </motion.button>
  )
}
