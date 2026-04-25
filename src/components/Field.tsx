type Props = {
  label: string
  value: string
  onEdit?: () => void
}

export function Field({ label, value, onEdit }: Props) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-phia-muted">
        {label}
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-phia-border bg-phia-card px-3.5 py-3 text-left font-sans text-sm text-phia-text transition hover:border-phia-border-subtle"
      >
        <span>{value}</span>
        {onEdit && <span className="text-[11px] font-medium text-phia-blue">Edit</span>}
      </button>
    </div>
  )
}
