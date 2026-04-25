import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BackButton } from '../components/BackButton'
import { ProfileEditSheet } from '../components/ProfileEditSheet'
import { ProgressDots } from '../components/ProgressDots'
import { CTA } from '../components/CTA'
import { AnchorCard } from '../components/AnchorCard'
import { DressCodeCard } from '../components/DressCodeCard'
import { ProfileFieldRow } from '../components/ProfileFieldRow'
import { StyleMoodPickerPanel } from '../components/StyleMoodPickerPanel'
import { getIndustry, industries } from '../data/industries'
import { SETUP_HEADLINE } from '../data/messaging'
import type { StyleKey } from '../data/styles'
import { styleCodeFromSelection } from '../data/styles'

const SEASONS = [
  'Spring / Summer 2026',
  'Fall / Winter 2026',
  'Transitional (year-round basics)',
] as const

type Picker = 'industry' | 'season' | 'style' | null

type Props = {
  onBack: () => void
  onContinue: () => void
  industryKey: string
  onIndustryChange: (key: string) => void
  styleKeys: readonly [StyleKey, StyleKey]
  onStyleKeysChange: (keys: [StyleKey, StyleKey]) => void
}

function applyBudgetDigitDraft(raw: string): { ok: true; digits: string } | { ok: false } {
  const n = parseInt(raw, 10)
  if (Number.isNaN(n) && raw !== '') {
    return { ok: false }
  }
  const amount = raw === '' || Number.isNaN(n) ? 500 : Math.max(0, n)
  return { ok: true, digits: String(amount) }
}

export function SetupScreen({
  onBack,
  onContinue,
  industryKey,
  onIndustryChange,
  styleKeys,
  onStyleKeysChange,
}: Props) {
  const budgetInputId = useId()
  const rootRef = useRef<HTMLDivElement>(null)

  const [picker, setPicker] = useState<Picker>(null)
  const [season, setSeason] = useState<string>(SEASONS[0]!)
  const [budgetDigits, setBudgetDigits] = useState('500')

  const [draftIndustryKey, setDraftIndustryKey] = useState(industryKey)
  const [draftSeason, setDraftSeason] = useState<string>(SEASONS[0]!)
  const [draftStyle, setDraftStyle] = useState<StyleKey[]>([
    styleKeys[0]!,
    styleKeys[1]!,
  ])

  const ind = getIndustry(industryKey)
  const styleCode = styleCodeFromSelection(styleKeys)

  useEffect(() => {
    if (!picker) {
      return
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setPicker(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [picker])

  /** When a sheet is open, lock root scroll and reset position so the page cannot scroll under the overlay. */
  useEffect(() => {
    if (!picker) {
      return
    }
    const el = rootRef.current
    if (el) {
      el.scrollTo(0, 0)
    }
  }, [picker])

  const closeSheet = () => {
    setPicker(null)
  }

  const openIndustry = () => {
    setDraftIndustryKey(industryKey)
    setPicker('industry')
  }
  const openSeason = () => {
    setDraftSeason(season)
    setPicker('season')
  }
  const openStyle = () => {
    setDraftStyle([styleKeys[0]!, styleKeys[1]!])
    setPicker('style')
  }

  const saveIndustry = () => {
    onIndustryChange(draftIndustryKey)
    setPicker(null)
  }
  const saveSeason = () => {
    setSeason(draftSeason)
    setPicker(null)
  }
  const saveStyle = () => {
    if (draftStyle.length !== 2) {
      return
    }
    const s = [...draftStyle].sort() as [StyleKey, StyleKey]
    onStyleKeysChange(s)
    setPicker(null)
  }

  const canSaveStyle = draftStyle.length === 2

  return (
    <div
      ref={rootRef}
      className={
        picker
          ? 'relative flex h-full min-h-0 flex-col overflow-hidden px-4 pt-5 pb-5 sm:px-5'
          : 'relative flex h-full min-h-0 flex-col overflow-y-auto px-4 pt-5 pb-5 sm:px-5'
      }
    >
      <div className="mb-5 flex items-center justify-between">
        <BackButton onClick={onBack} />
        <ProgressDots total={2} active={0} />
        <span className="h-10 w-10 shrink-0" aria-hidden />
      </div>

      <h2 className="mb-5 font-serif text-[22px] font-medium leading-tight tracking-[-0.01em] text-phia-text sm:text-[26px]">
        {SETUP_HEADLINE}
      </h2>

      <div className="mb-4">
        <ProfileFieldRow
          sectionLabel="Industry"
          value={ind.label}
          onEdit={openIndustry}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
      >
        <DressCodeCard
          className="mb-5"
          summary={ind.dressCodeSummary}
          sourceCount={ind.dressCodeSourceCount}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
      >
        <AnchorCard
          styleCode={styleCode}
          onStyleCodeClick={openStyle}
        />
      </motion.div>

      <div className="mb-2.5 space-y-3.5">
        <ProfileFieldRow
          sectionLabel="Season"
          value={season}
          onEdit={openSeason}
        />
        <ProfileFieldRow
          sectionLabel="Budget"
          editable
          id={budgetInputId}
          value={budgetDigits}
          onValueChange={(v) => setBudgetDigits(v)}
          onBlur={() => {
            const r = applyBudgetDigitDraft(budgetDigits)
            if (r.ok) {
              setBudgetDigits(r.digits)
            }
          }}
          placeholder="e.g. 750"
        />
      </div>

      <CTA className="mt-auto" onClick={onContinue}>
        Show me outfits
      </CTA>

      {picker === 'industry' && (
        <ProfileEditSheet
          aria-label="Choose industry"
          title="Industry"
          onCancel={closeSheet}
          onSave={saveIndustry}
        >
          <div className="flex flex-col gap-2">
            {industries.map((i) => (
              <button
                key={i.key}
                type="button"
                onClick={() => {
                  setDraftIndustryKey(i.key)
                }}
                className={`cursor-pointer rounded-xl border px-3 py-2.5 text-left text-sm ${
                  i.key === draftIndustryKey
                    ? 'border-phia-blue bg-phia-app'
                    : 'border-phia-border'
                }`}
              >
                <span className="font-medium">{i.label}</span>
              </button>
            ))}
          </div>
        </ProfileEditSheet>
      )}

      {picker === 'season' && (
        <ProfileEditSheet
          aria-label="Choose season"
          title="Season"
          onCancel={closeSheet}
          onSave={saveSeason}
        >
          <div className="flex flex-col gap-2">
            {SEASONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setDraftSeason(s)
                }}
                className={`cursor-pointer rounded-xl border px-3 py-2.5 text-left text-sm ${
                  s === draftSeason
                    ? 'border-phia-blue bg-phia-app'
                    : 'border-phia-border'
                }`}
              >
                <span className="font-medium">{s}</span>
              </button>
            ))}
          </div>
        </ProfileEditSheet>
      )}

      {picker === 'style' && (
        <ProfileEditSheet
          aria-label="Choose two style moods"
          title="Which two feel most like you?"
          onCancel={closeSheet}
          onSave={saveStyle}
          saveDisabled={!canSaveStyle}
        >
          <StyleMoodPickerPanel
            value={draftStyle}
            onChange={(next) => setDraftStyle([...next])}
          />
        </ProfileEditSheet>
      )}
    </div>
  )
}
