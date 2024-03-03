'use client'

/* eslint-disable import/no-default-export */
import { useEffect, useRef, useState, type MutableRefObject } from 'react'

import type { CanvasViewState, Keypoint } from '@/types'

import { useDraw } from '.'

export type CanvasProps = {
  canvasHeight: number
  canvasViewState: CanvasViewState
  canvasWidth: number
  currentFrame: number
  devicePixelRatio: number
  keypoints: Keypoint[]
  video: MutableRefObject<HTMLVideoElement>
  videoHeight: number
  videoWidth: number
}

export function Canvas({
  canvasHeight,
  canvasViewState,
  canvasWidth,
  currentFrame,
  devicePixelRatio,
  keypoints,
  video,
  videoHeight,
  videoWidth,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)

  // console.log(keypoints, currentFrame)
  const [draw] = useDraw(
    videoWidth,
    videoHeight,
    video.current,
    currentFrame,
    keypoints,
  )

  // セットアップ
  useEffect(() => {
    if (canvasRef.current) {
      // get new drawing context
      const renderCtx = canvasRef.current.getContext('2d')
      setContext(renderCtx)
    }
  }, [setContext])

  // 描画
  useEffect(() => {
    if (context && video.current) {
      context.canvas.width = canvasWidth * devicePixelRatio
      context.canvas.height = canvasHeight * devicePixelRatio

      context.scale(
        canvasViewState.scale * devicePixelRatio,
        canvasViewState.scale * devicePixelRatio,
      )
      context.translate(canvasViewState.offset.x, canvasViewState.offset.y)
      draw(context, canvasWidth, canvasHeight)
    }
  }, [
    canvasHeight,
    canvasWidth,
    context,
    devicePixelRatio,
    draw,
    canvasViewState.offset.x,
    canvasViewState.offset.y,
    canvasViewState.scale,
    video,
  ])

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth * devicePixelRatio}
      height={canvasHeight * devicePixelRatio}
      style={{ height: canvasHeight, width: canvasWidth }}
    />
  )
}
