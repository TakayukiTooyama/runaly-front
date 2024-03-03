'use client'

import {
  PlayerRef,
  Player as RemotionPlayer,
  type RenderLoading,
} from '@remotion/player'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Maximize,
  PlayerPause,
  PlayerPlay,
  Repeat,
  RepeatOff,
  Volume,
  VolumeOff,
} from 'tabler-icons-react'

import { usePlayerStore } from '@/lib/store'

import { PlayerSkelton } from './PlayerSkelton'

import type { CompProps, Keypoint } from '@/types'

type PlayerProps = {
  durationInFrames: number
  playerWidth: number
  videoHeight: number
  videoUrl: string
  videoWidth: number
  keypoints?: Keypoint[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & CompProps<any>

/* 親コンポーネントから呼び出されるPlayer（PlayerとPlayerControllerのまとめ） */

export function Player({
  durationInFrames,
  playerWidth,
  videoUrl,
  videoHeight,
  videoWidth,
  keypoints,
  ...props
}: PlayerProps) {
  /* Local State */
  const [loop, setLoop] = useState(false)
  const [playbackRate] = useState(1.0)

  /* Global State  */
  const playerRef = useRef<PlayerRef>(null)
  const player = usePlayerStore((state) => state.player)
  const setPlayer = usePlayerStore((state) => state.actions.setPlayer)

  // ローディングを描画
  const renderLoading: RenderLoading = useCallback(() => <PlayerSkelton />, [])

  useEffect(() => {
    if (!player && playerRef?.current) {
      setPlayer(playerRef.current)
    }
  })

  return (
    <>
      <RemotionPlayer
        ref={playerRef}
        controls={false}
        showVolumeControls
        compositionWidth={1920}
        compositionHeight={1080}
        fps={60}
        durationInFrames={durationInFrames}
        doubleClickToFullscreen={true}
        loop={loop}
        clickToPlay={false}
        inputProps={{ keypoints, url: videoUrl, videoHeight, videoWidth }}
        renderLoading={renderLoading}
        playbackRate={playbackRate}
        spaceKeyToPlayOrPause={false}
        moveToBeginningWhenEnded={false}
        initialFrame={0}
        showPosterWhenUnplayed={true}
        showPosterWhenEnded={false}
        showPosterWhenPaused={false}
        style={{
          height: playerWidth / (16 / 9),
          width: playerWidth,
        }}
        {...props}
      />
      {player && (
        <div className='flex w-full items-center justify-between px-4 pt-2'>
          <div className='flex items-center space-x-6'>
            {player.isPlaying() ? (
              <PlayerPause onClick={() => player.pause()} />
            ) : (
              <PlayerPlay onClick={() => player.play()} />
            )}
          </div>
          <div className='flex items-center space-x-6'>
            {player.isMuted() ? (
              <VolumeOff onClick={() => player.unmute()} />
            ) : (
              <Volume onClick={() => player.mute()} />
            )}
            {loop ? (
              <RepeatOff onClick={() => setLoop(false)} />
            ) : (
              <Repeat onClick={() => setLoop(true)} />
            )}
            <Maximize onClick={() => player.requestFullscreen()} />
          </div>
        </div>
      )}
    </>
  )
}
