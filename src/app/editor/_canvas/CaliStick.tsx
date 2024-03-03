import { Line } from 'react-konva'

import { useCalibrationStore, useCanvasSettingStore } from '@/lib/store'

import type { Scale } from '@/types'

type Props = {
  positionScale: Scale
}

export function CaliStick({ positionScale }: Props) {
  const radius = useCanvasSettingStore.use.radius()
  const opacity = useCanvasSettingStore.use.opacity()
  const caliMarkers = useCalibrationStore.use.caliMarkers()

  const stickPoints = [
    /* 左 */
    [
      caliMarkers['leftTop']?.x,
      caliMarkers['leftTop']?.y,
      caliMarkers['leftBottom']?.x,
      caliMarkers['leftBottom']?.y,
    ],
    /* 右 */
    [
      caliMarkers['rightTop']?.x,
      caliMarkers['rightTop']?.y,
      caliMarkers['rightBottom']?.x,
      caliMarkers['rightBottom']?.y,
    ],

    /* 上 */
    [
      caliMarkers['leftTop']?.x,
      caliMarkers['leftTop']?.y,
      caliMarkers['rightTop']?.x,
      caliMarkers['rightTop']?.y,
    ],
    /* 下 */
    [
      caliMarkers['leftBottom']?.x,
      caliMarkers['leftBottom']?.y,
      caliMarkers['rightBottom']?.x,
      caliMarkers['rightBottom']?.y,
    ],
  ]

  return (
    <>
      {stickPoints.map((points: (number | undefined)[], idx) => {
        if (!points[0] || !points[1] || !points[2] || !points[3]) {
          return
        }
        return (
          <Line
            key={idx}
            points={[
              points[0] / positionScale.x,
              points[1] / positionScale.y,
              points[2] / positionScale.x,
              points[3] / positionScale.y,
            ]}
            stroke='black'
            strokeWidth={radius - 0.5}
            opacity={opacity}
          />
        )
      })}
    </>
  )
}
