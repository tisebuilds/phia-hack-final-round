type Props = { summary: string; sourceCount: number }

export function DressCodeCard({ summary, sourceCount }: Props) {
  return (
    <div className="mb-4.5 mt-3.5 rounded-[14px] bg-phia-card-soft px-4 py-3.5">
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
