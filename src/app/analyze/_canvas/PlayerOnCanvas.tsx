'use client'

import { useEffect, useRef, useState } from 'react'
import { useCurrentFrame, useVideoConfig, Video } from 'remotion'

import { ORIGIN } from '@/constants'

import { Canvas } from './Canvas'

import type { Keypoint } from '@/types'
import type { FC, MutableRefObject } from 'react'

type PlayerOnCanvasProps = {
  keypoints: Keypoint[]
  url: string
  videoHeight: number
  videoWidth: number
}

export const PlayerOnCanvas: FC<PlayerOnCanvasProps> = ({
  keypoints,
  url,
  videoHeight,
  videoWidth,
}) => {
  // 動画の参照
  const video = useRef<HTMLVideoElement | null>(null)

  // Retina画面でのぼやけ防止に使用
  const [ratio, setRatio] = useState(1.0)
  useEffect(() => {
    setRatio(window.devicePixelRatio)
  }, [])

  // 画面上のVideoの幅
  const { width } = useVideoConfig()

  // 現在のフレーム
  const currentFrame = useCurrentFrame()

  return (
    <>
      {url && (
        <div className='flex h-full w-full flex-col justify-center'>
          <div className='hidden w-full'>
            <Video ref={video} className='w-full' src={url} />
          </div>
          {video && (
            <Canvas
              video={video as MutableRefObject<HTMLVideoElement>}
              keypoints={keypoints}
              currentFrame={currentFrame}
              canvasHeight={width / (videoWidth / videoHeight)}
              canvasWidth={width}
              devicePixelRatio={ratio}
              canvasViewState={{ offset: ORIGIN, scale: 1 }}
              videoHeight={videoHeight}
              videoWidth={videoWidth}
            />
          )}
        </div>
      )}
    </>
  )
}
