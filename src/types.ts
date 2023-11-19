export type User = {
  userId: string
  name: string
  email: string
  icon: string
  videos: Video[]
  createdAt: Date
  updatedAt: Date
}

export type UploadVideo = {
  id: string
  name: string
  file: File
}

export type Video = {
  videoId: string
  name: string
  url: string
  keypoints: Keypoint[]
  fairMarker: FairMarker
  createdAt: Date
  updatedAt: Date
}

export type Coordinate = {
  x: number
  y: number
}

type KeypointNames =
  | 'head'
  | 'leftEar'
  | 'leftShoulder'
  | 'leftElbow'
  | 'leftWrist'
  | 'leftHip'
  | 'leftKnee'
  | 'leftAnkle'
  | 'leftToe'
  | 'leftHeel'
  | 'leftSmallToe'
  | 'rightEar'
  | 'rightShoulder'
  | 'rightElbow'
  | 'rightWrist'
  | 'rightHip'
  | 'rightKnee'
  | 'rightAnkle'
  | 'rightHeel'
  | 'rightToe'
  | 'rightSmallToe'

export type Keypoint = {
  [K in KeypointNames]: Coordinate
}

export type FairMarkerNames =
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'

export type FairMarker = {
  [K in FairMarkerNames]: Coordinate
}

/* 動画 */
export type VideoLength = {
  start: number
  end: number
}
export type VideoCrop = FairMarker
export type HumanCrop = FairMarker[]
