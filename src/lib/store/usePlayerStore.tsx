import { PlayerRef } from '@remotion/player'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { Dimension } from '@/types'

import { createSelectors } from './createSelectors'

type State = {
  player: PlayerRef | null
  playerSize: Dimension
  loop: boolean
  playbackRate: number
  actions: Actions
}
type Actions = {
  setPlayer: (player: PlayerRef | null) => void
  setPlayerSize: (width: number, height: number) => void
  setLoop: (loop: boolean) => void
  setPlaybackRate: (playbackRate: number) => void
}

const usePlayerStoreBase = create<State>()(
  devtools((set) => ({
    player: null,
    playerSize: { width: 1920, height: 1080 },
    loop: false,
    playbackRate: 1.0,
    actions: {
      setPlayer: (player: PlayerRef | null) => set({ player }),
      setPlayerSize: (width: number, height: number) =>
        set({ playerSize: { width, height } }),
      setLoop: (loop: boolean) => set({ loop }),
      setPlaybackRate: (playbackRate: number) => set({ playbackRate }),
    },
  })),
)
export const usePlayerStore = createSelectors(usePlayerStoreBase)
