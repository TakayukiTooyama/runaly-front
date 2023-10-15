'use client'

import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => {
  return (
    <button className='rounded-md border px-4 py-2' onClick={() => signIn()}>
      Sign in
    </button>
  )
}

export const LogoutButton = () => {
  return (
    <button className='rounded-md border px-4 py-2' onClick={() => signOut()}>
      Sign Out
    </button>
  )
}
