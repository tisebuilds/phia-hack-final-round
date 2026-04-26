type Props = {
  className?: string
}

export function PageHeader({ className = '' }: Props) {
  return (
    <span
      className={`inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 ${className}`}
    >
      Tise&apos;s Final Round Submission
    </span>
  )
}
