/* eslint-disable import/no-default-export */

import { Group, Layer } from 'react-konva'

import type { Dimension } from '@/types'
import type Konva from 'konva'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { FC, MutableRefObject } from 'react'

type Props = {
  children: React.ReactNode
  isDraggable: boolean
  groupRef: MutableRefObject<Konva.Group | null>
  frameSize: Dimension
  onZoom: (e: KonvaEventObject<WheelEvent>) => void
  onTouchStart: (e: KonvaEventObject<TouchEvent>) => void
  onTouchMove: (e: KonvaEventObject<TouchEvent>) => void
  onDragEndGroup: (e: KonvaEventObject<DragEvent>) => void
}

export const GroupLayer: FC<Props> = ({
  children,
  isDraggable,
  groupRef,
  frameSize,
  onZoom,
  onTouchStart,
  onTouchMove,
  onDragEndGroup,
}) => (
  <Layer key='background'>
    <Group
      ref={groupRef}
      draggable={isDraggable}
      x={-frameSize.width / 2}
      y={-frameSize.height / 2}
      onWheel={onZoom}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onDragEnd={onDragEndGroup}
    >
      {children}
    </Group>
  </Layer>
)
