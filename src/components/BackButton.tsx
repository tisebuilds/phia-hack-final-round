type Props = {
  onClick: () => void
  label?: string
}

const circleClass =
  'inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-[#EAEAEA] p-0 font-sans text-[20px] font-normal leading-none text-[#5F6368] transition-colors hover:bg-[#e2e2e2] active:bg-[#dadada] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3aff]/40'

export function BackButton({ onClick, label = 'Back' }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={circleClass}
    >
      ←
    </button>
  )
}

export function CloseButton({ onClick, label = 'Close' }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={circleClass}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  )
}
