import { useRef, useState } from 'react'

import type { Dimension } from '@/types'
import type Konva from 'konva'
import type { KonvaEventObject } from 'konva/lib/Node'

export const useCanvasOperation = (
  stageSize: Dimension,
  frameSize: Dimension,
) => {
  const stageRef = useRef<Konva.Stage>(null)
  const groupRef = useRef<Konva.Group>(null)
  const imageRef = useRef<Konva.Image>(null)
  const circleRef = useRef<Konva.Circle>(null)
  const lastDistRef = useRef<number>(0)
  const lastScaleRef = useRef<number>(1)
  const [, setGroupPosition] = useState({ x: 0, y: 0 })

  const handleZoom = (e: KonvaEventObject<WheelEvent>) => {
    const scaleBy = 1.08
    if (!stageRef.current) {
      return
    }
    e.evt.preventDefault()
    const oldScale = stageRef.current.scaleX()
    const pointer = stageRef.current.getPointerPosition()

    if (!pointer) {
      return
    }
    const mousePointTo = {
      x: (pointer.x - stageRef.current.x()) / oldScale,
      y: (pointer.y - stageRef.current.y()) / oldScale,
    }

    const direction = e.evt.deltaY > 0 ? 1 : -1

    const getNewScale = () => {
      if (direction > 0) {
        return oldScale * scaleBy
      }
      if (direction < 0 && oldScale < 1.01) {
        return oldScale
      }
      return oldScale / scaleBy
    }
    const newScale = getNewScale()
    stageRef.current.scale({ x: newScale, y: newScale })
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    }
    stageRef.current.position(newPos)
  }

  const handleTouchStart = (e: KonvaEventObject<TouchEvent>) => {
    e.evt.preventDefault()
    const touch1 = e.evt.touches[0]
    const touch2 = e.evt.touches[1]
    if (touch1 && touch2) {
      const dx = touch2.clientX - touch1.clientX
      const dy = touch2.clientY - touch1.clientY
      lastDistRef.current = Math.sqrt(dx * dx + dy * dy)
      lastScaleRef.current = stageRef.current?.scaleX() || 1 // 現在のスケールを保存
    }
  }

  const handleTouchMove = (e: KonvaEventObject<TouchEvent>) => {
    e.evt.preventDefault()
    const touch1 = e.evt.touches[0] // 225,241
    const touch2 = e.evt.touches[1] // 206,329
    if (touch1 && touch2) {
      const dx = touch2.clientX - touch1.clientX
      const dy = touch2.clientY - touch1.clientY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const scale = (distance / lastDistRef.current) * lastScaleRef.current
      stageRef.current?.scale({ x: scale, y: scale })

      // ピンチの中心を計算
      const center = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
      }

      // スケール変更による位置の補正
      const newPos = {
        x: center.x - ((stageRef.current?.width() ?? 0) / 2) * scale,
        y: center.y - ((stageRef.current?.height() ?? 0) / 2) * scale,
      }
      stageRef.current?.position(newPos)
      stageRef.current?.batchDraw() // 変更を適用
    }
  }

  const handleFitImage = () => {
    stageRef.current?.scale({ x: 1, y: 1 })
    groupRef.current?.position({
      x: stageSize.width / 2,
      y: stageSize.height / 2,
    })
    stageRef.current?.position({
      x: -frameSize.width / 2,
      y: -frameSize.height / 2,
    })
  }

  const handleDragEndGroup = (e: KonvaEventObject<DragEvent>) => {
    const newPosition = e.target.position()
    setGroupPosition(newPosition)
  }

  return {
    stageRef,
    groupRef,
    imageRef,
    circleRef,
    handleZoom,
    handleFitImage,
    handleTouchStart,
    handleTouchMove,
    handleDragEndGroup,
  }
}
