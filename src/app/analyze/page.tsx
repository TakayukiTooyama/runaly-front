'use client'
import './style.css'

import { useMeasure } from '@uidotdev/usehooks'
import useEmblaCarousel from 'embla-carousel-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { usePersistStore } from '@/lib/store'
import { useKeypointStoreBase } from '@/lib/store/useKeypointStore'
import { RechartsDotPayload } from '@/types'
import { LineChart } from '@/ui/Chart/LineChart'
import { Slider } from '@/ui/slider'

// import { PlayerOnCanvas } from './_canvas'

const PoseCanvas = dynamic(() => import('./_pose/PoseCanvas'), {
  ssr: false,
})

export default function AnalyzePage() {
  /* Global State */
  const keypointState = usePersistStore(useKeypointStoreBase, (state) => state)
  // const video = useVideoStore((state) => state.video)

  /* Local State */
  // const [ratio, setRatio] = useState(1.0)
  // useEffect(() => {
  //   setRatio(window.devicePixelRatio)
  // }, [])

  /* Custom Hook */
  // Playerの親要素の幅を取得
  const [divRef, { width, height }] = useMeasure<HTMLDivElement>()
  const [emblaRef] = useEmblaCarousel()

  // Playerの描画を遅延させる
  // const lazyComponent = () =>
  //   new Promise<{ default: ComponentType<unknown> }>((resolve) => {
  //     setTimeout(
  //       () =>
  //         resolve({
  //           // Player上のCanvasはここに記載されている
  //           default: PlayerOnCanvas as ComponentType<unknown>,
  //         }),
  //       2000,
  //     )
  //   })

  /* Chart */
  const handleClickDot = (payload: unknown): void => {
    const dotPayload = payload as Record<keyof RechartsDotPayload, unknown>
    if (!dotPayload.index) return
    console.log(dotPayload.index as number)
    setCurrentFrameIndex(dotPayload.index as number)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleMoveMouse = (payload: any): void => {
  //   if (!payload.activeTooltipIndex) return
  //   setCurrentFrameIndex(payload.activeTooltipIndex as number)
  // }
  const fps = 60
  const maxFrameIndex = keypointState ? keypointState.keypoints.length - 1 : 0
  const times = Array.from({ length: maxFrameIndex }, (_, i) =>
    Number(((1 / fps) * i).toFixed(3)),
  )

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  // バックエンドで外れ値を除去した状態でHipを引いて絶対値が一番大きいx,yを保持しておく
  const maxSize = 400

  return (
    <>
      <div className='mx-auto aspect-square max-h-60 bg-black/90' ref={divRef}>
        {keypointState && width && height && (
          <PoseCanvas
            direction='right'
            stageSize={{ width: height, height: height }}
            videoSize={{ width: maxSize, height: maxSize }}
            keypoint={keypointState.keypoints[currentFrameIndex]}
          />
        )}
      </div>
      <div className='mx-auto mt-3 w-[60%]'>
        <Slider
          value={[currentFrameIndex]}
          max={maxFrameIndex}
          step={1}
          onValueChange={(value) => setCurrentFrameIndex(value[0])}
        />
      </div>
      {/* <div ref={divRef} className='mx-auto aspect-square max-w-sm bg-gray-300'> */}
      {/* <Player
          lazyComponent={lazyComponent}
          durationInFrames={nFrames}
          playerWidth={width ?? 0}
          videoUrl={video.url}
          videoHeight={video.dimension.height}
          videoWidth={video.dimension.width}
          keypoints={keypointState?.keypoints}
        /> */}
      {/* </div> */}
      {/* グラフ */}
      <div className='p-6 pl-0'>
        <div className='embla' ref={emblaRef}>
          {keypointState ? (
            <div className='embla__container'>
              <div className='embla__slide'>
                <div className='h-48 w-full'>
                  <LineChart
                    xDataKey='time'
                    yDataKey='cogVelocities'
                    xLabel='経過時間(s)'
                    yLabel='重心速度(m/s)'
                    data={keypointState.cogVelocities}
                    times={times}
                    handleClickDot={handleClickDot}
                    // handleMoveMouse={handleMoveMouse}
                  />
                </div>
                <div className='h-48 w-full'>
                  <LineChart
                    xDataKey='time'
                    yDataKey='stepLengths'
                    xLabel='経過時間(s)'
                    yLabel='ステップ長(m)'
                    data={keypointState.stepLengths}
                    times={times}
                    handleClickDot={handleClickDot}
                    // handleMoveMouse={handleMoveMouse}
                  />
                </div>
              </div>
              <div className='embla__slide'>
                <div className='h-48 w-full'>
                  <LineChart
                    xDataKey='time'
                    yDataKey='leftHipFlexionAngles'
                    xLabel='経過時間(s)'
                    yLabel='股関節屈曲角度(°)'
                    data={keypointState.leftHipFlexionAngles}
                    times={times}
                    handleClickDot={handleClickDot}
                    // handleMoveMouse={handleMoveMouse}
                  />
                </div>
                <div className='h-48 w-full'>
                  <LineChart
                    xDataKey='time'
                    yDataKey='trunkAngles'
                    xLabel='経過時間(s)'
                    yLabel='体幹角度(°)'
                    data={keypointState.trunkAngles}
                    times={times}
                    handleClickDot={handleClickDot}
                    // handleMoveMouse={handleMoveMouse}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
