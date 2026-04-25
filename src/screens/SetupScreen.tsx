import { useState } from 'react'
import { motion } from 'framer-motion'
import { BackButton } from '../components/BackButton'
import { ProgressDots } from '../components/ProgressDots'
import { CTA } from '../components/CTA'
import { AnchorCard } from '../components/AnchorCard'
import { DressCodeCard } from '../components/DressCodeCard'
import { getIndustry, industries } from '../data/industries'
import {
  SETUP_CTA_ABOVE_LINE,
  SETUP_HEADLINE,
  SETUP_SUBLINE,
  CLOSET_BUY_FRAMING,
} from '../data/messaging'

type Props = {
  onBack: () => void
  onContinue: () => void
  industryKey: string
  onIndustryChange: (key: string) => void
}

function InsightCard({
  label,
  value,
  delay = 0,
}: {
  label: string
  value: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.32, 0.72, 0, 1] }}
      className="rounded-xl border border-phia-border bg-white px-3.5 py-3"
    >
      <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.1em] text-phia-muted">
        {label}
      </div>
      <div className="font-sans text-sm font-medium text-phia-text">{value}</div>
    </motion.div>
  )
}

export function SetupScreen({ onBack, onContinue, industryKey, onIndustryChange }: Props) {
  const [modal, setModal] = useState(false)
  const ind = getIndustry(industryKey)

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-y-auto px-4 pt-5 pb-5 sm:px-5">
      <div className="mb-5 flex items-center justify-between">
        <BackButton onClick={onBack} />
        <ProgressDots total={2} active={0} />
        <span className="h-10 w-10 shrink-0" aria-hidden />
      </div>

      <h2 className="mb-1.5 font-serif text-[22px] font-medium leading-tight tracking-[-0.01em] text-phia-text sm:text-[26px]">
        {SETUP_HEADLINE}
      </h2>
      <p className="mb-1 text-sm leading-normal text-phia-muted">{SETUP_SUBLINE}</p>
      <button
        type="button"
        onClick={() => setModal(true)}
        className="mb-4 self-start text-left text-[11px] font-medium text-phia-blue underline-offset-2 hover:underline"
      >
        Different industry?
      </button>

      <AnchorCard />

      <div className="mb-3 space-y-2">
        <InsightCard label="Industry" value={ind.label} delay={0.05} />
        <InsightCard label="Start date" value="June 22, 2026" delay={0.1} />
        <InsightCard label="Budget for the capsule" value="$500" delay={0.15} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.22, ease: [0.32, 0.72, 0, 1] }}
      >
        <DressCodeCard summary={ind.dressCodeSummary} sourceCount={ind.dressCodeSourceCount} />
      </motion.div>

      <p className="mb-2 mt-1 text-center font-serif text-[12px] italic text-phia-muted">
        {CLOSET_BUY_FRAMING}
      </p>
      <p className="mb-3 text-center text-[11px] leading-normal text-phia-muted">{SETUP_CTA_ABOVE_LINE}</p>

      <CTA className="mt-auto" onClick={onContinue}>
        Show me outfits
      </CTA>

      {modal && (
        <div
          className="absolute inset-0 z-30 flex items-end justify-center bg-black/40 px-4 pb-8"
          onClick={() => setModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal
          >
            <p className="mb-3 font-serif text-lg">Industry</p>
            <div className="flex max-h-60 flex-col gap-2 overflow-y-auto">
              {industries.map((i) => (
                <button
                  key={i.key}
                  type="button"
                  onClick={() => {
                    onIndustryChange(i.key)
                    setModal(false)
                  }}
                  className={`cursor-pointer rounded-xl border px-3 py-2.5 text-left text-sm ${
                    i.key === industryKey
                      ? 'border-phia-blue bg-phia-app'
                      : 'border-phia-border'
                  }`}
                >
                  <span className="font-medium">{i.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setModal(false)}
              className="mt-3 w-full rounded-full border border-phia-border py-2 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
