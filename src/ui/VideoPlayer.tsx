'use client'

import {
  MediaPlayer,
  MediaProvider,
  useStore,
  MediaPlayerInstance,
  Time,
} from '@vidstack/react'
import { useEffect, useRef } from 'react'

export function VideoPlayer() {
  const ref = useRef<MediaPlayerInstance>(null),
    {
      /*
      canLoad, //メディアの読み込み開始を許可するかどうか
      canOrientScreen, // ネイティブの画面方向 API と必要なメソッド (ロック/ロック解除) が利用可能かどうか。
      canPlay, // ユーザー エージェントがメディアを再生できるが、コンテンツをさらにバッファリングするために停止することなくメディアを最後まで再生するには十分なデータがロードされていないと推定されるかどうか。
      canSeek, // 現在のストリームでシーク操作が可能かどうか
      ended, // メディアの再生が終了したかどうか。言い換えれば、 の場合は true になりますcurrentTime === duration。
      currentSrc,
      currentTime,
      duration,
      error, //最新のメディア エラー、または存在しない場合は未定義の場合にデバッグできる
      fullscreen, //プレーヤーが現在全画面モードであるかどうか。
      height, // メディア プレーヤー コンテナーの高さ (ピクセル単位)。
      mediaHeight, //メディアの高さ (プロバイダー ピクセル単位)。
      mediaWidth, // メディアプロバイダーの幅 (ピクセル単位)。
      minLiveDVRWindow, // シーク操作が許可されるまでの最小シーク可能長さ (秒単位)。
      muted, // 音声がミュートされているかどうか。
      orientation, // 現在の画面の向き。
      paused, // 再生を一時停止するかどうか
      pictureInPicture, // プレーヤーが現在ピクチャー・イン・ピクチャー モードであるかどうか。
      playbackRate, // メディアの再生速度
      played, // ブラウザが再生したメディアの時間？（new Time Range()）
      playing, // メディアがアクティブに再生されているかどうか。ロードされていない場合、または再生が開始されていない場合のデフォルトはfalse。
      source, // 選択したメディア リソース。メディアがロードされていない場合のデフォルト{ src: '', type: '' }。
      sources, // 再生の対象となる現在のメディア リソースの URL とオプションのタイプ。source現在ロードされているリソースを取得するために使用します。
      seekable, // ユーザーがシークできる時間範囲
      waiting, // 一時データの不足により再生が一時的に停止したかどうか。
      width, // メディア プレーヤー コンテナーの幅 (ピクセル単位)。
      */
    } = useStore(MediaPlayerInstance, ref)

  useEffect(() => {
    /* Use props/methods here. */
  }, [])

  return (
    <MediaPlayer
      src='/video/short.mp4'
      ref={ref}
      aspectRatio='16/9'
      // controls
      muted
      playsinline
      // src={src}
      load='visible'
      /*
          プロバイダがいつメディアのロードを開始できるか
          eager: すぐにロード。
          idle: ページがロードされ、requestIdleCallbackが発生した後。
          visible: プロバイダがビューポートに入るまでロードを遅らせる。
          custom: startLoading()メソッドまたはメディア読み込み開始イベントを待つ。
         */
      viewType='video'
      /* Callback
        onCanLoad={} // メディアのロードを開始できるときに発生（loadのタイプによって変わる）。
        onCanPlayThrough={} // メディアを再生できるときに発生し、最後まで再生するのに十分なデータがロードされていると推定。
        onDurationChange={} // プロパティが変更されると発生。
        onEnded＝{} // メディアの終わりに達したか、それ以上データが利用できない時に発生。loop時は呼ばれない。
        onFullscreenChange // メディアが全画面表示に入るとき、または全画面表示から出るときに発生。
        onMediaEnterFullscreenRequest // メディアに全画面表示を要求するときに発生
        onMediaExitFullscreenRequest // メディアに全画面表示を終了するよう要求したときに発生
        onLoadStart // ブラウザがリソースのロードを開始したときに発生。
        onLoadedData // メディアの現在の再生位置にあるフレームのロードが完了すると発生。多くの場合、最初のフレーム。
        onLoadedMetadata // メタデータがロードされたときに発生。
        onMediaPauseRequest // メディア再生の一時停止を要求するときに発生。
        onMediaPlayRequest // メディア再生の開始/再開を要求するときに発生。
        onMediaRateChangeRequest // 現在の再生レートの変更を要求するときに発生。
        onMediaSeekingRequest
        onMediaSeekRequest
        onPause
        onPlay // pausedプロパティがplay() methodやautoplayによってfalseからtrueに変わった時に発生。
        onRateChange
        onSeeked // シーク操作が完了し、現在の再生位置が変更され、seekingプロパティがfalseに変更されたときに発生。
        onSeeking // シーク操作の開始時に発生（seeking: true）
        onSourceChange // srcが変更された時
        onStarted // currentTime > 0の時に発生。
        onTimeUpdate // メディアの再生またはユーザーのシークによってcurrentTimeプロパティ値が変更されたときに発生
        */
    >
      <MediaProvider>
        {/* <Poster
            className='absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover'
            src='https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200'
            alt='Girl walks into campfire with gnomes surrounding her friend ready for their next meal!'
          /> */}
        <div className='ml-1.5 flex items-center text-sm font-medium'>
          <Time className='vds-time' type='current' />
          <div className='mx-1 text-white/80'>/</div>
          <Time className='time' type='duration' />
        </div>
      </MediaProvider>
    </MediaPlayer>
  )
}
