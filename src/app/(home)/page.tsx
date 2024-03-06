'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useCalibrationStore } from '@/lib/store'
import { useKeypointStore } from '@/lib/store/useKeypointStore'
import { useVideoStore } from '@/lib/store/useVideoStore'
import { Button } from '@/ui/button'

import { Calibration } from './Calibration'
import { HumanCropper } from './HumanCropper'
import { Stepper } from './Stepper'
import { VideoFileUploader } from './VideoFileUploader'
import { useCaptureFrame } from './useCaptureFrame'

import type { CaliMarkers, ResponseData } from '@/types'
import type { Area, Point } from 'react-easy-crop'

async function analyzeVideo(
  videoFile: File,
  humanBBox: Area,
  caliMarkers: CaliMarkers,
  caliWidth: number,
): Promise<ResponseData | undefined> {
  const formData = new FormData()
  formData.append('file', videoFile)
  formData.append(
    'data',
    JSON.stringify({
      humanBBox,
      caliMarkers,
      caliWidth,
    }),
  )

  const res = await fetch('https://runaly.fly.dev/analyze', {
    method: 'POST',
    body: formData,
    cache: 'no-store',
  })
  if (!res.ok) return undefined
  return res.json()
}

export default function EditorPage() {
  /* Global State */
  const video = useVideoStore.use.video()
  const caliMarkers = useCalibrationStore.use.caliMarkers()
  const setVideoFile = useVideoStore.use.actions().setVideoFile
  const setAllData = useKeypointStore.use.actions().setAllData

  /* Local State */
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [humanBBox, setHumanBBox] = useState<Area>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [caliWidth, setCaliWidth] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  /* Custom Hooks */
  const { frameUrl, frame, captureFrame } = useCaptureFrame()

  /* Elements */
  const videoEditElements = [
    <VideoFileUploader
      key='fileUploader'
      videoUrl={video ? video.url : ''}
      setVideoFile={setVideoFile}
    />,
    <HumanCropper
      key='humanCropper'
      frameUrl={frameUrl}
      crop={crop}
      zoom={zoom}
      setCrop={setCrop}
      setZoom={setZoom}
      setHumanBBox={setHumanBBox}
    />,
    <Calibration
      key='calibration'
      frame={frame}
      caliWidth={caliWidth}
      setCaliWidth={setCaliWidth}
    />,
  ]

  const isValidCaliMarker = (caliMarkers: CaliMarkers) => {
    return Object.values(caliMarkers).some((coordinate) => coordinate === null)
  }

  const analyze = async () => {
    try {
      setIsLoading(true)
      const data = await analyzeVideo(
        video!.file!,
        humanBBox,
        caliMarkers,
        caliWidth,
      )
      if (!data) {
        console.error('No data returned from analysis')
        setIsLoading(false)
        return
      }
      setAllData(data)
      router.push('/analyze')
    } catch (error) {
      console.error('An error occurred during the analysis:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && (
        <div className='fixed inset-0 z-10 grid h-screen w-screen place-content-center  bg-black/80 text-white'>
          <div className='flex animate-pulse items-center space-x-2'>
            <div className='  text-2xl'>Loading...</div>
            <div className='flex justify-center' aria-label='読み込み中'>
              <div className='h-8 w-8 animate-spin rounded-xl bg-white'></div>
            </div>
          </div>
        </div>
      )}
      <div className='mx-auto flex w-full max-w-5xl flex-col items-center justify-center bg-white'>
        {/* ステッパー */}
        <div className='flex w-full max-w-md justify-between p-8'>
          <Stepper step={0} currentStep={step} />
          <Stepper step={1} currentStep={step} />
          <Stepper step={2} currentStep={step} />
        </div>

        <div className='w-full p-4'>{videoEditElements[step]}</div>

        {/* ボタン */}
        <div className='flex w-full justify-between p-8'>
          <Button
            variant='secondary'
            onClick={() => setStep((prevStep) => prevStep - 1)}
            className='rounded-full px-4 py-2 text-slate-400 hover:text-slate-700'
            disabled={step === 0}
          >
            戻る
          </Button>
          <Button
            onClick={async () => {
              if (step === 0) {
                captureFrame(video ? video.url : '')
              }
              if (step === 2) {
                return analyze()
              }
              return setStep((prevStep) => prevStep + 1)
            }}
            className={`${
              step > 4 ? 'pointer-events-none opacity-50' : ''
            } bg flex items-center justify-center rounded-full bg-blue-500 px-4 py-2 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
            disabled={
              (step === 0 && video && !video.file) ||
              (step === 1 && !humanBBox) ||
              (step === 2 &&
                (isNaN(caliWidth) ||
                  caliWidth === 0 ||
                  isValidCaliMarker(caliMarkers)))
            }
          >
            次へ
          </Button>
        </div>
      </div>
    </>
  )
}
