import { useCallback, useState } from 'react'

import { defaultCaliMarkerOption } from '@/constants'
import { useCalibrationStore } from '@/lib/store'

import type { Coordinate, Scale, CaliMarkerKey } from '@/types'
import type { KonvaEventObject } from 'konva/lib/Node'

export const useAnnotation = () => {
  const [isDraggable, setIsDraggable] = useState(true)
  const [mouseDownTime, setMouseDownTime] = useState(0)
  const actions = useCalibrationStore.use.actions()

  const handleMouseDownImage = () => {
    setMouseDownTime(Date.now())
  }

  const handleAnnotation = useCallback(
    (
      e: KonvaEventObject<MouseEvent | TouchEvent>,
      selectLabel: CaliMarkerKey | null,
      scale: Scale,
    ) => {
      const currentPosition = e.target.getRelativePointerPosition()
      if (!currentPosition || !selectLabel) return

      const timeDiff = Date.now() - mouseDownTime
      if (timeDiff < 250) {
        const newPosition: Coordinate = {
          x: Math.round(currentPosition.x * scale.x),
          y: Math.round(currentPosition.y * scale.y),
        }

        actions.updateCaliMarker(selectLabel, newPosition)
        actions.incrementCaliMarkerIndex()
      }
    },
    [mouseDownTime, actions],
  )

  const handleHoverCircle = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage()
    if (stage) {
      if (e.type === 'mouseenter') {
        stage.container().style.cursor = 'pointer'
      } else {
        stage.container().style.cursor = 'default'
      }
    }
  }

  const handleClickCircle = (
    _e: KonvaEventObject<MouseEvent>,
    selectLabel: CaliMarkerKey,
  ) => {
    const currentIndex = defaultCaliMarkerOption.findIndex(
      (option) => option.key === selectLabel,
    )
    actions.updateMarkerIndex(currentIndex)
  }

  const handleDragStartCircle = (
    _e: KonvaEventObject<DragEvent>,
    selectLabel: CaliMarkerKey,
  ) => {
    const currentIndex = defaultCaliMarkerOption.findIndex(
      (option) => option.key === selectLabel,
    )
    actions.updateMarkerIndex(currentIndex)
    setIsDraggable(false)
  }

  const handleDragEndCircle = (
    e: KonvaEventObject<DragEvent>,
    selectLabel: CaliMarkerKey,
    scale: Scale,
  ) => {
    setIsDraggable(true)
    const newPosition: Coordinate = {
      x: Math.round(e.target.x() * scale.x),
      y: Math.round(e.target.y() * scale.y),
    }
    actions.updateCaliMarker(selectLabel, newPosition)
  }

  return {
    isDraggable,
    handleMouseDownImage,
    handleHoverCircle,
    handleClickCircle,
    handleDragStartCircle,
    handleDragEndCircle,
    handleAnnotation,
  }
}
