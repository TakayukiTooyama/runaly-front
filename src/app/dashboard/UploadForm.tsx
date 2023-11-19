'use client'

import { ChangeEvent } from 'react'
import { useFormState } from 'react-dom'

import { useStore } from '@/lib/store/useStore'

import { UploadButton } from './UploadButton'
import { uploadFile } from './action'

export function UploadForm() {
  const [state, formAction] = useFormState(uploadFile, [])
  const videos = useStore((state) => state.videos)
  const addVideo = useStore((state) => state.addVideo)

  const handleChangeVideoFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addVideo(Array.from(e.target.files))
    }
  }

  return (
    <form action={formAction}>
      <fieldset className='m-12 flex flex-col gap-2 rounded-md border p-4'>
        <input
          id='file'
          type='file'
          name='file'
          multiple
          accept='video/*'
          onChange={handleChangeVideoFile}
        />
        <UploadButton disabled={videos.length === 0} />
      </fieldset>
      {state && state.length > 0 && <div>キーポイントが表示されます</div>}
    </form>
  )
}
