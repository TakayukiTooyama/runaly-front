import { ORIGIN } from '@/constants'
import { CanvasState, CanvasViewState } from '@/types'

type CanvasControlsProps = {
  canvasState: CanvasState
  setCanvasViewState: (canvasViewState: CanvasViewState) => void
}

export function CanvasControl({
  canvasState,
  setCanvasViewState,
}: CanvasControlsProps) {
  return (
    <div className='absolute bottom-0 left-0 flex flex-col'>
      <button
        onClick={() =>
          canvasState.context &&
          setCanvasViewState({ offset: ORIGIN, scale: 1 })
        }
      >
        Zero View
      </button>
    </div>
  )
}
