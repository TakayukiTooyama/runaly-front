import { KonvaEventObject } from 'konva/lib/Node'
import { Circle } from 'react-konva'

import { defaultCaliMarkerOption } from '@/constants'
import { useCanvasSettingStore } from '@/lib/store'
import { strictEntries } from '@/lib/utils'

import type { CaliMarkerKey, CaliMarkers, MarkerOption, Scale } from '@/types'
import type Konva from 'konva'
import type { MutableRefObject } from 'react'

type Props = {
  markers: CaliMarkers
  circleRef: MutableRefObject<Konva.Circle | null>
  positionScale: Scale
  onHoverCursor: (e: KonvaEventObject<MouseEvent>) => void
  onDragStart: (
    e: KonvaEventObject<DragEvent>,
    selectLabel: CaliMarkerKey,
  ) => void
  onClickCircle: (
    e: KonvaEventObject<MouseEvent>,
    selectLabel: CaliMarkerKey,
  ) => void
  onDragEnd: (
    e: KonvaEventObject<DragEvent>,
    selectLabel: CaliMarkerKey,
    scale: Scale,
  ) => void
}

export function Markers({
  markers,
  circleRef,
  positionScale,
  onHoverCursor,
  onClickCircle,
  onDragStart,
  onDragEnd,
}: Props) {
  const radius = useCanvasSettingStore.use.radius()
  const opacity = useCanvasSettingStore.use.opacity()

  return (
    <>
      {strictEntries(markers).map(([key, coordinate]) => {
        if (!coordinate?.x || !coordinate.y) return null

        const fill = defaultCaliMarkerOption.find(
          (markerOption: MarkerOption) => markerOption.key === key,
        )?.color

        return (
          <Circle
            key={key}
            ref={circleRef}
            x={coordinate.x / positionScale.x}
            y={coordinate.y / positionScale.y}
            radius={radius - 0.5} // 最小が1だと大きすぎるため
            opacity={opacity}
            fill={fill}
            draggable
            onClick={(e) => onClickCircle(e, key)}
            onMouseEnter={onHoverCursor}
            onMouseLeave={onHoverCursor}
            onDragStart={(e) => onDragStart(e, key)}
            onDragEnd={(e) => onDragEnd(e, key, positionScale)}
          />
        )
      })}
    </>
  )
}
