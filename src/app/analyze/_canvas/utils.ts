import { Coordinate, MarkerFillColor } from '@/types'

import type { BodyPartsKey, Keypoint } from '@/types'

export const calculateMousePositionOnElement = (
  event: React.MouseEvent | MouseEvent,
  element: HTMLElement,
) => {
  const viewportMousePos = { x: event.pageX, y: event.pageY }
  const boundingRect = element.getBoundingClientRect()
  const topLeftCanvasPos = { x: boundingRect.left, y: boundingRect.top }
  return diffPoints(viewportMousePos, topLeftCanvasPos)
}

export const getMarkerColor = (part: BodyPartsKey): MarkerFillColor => {
  switch (part) {
    case 'Head':
    case 'REar':
    case 'LEar':
      return 'purple'
    case 'RShoulder':
    case 'RElbow':
    case 'RWrist':
      return 'yellow'
    case 'LShoulder':
    case 'LElbow':
    case 'LWrist':
      return 'orange'
    case 'RHip':
    case 'RKnee':
    case 'RAnkle':
    case 'RToe':
    case 'RHeel':
      return 'blue'
    case 'LHip':
    case 'LKnee':
    case 'LAnkle':
    case 'LToe':
    case 'LHeel':
      return 'green'
    default:
      return 'black'
  }
}

export const drawMarkers = (
  context: CanvasRenderingContext2D,
  keypoint: Keypoint,
  canvasWidth: number,
  canvasHeight: number,
  videoWidth: number,
  videoHeight: number,
) => {
  Object.entries(keypoint).forEach(([key, coordinate]) => {
    if (coordinate['x'] !== null && coordinate['y'] !== null) {
      context.beginPath()
      context.globalAlpha = 0.6
      context.fillStyle = getMarkerColor(key as BodyPartsKey)
      context.arc(
        coordinate['x'] * (canvasWidth / videoWidth),
        coordinate['y'] * (canvasHeight / videoHeight),
        8,
        0,
        2 * Math.PI,
      )
      context.fill()
    }
  })
}

export const drawMarker = (
  context: CanvasRenderingContext2D,
  bodyPart: BodyPartsKey,
  xy: [number, number],
  canvasWidth: number,
  canvasHeight: number,
  videoWidth: number,
  videoHeight: number,
) => {
  context.beginPath()
  context.fillStyle = getMarkerColor(bodyPart)
  context.arc(
    xy[0] * (canvasWidth / videoWidth),
    xy[1] * (canvasHeight / videoHeight),
    8,
    0,
    2 * Math.PI,
  )
  context.fill()
}

