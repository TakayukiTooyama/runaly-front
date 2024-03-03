import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { Dimension } from '@/types'

import { createSelectors } from './createSelectors'

type State = {
  video: Video
  actions: Actions
}

type Video = {
  id: string
  name: string
  url: string
  file: File | undefined
  durationInFrames: number
  dimension: Dimension
  fps: number
}

type Actions = {
  setVideoFile: (videoFile: File | undefined) => void
  setVideo: (video: Video) => void
  updateVideo: (video: Partial<Video>) => void
}

const useVideoStoreBase = create<State>()(
  devtools(
    immer((set) => ({
      video: {
        id: '',
        name: '',
        url: '',
        file: undefined,
        durationInFrames: 0,
        dimension: { width: 1920, height: 1080 },
        fps: 30,
      },
      actions: {
        setVideoFile: (videoFile: File | undefined) => {
          if (!videoFile) return

          set((state) => {
            if (state.video.url) {
              URL.revokeObjectURL(state.video.url)
            }
            state.video.file = videoFile
            state.video.url = URL.createObjectURL(videoFile)
          })
        },
        setVideo: (video: Video) => {
          set((state) => {
            state.video = video
          })
        },
        updateVideo: (updatedProperties: Partial<Video>) => {
          set((state) => {
            Object.assign(state.video, updatedProperties)
          })
        },
      },
    })),
  ),
)

export const useVideoStore = createSelectors(useVideoStoreBase)
