import { ComponentType, ReactNode } from 'react'

import { BODY_PARTS, CALIBRATION_MARKER } from '@/constants'

/* ユーザー情報 */
export type User = {
  userId: string
  name: string
  email: string
  icon: string
  videos: Video[]
  createdAt: Date
  updatedAt: Date
}

/* 動画情報 */
export type Video = {
  videoId: string
  name: string
  url: string
  keypoints: Keypoint[]
  caliMarkers: CaliMarkers
  createdAt: Date
  updatedAt: Date
}

export type Dimension = {
  width: number
  height: number
}

/* アップロード動画情報 */
export type UploadVideo = {
  id: string
  name: string
  file: File
}

/* 座標 */
export type Coordinate = {
  x: number
  y: number
}

/* キャンバスのスケール */
export type Scale = Coordinate

/* 公正マーカー */
export type CaliMarkerKey = keyof typeof CALIBRATION_MARKER
export type CaliMarkerLabel =
  (typeof CALIBRATION_MARKER)[keyof typeof CALIBRATION_MARKER]
export type CaliMarkers = {
  [Key in CaliMarkerKey]: Coordinate | null
}
export type CaliMarker = {
  key: CaliMarkerKey
  label: CaliMarkerLabel
  coordinate: Coordinate | null
}

export type Marker = {
  [key: string]: Coordinate | null
}

/* キーポイント */
export type BodyPartsKey = keyof typeof BODY_PARTS
export type BodyPartsLabel = (typeof BODY_PARTS)[keyof typeof BODY_PARTS]
export type Keypoint = {
  [key in keyof typeof BODY_PARTS]: { x: number; y: number }
}
// export type Keypoint = {
//   [Key in BodyPartsKey]: [number, number] | [null, null]
// }

export type KeypointKeyValue = [BodyPartsKey, [number, number] | [null, null]]

/* 動画のトリミング情報 */
export type VideoTime = {
  start: number
  end: number
}

/* 動画のクロップ情報 */
export type FrameCrop = {
  x: number
  y: number
  width: number
  height: number
}

/* 動画の上下クロップ */
export type VideoBBox = FrameCrop

/* 姿勢推定範囲の人物クロップ */
export type HumanBBox = FrameCrop[]

/* キャンパス情報 */
export type CanvasViewState = {
  offset: Coordinate
  scale: number
}
export type CanvasState = {
  canvasHeight: number
  canvasViewState: CanvasViewState
  canvasWidth: number
  context: CanvasRenderingContext2D | null
}
export type MarkerFillColor =
  | 'purple'
  | 'yellow'
  | 'orange'
  | 'blue'
  | 'green'
  | 'black'

export type Frame = {
  id: string
  name: string
  dimension: Dimension
  videoName: string
}

export type MarkerSetting = {
  radius: number
  opacity: number
  options: MarkerOption[]
}

export type MarkerOption = {
  key: string
  label: string
  color: string
}

type AnyComponent<T> = ComponentType<T> | ((props: T) => ReactNode)
export type CompProps<T> =
  | {
      lazyComponent: () => Promise<{ default: AnyComponent<T> }>
    }
  | {
      component: AnyComponent<T>
    }

/* グラフ */
type ChartData = {
  time: number
  [key: string]: number
}

export type RechartsDotPayload = {
  cursor: string
  cx: number
  cy: number
  dataKey: string
  fill: string
  index: number
  payload: ChartData
  r: number
  stroke: string
  strokeWidth: number
  value: number
}

export type ResponseData = {
  keypoints: Keypoint[]
  cogs: [number, number][]
  cogVelocities: number[]
  trunkAngles: number[]
  rightHipFlexionAngles: number[]
  leftHipFlexionAngles: number[]
  stepLengths: number[]
}
