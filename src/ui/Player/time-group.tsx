import { useMediaState } from '@vidstack/react'

export function TimeGroup() {
  const currentTime = useMediaState('currentTime')
  const duration = useMediaState('duration')

  function formatTime(time: number) {
    const rounded = Math.round(time * 100) / 100
    return rounded.toFixed(2).padStart(5, '0')
  }

  return (
    <div className='mr-2 flex items-center text-sm font-medium'>
      <p>{formatTime(currentTime)}</p>
      <div className='mx-1 text-white/80'>/</div>
      <p>{formatTime(duration)}</p>
    </div>
  )
}
