import * as Slider from '@radix-ui/react-slider'
import {
  formatTime,
  Thumbnail,
  useMediaRemote,
  useMediaState,
  useSliderPreview,
} from '@vidstack/react'
import { useEffect, useState } from 'react'

export interface TimeSliderProps {
  thumbnails?: string
}

export function TimeSlider({ thumbnails }: TimeSliderProps) {
  const fps = 1 / 30 // これを渡してくる
  const time = useMediaState('currentTime')
  const canSeek = useMediaState('canSeek')
  const duration = useMediaState('duration')
  const seeking = useMediaState('seeking')
  const remote = useMediaRemote()
  const step = (fps / duration) * 100
  const [value, setValue] = useState(0)
  const { previewRootRef, previewRef, previewValue } = useSliderPreview({
    clamp: true,
    offset: 6,
    orientation: 'horizontal',
  })
  const previewTime = (previewValue / 100) * duration

  useEffect(() => {
    if (seeking) return
    setValue((time / duration) * 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, duration])

  return (
    <Slider.Root
      className='group relative inline-flex h-9 w-full cursor-pointer touch-none select-none items-center outline-none'
      value={[value]}
      disabled={!canSeek}
      step={Number.isFinite(step) ? step : 1}
      ref={previewRootRef}
      onValueChange={([value]) => {
        setValue(value)
        remote.seeking((value / 100) * duration)
      }}
      onValueCommit={([value]) => {
        remote.seek((value / 100) * duration)
      }}
    >
      <Slider.Track className='relative h-[5px] w-full rounded-sm bg-white/30'>
        <Slider.Range className='absolute h-full rounded-sm bg-media-brand will-change-[width]' />
      </Slider.Track>

      <Slider.Thumb
        aria-label='Current Time'
        className='block h-[15px] w-[15px] rounded-full border border-[#cacaca] bg-white opacity-0 outline-none ring-white/40 transition-opacity will-change-[left] focus:opacity-100 focus:ring-4 group-hocus:opacity-100'
      />

      {/* Preview */}
      <div
        className='absolute flex flex-col items-center opacity-0 transition-opacity duration-200 will-change-[left] data-[visible]:opacity-100'
        ref={previewRef}
      >
        {thumbnails ? (
          <Thumbnail.Root
            src={thumbnails}
            time={previewTime}
            className='mb-2 block h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border border-white bg-black'
          >
            <Thumbnail.Img />
          </Thumbnail.Root>
        ) : null}
        <span className='text-[13px]'>{formatTime(previewTime)}</span>
      </div>
    </Slider.Root>
  )
}
