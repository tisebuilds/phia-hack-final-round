import { useCallback } from 'react'
import { Check } from 'lucide-react'
import type { StyleKey } from '../data/styles'
import { styleMoods } from '../data/styles'

function toggleStyleSelection(
  keys: readonly StyleKey[],
  key: StyleKey,
): StyleKey[] {
  if (keys.includes(key)) {
    return keys.filter((k) => k !== key) as StyleKey[]
  }
  if (keys.length < 2) {
    return [...keys, key]
  }
  return [keys[1]!, key] as [StyleKey, StyleKey]
}

type Props = {
  /** 0–2 style moods; order reflects tap order for overflow replacement */
  value: readonly StyleKey[]
  onChange: (next: readonly StyleKey[]) => void
}

export function StyleMoodPickerPanel({ value, onChange }: Props) {
  const selected = new Set(value)
  const count = selected.size

  const toggle = useCallback(
    (key: StyleKey) => {
      onChange(toggleStyleSelection(value, key))
    },
    [value, onChange],
  )

  return (
    <div className="flex min-h-0 flex-col">
      <p className="mb-3 text-sm text-phia-muted">
        <span className="font-medium text-phia-blue">
          {count}/2 selected
        </span>
      </p>

      <div className="grid grid-cols-2 gap-2">
        {styleMoods.map((m) => {
          const isOn = selected.has(m.key)
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => toggle(m.key)}
              className={`relative aspect-square w-full overflow-hidden rounded-[14px] text-left transition-[box-shadow,transform] ${
                isOn
                  ? 'ring-2 ring-phia-blue ring-offset-0'
                  : 'ring-0 ring-offset-0'
              } `}
            >
              <div
                className="absolute inset-0"
                style={{ background: m.gradient }}
              />
              {isOn && (
                <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-phia-blue text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                </span>
              )}
              <div
                className={`absolute bottom-2.5 left-2.5 right-2.5 font-serif text-[15px] font-medium leading-tight ${
                  m.labelTone === 'light' ? 'text-white' : 'text-[#1a1a1a]'
                }`}
              >
                {m.label}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
