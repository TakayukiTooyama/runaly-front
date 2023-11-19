'use server'

import { Keypoint } from '@/types'

export async function uploadFile(prevState: Keypoint[], formData: FormData) {
  // TODO:公正マーカー, 人物の切り取り, 動画の長さも渡ってくる

  try {
    const response = await fetch('http://0.0.0.0:8080/analyze-video/', {
      method: 'POST',
      body: formData,
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const data = (await response.json()) as Keypoint[]
    console.log(data)
    return data
  } catch (error) {
    console.error('Error uploading file:', error)
    return prevState
  }
}
