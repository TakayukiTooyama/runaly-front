'use client'

import '@vidstack/react/player/styles/base.css'

import {
  MediaPlayer,
  MediaProvider,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
} from '@vidstack/react'
import { useEffect, useRef } from 'react'

import { useStore } from '@/lib/store/useStore'

import { VideoLayout } from './video-layout'

export function Player() {
  const player = useRef<MediaPlayerInstance>(null)
  const selectedVideoUrl = useStore((state) => state.selectedVideoUrl)

  useEffect(() => {
    return player.current!.subscribe(({ paused, viewType }) => {
      console.log('is paused?', '->', paused)
      console.log('is audio view?', '->', viewType === 'audio')
    })
  }, [])

  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent,
  ) {
    console.log(detail)
    console.log(nativeEvent)
  }

  return (
    <MediaPlayer
      className='aspect-video w-full overflow-hidden bg-slate-900 font-sans text-white'
      title='Runaly'
      src={selectedVideoUrl}
      crossorigin
      onCanPlay={onCanPlay}
      ref={player}
    >
      <MediaProvider></MediaProvider>

      <VideoLayout />
    </MediaPlayer>
  )
}
