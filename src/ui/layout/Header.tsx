import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='border-b border-gray-200'>
      <nav className='flex justify-between p-2'>
        <div className='flex'>
          <Link
            href={'/editor'}
            className='p-2 text-sm font-semibold md:text-2xl'
          >
            Runaly
          </Link>
        </div>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className='rounded bg-blue-500 px-2 text-white hover:bg-blue-400'>
              サインイン
            </button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  )
}
