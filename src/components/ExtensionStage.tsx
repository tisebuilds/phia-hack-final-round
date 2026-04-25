import type { ReactNode } from 'react'
import {
  ARITZIA_PDP_IMAGE,
  ARITZIA_PDP_URL,
  DEMO_STAGE_MAX_W,
  DEMO_STAGE_MIN_H,
  DEMO_STAGE_VH,
  EXTENSION_PANEL_INSET,
  EXTENSION_PANEL_RADIUS,
  EXTENSION_PANEL_W,
} from '../config/prototype'
import type { ScreenIndex } from '../types'
import { ChromeWindow } from './ChromeWindow'

type Props = {
  currentScreen: ScreenIndex
  panel: ReactNode
  onRestart: () => void
}

/**
 * Desktop “tab” view: Aritzia PDP as full-bleed background, Phia as a right-docked
 * extension panel (matches the pitch mockup — not a phone frame).
 */
export function ExtensionStage({ currentScreen, panel, onRestart }: Props) {
  const showPdpVivid = currentScreen === 0
  return (
    <ChromeWindow
      url={ARITZIA_PDP_URL}
      title="The Effortless Pant™ | Aritzia US"
      onRestart={onRestart}
      style={{
        maxWidth: DEMO_STAGE_MAX_W,
        minHeight: DEMO_STAGE_MIN_H,
        height: `min(${DEMO_STAGE_VH * 100}vh, 700px)`,
        borderRadius: 16,
      }}
    >
      {/* Retailer page — full Aritzia PDP screenshot, pinned to top (see PRD / pitch asset) */}
      <div className="absolute inset-0 z-0">
        <img
          src={ARITZIA_PDP_IMAGE}
          alt=""
          className={`h-full w-full object-cover object-top object-left transition-[opacity] duration-300 ${
            showPdpVivid ? 'opacity-100' : 'opacity-45'
          }`}
        />
      </div>

      {/* Extension panel (right column) */}
      <div
        className="absolute z-10 flex min-h-0 min-w-0 flex-col overflow-hidden border border-white/50 bg-phia-app shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        style={{
          width: `min(${EXTENSION_PANEL_W}px, calc(100% - ${EXTENSION_PANEL_INSET * 2}px))`,
          top: EXTENSION_PANEL_INSET,
          right: EXTENSION_PANEL_INSET,
          bottom: EXTENSION_PANEL_INSET,
          borderRadius: EXTENSION_PANEL_RADIUS,
        }}
      >
        {panel}
      </div>
    </ChromeWindow>
  )
}
