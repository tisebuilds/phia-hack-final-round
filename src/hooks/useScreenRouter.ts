import { useCallback, useState } from 'react'
import type { StyleKey } from '../data/styles'
import type { CapsuleView, ScreenIndex } from '../types'

export function useScreenRouter(initialScreen: ScreenIndex = 0) {
  const [currentScreen, setCurrentScreen] = useState<ScreenIndex>(initialScreen)
  const [capsuleView, setCapsuleView] = useState<CapsuleView>('outfits')
  const [industryKey, setIndustryKey] = useState('consulting')
  const [styleKeys, setStyleKeys] = useState<readonly [StyleKey, StyleKey]>(['polished', 'easy'])

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
    styleKeys,
    setStyleKeys,
  }
}
