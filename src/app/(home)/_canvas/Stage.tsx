import { Stage as KonvaStage } from 'react-konva'

import type { Dimension } from '@/types'
import type Konva from 'konva'
import type { FC, MutableRefObject } from 'react'

type Props = {
  children: React.ReactNode
  stageRef: MutableRefObject<Konva.Stage | null>
  stageSize: Dimension
}

export const Stage: FC<Props> = ({ children, stageRef, stageSize }) => (
  <KonvaStage
    width={stageSize.width}
    height={stageSize.height}
    scaleX={1.0}
    scaleY={1.0}
    ref={stageRef}
    className='absolute'
    x={stageSize.width / 2}
    y={stageSize.height / 2}
  >
    {children}
  </KonvaStage>
)
