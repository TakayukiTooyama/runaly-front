'use client'

import { MediaPlayerInstance } from '@vidstack/react'
import { useRef } from 'react'

import { Player } from './player'

export function PlayerControl() {
  const playerRef = useRef<MediaPlayerInstance>(null)

  return <Player playerRef={playerRef} />
}
