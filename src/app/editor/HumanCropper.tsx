import Cropper, { Area, type Point } from 'react-easy-crop'

type Props = {
  frameUrl: string
  crop: Point
  zoom: number
  setCrop: (crop: Point) => void
  setZoom: (zoom: number) => void
  setHumanBBox: (humanBBox: Area) => void
}

export function HumanCropper({
  frameUrl,
  crop,
  zoom,
  setCrop,
  setZoom,
  setHumanBBox,
}: Props) {
  return (
    <div className='relative aspect-video '>
      <div className='absolute inset-0'>
        <Cropper
          image={frameUrl}
          crop={crop}
          zoom={zoom}
          maxZoom={10}
          zoomSpeed={2}
          aspect={1 / 1}
          showGrid={false}
          objectFit='contain'
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_croppedArea: Area, croppedAreaPixels: Area) => {
            setHumanBBox(croppedAreaPixels)
          }}
        />
      </div>
    </div>
  )
}
