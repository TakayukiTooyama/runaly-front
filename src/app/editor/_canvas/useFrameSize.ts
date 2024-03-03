import type { Dimension } from '@/types'

export const useFrameSize = (stageSize: Dimension, videoSize: Dimension) => {
  const frameWidth = videoSize.width
  const frameHeight = videoSize.height
  const frameAspectRatio = frameWidth / frameHeight
  const isTall = stageSize.width / frameAspectRatio > stageSize.height

  const stageFrameWidth = isTall
    ? stageSize.height * frameAspectRatio
    : stageSize.width
  const stageFrameHeight = isTall
    ? stageSize.height
    : stageSize.width / frameAspectRatio
  const frameSize = { width: stageFrameWidth, height: stageFrameHeight }

  const positionScale = {
    x: frameWidth / stageSize.width,
    y: frameHeight / (stageSize.width / frameAspectRatio),
  }

  return { frameSize, positionScale }
}
