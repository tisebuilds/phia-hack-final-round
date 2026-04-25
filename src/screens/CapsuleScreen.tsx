import { useCallback, useEffect, useState } from 'react'
import { BackButton, CloseButton } from '../components/BackButton'
import { ProgressDots } from '../components/ProgressDots'
import { Tabs } from '../components/Tabs'
import { PieceCard } from '../components/PieceCard'
import { CapsuleOutfitStack } from '../components/capsule/CapsuleOutfitStack'
import { consultingCapsule } from '../data/capsule'
import {
  ANCHOR_TROUSER,
  DEMO_SHOES,
  DEMO_TOPS,
} from '../data/capsuleOutfitDemo'
import type { CapsuleView, Piece } from '../types'
import { getIndustry } from '../data/industries'
import { PieceDetailsScreen } from './PieceDetailsScreen'

type Props = {
  onBack: () => void
  capsuleView: CapsuleView
  onCapsuleViewChange: (v: CapsuleView) => void
  industryKey: string
  dressMeTick?: number
}

export function CapsuleScreen({
  onBack,
  capsuleView,
  onCapsuleViewChange,
  industryKey,
  dressMeTick = 0,
}: Props) {
  const ind = getIndustry(industryKey)
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null)
  const [piecesAnimated, setPiecesAnimated] = useState(true)

  useEffect(() => {
    if (!selectedPiece) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setSelectedPiece(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedPiece])

  const [topIdx, setTopIdx] = useState(0)
  const [shoeIdx, setShoeIdx] = useState(0)

  const top = DEMO_TOPS[topIdx]!
  const shoe = DEMO_SHOES[shoeIdx]!

  const dressMe = useCallback(() => {
    setTopIdx(Math.floor(Math.random() * DEMO_TOPS.length))
    setShoeIdx(Math.floor(Math.random() * DEMO_SHOES.length))
  }, [])

  useEffect(() => {
    if (dressMeTick <= 0 || capsuleView !== 'outfits') return
    const id = window.setTimeout(() => {
      dressMe()
    }, 0)
    return () => window.clearTimeout(id)
  }, [dressMeTick, capsuleView, dressMe])

  const cycleTop = (dir: number) => {
    setTopIdx((i) => (i + dir + DEMO_TOPS.length) % DEMO_TOPS.length)
  }

  const cycleShoe = (dir: number) => {
    setShoeIdx((i) => (i + dir + DEMO_SHOES.length) % DEMO_SHOES.length)
  }

  if (selectedPiece) {
    return (
      <PieceDetailsScreen
        piece={selectedPiece}
        sourceCount={ind.dressCodeSourceCount}
        onBack={() => setSelectedPiece(null)}
        onClose={onBack}
        onOpenRelated={(p) => setSelectedPiece(p)}
      />
    )
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden px-4 pt-5 pb-5 font-['Inter',var(--font-sans)] text-[13px] sm:px-5">
      <div className="mb-4 flex flex-shrink-0 items-center justify-between">
        <BackButton onClick={onBack} />
        <ProgressDots total={2} active={1} activeClassName="bg-[#1f3aff]" />
        <CloseButton onClick={onBack} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <h2
          className={`font-['Cormorant_Garamond',ui-serif,Georgia,serif] text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-[#0f0f0f] ${
            capsuleView === 'outfits' ? 'mb-2' : 'mb-3'
          }`}
        >
          Built for your pick
        </h2>

        <Tabs
          value={capsuleView}
          onChange={(v) => {
            onCapsuleViewChange(v)
            if (v === 'pieces') setPiecesAnimated(true)
          }}
          pieceCount={consultingCapsule.length}
        />

        {capsuleView === 'pieces' && (
          <div className="mb-3 grid grid-cols-3 gap-1.5">
            {consultingCapsule.map((p, i) => (
              <PieceCard
                key={p.key}
                piece={p}
                index={i}
                animate={piecesAnimated}
                onSelect={(x) => setSelectedPiece(x)}
              />
            ))}
          </div>
        )}

        {capsuleView === 'outfits' && (
          <div className="mb-2 flex min-h-0 flex-1 flex-col">
            <CapsuleOutfitStack
              top={top}
              anchor={ANCHOR_TROUSER}
              shoe={shoe}
              topKey={String(top.id)}
              shoeKey={String(shoe.id)}
              topSlideIndex={topIdx}
              topSlideCount={DEMO_TOPS.length}
              shoeSlideIndex={shoeIdx}
              shoeSlideCount={DEMO_SHOES.length}
              onTopPrev={() => cycleTop(-1)}
              onTopNext={() => cycleTop(1)}
              onShoePrev={() => cycleShoe(-1)}
              onShoeNext={() => cycleShoe(1)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
