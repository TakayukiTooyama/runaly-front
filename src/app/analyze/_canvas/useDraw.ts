import { useCallback } from 'react'

import {
  clearCanvas,
  drawMarkers,
  drawStickPicture,
  drawVideoOneFrame,
} from './utils'

import type { Keypoint, CanvasViewState } from '@/types'

type Return = [
  (
    context: CanvasRenderingContext2D,
    canvasHeight: number,
    canvasWidth: number,
  ) => void,
  (
    context: CanvasRenderingContext2D,
    canvasHeight: number,
    canvasWidth: number,
    canvasViewState: CanvasViewState,
  ) => void,
]

export const useDraw = (
  videoWidth: number,
  videoHeight: number,
  video: HTMLVideoElement,
  frame: number,
  keypoints: Keypoint[],
): Return => {
  const draw = useCallback(
    (
      context: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
    ) => {
      try {
        clearCanvas(context, canvasWidth, canvasHeight)
        drawVideoOneFrame(context, video, canvasWidth, canvasHeight)
        drawStickPicture(
          context,
          keypoints[frame],
          canvasWidth,
          canvasHeight,
          videoWidth,
          videoHeight,
        )
        drawMarkers(
          context,
          keypoints[frame],
          canvasWidth,
          canvasHeight,
          videoWidth,
          videoHeight,
        )
      } catch (error) {
        throw new Error(`${frame}: Error in useDraw.tsx: draw function.`)
      }

      video.requestVideoFrameCallback(() => {
        draw(context, canvasWidth, canvasHeight)
      })
    },
    [videoWidth, videoHeight, video, keypoints, frame],
  )

  /* リセットボタンを押した時の処理 */
  const clearAndRedraw = useCallback(
    (
      context: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      canvasViewState: CanvasViewState,
    ) => {
      if (context) {
        context.clearRect(
          -canvasViewState.offset.x,
          -canvasViewState.offset.y,
          canvasWidth / canvasViewState.scale,
          canvasHeight / canvasViewState.scale,
        )
        draw(context, canvasWidth, canvasHeight)
      }
    },
    [draw],
  )

  return [draw, clearAndRedraw]
}
