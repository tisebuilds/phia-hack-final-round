import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export function CTA({ variant = 'primary', className = '', children, ...rest }: Props) {
  const base =
    'w-full rounded-full font-sans text-sm font-medium py-3.5 px-6 transition-colors cursor-pointer border-0'
  const styles =
    variant === 'primary'
      ? 'bg-phia-blue text-white hover:bg-phia-blue-hover disabled:bg-phia-icon-bg disabled:text-phia-muted-soft disabled:cursor-not-allowed'
      : 'bg-transparent text-phia-text border border-phia-border outline outline-2 outline-offset-2 outline-phia-text/25 hover:bg-phia-card focus-visible:outline-phia-blue focus-visible:outline-offset-2'
  return (
    <button type="button" className={`${base} ${styles} ${className}`.trim()} {...rest}>
      {children}
    </button>
  )
}
