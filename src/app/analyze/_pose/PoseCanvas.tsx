import { Stage, Layer, Circle, Line } from 'react-konva'

import { useFrameSize } from '@/app/editor/_canvas/useFrameSize'
import { defaultMarkerOption } from '@/constants'
import { strictEntries } from '@/lib/utils'
import { BodyPartsKey, Dimension, Keypoint, MarkerOption } from '@/types'

type Props = {
  keypoint: Keypoint
  stageSize: Dimension
  videoSize: Dimension
  direction: 'left' | 'right'
}

export type Connection = [BodyPartsKey, BodyPartsKey]

function PoseCanvas({ keypoint, stageSize, videoSize, direction }: Props) {
  const { positionScale } = useFrameSize(stageSize, videoSize)
  const connections: Connection[] = [
    // 胴体
    ['RShoulder', 'LShoulder'],
    ['RShoulder', 'RHip'],
    ['LShoulder', 'LHip'],
    ['LHip', 'RHip'],

    // 右腕
    ['RShoulder', 'RElbow'],
    ['RElbow', 'RWrist'],

    // 左腕
    ['LShoulder', 'LElbow'],
    ['LElbow', 'LWrist'],

    // 右脚
    ['RHip', 'RKnee'],
    ['RKnee', 'RAnkle'],
    ['RAnkle', 'RHeel'],
    ['RAnkle', 'RToe'],
    ['RHeel', 'RToe'],

    // 左脚
    ['LHip', 'LKnee'],
    ['LKnee', 'LAnkle'],
    ['LAnkle', 'LHeel'],
    ['LAnkle', 'LToe'],
    ['LHeel', 'LToe'],
  ]

  // RHip-他の関節を計算し、RHipを中心にした座標をCanvas上に描画させる
  const adjustedKeypoint = strictEntries<Keypoint>(keypoint).reduce(
    (acc, [key, coordinate]) => {
      if (!coordinate?.x || !coordinate.y) return acc
      const hip = direction === 'left' ? 'LHip' : 'RHip'
      const x = coordinate.x - keypoint[hip].x
      const y = coordinate.y - keypoint[hip].y
      return {
        ...acc,
        [key]: { x, y },
      }
    },
    {} as Keypoint,
  )

  const lines = connections.map((connection, index) => {
    const from = adjustedKeypoint[connection[0]]
    const to = adjustedKeypoint[connection[1]]
    // 関節が存在する場合のみ線を描画
    return from && to ? (
      <Line
        key={`line-${index}`}
        points={[
          from.x / positionScale.x,
          from.y / positionScale.y,
          to.x / positionScale.x,
          to.y / positionScale.y,
        ]}
        stroke='white'
        strokeWidth={2}
        lineCap='round'
        lineJoin='round'
      />
    ) : null
  })

  const markers = strictEntries<Keypoint>(adjustedKeypoint).map(
    ([key, coordinate], index) => {
      if (!coordinate?.x || !coordinate.y) return null

      const fill = defaultMarkerOption.find(
        (markerOption: MarkerOption) => markerOption.key === key,
      )?.color

      return (
        <Circle
          key={`${index}-${key}`}
          x={coordinate.x / positionScale.x}
          y={coordinate.y / positionScale.y}
          radius={2.5}
          fill={fill}
        />
      )
    },
  )

  return (
    <Stage
      width={stageSize.width}
      height={stageSize.height}
      x={stageSize.width / 2}
      y={stageSize.height / 2}
      draggable
    >
      <Layer>
        {lines}
        {markers}
      </Layer>
    </Stage>
  )
}

export default PoseCanvas
