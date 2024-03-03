import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { persist } from 'zustand/middleware'

import { Keypoint, ResponseData } from '@/types'

import { createSelectors } from './createSelectors'

type State = {
  keypoints: Keypoint[]
  cogs: [number, number][]
  cogVelocities: number[]
  trunkAngles: number[]
  rightHipFlexionAngles: number[]
  leftHipFlexionAngles: number[]
  stepLengths: number[]
  actions: Actions
}

type Actions = {
  setKeypoints: (keypoints: Keypoint[]) => void
  setAllData: (data: ResponseData) => void
}

export const useKeypointStoreBase = create<State>()(
  devtools(
    persist(
      (set) => ({
        keypoints: [],
        cogs: [],
        cogVelocities: [],
        trunkAngles: [],
        leftHipFlexionAngles: [],
        rightHipFlexionAngles: [],
        stepLengths: [],
        actions: {
          setKeypoints: (newKeypoints: Keypoint[]) =>
            set({ keypoints: newKeypoints }),
          setAllData: (data: ResponseData) =>
            set({
              keypoints: data.keypoints,
              cogs: data.cogs,
              cogVelocities: data.cogVelocities,
              trunkAngles: data.trunkAngles,
              rightHipFlexionAngles: data.rightHipFlexionAngles,
              leftHipFlexionAngles: data.leftHipFlexionAngles,
              stepLengths: data.stepLengths,
            }),
        },
      }),
      {
        name: 'keypoints',
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => !['actions'].includes(key)),
          ),
      },
    ),
  ),
)

export const useKeypointStore = createSelectors(useKeypointStoreBase)
