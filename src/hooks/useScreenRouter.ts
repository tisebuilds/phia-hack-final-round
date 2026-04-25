import { useCallback, useState } from 'react'
import type { CapsuleView, ScreenIndex } from '../types'

export function useScreenRouter(initialScreen: ScreenIndex = 0) {
  const [currentScreen, setCurrentScreen] = useState<ScreenIndex>(initialScreen)
  const [capsuleView, setCapsuleView] = useState<CapsuleView>('outfits')
  const [industryKey, setIndustryKey] = useState('consulting')

  const go = useCallback((n: ScreenIndex) => {
    setCurrentScreen(n)
  }, [])

  return {
    currentScreen,
    setCurrentScreen,
    go,
    capsuleView,
    setCapsuleView,
    industryKey,
    setIndustryKey,
  }
}
