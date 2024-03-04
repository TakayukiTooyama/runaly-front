'use client'

import { Image } from 'react-konva'

import { useCalibrationStore } from '@/lib/store'
import { Button } from '@/ui/button'

import { CaliStick } from './CaliStick'
import { Markers } from './Markers'
import { useAnnotation } from './useAnnotation'
import { useCanvasOperation } from './useCanvasOperation'
import { useFrameSize } from './useFrameSize'

import type { CaliMarkerKey, Dimension } from '@/types'

import { GroupLayer, Stage } from './index'

type Props = {
  stageSize: Dimension
  videoSize: Dimension
  selectedCanvas: HTMLCanvasElement
}

const caliMarkerKey: CaliMarkerKey[] = [
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom',
  'origin',
]

function AnnotationCanvas({ stageSize, videoSize, selectedCanvas }: Props) {
  const { frameSize, positionScale } = useFrameSize(stageSize, videoSize)
  const caliMarkers = useCalibrationStore.use.caliMarkers()
  const currentMarkerIndex = useCalibrationStore.use.currentMarkerIndex()

  const {
    stageRef,
    groupRef,
    imageRef,
    circleRef,
    handleZoom,
    handleTouchStart,
    handleTouchMove,
    handleFitImage,
    handleDragEndGroup,
  } = useCanvasOperation(stageSize, stageSize)

  const {
    isDraggable,
    handleMouseDownImage,
    handleAnnotation,
    handleHoverCircle,
    handleClickCircle,
    handleDragStartCircle,
    handleDragEndCircle,
  } = useAnnotation()

  return (
    <>
      <Stage stageRef={stageRef} stageSize={stageSize}>
        <GroupLayer
          groupRef={groupRef}
          isDraggable={isDraggable}
          frameSize={frameSize}
          onZoom={handleZoom}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onDragEndGroup={handleDragEndGroup}
        >
          <Image
            ref={imageRef}
            width={frameSize.width}
            height={frameSize.height}
            image={selectedCanvas}
            onMouseUp={(e) =>
              handleAnnotation(
                e,
                caliMarkerKey[currentMarkerIndex],
                positionScale,
              )
            }
            onMouseDown={handleMouseDownImage}
            onTouchStart={handleMouseDownImage}
            onTouchEnd={(e) =>
              handleAnnotation(
                e,
                caliMarkerKey[currentMarkerIndex],
                positionScale,
              )
            }
            alt=''
          />
          <CaliStick positionScale={positionScale} />
          <Markers
            circleRef={circleRef}
            markers={caliMarkers}
            positionScale={positionScale}
            onHoverCursor={handleHoverCircle}
            onClickCircle={handleClickCircle}
            onDragStart={handleDragStartCircle}
            onDragEnd={handleDragEndCircle}
          />
        </GroupLayer>
      </Stage>
      <div className='absolute bottom-4 right-4'>
        <Button
          size='sm'
          className='w-12 rounded-sm opacity-90'
          onClick={handleFitImage}
        >
          Fit
        </Button>
      </div>
    </>
  )
}

export default AnnotationCanvas
