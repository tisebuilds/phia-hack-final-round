import type { ReactNode } from 'react'

type Props = {
  title: string
  description?: ReactNode
  /** For dialog accessibility */
  'aria-label': string
  onCancel: () => void
  onSave: () => void
  saveDisabled?: boolean
  children: ReactNode
}

/**
 * Full-height overlay “page” inside a screen: scrollable body and sticky
 * footer with Cancel / Save changes.
 */
export function ProfileEditSheet({
  title,
  description,
  'aria-label': ariaLabel,
  onCancel,
  onSave,
  saveDisabled = false,
  children,
}: Props) {
  return (
    <div
      className="absolute inset-0 z-30 flex h-full min-h-0 w-full flex-col bg-black/40"
      onClick={onCancel}
    >
      <div
        className="flex h-full min-h-0 w-full flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal
        aria-label={ariaLabel}
      >
        <div className="shrink-0 border-b border-phia-border px-4 pt-4 pb-3">
          <h2 className="font-serif text-lg text-phia-text">{title}</h2>
          {description != null ? (
            <div className="mt-1 text-sm text-phia-muted">{description}</div>
          ) : null}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-4">
          {children}
        </div>
        <div className="shrink-0 border-t border-phia-border px-4 py-3 sm:px-5">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="w-full cursor-pointer rounded-full border border-phia-border bg-white py-2.5 text-sm font-medium text-phia-text transition hover:bg-phia-app focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-phia-blue/40 focus-visible:ring-offset-2 sm:flex-1"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={saveDisabled}
              className="w-full cursor-pointer rounded-full bg-phia-text py-2.5 text-sm font-medium text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-phia-blue/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
