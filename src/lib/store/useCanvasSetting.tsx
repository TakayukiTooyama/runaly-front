import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createSelectors } from './createSelectors'

type State = {
  radius: number
  opacity: number
  actions: Actions
}

type Actions = {
  updateRadius: (newRadius: number) => void
  updateOpacity: (newOpacity: number) => void
}

const useCanvasSettingStoreBase = create<State>()(
  devtools((set) => ({
    radius: 3,
    opacity: 0.8,
    actions: {
      updateRadius: (newRadius: number) => set({ radius: newRadius }),
      updateOpacity: (newOpacity: number) => set({ opacity: newOpacity }),
    },
  })),
)

export const useCanvasSettingStore = createSelectors(useCanvasSettingStoreBase)
