type Props = { total?: number; active: number; activeClassName?: string }

export function ProgressDots({ total = 3, active, activeClassName = 'bg-phia-blue' }: Props) {
  return (
    <div className="flex gap-1.5" role="group" aria-label="Progress">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-0.5 w-6 rounded-sm transition-colors ${
            i === active ? activeClassName : 'bg-phia-border-subtle'
          }`}
        />
      ))}
    </div>
  )
}
