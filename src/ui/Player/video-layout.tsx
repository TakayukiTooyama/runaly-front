import * as Tooltip from '@radix-ui/react-tooltip'
import { Controls, Gesture } from '@vidstack/react'

import * as Buttons from './media-buttons'
import { SpeedMenu } from './speed-menu'
import { TimeGroup } from './time-group'
import { TimeSlider } from './time-slider'

const popupOffset = 8

export interface VideoLayoutProps {
  thumbnails?: string
}

export function VideoLayout({ thumbnails }: VideoLayoutProps) {
  return (
    <>
      <Gestures />
      <Controls.Root className='absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity media-controls:opacity-100'>
        <div className='flex-1' />
        <Tooltip.Provider>
          <Controls.Group className='flex items-center pb-2'>
            <Buttons.Play tooltipAlign='center' tooltipOffset={popupOffset} />
            <TimeGroup />
            <TimeSlider thumbnails={thumbnails} />
            <SpeedMenu />
            <Buttons.Fullscreen
              tooltipAlign='end'
              tooltipOffset={popupOffset}
            />
          </Controls.Group>
        </Tooltip.Provider>
      </Controls.Root>
    </>
  )
}

function Gestures() {
  return (
    <>
      <Gesture
        className='absolute inset-0 z-0 block h-full w-full'
        event='pointerup'
        action='toggle:paused'
      />
      <Gesture
        className='absolute inset-0 z-0 block h-full w-full'
        event='dblpointerup'
        action='toggle:fullscreen'
      />
      <Gesture
        className='absolute left-0 top-0 z-10 block h-full w-1/5'
        event='dblpointerup'
        action='seek:-10'
      />
      <Gesture
        className='absolute right-0 top-0 z-10 block h-full w-1/5'
        event='dblpointerup'
        action='seek:10'
      />
    </>
  )
}
