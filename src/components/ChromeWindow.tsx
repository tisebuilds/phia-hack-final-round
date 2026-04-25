import type { CSSProperties, ReactNode } from 'react'
import { CHROME_HEADER_H } from '../config/prototype'
import sarahAvatar from '../assets/sarah.png'
import phiaExtensionImage from '../assets/phia-extension.png'
import puzzleIcon from '../assets/extension-puzzle.png'
import refreshIcon from '../assets/refresh-icon.png'

type Props = {
  /** Full URL (e.g. https://www.aritzia.com/...) — shown in omnibox without scheme/host prefix */
  url: string
  /** Active tab title */
  title: string
  /** Optional: clicking reload behaves like demo Restart */
  onRestart?: () => void
  children: ReactNode
  className?: string
  style?: CSSProperties
}

function displayUrl(fullUrl: string): string {
  try {
    const u = new URL(fullUrl)
    return (u.host.replace(/^www\./, '') + u.pathname + u.search).replace(/\/$/, '') || u.host
  } catch {
    return fullUrl.replace(/^https?:\/\/(www\.)?/i, '')
  }
}

function IconBack({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M10 12L6 8l4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconForward({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 12l4-4-4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconReload({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden>
      <image href={refreshIcon} width="16" height="16" preserveAspectRatio="xMidYMid meet" />
    </svg>
  )
}

function IconLock({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="3" y="6" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconPuzzle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" aria-hidden>
      <image href={puzzleIcon} width="18" height="18" preserveAspectRatio="xMidYMid meet" />
    </svg>
  )
}

/** macOS-style Chrome window: traffic lights, tab strip, omnibox; children render in the page viewport. */
export function ChromeWindow({ url, title, onRestart, children, className = '', style }: Props) {
  const omniboxText = displayUrl(url)

  return (
    <div
      className={`relative mx-auto flex w-full flex-col overflow-hidden rounded-2xl border border-phia-border bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] ${className}`}
      style={style}
    >
      <header
        className="shrink-0 border-b border-phia-border bg-white"
        style={{ minHeight: CHROME_HEADER_H }}
      >
        {/* Tab strip */}
        <div
          className="flex h-9 items-center gap-2 border-b border-[#dadce0] bg-[#E8EAED] pl-4 pr-2"
          style={{ height: 36 }}
        >
          <div className="flex shrink-0 items-center gap-2" aria-hidden>
            <span className="size-3 rounded-full bg-[#FF5F57]" />
            <span className="size-3 rounded-full bg-[#FEBC2E]" />
            <span className="size-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-end gap-0.5 pt-1.5">
            <div
              className="flex max-w-[min(280px,42vw)] min-w-0 items-center gap-2 rounded-t-lg border border-b-0 border-[#dadce0] bg-white px-3 py-1.5 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
              style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
            >
              <span
                className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-[#1a472a] text-[9px] font-bold text-white"
                aria-hidden
              >
                A
              </span>
              <span className="truncate text-[12px] leading-tight text-[#3c4043]">{title}</span>
            </div>
            <button
              type="button"
              className="mb-0.5 flex size-7 shrink-0 items-center justify-center rounded text-[#5f6368] hover:bg-black/5"
              aria-label="New tab"
            >
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
        </div>

        {/* Omnibox row */}
        <div className="flex h-12 items-center gap-2 px-3" style={{ height: 48 }}>
          <div className="flex shrink-0 items-center gap-0.5 text-[#9aa0a6]">
            <span className="inline-flex size-8 items-center justify-center rounded-full">
              <IconBack className="size-4" />
            </span>
            <span className="inline-flex size-8 items-center justify-center rounded-full">
              <IconForward className="size-4" />
            </span>
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex size-8 items-center justify-center rounded-full text-[#5f6368] hover:bg-black/5 disabled:cursor-default disabled:opacity-60"
              aria-label="Reload (restart demo)"
              disabled={!onRestart}
            >
              <IconReload className="size-[11.52px]" />
            </button>
          </div>
          <div
            role="presentation"
            className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#F1F3F4] px-3 py-2 text-[13px] text-[#202124]"
          >
            <IconLock className="h-3.5 w-3.5 shrink-0 text-[#5f6368]" />
            <span className="min-w-0 truncate font-medium">{omniboxText}</span>
          </div>
          <div className="flex shrink-0 items-center gap-1 pr-0.5 text-[#5f6368]">
            <span className="inline-flex size-7 overflow-hidden rounded-md shadow-sm" title="Phia" aria-hidden>
              <img
                src={phiaExtensionImage}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </span>
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-full hover:bg-black/5"
              aria-label="Extensions"
            >
              <IconPuzzle className="size-[14.4px]" />
            </button>
            <span
              className="inline-flex size-7 overflow-hidden rounded-full bg-[#1a73e8]"
              aria-label="Sarah profile"
            >
              <img
                src={sarahAvatar}
                alt="Sarah"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </span>
          </div>
        </div>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
