import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='border-b border-gray-200'>
      <nav className='flex justify-between p-2'>
        <div className='flex'>
          <Link href={'/'} className='p-2 text-sm font-semibold md:text-2xl'>
            Runaly
          </Link>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  )
}
