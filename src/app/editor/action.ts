'use server'

// import { KEYPOINTS } from '@/constants'

import type { CaliMarker, HumanBBox, VideoTime } from '@/types'

// export async function analyzeVideo(
//   prevState: Keypoint[],
//   formData: FormData,
//   humanCropArea: HumanBBox,
//   videoTime: VideoTime,
//   caliMarker: CaliMarker,
//   caliWidth: number,
// ) {
//   formData.append(
//     'data',
//     JSON.stringify({
//       humanCropArea,
//       videoTime,
//       caliMarker,
//       caliWidth,
//     }),
//   )

//   const res = await fetch('http://0.0.0.0:8000/analyze', {
//     method: 'POST',
//     body: formData,
//     cache: 'no-store',
//   })
//   if (!res.ok) return prevState
//   // return KEYPOINTS
//   return res.json()
// }

export async function analyzeVideo(
  videoFile: File,
  humanBBox: HumanBBox,
  videoTime: VideoTime,
  caliMarker: CaliMarker,
  caliWidth: number,
) {
  const formData = new FormData()
  formData.append('video', videoFile)
  formData.append(
    'data',
    JSON.stringify({
      humanBBox,
      videoTime,
      caliMarker,
      caliWidth,
    }),
  )

  const res = await fetch('http://0.0.0.0:8000/analyze', {
    method: 'POST',
    body: formData,
    cache: 'no-store',
  })
  if (!res.ok) return undefined
  return res.json()
}

// export async function analyzeVideo(prevState: Keypoint[], formData: FormData) {
//   // 人物のクロップ
//   const humanCropArea = { x: 0, y: 0, width: 0, height: 0 }
//   // 動画の開始と終了
//   const videoTime = { start: 0, end: 2 }
//   // 公正マーカー
//   const fairMarker: CaliMarker = {
//     leftTop: { x: 0, y: 0 },
//     leftBottom: { x: 0, y: 0 },
//     rightTop: { x: 0, y: 0 },
//     rightBottom: { x: 0, y: 0 },
//   }

//   const data = {
//     humanCropArea,
//     videoTime,
//     fairMarker,
//   }
//   formData.append('data', JSON.stringify(data))

//   try {
//     // const response = await fetch('http://0.0.0.0:8000/analyze', {
//     //   method: 'POST',
//     //   body: formData,
//     //   cache: 'no-store',
//     // })
//     // if (!response.ok) {
//     //   throw new Error(`エラー: ${response.status}`)
//     // }
//     // const data = await response.json()
//     // console.log(data.keypoints)
//     return KEYPOINTS
//   } catch (error) {
//     console.error('動画アップロード失敗:', error)
//     return prevState
//   }
// }

// export async function uploadFile(prevState: string, formData: FormData) {
//   // 人物のクロップ
//   const humanCropArea = { x: 0, y: 0, width: 0, height: 0 }
//   // 動画のクロップ
//   const videoCropArea = {
//     x: 0, // 左上のx座標
//     y: 300, // 左上のy座標
//     width: 1920,
//     height: 700,
//   }
//   // 動画の開始と終了
//   const videoTime = { start: 0, end: 2 }
//   // 公正マーカー
//   const fairMarker: CaliMarker = {
//     leftTop: { x: 0, y: 0 },
//     leftBottom: { x: 0, y: 0 },
//     rightTop: { x: 0, y: 0 },
//     rightBottom: { x: 0, y: 0 },
//   }

//   const data = {
//     humanCropArea,
//     videoCropArea,
//     videoTime,
//     fairMarker,
//   }
//   formData.append('data', JSON.stringify(data))

//   try {
//     const response = await fetch('http://0.0.0.0:8000/analyze', {
//       method: 'POST',
//       body: formData,
//       cache: 'no-store',
//     })
//     if (!response.ok) {
//       throw new Error(`エラー: ${response.status}`)
//     }
//     const videoBlob = await response.blob()
//     console.log(videoBlob.size)
//     console.log(videoBlob.type)
//     const videoUrl = URL.createObjectURL(videoBlob)
//     // const data = await response.json()
//     // console.log('videoBlob', videoBlob)
//     // console.log('videoUrl', videoUrl)
//     return videoUrl
//   } catch (error) {
//     console.error('動画アップロード失敗:', error)
//     return prevState
//   }
// }
