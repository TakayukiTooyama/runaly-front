import * as Tooltip from '@radix-ui/react-tooltip'
import { FullscreenButton, PlayButton, useMediaState } from '@vidstack/react'
import {
  Minimize as FullscreenExitIcon,
  Maximize as FullscreenIcon,
  PauseIcon,
  PlayIcon,
} from 'lucide-react'

export interface MediaButtonProps {
  tooltipSide?: Tooltip.TooltipContentProps['side']
  tooltipAlign?: Tooltip.TooltipContentProps['align']
  tooltipOffset?: number
}

export const buttonClass =
  'group ring-media-focus relative inline-flex px-2 mx-2 h-9 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 focus-visible:ring-4 aria-disabled:hidden'

export const tooltipClass =
  'animate-out fade-out slide-out-to-bottom-2 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in data-[state=delayed-open]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-3 py-1 text-sm font-medium text-white parent-data-[open]:hidden'

export function Play({
  tooltipOffset = 0,
  tooltipSide = 'top',
  tooltipAlign = 'center',
}: MediaButtonProps) {
  const isPaused = useMediaState('paused')
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton className={buttonClass}>
          {isPaused ? (
            <PlayIcon className='h-5 w-5 translate-x-px' />
          ) : (
            <PauseIcon className='h-5 w-5' />
          )}
        </PlayButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isPaused ? 'Play' : 'Pause'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export function Fullscreen({
  tooltipOffset = 0,
  tooltipSide = 'top',
  tooltipAlign = 'center',
}: MediaButtonProps) {
  const isActive = useMediaState('fullscreen')
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <FullscreenButton className={buttonClass}>
          {isActive ? (
            <FullscreenExitIcon className='h-5 w-5' />
          ) : (
            <FullscreenIcon className='h-5 w-5' />
          )}
        </FullscreenButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isActive ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
