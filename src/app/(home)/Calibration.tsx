'use client'

import { useMeasure } from '@uidotdev/usehooks'
import dynamic from 'next/dynamic'

import { caliMarkerKey } from '@/constants'
import { useCalibrationStore, useCanvasSettingStore } from '@/lib/store'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group'
import { Slider } from '@/ui/slider'

const AnnotationCanvas = dynamic(() => import('./_canvas/AnnotationCanvas'), {
  ssr: false,
})

export type Props = {
  frame: HTMLCanvasElement | undefined
  caliWidth: number
  setCaliWidth: (caliWidth: number) => void
}

export function Calibration({ frame, caliWidth, setCaliWidth }: Props) {
  const [ref, { width, height }] = useMeasure()
  const currentMarkerIndex = useCalibrationStore.use.currentMarkerIndex()
  const opacity = useCanvasSettingStore.use.opacity()
  const radius = useCanvasSettingStore.use.radius()
  const canvasSettingActions = useCanvasSettingStore.use.actions()
  const calibrationActions = useCalibrationStore.use.actions()

  return (
    <div className='space-y-4'>
      <h2 className='text-center text-xl'>キャリブレーション</h2>
      {/* キャンバス */}
      <div className='relative aspect-video  bg-gray-100' ref={ref}>
        {width && height && frame && (
          <AnnotationCanvas
            stageSize={{ width, height }}
            videoSize={{ width: frame.width, height: frame.height }}
            selectedCanvas={frame}
          />
        )}
      </div>
      <RadioGroup
        value={`${currentMarkerIndex}`}
        onValueChange={(value) =>
          calibrationActions.updateMarkerIndex(Number(value))
        }
      >
        {caliMarkerKey.map((label, index) => {
          return (
            <div key={label} className='flex items-center space-x-2'>
              <RadioGroupItem value={`${index}`} id={label} />
              <Label htmlFor={label}>{label}</Label>
            </div>
          )
        })}
      </RadioGroup>

      <div className='flex items-center space-x-4'>
        <Label htmlFor='caliWidth'>実際の横の長さ</Label>
        <Input
          id='caliWidth'
          name='caliWidth'
          type='number'
          className='w-16'
          value={caliWidth}
          onChange={(e) => setCaliWidth(parseFloat(e.target.value))}
        />
        <p>m</p>
      </div>
      <div className='flex items-center space-x-4'>
        <Label>マーカーサイズ</Label>
        <div className={'slider-div'}>
          <Slider
            className='w-32'
            max={8}
            min={1}
            step={0.5}
            value={[radius]}
            onValueChange={(value) =>
              canvasSettingActions.updateRadius(value[0])
            }
          />
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <Label>透明度</Label>
        <div className={'slider-div'}>
          <Slider
            className='w-32'
            max={1}
            min={0}
            step={0.1}
            value={[opacity]}
            onValueChange={(value) =>
              canvasSettingActions.updateOpacity(value[0])
            }
          />
        </div>
      </div>
    </div>
  )
}
