'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'

export const User = () => {
  const { data: session } = useSession()
  const user = session?.user
  const expires = session?.expires

  return (
    <>
      {user ? (
        <div className='flex items-center space-x-6'>
          {user?.image ? (
            <Image
              alt='avatar'
              src={`${user?.image}`}
              width={60}
              height={60}
              className='rounded-full'
            />
          ) : null}
          <div>
            <p>名前 : {user?.name}</p>
            <p>Email : {user?.email}</p>
            <p>有効期限 : {expires}</p>
          </div>
        </div>
      ) : null}
    </>
  )
}
