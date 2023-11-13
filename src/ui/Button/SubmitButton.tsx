'use client'

import { useFormStatus } from 'react-dom'

import { Icons } from '../icons'

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type='submit' aria-disabled={pending}>
      {pending && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
      Create User
    </button>
  )
}
