'use client'

import '@vidstack/react/player/styles/base.css'

import {
  MediaPlayer,
  MediaProvider,
  type MediaPlayerInstance,
  MediaPlayerProps,
} from '@vidstack/react'

import { VideoLayout } from './video-layout'

type Props = MediaPlayerProps & {
  src: string
  playerRef: React.RefObject<MediaPlayerInstance>
}

export function Player({ src, playerRef, ...props }: Props) {
  return (
    <MediaPlayer
      aspectRatio='16/9'
      className=' bg-slate-900 font-sans text-white'
      crossorigin
      muted
      playsinline
      ref={playerRef}
      src={src}
      title='Runaly'
      {...props}
    >
      <MediaProvider />
      <VideoLayout />
    </MediaPlayer>
  )
}
