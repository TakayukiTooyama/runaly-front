'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { ORIGIN, canvasConfig } from '@/constants'

import type { CanvasViewState, Coordinate } from '@/types'

import {
  addPoints,
  calculateMousePositionOnElement,
  diffPoints,
  scalePoint,
} from './index'

const { maxZoom, maxZoomDelta, minZoom, zoomSensitivity } = canvasConfig

export const usePanZoomCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  canvasViewState: CanvasViewState,
  setCanvasViewState: (newCanvasViewState: CanvasViewState) => void,
): [
  CanvasRenderingContext2D | null,
  React.Dispatch<React.SetStateAction<CanvasRenderingContext2D | null>>,
  (event: React.MouseEvent | MouseEvent) => void,
] => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const mousePosRef = useRef<Coordinate>(ORIGIN)
  const lastMousePosRef = useRef<Coordinate>(ORIGIN)
  const lastCanvasViewState = useRef<CanvasViewState>(canvasViewState)

  // functions for panning
  const mouseMove = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      if (context) {
        // update mouse position
        const newMousePos = calculateMousePositionOnElement(
          event,
          context.canvas,
        )
        lastMousePosRef.current = mousePosRef.current
        mousePosRef.current = newMousePos

        const mouseDiff = scalePoint(
          diffPoints(mousePosRef.current, lastMousePosRef.current),
          canvasViewState.scale,
        )
        const newCanvasViewState = {
          offset: addPoints(lastCanvasViewState.current.offset, mouseDiff),
          scale: canvasViewState.scale,
        }
        setCanvasViewState(newCanvasViewState)
        lastCanvasViewState.current = newCanvasViewState
      }
    },
    [context, canvasViewState.scale, setCanvasViewState],
  )

  const mouseUp = useCallback(() => {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
  }, [mouseMove])

  const startPan = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      if (context) {
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
        mousePosRef.current = calculateMousePositionOnElement(
          event,
          context.canvas,
        )
      }
    },
    [context, mouseMove, mouseUp],
  )

  // add event listener on canvas for zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (context) {
        // update mouse position
        const newMousePos = calculateMousePositionOnElement(e, context.canvas)
        lastMousePosRef.current = mousePosRef.current
        mousePosRef.current = newMousePos

        // calculate new scale/zoom
        const zoomDelta = e.deltaY / zoomSensitivity
        const zoom =
          1 -
          (Math.abs(zoomDelta) > maxZoomDelta
            ? (zoomDelta / Math.abs(zoomDelta)) * maxZoomDelta
            : zoomDelta)
        const newScale = canvasViewState.scale * zoom
        if (newScale > maxZoom || newScale < minZoom) {
          return
        }

        // offset the canvas such that the point under the mouse doesn't move
        const lastMouse = scalePoint(mousePosRef.current, canvasViewState.scale)
        const newMouse = scalePoint(mousePosRef.current, newScale)
        const mouseOffset = diffPoints(lastMouse, newMouse)

        const newCanvasViewState = {
          offset: diffPoints(lastCanvasViewState.current.offset, mouseOffset),
          scale: newScale,
        }
        setCanvasViewState(newCanvasViewState)
        lastCanvasViewState.current = newCanvasViewState
      }
    }

    const canvasElem = canvasRef.current
    if (canvasElem) {
      lastCanvasViewState.current = canvasViewState
      canvasElem.addEventListener('wheel', handleWheel)
      return () => canvasElem.removeEventListener('wheel', handleWheel)
    }
  }, [canvasRef, canvasViewState, context, setCanvasViewState])

  return [context, setContext, startPan]
}
