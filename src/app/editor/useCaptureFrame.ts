'use client'

import { useState } from 'react'

export function useCaptureFrame() {
  const [frame, setFrame] = useState<HTMLCanvasElement>()
  const [frameUrl, setFrameUrl] = useState('')

  const createVideoElement = (videoUrl: string): HTMLVideoElement => {
    const video = document.createElement('video')
    video.src = videoUrl
    video.muted = true
    video.crossOrigin = 'anonymous'
    video.style.display = 'none'
    document.body.appendChild(video)
    return video
  }

  const createCanvasFromVideo = (videoElement: HTMLVideoElement) => {
    const canvas = document.createElement('canvas')
    canvas.width = videoElement.videoWidth
    canvas.height = videoElement.videoHeight
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(videoElement, 0, 0)
    }

    return canvas
  }

  const extractFrame = async (video: HTMLVideoElement, time: number) => {
    video.currentTime = time
    await new Promise((resolve) => {
      video.addEventListener('seeked', resolve, { once: true })
    })
    return createCanvasFromVideo(video)
  }

  const captureFrame = async (videoUrl: string) => {
    const videoElement = createVideoElement(videoUrl)
    videoElement.load()
    const handleLoadedData = async () => {
      const canvas = await extractFrame(videoElement, 0)
      setFrameUrl(canvas.toDataURL())
      setFrame(canvas)
    }
    videoElement.addEventListener('loadeddata', handleLoadedData)
    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData)
    }
  }

  return { frameUrl, frame, captureFrame }
}
