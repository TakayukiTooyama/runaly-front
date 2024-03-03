'use client'

import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaTimeUpdateEventDetail,
  useMediaRemote,
  useStore,
} from '@vidstack/react'
import { RefObject } from 'react'

import { Slider } from '@/ui/range-slider'

type Props = {
  playerRef: RefObject<MediaPlayerInstance>
  videoFile: File
  videoTimeSlider: number[]
  setVideoTimeSlider: (values: number[]) => void
}

function VideoEditor({
  playerRef,
  videoFile,
  videoTimeSlider,
  setVideoTimeSlider,
}: Props) {
  /* LocalState */
  // const playerRef = useRef<MediaPlayerInstance>(null)

  /* Global State */
  const { duration } = useStore(MediaPlayerInstance, playerRef)

  /* Custom Hook */
  const remote = useMediaRemote(playerRef)

  /* Event Handler */
  const onTimeUpdate = (detail: MediaTimeUpdateEventDetail) => {
    const [min, max] = videoTimeSlider
    const startTime = (duration * min) / 100
    const endTime = (duration * max) / 100

    if (detail.currentTime < startTime) {
      remote.seek(startTime)
    }
    if (detail.currentTime > endTime) {
      remote.seek(0)
      remote.pause()
    }
  }
  return (
    <>
      <div>
        {/* {videoFile ? ( */}
        <MediaPlayer
          aspectRatio='16/9'
          className=' bg-slate-900 font-sans text-white'
          crossorigin
          muted
          playsinline
          ref={playerRef}
          src={URL.createObjectURL(videoFile)}
          title='Runaly'
          onTimeUpdate={onTimeUpdate}
        >
          <MediaProvider />
        </MediaPlayer>
        {/* ) : (
          <div className='aspect-video '></div>
        )} */}
      </div>
      {playerRef.current && (
        <div className={'slider-div'}>
          <Slider
            max={100}
            min={0}
            step={1}
            value={videoTimeSlider}
            onValueChange={(values: number[]) => {
              setVideoTimeSlider(values)
            }}
            formatLabel={(value) => `${value}`}
          />
        </div>
      )}
      <ul className='p-4'>
        <li>{`start: ${videoTimeSlider[0]}`}</li>
        <li>{`end: ${videoTimeSlider[1]}`}</li>
      </ul>
    </>
  )
}

export default VideoEditor
