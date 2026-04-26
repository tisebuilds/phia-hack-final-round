import type { ReactNode } from 'react'

type Props = {
  onRestart: () => void
  onSetup: () => void
  onCapsule: () => void
  onFuture: () => void
  prefix?: ReactNode
}

export function DemoControls({ onRestart, onSetup, onCapsule, onFuture, prefix }: Props) {
  return (
    <div
      className="mx-auto mt-4 flex max-w-[min(100%,720px)] flex-wrap items-center justify-center gap-3"
      aria-label="Demo controls"
    >
      {prefix}
      <button
        type="button"
        onClick={onRestart}
        className="cursor-pointer rounded-full border border-white/20 bg-white/10 px-3.5 py-2 font-sans text-[11px] text-white/90 backdrop-blur transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02003A]"
      >
        Restart
      </button>
      <button
        type="button"
        onClick={onSetup}
        className="cursor-pointer rounded-full border border-white/20 bg-white/10 px-3.5 py-2 font-sans text-[11px] text-white/90 backdrop-blur transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02003A]"
      >
        Profile
      </button>
      <button
        type="button"
        onClick={onCapsule}
        className="cursor-pointer rounded-full border border-white/20 bg-white/10 px-3.5 py-2 font-sans text-[11px] text-white/90 backdrop-blur transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02003A]"
      >
        Outfits
      </button>
      <button
        type="button"
        onClick={onFuture}
        className="cursor-pointer rounded-full border border-white/20 bg-white/10 px-3.5 py-2 font-sans text-[11px] text-white/90 backdrop-blur transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02003A]"
      >
        Future
      </button>
    </div>
  )
}
