type Props = { summary: string; sourceCount: number; className?: string }

export function DressCodeCard({ summary, sourceCount, className = '' }: Props) {
  return (
    <div
      className={`rounded-[14px] bg-phia-card-soft bg-gradient-to-b from-black/4 to-black/4 px-4 py-3.5 ${className}`.trim()}
    >
      <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-phia-muted">
        What we know about your dress code
      </div>
      <p className="mb-1.5 font-serif text-[15px] font-medium leading-snug">{summary}</p>
      <p className="text-[11px] leading-normal text-phia-muted">
        Sourced from {sourceCount.toLocaleString()} current consultants · updated weekly
      </p>
    </div>
  )
}
