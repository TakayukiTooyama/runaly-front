import { getServerSession } from 'next-auth'

import { LoginButton, LogoutButton, User } from '@/components'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <div className='flex-col space-y-4'>
        {user ? <div>Logged in</div> : <div>Not logged in</div>}
        {user ? <User /> : null}
        {user ? <LogoutButton /> : <LoginButton />}
      </div>
    </main>
  )
}
