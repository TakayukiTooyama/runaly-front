import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { VideoAction, VideoState, createVideoStore } from './createVideoStore'

export type State = VideoState & VideoAction

export const useStore = create<State>()(
  devtools(
    immer((...args) => ({
      ...createVideoStore(...args),
    })),
  ),
)
