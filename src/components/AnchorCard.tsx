type Props = {
  styleCode: string
  onStyleCodeClick: () => void
}

export function AnchorCard({ styleCode, onStyleCodeClick }: Props) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-phia-muted">
        Style code
      </div>
      <button
        type="button"
        onClick={onStyleCodeClick}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-phia-border bg-white px-3.5 py-3 text-left transition hover:bg-phia-app"
        aria-label={`Edit style code: ${styleCode}`}
      >
        <span className="min-w-0 font-mono text-sm font-medium tabular-nums text-phia-text">
          {styleCode}
        </span>
        <span className="shrink-0 font-sans text-sm font-medium text-phia-blue">Edit</span>
      </button>
    </div>
  )
}