export const drawStickPicture = (
  context: CanvasRenderingContext2D,
  keypoint: Keypoint,
  canvasWidth: number,
  canvasHeight: number,
  videoWidth: number,
  videoHeight: number,
) => {
  /* 全18本で構成されたスティックピクチャーの始点と終点 */
  const stickPoints = [
    /* 右腕（右肩 - 右肘 - 右手首）  */
    [
      keypoint['RShoulder']['x'], // 始点X
      keypoint['RShoulder']['y'], // 始点Y
      keypoint['RElbow']['x'], // 終点X
      keypoint['RElbow']['y'], // 終点Y
    ],
    [
      keypoint['RElbow']['x'],
      keypoint['RElbow']['y'],
      keypoint['RWrist']['x'],
      keypoint['RWrist']['y'],
    ],
    /* 左腕（左肩 - 左肘 - 左手首） */
    [
      keypoint['LShoulder']['x'],
      keypoint['LShoulder']['y'],
      keypoint['LElbow']['x'],
      keypoint['LElbow']['y'],
    ],
    [
      keypoint['LElbow']['x'],
      keypoint['LElbow']['y'],
      keypoint['LWrist']['x'],
      keypoint['LWrist']['y'],
    ],

    /* 体幹（左肩 - 右肩 - 右大転子 - 左大転子） */
    [
      keypoint['RShoulder']['x'],
      keypoint['RShoulder']['y'],
      keypoint['RHip']['x'],
      keypoint['RHip']['y'],
    ],
    [
      keypoint['RShoulder']['x'],
      keypoint['RShoulder']['y'],
      keypoint['LShoulder']['x'],
      keypoint['LShoulder']['y'],
    ],
    [
      keypoint['LShoulder']['x'],
      keypoint['LShoulder']['y'],
      keypoint['LHip']['x'],
      keypoint['LHip']['y'],
    ],
    [
      keypoint['RHip']['x'],
      keypoint['RHip']['y'],
      keypoint['LHip']['x'],
      keypoint['LHip']['y'],
    ],

    /* 右脚（右大転子 - 右膝 - 右足首 - 右つま先 - 右踵） */
    [
      keypoint['RHip']['x'],
      keypoint['RHip']['y'],
      keypoint['RKnee']['x'],
      keypoint['RKnee']['y'],
    ],
    [
      keypoint['RKnee']['x'],
      keypoint['RKnee']['y'],
      keypoint['RAnkle']['x'],
      keypoint['RAnkle']['y'],
    ],
    [
      keypoint['RAnkle']['x'],
      keypoint['RAnkle']['y'],
      keypoint['RHeel']['x'],
      keypoint['RHeel']['y'],
    ],
    [
      keypoint['RAnkle']['x'],
      keypoint['RAnkle']['y'],
      keypoint['RToe']['x'],
      keypoint['RToe']['y'],
    ],

    /* 左脚（左大転子 - 左膝 - 左足首 - 左つま先 - 左踵） */
    [
      keypoint['LHip']['x'],
      keypoint['LHip']['y'],
      keypoint['LKnee']['x'],
      keypoint['LKnee']['y'],
    ],
    [
      keypoint['LKnee']['x'],
      keypoint['LKnee']['y'],
      keypoint['LAnkle']['x'],
      keypoint['LAnkle']['y'],
    ],
    [
      keypoint['LAnkle']['x'],
      keypoint['LAnkle']['y'],
      keypoint['LHeel']['x'],
      keypoint['LHeel']['y'],
    ],
    [
      keypoint['LAnkle']['x'],
      keypoint['LAnkle']['y'],
      keypoint['LToe']['x'],
      keypoint['LToe']['y'],
    ],
  ]

  stickPoints.forEach((points: (number | null)[]) => {
    if (points[0] !== null) {
      context.beginPath()
      context.lineWidth = 4
      context.strokeStyle = 'white'
      context.moveTo(
        points[0]! * (canvasWidth / videoWidth),
        points[1]! * (canvasHeight / videoHeight),
      )
      context.lineTo(
        points[2]! * (canvasWidth / videoWidth),
        points[3]! * (canvasHeight / videoHeight),
      )
      context.stroke()
    }
  })
}

export const drawVideoOneFrame = (
  context: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  canvasWidth: number,
  canvasHeight: number,
) => {
  context.drawImage(video, 0, 0, canvasWidth, canvasHeight)
}

export const clearCanvas = (
  context: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
) => {
  context.clearRect(0, 0, canvasWidth, canvasHeight)
}

/* マーカー */
export const roundToNearestTenth = (input: number): number =>
  Math.round(input * 10) / 10

export const roundToNearestHundredth = (input: number): number =>
  Math.round(input * 100) / 100

export const makePoint = (x: number, y: number): Coordinate => ({ x, y })

export const addPoints = (p1: Coordinate, p2: Coordinate): Coordinate => ({
  x: p1.x + p2.x,
  y: p1.y + p2.y,
})

export const diffPoints = (p1: Coordinate, p2: Coordinate): Coordinate => ({
  x: p1.x - p2.x,
  y: p1.y - p2.y,
})

export const scalePoint = (p1: Coordinate, scale: number): Coordinate => ({
  x: p1.x / scale,
  y: p1.y / scale,
})
