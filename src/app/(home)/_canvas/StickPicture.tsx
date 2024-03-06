/* eslint-disable import/no-default-export */
import { Line } from 'react-konva'

import { useCanvasSettingStore } from '@/lib/store'

import type { Marker, Scale } from '@/types'
import type { FC } from 'react'

type Props = {
  markers: Marker[]
  positionScale: Scale
}

export const StickPicture: FC<Props> = ({ positionScale, markers }) => {
  const radius = useCanvasSettingStore.use.radius()
  const opacity = useCanvasSettingStore.use.opacity()

  /* 全18本で構成されたスティックピクチャーの始点と終点 */
  const marker = markers.reduce<Marker>((acc, cur) => {
    // curがMarker型なので、curのキーごとにループしてマージする
    Object.keys(cur).forEach((key) => {
      acc[key] = cur[key]
    })
    return acc
  }, {})
  const stickPoints = [
    /* 右腕 */
    [
      marker['RShoulder']?.x,
      marker['RShoulder']?.y,
      marker['RElbow']?.x,
      marker['RElbow']?.y,
    ],
    [
      marker['RElbow']?.x,
      marker['RElbow']?.y,
      marker['RWrist']?.x,
      marker['RWrist']?.y,
    ],
    /* 左腕 */
    [
      marker['LShoulder']?.x,
      marker['LShoulder']?.y,
      marker['LElbow']?.x,
      marker['LElbow']?.y,
    ],
    [
      marker['LElbow']?.x,
      marker['LElbow']?.y,
      marker['LWrist']?.x,
      marker['LWrist']?.y,
    ],
    /* 体幹 */
    [
      marker['RShoulder']?.x,
      marker['RShoulder']?.y,
      marker['RHip']?.x,
      marker['RHip']?.y,
    ],
    [
      marker['RShoulder']?.x,
      marker['RShoulder']?.y,
      marker['LShoulder']?.x,
      marker['LShoulder']?.y,
    ],
    [
      marker['LShoulder']?.x,
      marker['LShoulder']?.y,
      marker['LHip']?.x,
      marker['LHip']?.y,
    ],
    [
      marker['RHip']?.x,
      marker['RHip']?.y,
      marker['LHip']?.x,
      marker['LHip']?.y,
    ],

    /* 右脚 */
    [
      marker['RHip']?.x,
      marker['RHip']?.y,
      marker['RKnee']?.x,
      marker['RKnee']?.y,
    ],
    [
      marker['RKnee']?.x,
      marker['RKnee']?.y,
      marker['RAnkle']?.x,
      marker['RAnkle']?.y,
    ],
    // [
    //   marker['RAnkle']?.x,
    //   marker['RAnkle']?.y,
    //   marker['RHeel']?.x,
    //   marker['RHeel']?.y,
    // ],
    [
      marker['RAnkle']?.x,
      marker['RAnkle']?.y,
      marker['RBigToe']?.x,
      marker['RBigToe']?.y,
    ],

    /* 左脚 */
    [
      marker['LHip']?.x,
      marker['LHip']?.y,
      marker['LKnee']?.x,
      marker['LKnee']?.y,
    ],
    [
      marker['LKnee']?.x,
      marker['LKnee']?.y,
      marker['LAnkle']?.x,
      marker['LAnkle']?.y,
    ],
    // [
    //   marker['LAnkle']?.x,
    //   marker['LAnkle']?.y,
    //   marker['LHeel']?.x,
    //   marker['LHeel']?.y,
    // ],
    [
      marker['LAnkle']?.x,
      marker['LAnkle']?.y,
      marker['LBigToe']?.x,
      marker['LBigToe']?.y,
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
            stroke='white'
            strokeWidth={radius - 0.5}
            opacity={opacity}
          />
        )
      })}
    </>
  )
}
