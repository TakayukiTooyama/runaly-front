import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

type Props = {
  videoUrl: string
  setVideoFile: (videoFile: File | undefined) => void
}

export function VideoFileUploader({ videoUrl, setVideoFile }: Props) {
  return (
    <>
      {videoUrl ? (
        <video controls muted src={videoUrl} className='aspect-video' />
      ) : (
        <div className='rounded-lg bg-gray-50'>
          <div className='flex w-full items-center justify-center'>
            <Label
              htmlFor='video'
              className='flex aspect-video w-full cursor-pointer flex-col justify-center border-2 border-dashed hover:border-gray-300 hover:bg-gray-100'
            >
              <div className='flex flex-col items-center justify-center pt-7'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-12 w-12 text-gray-400 group-hover:text-gray-600'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z' />
                  <path d='M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z' />
                  <path d='M7 12l4 0' />
                  <path d='M9 10l0 4' />
                </svg>
                <p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>
                  Select a Video
                </p>
              </div>
              <Input
                id='video'
                name='video'
                type='file'
                className='opacity-0'
                accept='video/*'
                onChange={(e) => {
                  setVideoFile(e.target.files?.[0])
                }}
              />
            </Label>
          </div>
        </div>
      )}
    </>
  )
}
