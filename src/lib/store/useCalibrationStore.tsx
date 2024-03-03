import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { caliMarkerKey } from '@/constants'
import { CaliMarkerKey, CaliMarkers, Coordinate } from '@/types'

import { createSelectors } from './createSelectors'

type State = {
  caliMarkers: CaliMarkers
  currentMarkerIndex: number
  actualWidth: number
  actions: Actions
}

type Actions = {
  updateCaliMarker: (selectLabel: CaliMarkerKey, caliMarker: Coordinate) => void
  updateActualWidth: (actualWidth: number) => void
  updateMarkerIndex: (index: number) => void
  incrementCaliMarkerIndex: () => void
}

const useCalibrationStoreBase = create<State>()(
  devtools(
    immer((set) => ({
      caliMarkers: {
        leftTop: null,
        leftBottom: null,
        rightTop: null,
        rightBottom: null,
        origin: null,
      },
      currentMarkerIndex: 0,
      actualWidth: 0,
      actions: {
        updateCaliMarker: (selectLabel: CaliMarkerKey, caliMarker) =>
          set((state) => {
            state.caliMarkers[selectLabel] = caliMarker
          }),
        updateActualWidth: (actualWidth) => set({ actualWidth }),
        updateMarkerIndex: (index: number) =>
          set(() => ({ currentMarkerIndex: index })),
        incrementCaliMarkerIndex: () => {
          set((state) => {
            const nextIndex =
              (state.currentMarkerIndex + 1) % caliMarkerKey.length
            state.currentMarkerIndex = nextIndex
          })
        },
      },
    })),
  ),
)

export const useCalibrationStore = createSelectors(useCalibrationStoreBase)
