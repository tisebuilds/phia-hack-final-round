import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { ExtensionStage } from './components/ExtensionStage'
import { PageHeader } from './components/PageHeader'
import { DemoControls } from './components/DemoControls'
import { ExtensionScreen } from './screens/ExtensionScreen'
import { SetupScreen } from './screens/SetupScreen'
import { CapsuleScreen } from './screens/CapsuleScreen'
import { useScreenRouter } from './hooks/useScreenRouter'
import {
  defaultDevScreen,
  EASE_PHIA,
  KEYBOARD_SHORTCUTS_ENABLED,
  SCREEN_MS,
} from './config/prototype'
import type { ScreenIndex } from './types'

function App() {
  const {
    currentScreen,
    go,
    capsuleView,
    setCapsuleView,
    industryKey,
    setIndustryKey,
    styleKeys,
    setStyleKeys,
  } = useScreenRouter(defaultDevScreen)

  const [dressMeTick, setDressMeTick] = useState(0)

  const setScreen = useCallback(
    (n: ScreenIndex) => {
      go(n)
    },
    [go]
  )

  useEffect(() => {
    if (!KEYBOARD_SHORTCUTS_ENABLED) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return

      const k = e.key.toLowerCase()
      if (k === '0' || k === '1' || k === '2') {
        e.preventDefault()
        setScreen(Number(k) as ScreenIndex)
        return
      }
      if (k === 'r') {
        e.preventDefault()
        setScreen(0)
        return
      }
      if (k === 'd') {
        e.preventDefault()
        if (currentScreen === 2 && capsuleView === 'outfits') {
          setDressMeTick((n) => n + 1)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [currentScreen, capsuleView, setScreen])

  const panel = (
    <AnimatePresence mode="wait">
      {currentScreen === 0 && (
        <motion.div
          key="ext"
          className="h-full min-h-0 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: SCREEN_MS / 1000, ease: EASE_PHIA }}
        >
          <ExtensionScreen onOccasionCapsuleCta={() => setScreen(2)} />
        </motion.div>
      )}
      {currentScreen === 1 && (
        <motion.div
          key="setup"
          className="h-full min-h-0 w-full overflow-hidden bg-phia-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: SCREEN_MS / 1000, ease: EASE_PHIA }}
        >
          <SetupScreen
            onBack={() => setScreen(0)}
            onContinue={() => setScreen(2)}
            industryKey={industryKey}
            onIndustryChange={setIndustryKey}
            styleKeys={styleKeys}
            onStyleKeysChange={setStyleKeys}
          />
        </motion.div>
      )}
      {currentScreen === 2 && (
        <motion.div
          key="cap"
          className="h-full min-h-0 w-full overflow-hidden bg-phia-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: SCREEN_MS / 1000, ease: EASE_PHIA }}
        >
          <CapsuleScreen
            onBack={() => setScreen(0)}
            capsuleView={capsuleView}
            onCapsuleViewChange={setCapsuleView}
            industryKey={industryKey}
            dressMeTick={dressMeTick}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="min-h-screen bg-[#02003A] px-4 py-7 sm:py-9">
      <PageHeader />
      <ExtensionStage currentScreen={currentScreen} panel={panel} onRestart={() => setScreen(0)} />

      <DemoControls
        onRestart={() => setScreen(0)}
        onSetup={() => setScreen(1)}
        onCapsule={() => setScreen(2)}
      />
    </div>
  )
}

export default App
