'use client'

import { useFormStatus } from 'react-dom'

import { Button, ButtonProps } from '@/ui/button'

type Props = ButtonProps

export function UploadButton(props: Props) {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' id='upload' aria-disabled={pending} {...props}>
      Upload file
    </Button>
  )
}
