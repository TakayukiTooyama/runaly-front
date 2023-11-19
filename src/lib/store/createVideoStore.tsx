import { v4 as uuid } from 'uuid'
import { StateCreator } from 'zustand'

import { State } from './useStore'

export type VideoState = {
  videos: File[]
  selectedVideo: File | null
  selectedVideoUrl: string
  currentVideoIndex: number
}
export type VideoAction = {
  addVideo: (payload: File[]) => void
  deleteVideo: (index: number) => void
  deleteAllVideos: () => void
  selectVideoIndex: (index: number) => void
}

export const createVideoStore: StateCreator<
  State,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  VideoState & VideoAction
> = (set, get) => ({
  videos: [],
  selectedVideo: null,
  selectedVideoUrl: '',
  currentVideoIndex: 0,
  addVideo: (payload: File[]) => {
    const newVideos = payload
      .filter(
        (file) =>
          !get()
            .videos.map((video) => video.name)
            .includes(file.name),
      )
      .map((file) => ({
        id: uuid(),
        name: file.name,
        file,
      }))

    if (!get().selectedVideoUrl) {
      set(() => ({
        selectedVideoUrl: URL.createObjectURL(newVideos[0].file),
        selectedVideo: newVideos[0],
      }))
    }
    set((state) => ({ videos: [...state.videos, ...newVideos] }))
  },

  deleteVideo: (index: number) => {
    const selectedVideo = get().videos[index]
    if (!selectedVideo) {
      return
    }

    const newVideos = get().videos.filter(
      (video) => video.name !== selectedVideo.name,
    )
    const currentVideoIndex = get().currentVideoIndex

    if (currentVideoIndex === index && get().videos.length === 1) {
      set({
        videos: [],
        selectedVideoUrl: '',
        selectedVideo: null,
      })
    } else if (currentVideoIndex >= index) {
      set({ videos: newVideos })
      get().selectVideoIndex(currentVideoIndex - 1)
    } else {
      set({ videos: newVideos })
    }
  },
  deleteAllVideos: () => {
    set(() => ({ videos: [] }))
  },
  selectVideoIndex: (index: number) => {
    const selectedVideo = get().videos[index]
    if (get().selectedVideoUrl) {
      URL.revokeObjectURL(get().selectedVideoUrl)
    }

    set(() => ({
      selectedVideo: selectedVideo,
      currentVideoIndex: index,
      selectedVideoUrl: URL.createObjectURL(selectedVideo),
    }))
  },
})
